import Container from "./components/Container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>
        <h1 className="text-5xl font-bold">
          refern. | The curated art reference platform
        </h1>
        <br />
        <p>Content mirror</p>
        <a className="underline" href="https://www.refern.app">
          landing page
        </a>
      </Container>
    </main>
  );
}
