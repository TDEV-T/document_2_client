import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
//antd upload
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const UploadComponent = ({ props, file }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setFileListonLoad();
  }, []);

  const setFileListonLoad = () => {
    const fileToList = file.map((filenames) => ({
      uid: filenames,
      name: filenames,
      status: "done",
    }));

    setFiles(fileToList);
  };

  const handleChangeFile = async (info) => {
    if (info.file.status === "done") {
      setFileListonLoad();
    }

    console.log(info);
  };

  return (
    <Upload {...props} fileList={files} onChange={handleChangeFile}>
      <Button icon={<UploadOutlined />}>อัปโหลดไฟล์ประเภท</Button>
    </Upload>
  );
};

export default UploadComponent;
