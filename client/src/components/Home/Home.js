import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
  AppBar,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Paginate from "./../Pagination";
import useStyles from "./styles";
import { getPostsBySearch } from "./../../store/reducers/posts";
import { useDispatch } from "react-redux";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const history = useHistory();
  const classes = useStyles();
  const [currentPostId, setCurrentPostId] = useState(null);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleKeyPress = (e) => {
    searchPost();
    // if (e.keyCode === 13) {
    // }
  };
  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={12} md={9}>
            <Posts
              currentPostId={currentPostId}
              setCurrentPostId={setCurrentPostId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onChange={handleSearch}
                value={search}
                name="search"
                variant="outlined"
                fullWidth
                label="Search Memories"
              />
              <Button
                onClick={handleKeyPress}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form
              currentPostId={currentPostId}
              setCurrentPostId={setCurrentPostId}
            />
            <Paper>
              <Paginate elevation={6} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
