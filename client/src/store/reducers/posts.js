import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/";
const INITIAL_STATE = {
  posts: [],
  isLoading: false,
};

const postSlice = createSlice({
  initialState: { ...INITIAL_STATE },
  name: "posts",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    donetLoading: (state) => {
      state.isLoading = false;
    },
    getPosts: (state, action) => {
      const post = action.payload
      state.posts=[...post]
      state.isLoading=false
    },
    addNewPost: (state, action) => {
        const post = action.payload;
        state.posts.unshift(post)
        state.isLoading=false
    }
  },
});
export const { getPosts, startLoading, donetLoading, addNewPost } = postSlice.actions;

export default postSlice.reducer;

export const fetchPostsAsync = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const {data} = await api.fetchPosts();
        dispatch(getPosts(data));
        dispatch(donetLoading());
    } catch (error) {
        throw error
    }
 
};


export const createPostsAsync = (post) => async (dispatch) => {
    try {
        dispatch(startLoading());
        console.log("data", post);
        const newData = await api.createPost(post);
        console.log("newData",newData);
        dispatch(getPosts(post));
        dispatch(donetLoading());
    } catch (error) {
        throw error
    }
 
};
