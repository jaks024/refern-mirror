import { getBoard, getImage, getUser } from "@/app/apis";
import Container from "@/app/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const board = await getBoard(params.boardId);
  if (!board) {
    return {};
  }
  const user = await getUser(board?.creatorUserId);
  if (!user) {
    return {};
  }

  const firstImageId =
    board.imageProperties.transforms.length > 0
      ? board.imageProperties.transforms[0].imageId
      : "";
  const firstImage = await getImage(firstImageId);

  const previewImageUrl = firstImage
    ? firstImage.thumbnailUrl
    : "https://storage.googleapis.com/refern-static-content/opengraph.png";

  const title = `View reference board created by ${user.username} (@${user.at})`;

  const description = `View ${board.imageProperties.transforms.length} referece images in ${board.name} | ${board.description}`;

  return {
    title,
    description,
    keywords: board.tags,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    applicationName: "refern. | The curated art reference platform",
    openGraph: {
      siteName: "refern. | The curated art reference platform",
      locale: "en_US",
      title,
      description,
      type: "website",
      url: `https://my.refern.app/folder/${board.parentFolderId}/board/${board._id}`,
      images: {
        url: board?.cover.length > 0 ? board.cover : previewImageUrl,
        alt: description,
        type: "image/png",
      },
    },
  };
}

export default async function Page({ params }: any) {
  const board = await getBoard(params.boardId);
  if (!board) {
    return <div>Error 404: board not found</div>;
  }
  const user = await getUser(board?.creatorUserId);
  if (!user) {
    return <div>Error 404: user not found</div>;
  }

  return (
    <main>
      <Container>
        <a href="https://www.refern.app/" className="w-fit underline">
          refern. | The curated art reference platform
        </a>
        <h1 className="text-3xl font-bold">View reference board collection</h1>
        {board?.cover.length > 0 ? (
          <div className="relative w-full h-96 overflow-hidden">
            <Image
              src={board.cover}
              priority
              className="object-contain"
              fill
              alt={`collection cover image for ${board.name}`}
            />
          </div>
        ) : (
          <></>
        )}
        <br />
        <p>Name: {board.name}</p>
        <p>Description: {board.description}</p>
        <p>Hearts: {board.heart}</p>
        <p>
          Image in reference board: {board.imageProperties.transforms.length}
        </p>

        <p>Tags: {board.tags.join(", ")}</p>
        <p>
          Created by:{" "}
          <Link className="underline" href={`/${user.at}`}>
            {user.username} {`(@${user.at})`}
          </Link>
        </p>
        <Link className="underline" href={`/folder/${board?.parentFolderId}`}>
          Parent folder
        </Link>
        <p>Created at: {board.createdAt}</p>
        <p>Updated at: {board.updatedAt}</p>
        <br />
        <h2 className="text-xl font-bold">Reference board content</h2>
        <div className="flex flex-col gap-2 underline">
          {board.imageProperties.transforms.map((x) => (
            <Link
              key={x.imageId}
              href={`/image/${x.imageId}`}
              className="w-fit"
            >
              /image/{x.imageId}
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
