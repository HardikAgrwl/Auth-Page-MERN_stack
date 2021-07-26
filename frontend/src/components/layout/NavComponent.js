import { Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <nav className="z-depth-0">
      <div className="nav-wrapper blue accent-2">
        <Link
          to="/"
          style={{
            fontFamily: "monospace",
          }}
          className="col s5 brand-logo center white-text"
        >
          <i className="material-icons">code</i>
          <b>MERN</b>
        </Link>
      </div>
    </nav>
  );
};

export default NavComponent;
