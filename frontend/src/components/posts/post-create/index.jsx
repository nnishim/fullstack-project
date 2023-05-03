import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import styles from "./styles.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const PostCreate = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("author", author);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("picture", picture);

    axios
      .post("/api/posts", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/posts");
    setAuthor("");
    setTitle("");
    setContent("");
    setPicture("");
  };

  return (
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
      <h1>Добавить новый пост</h1>
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
        {picture && (
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
  );
};

export default PostCreate;
