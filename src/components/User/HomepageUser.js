import React, { useEffect, useState } from "react";
import NavbarCom from "../layout/NavbarCom";
import TableUser from "../layout/TableUser";
import { getFileAll } from "../../functions/file";
import SearchBox from "../layout/SearchBox";

const HomepageUser = () => {
  const [dataFileAll, setdataFileAll] = useState([]);

  const tokenid = localStorage.getItem("access_token");
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getFileAll(tokenid)
      .then((fileall) => {
        setdataFileAll(fileall.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <NavbarCom />

      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-3">
          <h4>เอกสารทั้งหมดในระบบ</h4>
          <SearchBox />
        </div>
        <div>
          <TableUser dataFileAll={dataFileAll} loadData={loadData} />
        </div>
      </div>
    </>
  );
};

export default HomepageUser;
