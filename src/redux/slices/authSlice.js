import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance"


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ username, password }, { rejectWithValue }) => {
        console.log("THUNK RECEIVED DATA =>", username, password); // <-- ADD THIS
        try {
            const response = await axios.post("/auth/login", {
                username,
                password,
            });
            console.log("THUNK RECEIVED response =>", response.data.accessToken);  // <-- ADD THIS

            // Token AsyncStorage me save  
            await AsyncStorage.setItem("token", response.data.accessToken);
            return response.data;
        } catch (error) {
            console.log("AXIOS ERROR =>", error.response?.data);
            console.log("STATUS CODE =>", error.response?.status);
            return rejectWithValue("Invalid username or password");
        }
    }
);

export const fetchUser = createAsyncThunk(
    "auth/fetchUser", async (_, { rejectWithValue }) => {
        try {
            const reponse = await axios.get("auth/me");
            return reponse.data
        } catch (error) {
            console.log("falied fetUser data", error)
            return rejectWithValue("unble to fetch user");

        }
    }
)



const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
            // AsyncStorage.removeItem("token")
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;   // yaha user data aayega
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;   // invalid login
            });

        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
            })

    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
