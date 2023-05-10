import React from "react";
import { Button, Modal } from "antd";
//antd upload
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const UploadComponent = ({ props }) => {

  const handleUpload = (file) => {
    console.log(file);
  };


  return (
    <Upload
      {...props}
    >
      <Button icon={<UploadOutlined />}>อัปโหลดไฟล์ประเภท {props.name}</Button>
    </Upload>
  );
};

export default UploadComponent;
