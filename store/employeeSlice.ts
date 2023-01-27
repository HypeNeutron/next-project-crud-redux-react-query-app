import { createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { TEmployeeState } from "./employeeSlice.type";

const initialState: TEmployeeState = {
  isFormOpen: false,
  dataEdit: null,
  deleteID: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setToggleForm(state, action) {
      state.isFormOpen = action.payload;
    },
    setDataEdit(state, action) {
      state.dataEdit = action.payload;
    },
    setDeleteID(state, action) {
      state.deleteID = action.payload;
    },
  },
});

export const selectsFormOpen = (state: RootState) => state.employee.isFormOpen;
export const selectsDataEdit = (state: RootState) => state.employee.dataEdit;
export const selectsDeleteID = (state: RootState) => state.employee.deleteID;

export const { setToggleForm, setDataEdit, setDeleteID } =
  employeeSlice.actions;
export default employeeSlice.reducer;
