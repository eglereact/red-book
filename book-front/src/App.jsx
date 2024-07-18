import DeleteModal from "./Components/Common/DeleteModal.jsx";
import Msg from "./Components/Common/Msg.jsx";
import { Messages } from "./Contexts/Messages";
import { Modals } from "./Contexts/Modals.jsx";
import { Router } from "./Contexts/Router";
import "./Style/main.scss";
import { Loader } from "./Contexts/Loader";
import LoaderContainer from "./Components/Common/Loader";
import { Auth } from "./Contexts/Auth";

function App() {
  return (
    <Auth>
      <Messages>
        <Loader>
          <Modals>
            <Msg />
            <DeleteModal />
            <LoaderContainer />
            <Router />
          </Modals>
        </Loader>
      </Messages>
    </Auth>
  );
}

export default App;
