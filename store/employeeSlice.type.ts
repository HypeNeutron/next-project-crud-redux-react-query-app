export type TEmployee = {
  id: number;
  name: string;
  avatar: string;
  email: string;
  salary: string;
  birthday: string;
  status: "Active" | "Inactive";
};

export type TEmployeeState = {
  isFormOpen: boolean;
  dataEdit: null | TEmployee;
  deleteID: null | number;
};
