import * as React from "react";
//antd

import { Button, Modal } from "antd";

const ModalDetail = ({ files, title, content }) => {
  const [open, setOpen] = React.useState(false);
  console.log(files);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        ดูรายละเอียด
      </Button>
      
    </React.Fragment>
  );
};

export default ModalDetail;
