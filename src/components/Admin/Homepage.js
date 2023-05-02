import React, { useState } from "react";
//Layout
import NavbarCom from "./../layout/NavbarCom";
import TableAdmin from "../layout/TableAdmin";
//mui
import { Button } from "@mui/material";

//mui joy
import {
  Modal,
  Button as ButtonJoy,
  ModalClose,
  Typography,
  Sheet,
  ModalDialog,
} from "@mui/joy";
import ModalCreateFile from "../layout/ModalCreateFile";

const Homepage = () => {


  return (
    <>
      <NavbarCom />

      <div className="container mt-5">
        <div className="d-flex flex-row-reverse mb-3">
          <ModalCreateFile />
        </div>
        <div>
          <TableAdmin />
        </div>
      </div>
    </>
  );
};

export default Homepage;
