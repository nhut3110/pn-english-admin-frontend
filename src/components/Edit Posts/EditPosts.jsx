import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./EditPosts.css";
import parse from "html-react-parser";

const EditPosts = () => {
  const id = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const [isError, setError] = useState(null);
  const [post, setPost] = useState({});
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
    displayOnChange(value);
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/posts/" + id);
        console.log(res);
        setPost(res.data);
        setuserInfo({
          ...userInfo,
          description: res.data.description.toString(),
        });
        displayOnChange(res.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      const res = await axios.put(
        "http://127.0.0.1:8000/api/posts/update/" + id,
        {
          title: userInfo.title === "" ? post.title : userInfo.title,
          description:
            userInfo.description === ""
              ? post.description
              : userInfo.description,
          author: userInfo.author === "" ? post.author : userInfo.author,
        },
        { withCredentials: true, xsrfHeaderName: "X-XSRF-TOKEN" }
      );
      console.log(res.data);
      setTimeout(() => {
        navigate("/editor");
      }, 200);
    } catch (error) {
      throw error;
    }
  };

  //   console.log(res.title)

  const displayOnChange = (value) => {
    console.log(value);
    const temp = document.getElementById("preview-content");
    if (temp) {
      temp.remove();
    }
    const content = document.createElement("div");
    content.innerHTML = value;
    content.id = "preview-content";
    document.getElementById("post-content").appendChild(content);
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
        <h3>Edit Post</h3>
        <button id="to-submit" type="button">
          <Link to="/editor">Back</Link>
        </button>
      </div>
      <form onSubmit={addDetails} id="input_group">
        <div className="question">
          <label className="title_question">
            {" "}
            Title<span className="required"> * </span>{" "}
          </label>
          <input
            type="text"
            name="title"
            className="input_info"
            value={userInfo.title}
            onChange={onChangeValue}
            placeholder={post.title}
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
            placeholder={post.author}
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
            placeholder={userInfo.description}
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
      <div style={{ padding: "10px" }}>
        <h2>Preview</h2>
        <div>
          <div className="box shadow-lg p-3 bg-body rounded">
            <div
              id="post-content"
              style={{ padding: "10px" }} // dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditPosts;
