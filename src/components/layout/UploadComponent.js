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
    let newFileList = [...files];

    info.fileList.forEach((newFile) => {
      const isExistFile = newFileList.some(
        (existingFile) => existingFile.uid === newFile.uid
      );

      if (!isExistFile) {
        newFileList.push(newFile);
      }
    });

    setFiles(newFileList);
  };

  const handleRemove = (file) => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };


  return (
    <Upload
      {...props}
      fileList={files.filter((file) => file.status !== "removed")}
      onChange={handleChangeFile}
      onRemove={handleRemove}
    >
      <Button icon={<UploadOutlined />}>อัปโหลดไฟล์ประเภท</Button>
    </Upload>
  );
};

export default UploadComponent;
