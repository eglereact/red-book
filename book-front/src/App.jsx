import DeleteModal from "./Components/Common/DeleteModal.jsx";
import Msg from "./Components/Common/Msg.jsx";
import { Messages } from "./Contexts/Messages";
import { Modals } from "./Contexts/Modals.jsx";
import { Router } from "./Contexts/Router";
import "./Style/main.scss";

function App() {
  return (
    <Messages>
      <Modals>
        <Msg />
        <DeleteModal />
        <Router />
      </Modals>
    </Messages>
  );
}

export default App;
