import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Backdrop,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const PostsList = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {!data ? (
        <Backdrop
          open={!data}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>
          <Grid
            container
            spacing={{ xsz: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data.map((post, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Link to={post._id}>
                  <Card className={styles.card}>
                    <CardMedia
                      component="img"
                      alt="post image"
                      height="300"
                      image={`../../../../../backend/static/${
                        post.picture
                      }?${new Date().getTime()}`}
                    />
                    <CardContent sx={{ height: "100%" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {post.author}
                      </Typography>
                      <Typography
                        className={styles.desc}
                        variant="body2"
                        color="text.secondary"
                      >
                        {post.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default PostsList;
