import React, { useState } from "react";
//mui joy
import {
  Modal,
  Button as ButtonJoy,
  ModalClose,
  Typography,
  Sheet,
  ModalDialog,
} from "@mui/joy";
//toast
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { createUpload } from "../../functions/file";

const ModalCreateFile = () => {
  const id = localStorage.getItem("access_token");

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(!openModal);
  const [file, setFile] = useState({
    header: "",
    content: "",
  });

  const [upload, setUploads] = useState({
    file1: {},
    file2: {},
    file3: {},
    file4: {},
    file5: {},
  });
  const uploads = Object.entries(upload);

  const handleChangeFile = (e) => {
    setUploads({ ...upload, [e.target.name]: e.target.files });
  };

  const handleChange = (e) => {
    setFile({ ...file, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    const formData = new FormData();

    uploads.forEach(([key, value]) => {
      const fileArray = Array.from(value);
      fileArray.forEach((file) => {
        formData.append(key, file);
      });
    });

    formData.append("content", file.content);
    formData.append("header", file.header);

    createUpload(id, formData)
      .then((res) => {
        toast.success("Create Success !");
        document.getElementById("formCreate").reset();
      })
      .catch((err) => toast.error("Create Failed !"));
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create{" "}
      </Button>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModal}
        onClose={handleOpen}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 500,
            maxWidth: 750,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            เพิ่มงานชิ้นใหม่
          </Typography>
          <form id="formCreate" onSubmit={handleSubmit}>
            <Typography id="modal-desc" textColor="text.tertiary">
              หัวข้อ
              <input
                className="form-control mb-2"
                type="text"
                name="header"
                onChange={handleChange}
                required
              />
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              บทคัดย่อ
              <textarea
                className="form-control mb-2"
                type="text"
                name="content"
                onChange={handleChange}
                required
              ></textarea>
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              เอกสารบทที่ 1
              <input
                className="form-control mb-2"
                type="file"
                multiple
                name="file1"
                onChange={handleChangeFile}
                required
              />
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              เอกสารบทที่ 2
              <input
                className="form-control mb-2"
                type="file"
                multiple
                name="file2"
                onChange={handleChangeFile}
                required
              />
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              เอกสารบทที่ 3
              <input
                className="form-control mb-2"
                type="file"
                multiple
                name="file3"
                onChange={handleChangeFile}
                required
              />
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              เอกสารบทที่ 4
              <input
                className="form-control mb-2"
                type="file"
                multiple
                name="file4"
                onChange={handleChangeFile}
                required
              />
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              เอกสารบทที่ 5
              <input
                className="form-control mb-2"
                type="file"
                multiple
                name="file5"
                onChange={handleChangeFile}
                required
              />
            </Typography>
            <div className="mt-2">
              <Button variant="contained" type="submit">
                เพิ่ม
              </Button>
            </div>
          </form>
        </Sheet>
      </Modal>
    </div>
  );
};

export default ModalCreateFile;
