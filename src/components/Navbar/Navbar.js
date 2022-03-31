import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Navbar.scoped.css';
import logo from '../../assets/icons/logo.png';
import chat from '../../assets/icons/chat (1) 1.png';
import Default from '../../assets/images/dummy-profile.png';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  componentDidMount() {
    // console.log("COMPONENT DID MOUNT");
    if (this.props.auth.token) {
      this.setState({
        isLogin: true,
      });
    }
  }

  componentDidUpdate() {
    // console.log("COMPONENT DID UPDATE");
  }
  render() {
    const isLogin = this.state.isLogin;
    const profilepic =
      this.props.user.image !== null ? this.props.user.image : Default;
    console.log(this.props.user.image);
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand title-brand" to="#">
            <img
              src={logo}
              alt="logo"
              width="30"
              className="d-inline-block align-text-top img-logo"
            />
            Coffee Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Your Cart
                </Link>
              </li>
              <li className="nav-item">
                {isLogin ? (
                  this.props.user.role === 'user' ? (
                    <Link className="nav-link" to="/history">
                      History
                    </Link>
                  ) : (
                    <Link className="nav-link" to="/admin/dashboard">
                      Dashboard
                    </Link>
                  )
                ) : (
                  <Link className="nav-link" to="/history">
                    History
                  </Link>
                )}
              </li>
            </ul>
            {!isLogin ? (
              <div className="d-flex">
                <button
                  onClick={() => {
                    this.props.history.push('/login');
                  }}
                  className="btn-login"
                >
                  Login
                </button>

                <Link to="/signup" className="btn-signup">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="info">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(e.target.q.value);
                    this.props.history.push(
                      `/product/search?q=${e.target.q.value}`
                    );
                  }}
                >
                  <div className="search">
                    <input name="q" type="text" placeholder="Search" />
                  </div>
                </form>
                <div className="chat">
                  <Link to="/chat">
                    <div className="notif">1</div>
                    <img src={chat} alt="chat" />
                  </Link>
                </div>
                <div className="profilepic">
                  <div className="img-profile">
                    <Link to="/profile">
                      <img src={profilepic} alt="profile" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.auth.userData,
  };
};

export default connect(mapStateToProps)(Navbar);
