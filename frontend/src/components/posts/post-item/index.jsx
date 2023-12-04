import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModeEdit } from '@mui/icons-material';
import Popup from '../../popup';

const PostItem = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split('/')[2];
  const [showPopup, setShowPopup] = React.useState(false);
  const [idOfCompanyToDelete, setIdOfCompanyToDelete] = React.useState('');

  useEffect(() => {
    axios
      .get(`/api/posts/${postId}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, [postId]);

  const handleEditClick = () => {
    navigate(`/edit/${postId}`);
  };

  function deletePost(id) {
    if (id) {
      setShowPopup(true);
      setIdOfCompanyToDelete(id);
    }
  }

  const confirmToDeleteCompany = () => {
    axios
      .delete(`/api/posts/${idOfCompanyToDelete}`)
      .then(() => {
        navigate('/posts');
      })
      .catch((error) => console.error(error));
    setShowPopup(false);
  };

  if (showPopup) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }

  return (
    <>
      {!data ? (
        <Backdrop
          open={!data}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>
          <Popup
            noButton={() => setShowPopup(false)}
            yesButton={() => confirmToDeleteCompany()}
            setShow={setShowPopup}
            show={showPopup}
            text="Вы действительно хотите удалить пост?"
          />
          <div className={styles.wrap}>
            <Button
              disableElevation
              variant="contained"
              sx={{
                backgroundColor: '#009688',
                '&:hover': { backgroundColor: '#00695c' },
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosNewIcon />
              Go back
            </Button>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: 16 }}>
              <img
                src={`../../../../../backend/static/${
                  data.picture
                }?${new Date().getTime()}`}
                alt="post"
                style={{ width: '100%', marginBottom: 16, objectFit: 'cover' }}
              />
              <Typography variant="h5" gutterBottom>
                {data.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                by {data.author}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {data.content}
              </Typography>
              <Typography variant="body1">{data.body}</Typography>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 16,
                }}
              >
                <Button
                  disableElevation
                  variant="contained"
                  color="primary"
                  onClick={handleEditClick}
                  style={{ marginRight: 8 }}
                >
                  <ModeEdit />
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  color="secondary"
                  onClick={() => deletePost(postId)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;
