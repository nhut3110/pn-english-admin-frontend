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

const Classes = () => {
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
  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/classes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setClasses(resp.data);
        // console.log(students);
      });
  };

  const handleStore = async (classroom) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/classes/create",
        classroom,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      getClasses();
    } catch (err) {
      console.log(err);
      // alert.show(err.message);
    }
  };

  const handleUpdate = async (classroom, id, dataUpdate) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/classes/update/${id}`,
        classroom,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      getClasses();
    } catch (err) {
      console.log(err);
      // alert.show(err.message);
    }
  };

  const handleDalete = async (id, dataDelete) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/classes/delete/${id}`,
        // classroom,
        {
          withCredentials: true,
          xsrfHeaderName: "X-XSRF-TOKEN",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      getClasses();
    } catch (err) {
      console.log(err);
      // alert.show(err.message);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Classes" />
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
              title: "T??n l???p h???c",
              field: "class_name",
              width: "30%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                // wordWrap: "break-word",
                // whiteSpace: "no-wrap",
              },
            },
            {
              title: "S??? l?????ng h???c vi??n",
              field: "total_student",
              width: "10%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                wordWrap: "break-word",
              },
            },
            {
              title: "M?? kh??a",
              field: "course_id",
              width: "10%",
              cellStyle: {
                // overflow: "scrollable",
                // width: "500px",
                wordWrap: "break-word",
              },
            },
            {
              title: "M??? l???p",
              field: "is_open",
              width: "8%",
              type: "boolean",
            },
            {
              title: "B???t ?????u l???p",
              field: "start_date",
              width: "15%",
              type: "date",
            },
            {
              title: "K???t th??c l???p",
              field: "end_date",
              width: "15%",
              type: "date",
            },
          ]}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          data={classes}
          title="Classroom DataTable"
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
            pageSizeOptions: [5, 10, 20, 30, 50, 75, 100, classes.length],
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
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
                  const dataUpdate = [...classes];
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
                  const dataDelete = [...classes];
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

export default Classes;
