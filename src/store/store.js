import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
const store = configureStore({
  reducer: {
    auth: authSlice
    //Todo: post: postSlice (This should be done so that when any component is loading at that time only I take the Info. and 
    // save it in store. So that my app does not make web request again and again and I can take required Info from store only) 
  }
})

export default store;