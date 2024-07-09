import { getFolder, getUser } from "@/app/apis";
import Container from "@/app/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const folder = await getFolder(params.folderId);
  if (!folder) {
    return {};
  }
  const user = await getUser(folder?.creatorUserId);
  if (!user) {
    return {};
  }

  const previewImageUrl =
    folder.cover.length > 0
      ? folder.cover
      : "https://storage.googleapis.com/refern-static-content/opengraph.png";

  const title = `${folder.name} | View folder created by ${user.username} (@${user.at})`;

  const description = `View ${folder.items.length} collection and reference board in ${folder.name} | ${folder.description}`;

  return {
    title,
    description,
    keywords: [
      ...folder.tags,
      ...(folder.inferred ? folder.inferred?.keywords : []),
    ],
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
      url: `https://my.refern.app/folder/${folder._id}`,
      images: {
        url: previewImageUrl,
        alt: description,
        type: "image/png",
      },
    },
    alternates: {
      canonical: `/folder/${folder._id}`,
    },
  };
}

export default async function Page({ params }: any) {
  const folder = await getFolder(params.folderId);
  if (!folder) {
    return <div>Error 404: folder not found</div>;
  }
  const user = await getUser(folder?.creatorUserId);
  if (!user) {
    return <div>Error 404: user not found</div>;
  }

  return (
    <main>
      <Container>
        <a href="https://www.refern.app/" className="w-fit underline">
          refern. | The curated art reference platform
        </a>
        <h1 className="text-3xl font-bold">View folder</h1>
        {folder?.cover.length > 0 ? (
          <div className="relative w-full h-96 overflow-hidden">
            <Image
              src={folder.cover}
              priority
              className="object-contain"
              fill
              alt={`folder cover image for ${folder.name}`}
            />
          </div>
        ) : (
          <></>
        )}
        <br />
        <p>Name: {folder.name}</p>
        <p>Description: {folder.description}</p>

        <p>Tags: {folder.tags.join(", ")}</p>
        <p>
          Created by:{" "}
          <Link className="underline" href={`/${user.at}`}>
            {user.username} {`(@${user.at})`}
          </Link>
        </p>
        <p>Created at: {folder.createdAt}</p>
        <p>Updated at: {folder.updatedAt}</p>
        <br />
        <h2 className="text-xl font-bold">Collection content</h2>
        <div className="flex flex-col gap-2 underline">
          {folder.items.map((x) => (
            <Link key={x._id} href={`/${x.type}/${x._id}`} className="w-fit">
              {`/${x.type}/${x._id}`}
            </Link>
          ))}
        </div>
        <br />
        <p>Tags of content: {folder.inferred?.keywords.join(", ")}</p>
      </Container>
    </main>
  );
}
