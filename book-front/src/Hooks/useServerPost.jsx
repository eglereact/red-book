import { useState } from "react";
import { SERVER_URL } from "../Constants/urls";
import axios from "axios";

const useServerPost = (url) => {
  const [response, setResponse] = useState(null);
  const doAction = (data) => {
    axios
      .post(`${SERVER_URL}${url}`, data)
      .then((res) => {
        setResponse({
          type: "success",
          data: res.data,
        });
      })
      .catch((error) =>
        setResponse({
          type: "error",
          data: error,
        })
      );
  };

  return { doAction, response };
};

export default useServerPost;
