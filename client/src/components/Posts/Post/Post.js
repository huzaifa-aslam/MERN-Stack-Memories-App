import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoriHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePostAsync } from "../../../store/reducers/posts";

const Post = ({ post, currentPostId, setCurrentPostId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentPostId(post._id);
          }}
        >
          <MoriHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags && post.tags?.map((tag) => `# ${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpIcon fontSize="small" />
          Like
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(deletePostAsync(post._id));
          }}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
