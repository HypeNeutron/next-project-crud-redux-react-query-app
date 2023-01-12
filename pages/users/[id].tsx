import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import Layout from "../../components/Layout";
import { userData } from "../../data";
import { TUser } from "../../types";
import { getError } from "../../utils/getError";

type Props = {
  itemUser?: TUser;
  errorMsg?: string;
};

export default function StaticPropsDetail({ itemUser, errorMsg }: Props) {
  if (errorMsg)
    return (
      <Layout name="Error">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errorMsg}
        </p>
      </Layout>
    );

  return (
    <Layout name={`${itemUser ? itemUser.name : "User Detail"}`}>
      {itemUser && (
        <div>
          <h1>Detail for {itemUser.name}</h1>
          <p>ID: {itemUser.id}</p>
          <Link href="/users">{`=> Users`}</Link>
        </div>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = userData.map((user) => ({
    params: { id: user.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let itemUser: TUser | object = {};
  let errorMsg = "";
  try {
    const { data } = await axios.get("http://localhost:3000/api/users");
    const id = params?.id;
    const selectUser: TUser = data.find(
      (user: TUser) => user.id === Number(id)
    );
    itemUser = selectUser;
  } catch (err) {
    errorMsg = getError({ err: err as Error });
  }

  return { props: { itemUser, errorMsg } };
};
