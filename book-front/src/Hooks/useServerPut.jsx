import { useContext, useState } from "react";
import { SERVER_URL } from "../Constants/urls";
import axios from "axios";
import { MessagesContext } from "../Contexts/Messages";

const useServerPut = (url) => {
  const [response, setResponse] = useState(null);
  const { messageError, messageSuccess } = useContext(MessagesContext);
  const doAction = (data) => {
    axios
      .put(`${SERVER_URL}${url}/${data.id}`, data)
      .then((res) => {
        messageSuccess(res);
        setResponse({
          type: "success",
          data: res.data,
        });
      })
      .catch((error) => {
        messageError(error);
        setResponse({
          type: "error",
          serverData: error,
        });
      });
  };

  return { doAction, serverResponse: response };
};

export default useServerPut;
