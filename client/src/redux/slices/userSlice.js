import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { apiLogin,apiRegister,apiLoadUser,apiLogout,apiUpdateProfile,apiUpdatePassword } from "../api/user.js";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_SUCCESS,
}

from "../constants/user.js"



export const login = createAsyncThunk("login",apiLogin);


export const register = createAsyncThunk("register",apiRegister);




export const loadUser = createAsyncThunk("loadUser",apiLoadUser);

export const logout = createAsyncThunk("logout",apiLogout);

export const updateProfile = createAsyncThunk("updateProfile",apiUpdateProfile);

export const updatePassword = createAsyncThunk("updatePassword",apiUpdatePassword);



const initialState = {
    isAuthenticated:false,
    user:{},
    error:"",
    type:"",
    
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
      clearStatus(state,action){
              state.type = "";
              state.error = "";
      },

    },
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            state.user = action.payload?.user;
            state.isAuthenticated = true;
            state.type = LOGIN_SUCCESS;
            state.error="";
            
           
        })
        .addCase(login.pending,(state,action)=>{
            
            state.type = LOGIN_REQUEST;
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.type = LOGIN_FAIL;
            state.isAuthenticated = false;
            state.user = {};
            state.error=action.error.message;
           
          
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.user = action.payload?.user;
            state.status = REGISTER_USER_SUCCESS;
            state.isAuthenticated = true;
            
        })
        .addCase(register.rejected,(state,action)=>{
        
            state.isAuthenticated = false;
            state.user = {};
            state.error=action.error.message;
            state.type = REGISTER_USER_FAIL;
        })
        .addCase(register.pending,(state,action)=>{
            state.type = REGISTER_USER_REQUEST;
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.user = action.payload?.user;
            state.type = LOAD_USER_SUCCESS;
            state.isAuthenticated = true;
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.user = action.payload?.user||{};
            state.type = LOAD_USER_FAIL;
            state.isAuthenticated = false;
        })
        .addCase(loadUser.pending,(state,action)=>{
            state.type = LOAD_USER_REQUEST;
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.user = {};
            state.isAuthenticated = false;
            state.type = LOGOUT_SUCCESS;
        })
        .addCase(logout.rejected,(state,action)=>{
            state.type = LOGOUT_FAIL;
        })
        .addCase(logout.pending,(state,action)=>{
            
        })
        .addCase(updateProfile.pending,(state,action)=>{
            state.type = UPDATE_PROFILE_REQUEST;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.user = action.payload.user;
            state.type=UPDATE_PROFILE_SUCCESS;
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.type=UPDATE_PROFILE_FAIL;
            state.error = action.error.message;
        })
        .addCase(updatePassword.pending,(state,action)=>{
            state.type = UPDATE_PASSWORD_REQUEST;
        })
        .addCase(updatePassword.fulfilled,(state,action)=>{
            state.type=UPDATE_PASSWORD_SUCCESS;
            state.user=action.payload.user;
        })
        .addCase(updatePassword.rejected,(state,action)=>{
            state.type=UPDATE_PASSWORD_FAIL;
        })
    }
});

export const {clearStatus}   = userSlice.actions;
export default userSlice.reducer;