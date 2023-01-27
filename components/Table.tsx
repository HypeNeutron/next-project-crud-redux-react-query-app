import Image from "next/image";
import { forwardRef, Ref, useImperativeHandle } from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { useDeleteEmployee } from "../hook/useQuery";
import {
  setDataEdit,
  setDeleteID,
  setToggleForm,
} from "../store/employeeSlice";
import { TEmployee } from "../store/employeeSlice.type";

type TTable = {
  employee?: TEmployee[];
};

export type TDelRef = { submitDelete: (id: number) => void };

function Table({ employee }: TTable, ref: Ref<TDelRef>) {
  const dispatch = useDispatch();
  const employeeDelete = useDeleteEmployee(
    ["employee"],
    "http://localhost:4000/employee"
  );

  const editEmployee = (item: TEmployee) => {
    dispatch(setDataEdit(item));
    dispatch(setToggleForm(true));
  };

  useImperativeHandle(ref, () => ({
    submitDelete: (id: number) => employeeDelete.mutate(id),
  }));

  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800">
            <th className="cell">
              <span className="text-gray-200">Name</span>
            </th>
            <th className="cell">
              <span className="text-gray-200">Email</span>
            </th>
            <th className="cell">
              <span className="text-gray-200">Salary</span>
            </th>
            <th className="cell">
              <span className="text-gray-200">Birthday</span>
            </th>
            <th className="cell">
              <span className="text-gray-200">Status</span>
            </th>
            <th className="cell">
              <span className="text-gray-200">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {employee &&
            employee.map((item) => {
              const { id, name, avatar, email, salary, birthday, status } =
                item;
              return (
                <tr className="bg-gray-50 text-center" key={id}>
                  <td className="cell flex items-center">
                    <Image
                      src={avatar}
                      width={35}
                      height={35}
                      alt="avatar"
                      className="rounded-full"
                    />
                    <span className="text-center ml-2 font-semibold">
                      {name}
                    </span>
                  </td>
                  <td className="cell">
                    <span>{email}</span>
                  </td>
                  <td className="cell">
                    <span>${salary}</span>
                  </td>
                  <td>{birthday}</td>
                  <td className="cell">
                    <button className="cursor-default">
                      <span
                        className={`${
                          status === "Active" ? "bg-green-500" : "bg-red-500"
                        } px-2 py-1 rounded-full text-white`}
                      >
                        {status}
                      </span>
                    </button>
                  </td>
                  <td className="cell ">
                    <div className="flex justify-around items-center ">
                      <button
                        className="cursor-pointer"
                        onClick={() => editEmployee(item)}
                      >
                        <BiEdit size={25} color={"rgb(33, 196, 93)"} />
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => dispatch(setDeleteID(id))}
                      >
                        <BiTrashAlt size={25} color={"rgb(196, 33, 33)"} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default forwardRef(Table);
