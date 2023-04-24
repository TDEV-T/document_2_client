import axios from "axios";

export const currentUser = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_SERVER_API + "/currentUser",
    authtoken
  );
