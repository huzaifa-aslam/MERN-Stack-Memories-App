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
      const post = action.payload;
      state.posts = [...post];
      state.isLoading = false;
    },
    addNewPost: (state, action) => {
      const post = action.payload;
      state.posts?.unshift(post);
      state.isLoading = false;
    },
    updatePost: (state, action) => {
      const post = action.payload;
      state.posts?.forEach((item, idx) => {
        if (item._id === post._id && state.posts) {
          state.posts[idx] = post;
        }
      });
      return state;
    },
    deletePost: (state, action) => {
      const post = action.payload;
      state.posts = state.posts?.filter((item, idx) => {
        return item._id !== post;
      });
      return state;
    },
  },
});
export const {
  getPosts,
  startLoading,
  donetLoading,
  addNewPost,
  updatePost,
  deletePost,
} = postSlice.actions;

export default postSlice.reducer;

export const fetchPostsAsync = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.fetchPosts();
    dispatch(getPosts(data));
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};

export const createPostsAsync = (post) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await api.createPost(post);
    dispatch(addNewPost(post));
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};

export const updatePostAsync = (id, post) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await api.updatePost(id, post);
    dispatch(updatePost({ ...post }));
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};

export const deletePostAsync = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await api.deletePost(id);
    dispatch(deletePost(id));
    dispatch(donetLoading());
  } catch (error) {
    throw error;
  }
};
