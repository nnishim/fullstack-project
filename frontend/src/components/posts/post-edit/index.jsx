import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import styles from "./styles.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useLocation, useNavigate } from "react-router-dom";

const PostEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [initialValues, setInitialValues] = useState({
    author: "",
    title: "",
    content: "",
    picture: "",
  });

  useEffect(() => {
    axios
      .get(`/api/posts/${postId}`)
      .then((response) => {
        setInitialValues({
          author: response.data.author,
          title: response.data.title,
          content: response.data.content,
          picture: response.data.picture,
        });
        setIsLoaded(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  useEffect(() => {
    setAuthor(initialValues.author);
    setTitle(initialValues.title);
    setContent(initialValues.content);
    setPicture(initialValues.picture);
  }, [initialValues]);

  const [author, setAuthor] = useState(initialValues.author);
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [picture, setPicture] = useState(initialValues.picture);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("author", author);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("picture", picture);

    axios
      .put(`/api/posts/${postId}`, formData)
      .then((response) => {
        console.log(response);
        navigate("/posts");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isLoaded ? (
        <Backdrop
          open={!isLoaded}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className={styles.wrap}>
          <Button
            disableElevation
            variant="contained"
            sx={{
              backgroundColor: "#009688",
              "&:hover": { backgroundColor: "#00695c" },
              position: "absolute",
              top: "20px",
              left: "20px",
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewIcon />
            Go back
          </Button>
          <h1>Редактирование поста</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              className={styles.form_field}
              required
              id="author"
              label="Автор"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              className={styles.form_field}
              required
              id="title"
              label="Заголовок"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              className={styles.form_field}
              required
              id="content"
              label="Содержание"
              variant="outlined"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className={styles.file_input__block}>
              <input
                accept="image/*"
                className={styles.file_input}
                id="picture"
                type="file"
                onChange={(e) => setPicture(e.target.files[0])}
              />
              <label htmlFor="picture" className={styles.file_input__label}>
                Загрузить изображение
              </label>
            </div>
            {typeof picture === "string" && (
              <div className={styles.image_preview__block}>
                <img
                  className={styles.image_preview}
                  src={`../../../../../backend/static/${picture}`}
                  alt="Selected file preview"
                />
              </div>
            )}
            {picture && picture instanceof Blob && (
              <div className={styles.image_preview__block}>
                <img
                  className={styles.image_preview}
                  src={URL.createObjectURL(picture)}
                  alt="Selected file preview"
                />
              </div>
            )}
            <Button
              className={styles.submit_button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Добавить
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default PostEdit;
