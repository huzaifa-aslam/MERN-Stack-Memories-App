import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsAsync } from "../../store/reducers/posts";
import useStyles from "./styles";
const Posts = () => {
  const { posts } = useSelector((state) => {
    return state.posts;
  });
  console.log("posts", posts);

  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!posts) {
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
