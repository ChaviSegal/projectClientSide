import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basket: JSON.parse(localStorage.getItem("basket")) || []
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        saveArr: (state, action) => {
            state.basket = action.payload;
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        add: (state, action) => {
            state.basket.push(action.payload);
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        remove: (state, action) => {
            state.basket = state.basket.filter(item => item._id !== action.payload);
            localStorage.removeItem("basket", JSON.stringify(state.basket));
        },
        update: (state, action) => {
            const { _id, productAmount } = action.payload;
            const existingProduct = state.basket.find(item => item._id === _id);
            if (existingProduct) {
                existingProduct.productAmount += productAmount;
            }
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        removeAllItems: (state) => {
            state.basket = [];
            localStorage.removeItem("basket");
        },
    }
});

export const { add, remove, update, saveArr, removeAllItems } = basketSlice.actions;
export default basketSlice.reducer;

