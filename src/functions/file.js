import axios from "axios";

export const createUpload = async (authtoken, formData) =>
  await axios.post(process.env.REACT_APP_SERVER_API + "/fileupload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authtoken,
    },
  });