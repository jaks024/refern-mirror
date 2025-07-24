import { getUserByAt } from "@/app/apis";
import Container from "@/app/components/Container";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const user = await getUserByAt(params.at);
  if (!user) {
    return {};
  }

  const previewImageUrl =
    user.photoUrl.length > 0
      ? user.photoUrl
      : "https://storage.googleapis.com/refern-static-content/opengraph.png";

  const title = `${user.username}'s Profile (@${user.at})`;
  const description = `View profile page of ${user.username} (@${user.at})`;
  return {
    title,
    description,
    keywords: user.allTags,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    applicationName:
      "refern. | The all-in-one curated image reference platform",
    openGraph: {
      siteName: "refern. | The all-in-one curated image reference platform",
      locale: "en_US",
      title,
      type: "website",
      url: `https://my.refern.app/${params.at}`,
      images: {
        url: previewImageUrl,
        alt: description,
        type: "image/png",
      },
    },
    alternates: {
      canonical: `/${params.at}`,
    },
  };
}

export default async function Page({ params }: any) {
  const user = await getUserByAt(params.at);
  if (!user) {
    return <div>Error 404: user not found</div>;
  }

  return (
    <main>
      <Container>
        <a href="https://www.refern.app/" className="w-fit underline">
          refern. | The all-in-one curated image reference platform
        </a>
        <h1 className="text-3xl font-bold">View user profile</h1>
        {user.photoUrl.length > 0 ? (
          <div className="relative w-full h-96 overflow-hidden">
            <Image
              src={user.photoUrl}
              priority
              className="object-contain"
              fill
              alt={`profile picture for ${user.username} (${user.at})`}
            />
          </div>
        ) : (
          <></>
        )}
        <br />
        <p>Username: {user.username}</p>
        <p>At: @{user.at}</p>

        <p>All user tags: {user.allTags?.join(", ")}</p>
        <p>Member since: {user.createdAt}</p>
      </Container>
    </main>
  );
}
