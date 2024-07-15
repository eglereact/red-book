import { useCallback, useContext, useState } from "react";
import { SERVER_URL } from "../Constants/urls";
import axios from "axios";
import { MessagesContext } from "../Contexts/Messages";

const useServerGet = (url) => {
  const [response, setResponse] = useState(null);
  const { messageError, messageSuccess } = useContext(MessagesContext);
  const doAction = useCallback(() => {
    axios
      .get(`${SERVER_URL}${url}`)
      .then((res) => {
        messageSuccess(res);
        setResponse({
          type: "success",
          serverData: res.data,
        });
      })
      .catch((error) => {
        messageError(error);
        setResponse({
          type: "error",
          serverData: error,
        });
      });
  }, [messageSuccess, messageError, url]);

  return { doAction, serverResponse: response };
};

export default useServerGet;
