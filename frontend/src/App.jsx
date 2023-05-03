import Posts from "./components/posts";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PostItem from "./components/posts/post-item";
import PostCreate from "./components/posts/post-create";
import PostEdit from "./components/posts/post-edit";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/posts");
    }
  }, []);

  return (
    <>
      <div className="container">
        <Routes>
          <Route path="posts" element={<Posts />} />
          <Route path="/create-post" element={<PostCreate />} />
          <Route path="posts/:id" element={<PostItem />} />
          <Route path="edit/:id" element={<PostEdit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
