import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { apiLogin,apiRegister,apiLoadUser,apiLogout,apiUpdateProfile,apiChangePassword } from "../api/user.js";




export const login = createAsyncThunk("login",apiLogin);


export const register = createAsyncThunk("register",apiRegister);




export const loadUser = createAsyncThunk("loadUser",apiLoadUser);

export const logout = createAsyncThunk("logout",apiLogout);

export const updateProfile = createAsyncThunk("updateProfile",apiUpdateProfile);

export const changePassword = createAsyncThunk("changePassword",apiChangePassword);



const initialState = {
    isAuthenticated:false,
    user:{},
    error:"",
    status:"",
    
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
      clearStatus(state,action){
              state.status = "";
              state.error = "";
      },

    },
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            state.user = action.payload?.user;
            state.isAuthenticated = true;
            state.status = "success";
            state.error="";
            
           
        })
        .addCase(login.pending,(state,action)=>{
            state.status = "loading";
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.status = "fail";
            state.isAuthenticated = false;
            state.user = {};
            state.error=action.error.message;
           
          
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.user = action.payload?.user;
            state.status = "success";
            state.isAuthenticated = true;
            
        })
        .addCase(register.rejected,(state,action)=>{
        
            state.isAuthenticated = false;
            state.user = {};
            state.error=action.error.message;
            state.status = "fail";
        })
        .addCase(register.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.user = action.payload?.user;
            state.status = "success";
            state.isAuthenticated = true;
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.user = action.payload?.user||{};
            state.status = "fail";
            state.isAuthenticated = false;
        })
        .addCase(loadUser.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.user = {};
            state.isAuthenticated = false;
            state.status = "success";
        })
        .addCase(logout.rejected,(state,action)=>{
            state.status = "fail";
        })
        .addCase(logout.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(updateProfile.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.user = action.payload.user;
            state.status="success";
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.status="fail";
            state.error = action.error.message;
        })
        .addCase(changePassword.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(changePassword.fulfilled,(state,action)=>{
            state.status="success";
            state.user=action.payload.user;
        })
        .addCase(changePassword.rejected,(state,action)=>{
            state.status="fail";
        })
    }
});

export const {clearStatus}   = userSlice.actions;
export default userSlice.reducer;