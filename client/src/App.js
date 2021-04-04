import React, { useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import NavBar from "./components/NavBar/NavBar";
import useStyles from "./styles";
const App = () => {
  const [currentPostId, setCurrentPostId] = useState(null);
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <NavBar/>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContaier}
          >
            <Grid item xs={12} sm={7}>
              <Posts
                currentPostId={currentPostId}
                setCurrentPostId={setCurrentPostId}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form
                currentPostId={currentPostId}
                setCurrentPostId={setCurrentPostId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
