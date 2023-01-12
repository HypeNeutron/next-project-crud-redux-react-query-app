import axios from "axios";
import { GetStaticProps } from "next";
import Link from "next/link";

import Layout from "../../components/Layout";
import List from "../../components/List";
import { TUser } from "../../types";
import { getError } from "../../utils/getError";

export default function Users({ items }: { items: TUser[] | string }) {
  return (
    <Layout name="Users List">
      <h1>Users List</h1>
      <p>
        Example fetching data from inside <code>getStaticProps()</code>.
      </p>
      <p>You are currently on: /users</p>
      {typeof items === "object" ? <List items={items} /> : <h4>{items}</h4>}
      <br />
      <p>
        <Link href="/">{`=> Go home`}</Link>
      </p>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let items: TUser[] | string;
  try {
    const { data } = await axios.get("http://localhost:3000/api/users");
    items = data;
  } catch (err) {
    items = getError({ err: err as Error });
  }
  return { props: { items } };
};
