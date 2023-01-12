import React from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import { useState, useEffect, useRef } from "react";
import { forwardRef } from "react";
import { Header } from "../components";
import axios from "axios";
import TokenService from "../services/token.service";

const Courses = () => {
  const token = TokenService.getLocalAccessToken();
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => (
      <DeleteOutline {...props} ref={ref} style={{ color: "red" }} />
    )),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => (
      <Edit {...props} ref={ref} style={{ color: "orange" }} />
    )),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setCourses(resp.data);
        // console.log(students);
      });
  };

  const handleStore = async (course) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/courses/create",
        course,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      // setCourses([...course]);
      getCourses();
      alert.show(res.data.message);
    } catch (err) {
      console.log(err);
      // alert.show(err.message);
    }
  };

  const handleUpdate = async (course, id, dataUpdate) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/courses/update/${id}`,
        course,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      // setCourses([...dataUpdate]);
      getCourses();
      alert.show(res.data.message);
    } catch (err) {
      console.log(err);
      // alert.show(err.message);
    }
  };

  const handleDalete = async (id, dataDelete) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/courses/delete/${id}`,
        // course,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      // setCourses([...dataDelete]);
      getCourses();
      alert.show(res.data.message);
    } catch (err) {
      console.log(err);
      // alert.show(err.message);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Courses" />
      <div
        className="table__container"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <MaterialTable
          style={{ width: "95%" }}
          icons={tableIcons}
          columns={[
            { title: "ID", field: "id", width: "6%", editable: "never" },
            {
              title: "Tên khóa học",
              field: "course_name",
              // width: "12%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                // wordWrap: "break-word",
                // whiteSpace: "no-wrap",
              },
            },
            {
              title: "Số lượng lớp",
              field: "total_class",
              // width: "8%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                wordWrap: "break-word",
              },
            },
            {
              title: "Số lớp trống",
              field: "available_class",
              // width: "10%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                wordWrap: "break-word",
              },
            },
            {
              title: "Ghi chú",
              field: "description",
              cellStyle: {
                // overflow: "hidden",
                // width: "500px",
                // wordWrap: "break-word",
              },
              // width: "20%",
            },
          ]}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          data={courses}
          title="Course DataTable"
          options={{
            tableLayout: "fixed",
            filtering: true,
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
              fontWeight:
                selectedRow === rowData.tableData.id ? "600" : "normal",
            }),
            exportButton: true,
            pageSizeOptions: [5, 10, 20, 30, 50, 75, 100, courses.length],
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(newData);
                  handleStore(newData);
                  resolve();
                  // window.location.reload();
                }, 500);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...courses];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  handleUpdate(newData, newData.id, dataUpdate);
                  // console.log(newData.id);
                  resolve();
                }, 500);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...courses];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  handleDalete(oldData.id, dataDelete);
                  // setData([...dataDelete]);

                  resolve();
                }, 500);
              }),
          }}
        />
      </div>
    </div>
  );
};

export default Courses;
