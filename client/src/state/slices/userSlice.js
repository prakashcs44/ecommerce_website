import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axiosClient.js";





export const login = createAsyncThunk("login",async(data)=>{
    
   const link = `/user/login`;
  
   const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

   try{
    const res = await axiosClient.post(link,data,config);
    return res.data;
   }
   catch(err){
    throw new Error(err.response.data?.message);
   }
  
  

})


export const register = createAsyncThunk("register",async(data)=>{


 

   const link = `/user/register`;
   const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };
   try{
    const res = await axiosClient.post(link,data,config);
    return res.data;
   }
   catch(err){
    throw new Error(err.response.data?.message)
   }
   
})




export const loadUser = createAsyncThunk("loadUser",async()=>{
    const link = `/user/me`;
    const config = { withCredentials: true}
    const res = await axiosClient.get(link,config);
    
   return res.data;

});


export const logout = createAsyncThunk("logout",async()=>{
    const link = `/user/logout`;
    const config = { withCredentials: true}
    const res = await axiosClient.get(link,config);
    return res.data;
});



export const updateProfile = createAsyncThunk("updateProfile",async(data)=>{
    
    
    try{
        const link = `/user/me/update`;
        const config = { headers: { "Content-Type": "multipart/form-data" },withCredentials:true};
        const res = await axiosClient.put(link,data,config);
        return res.data;
    }
    catch(err){
        throw new Error(err.response.data?.message);
    }
  
})


export const changePassword = createAsyncThunk("changePassword",async(data)=>{
    const link = `/user/password/update`;
    const config = {withCredentials:true};
    const res = await axiosClient.put(link,data,config);
    return res.data;
})



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