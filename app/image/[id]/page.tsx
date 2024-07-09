import { getImage, getUser, getCollection } from "@/app/apis";
import Container from "@/app/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const image = await getImage(params.id);
  if (!image) {
    return {};
  }
  const user = await getUser(image?.creatorUserId);
  if (!user) {
    return {};
  }

  const description =
    image?.inferred?.labelled?.witi ??
    `${image?.description}${image.tags.join(", ")}`;

  const inferredTags =
    image.inferred?.labelled && image.inferred?.labelled?.status === "success"
      ? `${image.inferred?.labelled?.content.trim()} 
    ${image.inferred?.labelled?.environment.trim()} 
    ${image.inferred?.labelled?.keywords.trim()} 
    ${image.inferred?.labelled?.lighting.trim()} 
    ${image.inferred?.labelled?.people.trim()} 
    ${image.inferred?.labelled?.perspective.trim()} `
      : "";

  const keywords =
    image.tags.join(", ") + inferredTags + image.inferred?.wdtagged?.tags;

  return {
    title: `View reference created by ${user.username} (@${user.at})`,
    description:
      description.length === 0
        ? "The all-in-one tool to save, create, find, organize, moodboard, and share curated art references so that you can focus on creating your best work."
        : description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    applicationName: "refern. | The curated art reference platform",
    openGraph: {
      siteName: "refern. | The curated art reference platform",
      locale: "en_US",
      title: `View reference created by ${user.username} (@${user.at})`,
      description: `View image - ${image?.description} ${image.tags.join(
        ", "
      )}`,
      type: "website",
      url: `https://my.refern.app/image/${params.id}`,
      images: {
        url:
          image?.thumbnailUrl ??
          "https://storage.googleapis.com/refern-static-content/opengraph.png",
        alt: description,
        type: "image/png",
      },
    },
    alternates: {
      canonical: `/image/${params.id}`,
    },
  };
}

export default async function Page({ params }: any) {
  const image = await getImage(params.id);
  if (!image) {
    return <div>Error 404: image not found</div>;
  }
  const user = await getUser(image?.creatorUserId);
  if (!user) {
    return <div>Error 404: user not found</div>;
  }
  const collection = await getCollection(image?.parentCollectionId);

  const alt =
    image.inferred &&
    image.inferred.labelled &&
    image.inferred.labelled.status === "success"
      ? image.inferred.labelled.witi
      : image.description;

  const renderInferred = () => {
    if (!image.inferred || !image.inferred.labelled) {
      return <div>No inferred properties</div>;
    }
    const labels = image.inferred.labelled;
    return (
      <div>
        <p>Content: {labels.content}</p>
        <p>People: {labels.people}</p>
        <p>Environment: {labels.environment}</p>
        <p>Lighting: {labels.lighting}</p>
        <p>Perspective: {labels.perspective}</p>
        <p>Keywords: {labels.keywords}</p>
        <p>What is in the image: {labels.witi}</p>
        <p>WDTagged Character: {image.inferred?.wdtagged?.character}</p>
        <p>WDTagged Tags: {image.inferred?.wdtagged?.tags}</p>
      </div>
    );
  };

  return (
    <main>
      <Container>
        <a href="https://www.refern.app/" className="w-fit underline">
          refern. | The curated art reference platform
        </a>
        <h1 className="text-3xl font-bold">View reference image</h1>
        <br />
        <div className="relative w-full h-96 overflow-hidden">
          <Image
            src={image.url}
            priority
            className="object-contain"
            fill
            alt={alt}
          />
        </div>
        <p>Name: {image.name}</p>
        <p>Description: {image.description}</p>

        <div>
          Source:{" "}
          <a href={image.sourceUrl} className="underline" rel="noreferrer">
            {image.sourceName}
          </a>
        </div>
        <p>Tags: {image.tags.join(", ")}</p>
        <p>
          Created by:{" "}
          <Link className="underline" href={`/${user.at}`}>
            {user.username} {`(@${user.at})`}
          </Link>
        </p>
        <p>
          Parent collection:{" "}
          <Link
            className="underline"
            href={`/collection/${image.parentCollectionId}`}
          >
            {collection?.name}
          </Link>
        </p>
        <Link
          className="underline"
          href={`/folder/${collection?.parentFolderId}`}
        >
          Parent folder
        </Link>
        <p>Created at: {image.createdAt}</p>
        <p>Updated at: {image.updatedAt}</p>
        <br />
        <h2 className="text-xl font-bold">Image content</h2>
        {renderInferred()}
      </Container>
    </main>
  );
}
