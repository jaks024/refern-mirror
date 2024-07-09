import { getCollection, getImage, getUser } from "@/app/apis";
import Container from "@/app/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const collection = await getCollection(params.collectionId);
  if (!collection) {
    return {};
  }
  const user = await getUser(collection?.creatorUserId);
  if (!user) {
    return {};
  }

  const firstImageId =
    collection.imageIds.length > 0 ? collection.imageIds[0] : "";
  const firstImage = await getImage(firstImageId);

  const previewImageUrl = firstImage
    ? firstImage.thumbnailUrl
    : "https://storage.googleapis.com/refern-static-content/opengraph.png";

  const title = `${collection.name} | View collection created by ${user.username} (@${user.at})`;

  const description = `View ${collection.imageIds.length} images in ${collection.name} | ${collection.description}`;

  return {
    title,
    description,
    keywords: [
      ...collection.tags,
      ...(collection.inferred ? collection.inferred?.keywords : []),
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
      url: `https://my.refern.app/collection/${params.collectionId}`,
      images: {
        url: collection?.cover.length > 0 ? collection.cover : previewImageUrl,
        alt: description,
        type: "image/png",
      },
    },
    alternates: {
      canonical: `/collection/${params.collectionId}`,
    },
  };
}

export default async function Page({ params }: any) {
  const collection = await getCollection(params.collectionId);
  if (!collection) {
    return <div>Error 404: collection not found</div>;
  }
  const user = await getUser(collection?.creatorUserId);
  if (!user) {
    return <div>Error 404: user not found</div>;
  }

  return (
    <main>
      <Container>
        <a href="https://www.refern.app/" className="w-fit underline">
          refern. | The curated art reference platform
        </a>
        <h1 className="text-3xl font-bold">View reference image collection</h1>
        {collection?.cover.length > 0 ? (
          <div className="relative w-full h-96 overflow-hidden">
            <Image
              src={collection.cover}
              priority
              className="object-contain"
              fill
              alt={`collection cover image for ${collection.name}`}
            />
          </div>
        ) : (
          <></>
        )}
        <br />
        <p>Name: {collection.name}</p>
        <p>Description: {collection.description}</p>
        <p>Hearts: {collection.heart}</p>

        <p>Tags: {collection.tags.join(", ")}</p>
        <p>
          Created by:{" "}
          <Link className="underline" href={`/${user.at}`}>
            {user.username} {`(@${user.at})`}
          </Link>
        </p>
        <Link
          className="underline"
          href={`/folder/${collection?.parentFolderId}`}
        >
          Parent folder
        </Link>
        <p>Created at: {collection.createdAt}</p>
        <p>Updated at: {collection.updatedAt}</p>
        <br />
        <h2 className="text-xl font-bold">Collection content</h2>
        <div className="flex flex-col gap-2 underline">
          {collection.imageIds.map((x) => (
            <Link key={x} href={`/image/${x}`} className="w-fit">
              /image/{x}
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
