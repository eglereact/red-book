import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div id="wrapper">
      {/* <!-- Main --> */}
      <div id="main">
        <div className="inner">
          {/* <!-- Header --> */}
          <Header />

          {children}
        </div>
      </div>
      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}
