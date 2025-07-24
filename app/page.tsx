import Link from "next/link";
import Container from "./components/Container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>
        <h1 className="text-5xl font-bold">
          refern. | The all-in-one curated image reference platform
        </h1>
        <br />
        <p>
          Refern lets you save, create, find, organize, moodboard & share
          curated art references so that you can focus on creating your best
          work. | Web client
        </p>
        <a className="underline" href="https://www.refern.app">
          landing page
        </a>
        <br />
        <Link className="underline" href={"/explore"}>
          explore page
        </Link>
      </Container>
    </main>
  );
}
