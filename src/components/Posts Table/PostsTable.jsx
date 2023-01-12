import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddPosts from "../Add Posts/AddPosts";
import axios from "axios";
import "./PostsTable.css";
import { BsPencilSquare, BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";

function PostsTable() {
  // Hooke Model
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    await axios.get("http://127.0.0.1:8000/api/posts").then((resp) => {
      setPosts(resp.data);
      console.log(resp.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/posts/delete/${id}`,
        { withCredentials: true, xsrfHeaderName: "X-XSRF-TOKEN" }
      );
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Post__container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div id="header-content">
          <div id="header-title">
            <h2>Blog Information</h2>
          </div>
          <div id="header-button">
            <button id="to-add">
              <Link to="/editor/add">Add</Link>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive ">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title </th>
                  <th>Author</th>
                  {/* <th>Description</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((item, idx) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    {/* <td
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></td> */}
                    <td className="table__operation-list">
                      <a
                        href={`/editor/view/${item.id}`}
                        class="view"
                        title="View"
                        data-toggle="tooltip"
                        style={{ color: "#10ab80", marginRight: "5px" }}
                      >
                        <BsFillEyeFill />
                      </a>
                      <a
                        href={`/editor/edit/${item.id}`}
                        class="edit"
                        title="Edit"
                        data-toggle="tooltip"
                        style={{ marginRight: "5px" }}
                      >
                        <BsPencilSquare />
                      </a>
                      <a
                        href="#"
                        class="delete"
                        title="Delete"
                        data-toggle="tooltip"
                        style={{ color: "red", marginRight: "5px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("click delete");
                          handleDelete(item.id);
                        }}
                      >
                        <BsFillTrashFill />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsTable;
