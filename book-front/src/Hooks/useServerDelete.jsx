import { useContext, useState } from "react";
import { SERVER_URL } from "../Constants/urls";
import axios from "axios";
import { MessagesContext } from "../Contexts/Messages";

const useServerDelete = (url) => {
  const [response, setResponse] = useState(null);
  const { messageError, messageSuccess } = useContext(MessagesContext);
  const doAction = (data) => {
    axios
      .delete(`${SERVER_URL}${url}/${data.id}`)
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

export default useServerDelete;
