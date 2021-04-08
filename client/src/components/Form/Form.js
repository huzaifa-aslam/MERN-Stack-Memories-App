import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { createPostsAsync, updatePostAsync } from "../../store/reducers/posts";
const INITIAL_STATE = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};
const Form = ({ currentPostId, setCurrentPostId }) => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });
  const user = JSON.parse(localStorage.getItem("profile"));
  const { posts } = useSelector((state) => {
    return state.posts;
  });
  useEffect(() => {
    if (posts && currentPostId) {
      const findPost = posts.find((post) => post._id === currentPostId);
      setFormData(findPost);
    }
  }, [posts, currentPostId]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const convertTagsIntoArray = formData.tags.split(" ");
    const updatedFormData = {
      ...formData,
      tags: convertTagsIntoArray,
    };
    if (currentPostId) {
      dispatch(
        updatePostAsync(currentPostId, {
          ...updatedFormData,
          name: user?.result?.name,
        })
      );
    } else {
      dispatch(
        createPostsAsync({ ...updatedFormData, name: user?.result?.name })
      );
    }
    clear();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData((prevField) => ({
      ...prevField,
      [e.target.name]: e.target.value,
    }));
  };

  const clear = () => {
    setCurrentPostId(null);
    setFormData({ ...INITIAL_STATE });
  };
  if (!user?.result?.name) {
    return (
      <Paper classes={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in first to create your own memories or like other's
          memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentPostId ? "Updating a Memory" : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={formData.message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={formData.tags}
          onChange={handleChange}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setFormData({ ...formData, selectedFile: base64 })
            }
          ></FileBase>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
