import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const SearchBox = ({ data, setData, loadData }) => {
  const [query, setQuery] = useState("");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
    timeZone: "Asia/Bangkok",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredData = data.filter((item) => {
      const createAtDate = item.createdAt ? new Date(item.createdAt) : null;
      const createAtString = createAtDate
        ? createAtDate.toLocaleString("th-TH", options)
        : "";
      const lowerCaseQuery = query.toLowerCase();
      const lowerCaseFileName = item.title.toLowerCase() || "";
      const lowerCaseContent = item.content.toLowerCase() || "";

      return (
        lowerCaseFileName.includes(lowerCaseQuery) ||
        lowerCaseContent.includes(lowerCaseQuery) ||
        createAtString.includes(lowerCaseQuery)
      );
    });

    console.log(filteredData);
    setData(filteredData);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setQuery("");
    loadData();
    setData(data);
  };
  return (
    <div>
      <TextField
        label="ค้นหา"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        ค้นหา
      </Button>
      <Button variant="contained" onClick={handleClear}>
        ล้าง
      </Button>
    </div>
  );
};

export default SearchBox;
