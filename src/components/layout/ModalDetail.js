import * as React from "react";
//antd
import { Button, Modal } from "antd";
//function
import { getDownload } from "../../functions/file";
//toast
import { toast } from "react-toastify";

const ModalDetail = ({ id, files, title, content }) => {
  const [open, setOpen] = React.useState(false);
  const tokenid = localStorage.getItem("access_token");

  const handleDownload = () => {
    getDownload(tokenid, id)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}.zip`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Download !");
      });
  };
  return (
    <React.Fragment key={id}>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(!open)}>
        ดูรายละเอียด
      </Button>

      <Modal
        title="รายละเอียด"
        open={open}
        onOk={handleDownload}
        onCancel={() => setOpen(!open)}
      >
        <p>หัวข้อ : {title}</p>
        <p>เนื้อหา : {content}</p>
        {Object.keys(files).map((key, index) => (
          <div key={index}>
            <h5 className="mt-2" key={index}>
              บทที่{index + 1}:
            </h5>
            <div className="list-group">
              {files[key].map((item, index) => (
                <a
                  href={process.env.REACT_APP_SERVER_API + "/download/" + item}
                  className="list-group-item list-group-item-action"
                  key={index}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </Modal>
    </React.Fragment>
  );
};

export default ModalDetail;
