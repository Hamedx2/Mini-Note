import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  email: "",
  id: "",
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: {
      prepare(email, id) {
        return {
          payload: {
            email,
            id,
          },
        };
      },
      reducer(state, action) {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.id = action.payload.id;
      },
    },
    loading(state) {
      state.isLoading = true;
    },
    setLogout(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.email = "";
      state.id = "";
    },
  },
});

const { loading, setLogin, setLogout } = authSlice.actions;

export { setLogin };

export function signUp(emailAddress, password) {
  return async function (dispatch) {
    try {
      dispatch(loading());
      const { data, error } = await supabase.auth.signUp({
        email: emailAddress,
        password,
      });
      if (error) throw new Error(error);
      const { email, id } = data.user;
      dispatch(setLogin(email, id));
      toast.success("You Created Your account successfully.");
    } catch (err) {
      console.log(err.message);
      dispatch(setLogout());
      toast.error("something went wrong, try again !");
    }
  };
}

export function login(emailAddress, password) {
  return async function (dispatch) {
    try {
      dispatch(loading());
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailAddress,
        password,
      });
      if (error) throw new Error(error);
      const { email, id } = data.user;
      dispatch(setLogin(email, id));
      toast.success("Your logged in successfully!");
    } catch (err) {
      console.log(err.message);
      dispatch(setLogout());
      toast.error("Email or Password is Wrong");
    }
  };
}

export function logout() {
  return async function (dispatch) {
    try {
      const res = await supabase.auth.signOut();
      if (res.error) throw new Error(res.error);
      dispatch(setLogout());
      toast.success("You logged out of your account successfully.");
    } catch (err) {
      console.log(err.message);
      toast.error("something went wrong, try again !");
    }
  };
}

export default authSlice.reducer;
