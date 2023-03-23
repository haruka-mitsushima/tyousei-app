import { createSlice } from "@reduxjs/toolkit";

type Item = {
  id: number, text: string
}

type State = {
  id: number,
  items: Array<Item>
}

const initialState: State = {
  id: 1,
  items: []
}

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload + 1
    },
    addItem: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    deleteItem: (state, action) => {
      const newData = state.items.filter((element) => element.id !== action.payload);
      state.items = newData
    },
  }
})

export const { setId, addItem, deleteItem } = itemSlice.actions
export default itemSlice.reducer
