import { Metadata } from "next";
import Container from "./../components/Container";
import Link from "next/link";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return {
    title: "Explore | refern. ",
    description:
      "refern. is an ad-free, Pinterest-like image organizer, reimagined for creatives — save, find, organize, moodboard, study & share curated reference images all in one app.",
    keywords: [
      "art tool",
      "art reference",
      "curated art reference",
      "image organizer",
      "moodboard",
      "reference board",
      "art inspiration finder",
      "share art references",
      "find art references",
      "find reference images",
    ],
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
      title: "Explore | refern.",
      description:
        "refern. is an ad-free, Pinterest-like image organizer, reimagined for creatives — save, find, organize, moodboard, study & share curated reference images all in one app.",
      type: "website",
      url: "https://my.refern.app/explore",
      images: {
        url: "https://storage.googleapis.com/refern-static-content/opengraph.png",
        alt: "refern logo",
        type: "image/png",
        width: "1138",
        height: "596",
      },
    },
    alternates: {
      canonical: "/explore",
    },
  };
}

export default function Explore() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>
        <h1 className="text-5xl font-bold">
          refern. | The all-in-one curated image reference platform
        </h1>
        <br />
        <p>Explore page</p>
        <p>
          {`Find and explore other creator's art references collections, profiles,
          and reference boards`}
        </p>
        <a className="underline" href="https://www.refern.app">
          landing page
        </a>
        <br />
        <Link className="underline" href={"/"}>
          client home page
        </Link>
      </Container>
    </main>
  );
}
