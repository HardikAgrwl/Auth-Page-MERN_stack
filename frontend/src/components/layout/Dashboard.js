import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import setAuthToken from "../../utils/setAuthToken";
import { ToastComponent, toastConfig } from "../layout/toastComponent";

const Dashboard = ({ user, setUser }) => {
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    //delete jwt token from localstorage
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    setUser({ ...user, isAuthenticated: false, userDetail: {} });
    //show success toast notification
    toast.success("Logged out Successfully", toastConfig);
    history.push("/");
  };

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <ToastComponent />
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hey there,</b> {user.name.split(" ")[0]}
            <p className="flow-text grey-text text-darken-1">
              You are logged into a full-stack{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
            </p>
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={logoutHandler}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
