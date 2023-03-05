import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { BiBrush, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { usePostEmployee, usePutEmployee } from "../hook/useQuery";
import {
  selectsDataEdit,
  setDataEdit,
  setToggleForm,
} from "../store/employeeSlice";
import { TEmployee } from "../store/employeeSlice.type";
import { getError } from "../utils/getError";
import ErrorMsg from "./UI/ErrorMsg";
import Input from "./UI/Input";
import StatusSubmit from "./UI/StatusSubmit";

export type TFormProps = Omit<TEmployee, "name"> & {
  firstname: string;
  lastname: string;
};

export type TFormRef = { resetForm: () => void };
const API_ENDPOINT = "http://localhost:4000/employee";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Form(_props: object, ref: Ref<TFormRef>) {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const dispatch = useDispatch();
  const selectDataEdit = useSelector(selectsDataEdit);
  const postEmployee = usePostEmployee(["employee"], API_ENDPOINT);
  const updateEmployee = usePutEmployee(["employee"], API_ENDPOINT);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<TFormProps>();

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setValue("firstname", "");
      setValue("lastname", "");
      setValue("email", "");
      setValue("birthday", "");
      setValue("salary", "");
      setValue("status", "Active");
    },
  }));

  const bgButton = selectDataEdit ? "bg-yellow-500 " : "bg-green-500";

  useEffect(() => {
    if (selectDataEdit) {
      const { id, name, email, birthday, salary, status, avatar } =
        selectDataEdit;
      const nameSplit = name.split(" ");
      const fName = nameSplit[0];
      const lName = nameSplit[1];
      setValue("firstname", fName);
      setValue("lastname", lName);
      setValue("email", email);
      setValue("birthday", birthday);
      setValue("salary", salary);
      setValue("status", status);
      setValue("id", id);
      setValue("avatar", avatar);
    }
  }, [selectDataEdit, setValue]);

  const handleSubmitForm = async ({
    firstname,
    lastname,
    email,
    salary,
    birthday,
    status,
  }: TFormProps) => {
    setIsAdded(true);
    dispatch(setToggleForm(false));
    setTimeout(() => {
      setIsAdded(false);
      dispatch(setToggleForm(false));
    }, 3000);
    const name = firstname + " " + lastname;
    const random = Math.floor(Math.random() * 99 + 1);
    postEmployee.mutate({
      name,
      avatar: `https://randomuser.me/api/portraits/men/${random}.jpg`,
      email,
      salary,
      birthday,
      status,
    });
    setValue("firstname", "");
    setValue("lastname", "");
    setValue("email", "");
    setValue("birthday", "");
    setValue("salary", "");
  };

  const handleUpdateForm = async ({
    id,
    firstname,
    lastname,
    email,
    salary,
    avatar,
    birthday,
    status,
  }: TFormProps) => {
    setIsUpdated(true);
    setTimeout(() => {
      setIsUpdated(false);
      dispatch(setToggleForm(false));
    }, 3000);
    const name = firstname + " " + lastname;
    updateEmployee.mutate({
      id,
      name,
      email,
      salary,
      avatar,
      birthday,
      status,
    });
    setValue("firstname", "");
    setValue("lastname", "");
    setValue("email", "");
    setValue("birthday", "");
    setValue("salary", "");
    setValue("status", "Active");
    dispatch(setDataEdit(null));
  };

  if (postEmployee.isError)
    return (
      <StatusSubmit
        message={getError({ err: postEmployee.error as Error })}
        type="error"
      />
    );

  if (updateEmployee.isError)
    return (
      <StatusSubmit
        message={getError({ err: updateEmployee.error as Error })}
        type="error"
      />
    );

  if (isAdded) return <StatusSubmit message="Data Added" type="success" />;
  if (isUpdated) return <StatusSubmit message="Data Updated" type="success" />;

  return (
    <form
      className="grid w-4/6 gap-4 lg:grid-cols-2"
      onSubmit={handleSubmit(
        selectDataEdit ? handleUpdateForm : handleSubmitForm
      )}
    >
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("avatar")} />
      <Input
        className="input"
        name="firstname"
        placeholder="FirstName"
        register={register}
      >
        {errors.firstname && <ErrorMsg errors={errors.firstname} />}
      </Input>
      <Input
        className="input"
        name="lastname"
        placeholder="LastName"
        register={register}
      >
        {errors.lastname && <ErrorMsg errors={errors.lastname} />}
      </Input>
      <Input
        type="email"
        className="input"
        name="email"
        placeholder="Email"
        register={register}
      >
        {errors.email && <ErrorMsg errors={errors.email} />}
      </Input>
      <Input
        className="input"
        name="salary"
        placeholder="Salary"
        register={register}
      >
        {errors.salary && <ErrorMsg errors={errors.salary} />}
      </Input>
      <div className="flex items-center">
        <label htmlFor="date" className="pr-2">
          Birthday:
        </label>
        <input
          type="date"
          id="date"
          className="border px-5 py-3 focus:outline-none rounded-md"
          {...register("birthday", { required: "this filed is required" })}
          placeholder="Date"
        />
        {errors.birthday && <ErrorMsg errors={errors.birthday} />}
      </div>
      <div className="radio-group flex gap-10 items-center">
        <div className="flex">
          <input
            type="radio"
            className="radio"
            value="Active"
            defaultChecked
            id="radioDefault1"
            {...register("status", { required: "this filed is required" })}
          />
          <label htmlFor="radioDefault1" className=" text-gray-800">
            Active
          </label>
        </div>
        <div className="flex">
          <input
            type="radio"
            className="radio"
            value="Inactive"
            id="radioDefault2"
            {...register("status", { required: "this filed is required" })}
          />
          <label htmlFor="radioDefault2" className=" text-gray-800">
            Inactive
          </label>
        </div>
        {errors.status && <ErrorMsg errors={errors.status} />}
      </div>
      <div className="flex">
        <button
          className={`flex justify-center items-center text-md w-3/12  text-white py-2 border rounded-md hover:bg-gray-50 ${bgButton} hover:text-green-500 hover:border-green-500`}
        >
          {selectDataEdit ? "Update" : "Add"}{" "}
          <span className="px-1">
            {selectDataEdit ? <BiBrush size={24} /> : <BiPlus size={24} />}
          </span>
        </button>
      </div>
    </form>
  );
}

export default forwardRef(Form);
