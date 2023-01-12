import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "./ViewPost.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewPost = () => {
  const id = useLocation().pathname.split("/")[3];
  const [post, setPost] = useState("");
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/posts/" + id);
        console.log(res);
        setPost(res.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  return (
    <div>
      <div className="header">
        <h3>Post Preview</h3>
      </div>
      <div
        className="box shadow-lg p-3 bg-body rounded"
        dangerouslySetInnerHTML={{ __html: post }}
      ></div>
      <div className="question-button">
        <button id="to-submit" type="submit">
          <Link to="/editor">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
