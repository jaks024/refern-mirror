import Container from "@/app/components/Container";
import { Metadata } from "next";
import Image from "next/image";

interface Image {
  _id: string;
  url: string;
  thumbnailUrl: string;
  name: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  creatorUserId: string;
  parentCollectionId: string;
  tags: string[];
  isNSFW?: boolean;

  heart: number;

  metadata: {
    fileName: string;
    type: string;
    size: number;
  };

  transform: {
    angle: number;
    flipX: boolean;
    flipY: boolean;
    scaleX: number;
    scaleY: number;
    brightness: number;
    saturation: number;
    contrast: number;
  };

  inferred?: {
    safeSearch: {
      adult: number;
      spoof: number;
      medical: number;
      violence: number;
      racy: number;
    };
    labelled: {
      status: "success" | "fail";
      content: string;
      people: string;
      environment: string;
      lighting: string;
      perspective: string;
      keywords: string;
      palette: [
        {
          r: number;
          g: number;
          b: number;
        }
      ];
      witi: string;
    };
  };

  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  email: string;
  username: string;
  at: string;
  photoUrl: string;
}

async function getUser(userId: string) {
  const res = await fetch(`${process.env.API_ROOT}/user/${userId}`);
  if (res.ok) {
    const data = await res.json();
    return data as User;
  } else {
    return undefined;
  }
}

async function getImage(imageId: string) {
  const res = await fetch(`${process.env.API_ROOT}/image/${imageId}`);
  if (res.ok) {
    const data = await res.json();
    return data as Image;
  } else {
    return undefined;
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const image = await getImage(params.id);
  if (!image) {
    return {};
  }
  const user = await getUser(image?.creatorUserId);
  if (!user) {
    return {};
  }

  const description = image?.inferred?.labelled?.witi ?? image?.description;

  const inferredTags =
    image.inferred?.labelled && image.inferred?.labelled?.status === "success"
      ? `${image.inferred?.labelled?.content.trim()} 
    ${image.inferred?.labelled?.environment.trim()} 
    ${image.inferred?.labelled?.keywords.trim()} 
    ${image.inferred?.labelled?.lighting.trim()} 
    ${image.inferred?.labelled?.people.trim()} 
    ${image.inferred?.labelled?.perspective.trim()} `
      : "";

  const keywords = image.tags.join(", ") + inferredTags;

  return {
    title: `View reference created by ${user.username} (@${user.at})`,
    description:
      description.length === 0
        ? "The all-in-one tool to save, create, find, organize, moodboard, and share curated art references so that you can focus on creating your best work."
        : description,
    keywords,
    applicationName: "refern. | The curated art reference platform",
    openGraph: {
      siteName: "refern. | The curated art reference platform",
      locale: "en_US",
      title: `View reference created by ${user.username} (@${user.at})`,
      description,
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
  };
}

export default async function Page({ params }: any) {
  const image = await getImage(params.id);
  if (!image) {
    return <div>Error 404: not found</div>;
  }
  const user = await getUser(image?.creatorUserId);
  if (!user) {
    return <div>Error 404: not found</div>;
  }

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
          Created by: {user.username} {`(@${user.at})`}
        </p>
        <p>Created at: {image.createdAt}</p>
        <p>Updated at: {image.updatedAt}</p>
        <br />
        <h2 className="text-xl font-bold">Image content</h2>
        {renderInferred()}
      </Container>
    </main>
  );
}
