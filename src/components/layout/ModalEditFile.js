import * as React from "react";
//antd
import { Button, Modal, message } from "antd";
//function
import { getDownload } from "../../functions/file";
//toast
import { toast } from "react-toastify";
import UploadComponent from "./UploadComponent";
//antd upload

const tokenid = localStorage.getItem("access_token");

const ModalEditFile = ({ id, files, title, content }) => {
  const [open, setOpen] = React.useState(false);
  const uploadProps = [
    {
      name: "file",
      action: process.env.REACT_APP_SERVER_API + "/editFileImg",
      headers: {
        authtoken: tokenid,
      },
      data: {
        type: "file1",
        id: id,
      },
    },
    {
      name: "file",
      action: process.env.REACT_APP_SERVER_API + "/editFileImg",
      headers: {
        authtoken: tokenid,
      },
      data: {
        type: "file2",
        id: id,
      },
    },
    {
      name: "file",
      action: process.env.REACT_APP_SERVER_API + "/editFileImg",
      headers: {
        authtoken: tokenid,
      },
      data: {
        type: "file3",
        id: id,
      },
    },
    {
      name: "file",
      action: process.env.REACT_APP_SERVER_API + "/editFileImg",
      headers: {
        authtoken: tokenid,
      },
      data: {
        type: "file4",
        id: id,
      },
    },
    {
      name: "file",
      action: process.env.REACT_APP_SERVER_API + "/editFileImg",
      headers: {
        authtoken: tokenid,
      },
      data: {
        type: "file5",
        id: id,
      },
    },
  ];

  const [fileDe, setFilesDe] = React.useState({
    title: title,
    content: content,
  });

  const handleChangeFile = (e) => {
    setFilesDe({ ...fileDe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {};

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(!open)}>
        จัดการ
      </Button>

      <Modal
        title="รายละเอียด"
        open={open}
        onOk={() => setOpen(!open)}
        onCancel={() => setOpen(!open)}
      >
        <form>
          <h5>
            หัวข้อ :{" "}
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleChangeFile}
              value={fileDe.title}
              required
            />
          </h5>
          <h5>
            เนื้อหา :{" "}
            <input
              type="text"
              className="form-control"
              name="content"
              onChange={handleChangeFile}
              required
              value={fileDe.content}
            />
          </h5>

          {uploadProps.map((props, index) => (
            <div key={index}>
              <h6 className="mt-2">บทที่ {index + 1}</h6>
              <UploadComponent props={props} file={files[`file${index + 1}`]} />
            </div>
          ))}
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ModalEditFile;
