import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

export const fetchItem = createAsyncThunk(
    "products/fetchItem",
    async ({ limit = 10, skip = 0 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`products?limit=${limit}&skip=${skip}`);
            console.log("response data ---->", response.data);
            return response.data;
        } catch (error) {
            console.log("unable to fetch products", error);
            return rejectWithValue("unable to fetch products");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],     // array
        total: 0,
        loading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItem.fulfilled, (state, action) => {
                state.loading = false;

                // ⬅️ CORRECT FIELD
                // state.products = action.payload.products;
                // APPEND NEW DATA
                state.products = [...state.products, ...action.payload.products];

                state.total = action.payload.total;
                state.error = null;
            })
            .addCase(fetchItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
