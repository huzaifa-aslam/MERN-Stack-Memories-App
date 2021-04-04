import React, { useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
const Home = () => {
  const [currentPostId, setCurrentPostId] = useState(null);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
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
  );
};

export default Home;
