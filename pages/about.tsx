import Link from "next/link";

import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout name="About">
      <h1>About</h1>
      <p>This is the about page</p>
      <p>
        <Link href="/">{`=> Go home`}</Link>
      </p>
    </Layout>
  );
}
