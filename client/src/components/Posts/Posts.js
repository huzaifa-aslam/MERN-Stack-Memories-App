import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsAsync } from "../../store/reducers/posts";
import useStyles from "./styles";
const Posts = () => {
  const { posts } = useSelector((state) => {
    return state.posts;
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPostsAsync());
    }
  }, [dispatch, posts]);
  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
