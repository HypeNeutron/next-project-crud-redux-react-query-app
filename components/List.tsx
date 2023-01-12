import Link from "next/link";

import { TUser } from "../types";

export default function List({ items }: { items: TUser[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link href="/users/[id]" as={`/users/${item.id}`}>
            {item.id}:{item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
