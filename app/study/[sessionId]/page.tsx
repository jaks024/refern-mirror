import { getImage, getStudySession, getUser } from "@/app/apis";
import Container from "@/app/components/Container";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const session = await getStudySession(params.sessionId);
  if (!session) {
    return {};
  }
  const user = await getUser(session?.creatorUserId);
  if (!user) {
    return {};
  }

  const previewImgId =
    session.createdImageIds.length > 0
      ? session.createdImageIds[0]
      : session.seenImageIds[0];
  const previewImg = await getImage(previewImgId);

  const previewImageUrl = previewImg?.thumbnailUrl
    ? previewImg.thumbnailUrl
    : "https://storage.googleapis.com/refern-static-content/opengraph.png";

  const title = `${
    session.title.length > 0
      ? session.title
      : `Session on ${new Date(session.createdAt).toDateString()}`
  } | Study session by ${user.username} (@${user.at})`;

  const description = `${session.seenImageIds.length} reference studied ⋅ ${
    session.createdImageIds.length
  } linked creations${session.notes ? ` | ${session.notes}` : ""}`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    applicationName:
      "refern. | The all-in-one curated image reference platform",
    openGraph: {
      siteName: "refern. | The all-in-one curated image reference platform",
      locale: "en_US",
      title,
      description,
      type: "website",
      url: `https://my.refern.app/study/${session._id}`,
      images: {
        url: previewImageUrl,
        alt: description,
        type: "image/png",
      },
    },
    alternates: {
      canonical: `/study/${session._id}`,
    },
  };
}

export default async function Page({ params }: any) {
  const session = await getStudySession(params.sessionId);
  if (!session) {
    return <div>Error 404: session not found</div>;
  }
  const user = await getUser(session?.creatorUserId);
  if (!user) {
    return <div>Error 404: user not found</div>;
  }

  return (
    <main>
      <Container>
        <a href="https://www.refern.app/" className="w-fit underline">
          refern. | The all-in-one curated image reference platform
        </a>
        <h1 className="text-3xl font-bold">View study session</h1>
        <br />
        <p>Title: {session.title}</p>
        <p>Notes: {session.notes}</p>

        <p>
          Created by:{" "}
          <Link className="underline" href={`/${user.at}`}>
            {user.username} {`(@${user.at})`}
          </Link>
        </p>
        <p>Created at: {session.createdAt}</p>
        <p>Updated at: {session.updatedAt}</p>
        <br />
        <h2 className="text-xl font-bold">Linked creation</h2>
        <div className="flex flex-col gap-2 underline">
          {session.createdImageIds.map((x) => (
            <Link key={x} href={`/image/${x}`} className="w-fit">
              {`/image/${x}`}
            </Link>
          ))}
        </div>
        <br />
        <h2 className="text-xl font-bold">Seen in this session</h2>
        <div className="flex flex-col gap-2 underline">
          {session.seenImageIds.map((x) => (
            <Link key={x} href={`/image/${x}`} className="w-fit">
              {`/image/${x}`}
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
