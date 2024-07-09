import Msg from "./Components/Common/Msg.jsx";
import { Messages } from "./Contexts/Messages";
import { Router } from "./Contexts/Router";
import "./Style/main.scss";

function App() {
  return (
    <Messages>
      <Msg />
      <Router />;
    </Messages>
  );
}

export default App;
