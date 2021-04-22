import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsAsync } from "../../store/reducers/posts";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
const Posts = ({ currentPostId, setCurrentPostId }) => {
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
      {posts?.length ? (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post
                post={post}
                currentPostId={currentPostId}
                setCurrentPostId={setCurrentPostId}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        "No posts found"
      )}
    </>
  );
};

export default Posts;
