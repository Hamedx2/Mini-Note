import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { supabase, SUPABASE_KEY, SUPABASE_URL } from "../../lib/supabaseClient";
import toast from "react-hot-toast";

async function getToken() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  return token;
}

const initialState = {
  notes: [],
  isLoading: false,
  activeNote: null,
  editNote: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload;
      state.isLoading = false;
    },
    setLoading(state) {
      state.isLoading = true;
    },
    clearNotes(state) {
      state.notes = [];
      state.isLoading = false;
    },
    setActiveNote(state, action) {
      state.activeNote = action.payload;
    },
    clearActiveNote(state) {
      state.activeNote = null;
    },
    setEditNote(state) {
      state.editNote = true;
    },
    clearEditNote(state) {
      state.editNote = false;
    },
  },
});

export const {
  setNotes,
  setLoading,
  clearNotes,
  setActiveNote,
  clearActiveNote,
  setEditNote,
  clearEditNote,
} = noteSlice.actions;

export function getNotes() {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const token = await getToken();
      const { isLoading } = state.notes;
      if (!isLoading) dispatch(setLoading());
      if (!token) throw new Error("unAuthourized");
      const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/notes`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${token}`,
        },
        params: { select: "*" },
      });
      dispatch(setNotes(data));
    } catch (err) {
      console.log(err);
      toast.error("something went wrong, try again !");
    }
  };
}

export function deleteNote(id) {
  return async function (dispatch) {
    try {
      const token = await getToken();
      dispatch(setLoading());
      if (!token) throw new Error("unAuthourized");
      await axios.delete(`${SUPABASE_URL}/rest/v1/notes?id=eq.${id}`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Note Deleted successfully.");
      dispatch(getNotes());
    } catch (err) {
      console.log(err);
      toast.error("something went wrong, try again !");
    }
  };
}

export function createNote(title, content) {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const { id } = state.auth;
      const token = await getToken();
      dispatch(setLoading());
      if (!token) throw new Error("unAuthourized");
      await axios.post(
        `${SUPABASE_URL}/rest/v1/notes`,
        {
          title,
          content,
          user_id: id,
          created_at: new Date().toISOString(),
        },
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getNotes());
      toast.success("Note Added successfully.");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong, try again !");
    }
  };
}

export function editNote(note) {
  return async function (dispatch) {
    try {
      const token = await getToken();
      if (!token) throw new Error("unAuthourized");
      const { title, content, id } = note;
      dispatch(setLoading());
      await axios.patch(
        `${SUPABASE_URL}/rest/v1/notes?id=eq.${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Note Edited successfully.");
      dispatch(clearActiveNote());
      dispatch(clearEditNote());
      dispatch(getNotes());
    } catch (error) {
      console.log(error);
      toast.error("something went wrong, try again !");
    }
  };
}

export default noteSlice.reducer;
