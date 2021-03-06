import React from "react";
import { Link } from "react-router-dom";
import "../Supports/Stylesheets/Navbar.css";
import { CreatePost } from "./CreatePost";
// Redux
import { connect } from "react-redux";
import {
  onUserLogin,
  onCheckUserLogin,
  onUserLogout,
  onCheckUserVerify,
} from "./../Redux/Actions/userAction";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLogedIn: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  componentDidMount() {
    this.props.onCheckUserLogin();
    this.onCheckIsLogedIn();
  }

  onCheckIsLogedIn = () => {
    let token = localStorage.getItem("myTkn");

    if (token) {
      this.setState({ isLogedIn: true });
    }
  };

  onBtnLogOutClick = () => {
    this.props.onUserLogout();
  };

  render() {
    if (localStorage.getItem("myTkn")) {
      return (
        <div
          className="container-fluid"
          style={{
            position: "fixed",
            zIndex: "2",
            width: "100%",
            background: "white",
          }}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="d-flex mx-5">
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <h3
                    style={{ fontSize: "40px" }}
                    className="ml-5 px-3 pb-3"
                    id="my-universe-navbar-logo"
                  >
                    Social
                  </h3>
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-center mt-4">
                <div className="mx-3">
                  <Link to="/">
                    <span
                      className="material-icons"
                      style={{ cursor: "pointer", color: "rgb(91, 1, 132)" }}
                    >
                      home
                    </span>
                  </Link>
                </div>
                <div className="mx-3" style={{ cursor: "pointer" }}>
                  {this.props.user.is_confirmed === 1 ? (
                    <>
                      <CreatePost
                        modalOpen={this.state.modalOpen}
                        handleModal={this.handleModalLogin}
                      />
                    </>
                  ) : (
                    <span className="">
                      <span
                        className="material-icons"
                        style={{ color: "rgb(91, 1, 132)" }}
                      >
                        add_a_photo
                      </span>
                    </span>
                  )}
                </div>
                <div className="mx-3">
                  <Link to="/profile">
                    <span
                      className="material-icons"
                      style={{ cursor: "pointer", color: "rgb(91, 1, 132)" }}
                    >
                      account_circle
                    </span>
                  </Link>
                </div>
                <div className="mx-3">
                  <span
                    className="material-icons"
                    style={{ cursor: "pointer", color: "rgb(91, 1, 132)" }}
                    onClick={this.onBtnLogOutClick}
                  >
                    logout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        id="navbar"
        className="row"
        style={{ position: "fixed", zIndex: "2", width: "100%" }}
      >
        <div className="col-12 col-md-6 col-lg-6 align-self-center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3
              style={{ fontSize: "40px" }}
              className="ml-5 px-3"
              id="my-universe-navbar-logo"
            >
              Social
            </h3>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-6 ">
          <div className="d-flex flex-wrap justify-content-center align-items-center h-100">
            <span className="ml-3">
              <Link to="/login">
                <button
                  style={{ fontFamily: "Source Sans Pro" }}
                  value="Login"
                  className="btn my-universe-btn-nav-01"
                >
                  Login
                </button>
              </Link>
            </span>
            <span className="ml-3">
              <Link to="/register">
                <button
                  style={{ fontFamily: "Source Sans Pro" }}
                  value="Register"
                  className="btn my-universe-btn-nav-02"
                >
                  Register
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onUserLogin,
  onCheckUserLogin,
  onUserLogout,
  onCheckUserVerify,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
