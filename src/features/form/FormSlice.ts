import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formDate: "",
  startTime: "",
  endTime: "",
  error: false,
  dateError: false,
  timeError: false
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.formDate = action.payload
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setDateError: (state, action) => {
      state.dateError = action.payload
    },
    setTimeError: (state, action) => {
      state.timeError = action.payload
    },
  }
})

export const { setDate, setStartTime, setEndTime, setError, setDateError, setTimeError } = formSlice.actions
export default formSlice.reducer
