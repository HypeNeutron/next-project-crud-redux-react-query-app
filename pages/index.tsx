import Link from "next/link";

import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">{`=> About`}</Link>
      </p>
    </Layout>
  );
}
