import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsAsync } from "../../store/reducers/posts";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
const Posts = ({ currentPostId, setCurrentPostId }) => {
  const { posts, isLoading } = useSelector((state) => {
    return state.posts;
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPostsAsync());
    }
  }, [dispatch, posts]);
  if (!posts.length && !isLoading) {
    return "no posts found";
  }
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post
                post={post}
                currentPostId={currentPostId}
                setCurrentPostId={setCurrentPostId}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
