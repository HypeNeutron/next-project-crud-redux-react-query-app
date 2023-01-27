import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiCheck, BiUserPlus, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";

import Form, { TFormRef } from "../components/Form";
import Layout from "../components/Layout";
import Table, { TDelRef } from "../components/Table";
import ShowError from "../components/UI/ErrorImage";
import {
  selectsDataEdit,
  selectsDeleteID,
  selectsFormOpen,
  setDataEdit,
  setDeleteID,
  setToggleForm,
} from "../store/employeeSlice";
import { TEmployee } from "../store/employeeSlice.type";
import { getError } from "../utils/getError";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const formRef = useRef<TFormRef>(null);
  const delRef = useRef<TDelRef>(null);

  const {
    data: employee,
    isPaused,
    error,
    isError,
    isLoading,
  } = useQuery<TEmployee[], Error>(
    ["employee"],
    () =>
      axios.get("http://localhost:4000/employee").then((res) => {
        return res.data;
      }),
    { refetchOnWindowFocus: false }
  );
  const dataEdit = useSelector(selectsDataEdit);
  const deleteID = useSelector(selectsDeleteID);
  const isFormOpen = useSelector(selectsFormOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (isLoading)
    return (
      <Layout>
        <div className="min-h-screen  ">
          <div className="mt-52 flex justify-center items-center flex-col gap-5">
            <h2>Loading</h2>
            <BarLoader color="#7b8cba" />
          </div>
        </div>
      </Layout>
    );

  if (isPaused)
    return (
      <Layout name="Offline">
        <ShowError type="offline" />
      </Layout>
    );

  if (isError)
    return (
      <Layout name="Error!">
        <ShowError type="error" message={getError({ err: error })} />
      </Layout>
    );

  const handleDelete = () => {
    if (deleteID && delRef.current) {
      delRef.current.submitDelete(deleteID);
      dispatch(setDeleteID(null));
    }
  };

  const addEmployee = () => {
    if (dataEdit && formRef.current) {
      dispatch(setDataEdit(null));
      formRef.current.resetForm();
    } else dispatch(setToggleForm(!isFormOpen));
  };

  return (
    <Layout>
      <div className="container mx-auto flex justify-between py-6 border-b">
        <div className="left flex gap-3">
          <button
            onClick={addEmployee}
            className="flex items-center bg-indigo-500 text-white px-3 py-1 rounded-md border hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800"
          >
            <span className="px-1">Add Employee</span>
            <BiUserPlus size={23} />
          </button>
        </div>
      </div>

      {/* collapse form */}
      {isFormOpen && (
        <div className="container mx-auto flex flex-col py-5">
          <Form ref={formRef} />
        </div>
      )}
      {deleteID && (
        <div className="container mx-auto relative">
          <div className="absolute flex items-center top-[-50px] p-1 rounded-xl bg-white right-0 z-30">
            <span className="mr-2">Are you sure?</span>
            <div className=" flex justify-between">
              <button
                className="px-5 py-2 mr-3 bg-red-500 text-white flex rounded-lg"
                onClick={handleDelete}
              >
                Yes <BiCheck size="23" />
              </button>
              <button
                className="px-5 py-2 bg-green-500 text-white flex rounded-lg"
                onClick={() => dispatch(setDeleteID(null))}
              >
                No <BiX size="23" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* table */}
      <div className="container mx-auto overflow-x-auto">
        <Table employee={employee} ref={delRef} />
      </div>
    </Layout>
  );
}
