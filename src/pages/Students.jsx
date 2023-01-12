import React from "react";
import { useState, useEffect, useRef } from "react";
import { forwardRef } from "react";
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
import axios from "axios";
import { Header } from "../components";
import TokenService from "../services/token.service";
const Students = () => {
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

  const [students, setStudents] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const getStudents = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setStudents(resp.data);
        // console.log(students);
      });
  };

  const handleStore = async (student) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/students/create",
        student,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      getStudents();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (student, id, dataUpdate) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/students/update/${id}`,
        student,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      getStudents();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDalete = async (id, dataDelete) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/students/delete/${id}`,
        // student,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      getStudents();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
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
              title: "Họ và Tên",
              field: "full_name",
              width: "12%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                // wordWrap: "break-word",
                // whiteSpace: "no-wrap",
              },
            },
            {
              title: "Số điện thoại",
              field: "student_phone",
              width: "8%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                wordWrap: "break-word",
              },
            },
            {
              title: "Email",
              field: "student_email",
              width: "10%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                wordWrap: "break-word",
              },
            },
            {
              title: "Số điện thoại phụ huynh",
              field: "parent_phone",
              width: "10%",
            },
            { title: "Tuổi", field: "age", width: "5%" },
            { title: "Địa chỉ", field: "address", width: "15%" },
            {
              title: "Ghi chú",
              field: "description",
              cellStyle: {
                // overflow: "hidden",
                // width: "500px",
                // wordWrap: "break-word",
              },
              width: "20%",
            },
            {
              title: "Mã Lớp",
              field: "current_class_id",
              width: "5%",
              type: "numeric",
            },
            {
              title: "Đóng học phí",
              field: "is_paid",
              width: "5%",
              type: "boolean",
            },
            {
              title: "Bắt đầu học",
              field: "start_date",
              width: "8%",
              type: "date",
            },
            {
              title: "Kết thúc học",
              field: "end_date",
              width: "8%",
              type: "date",
            },
            // {
            //   title: "Created at",
            //   field: "created_at",
            //   width: "5%",
            //   cellStyle: {
            //     // overflow: "scrollable",
            //     // width: "500px",
            //     wordWrap: "break-word",
            //   },
            //   editable: "never",
            //   type: "dateTime",
            // },
            // {
            //   title: "Updated at",
            //   field: "updated_at",
            //   width: "5%",
            //   cellStyle: {
            //     // overflow: "scrollable",
            //     // width: "500px",
            //     wordWrap: "break-word",
            //   },
            //   editable: "never",
            //   type: "dateTime",
            // },
          ]}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          data={students}
          title="Student DataTable"
          options={{
            grouping: true,
            tableLayout: "fixed",
            filtering: true,
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
              fontWeight:
                selectedRow === rowData.tableData.id ? "600" : "normal",
            }),
            exportButton: true,
            pageSizeOptions: [5, 10, 20, 30, 50, 75, 100, students.length],
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  // setStudent();
                  // newData.start_date = Moment(newData.start_date).format(
                  //   "YYYY-MM-DD"
                  // );
                  // newData.end_date = Moment(newData.end_date).format(
                  //   "YYYY-MM-DD"
                  // );
                  newData.start_date =
                    newData.start_date.getFullYear() +
                    "-" +
                    (newData.start_date.getUTCMonth() + 1) +
                    "-" +
                    newData.start_date.getDate();

                  newData.end_date =
                    newData.end_date.getFullYear() +
                    "-" +
                    (newData.end_date.getUTCMonth() + 1) +
                    "-" +
                    newData.end_date.getDate();
                  // console.log(
                  //   newData.start_date.getFullYear() +
                  //     "-" +
                  //     (newData.start_date.getUTCMonth() + 1) +
                  //     "-" +
                  //     newData.start_date.getDate()
                  // );
                  console.log(newData);
                  handleStore(newData);
                  resolve();
                  // window.location.reload();
                }, 500);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (newData.start_date !== oldData.start_date) {
                    newData.start_date =
                      newData.start_date.getFullYear() +
                      "-" +
                      (newData.start_date.getUTCMonth() + 1) +
                      "-" +
                      newData.start_date.getDate();
                  } else {
                  }
                  if (newData.end_date !== oldData.end_date) {
                    newData.end_date =
                      newData.end_date.getFullYear() +
                      "-" +
                      (newData.end_date.getUTCMonth() + 1) +
                      "-" +
                      newData.end_date.getDate();
                  }
                  const dataUpdate = [...students];
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
                  const dataDelete = [...students];
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

export default Students;
