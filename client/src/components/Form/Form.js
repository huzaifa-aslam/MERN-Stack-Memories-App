import React, { useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPostsAsync } from "../../store/reducers/posts";
const INITIAL_STATE = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};
const Form = () => {

  const [formData, setFormData] = useState({ ...INITIAL_STATE });
  const classes = useStyles();
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(createPostsAsync(formData))
  };
 

  const handleChange = (e) => {
      console.log(e.target.value);
    setFormData((prevField) => ({
      ...prevField,
      [e.target.name]: e.target.value,
    }));
  };

  const clear = () => {

  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={formData.creator}
          onChange={handleChange}
        />
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
        >Submit</Button>
          <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;