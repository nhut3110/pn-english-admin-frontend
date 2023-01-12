import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
} from "../Editor Toolbar/EditorToolbar";
import { ReactQuillImageUploader } from "react-quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AddPosts.css";

function AddPosts() {
  const navigate = useNavigate();
  const quillRef = useRef();
  const [userInfo, setuserInfo] = useState({
    title: "",
    description: "",
    author: "",
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeAuthor = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.author]: e.target.value,
    });
  };
  const ondescription = (value) => {
    setuserInfo({ ...userInfo, description: value });
  };

  const [isError, setError] = useState(null);
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if (userInfo.description.length < 10) {
        setError("Required, Add description minimum length 10 characters");
        return;
      }
      const res = await axios.post(
        "http://127.0.0.1:8000/api/posts/create",
        {
          title: userInfo.title,
          description: userInfo.description,
          author: userInfo.author,
        },
        { withCredentials: true, xsrfHeaderName: "X-XSRF-TOKEN" }
      );
      console.log(res.data);
      console.log({
        title: userInfo.title,
        description: userInfo.description,
        author: userInfo.author,
      });
      setTimeout(() => {
        navigate("/editor");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(
          "http://127.0.0.1:8000/api/images/upload",
          formData
        ); // upload data into server or aws or cloudinary
        const url = res.data.url;
        console.log(url);
        editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        console.log("You could only upload images.");
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <div>
      <div className="header">
        <h3>Add Post</h3>
        <button id="to-submit" type="button">
          <Link to="/editor">Back</Link>
        </button>
      </div>
      <form onSubmit={addDetails} id="input_group">
        <div className="question">
          <label className="title_question">
            {" "}
            Title <span className="required"> * </span>{" "}
          </label>
          <input
            type="text"
            name="title"
            className="input_info"
            value={userInfo.title}
            onChange={onChangeValue}
            placeholder="Title"
            required
          />
        </div>
        <div className="question">
          <label className="title_question">
            {" "}
            Author <span className="required"> * </span>{" "}
          </label>
          <input
            type="text"
            name="author"
            className="input_info"
            value={userInfo.author}
            onChange={onChangeValue}
            placeholder="Author"
            required
          />
        </div>
        <div className="question">
          <label className="title_question">
            {" "}
            Description <span className="required"> * </span>{" "}
          </label>
          <EditorToolbar toolbarId={"t1"} />
          <ReactQuill
            theme="snow"
            value={userInfo.description}
            onChange={ondescription}
            placeholder={"Write something ..."}
            // modules={modules("t1")}
            modules={modules}
            // formats={formats}
            ref={quillRef}
          />
        </div>
        <br />
        {isError !== null && <div className="errors"> {isError} </div>}
        <div className="question-button">
          <button id="to-submit" type="submit">
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddPosts;
