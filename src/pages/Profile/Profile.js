import React, { Component } from "react";
import "./Profile.scoped.css";
import { Modal } from "react-bootstrap";
import FormData from "form-data";
import Default from "../../assets/images/dummy-profile.png";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction, saveAction } from "../../Redux/actions/auth";

// COMPONENTS
import Header from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { GetUser, editUser } from "../../utils/auth";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      image: "",
      delivery_adress: "",
      display_name: "",
      first_name: "",
      last_name: "",
      phone: "",
      dob: "",
      gender: "",
      isShow: false,
    };
    this.inputFile = React.createRef();
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    console.log(data);
  };

  fileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    const data = { ...this.state };
    if (file) {
      data.image = file;
      console.log(data.image);
      this.setState(data);
    }
    event.preventDefault();
  };

  _setData = () => {
    const forms = new FormData();
    if (this.state.email === "") {
      forms.append("email", this.props.users.email);
    } else {
      forms.append("email", this.state.email);
    }
    if (this.state.image !== "") {
      forms.append("image", this.state.image);
    }
    if (this.state.delivery_adress !== "") {
      forms.append("delivery_adress", this.state.delivery_adress);
    }
    if (this.state.display_name !== "") {
      forms.append("display_name", this.state.display_name);
    }
    if (this.state.first_name !== "") {
      forms.append("first_name", this.state.first_name);
    }
    if (this.state.last_name !== "") {
      forms.append("last_name", this.state.last_name);
    }
    if (this.state.phone !== "") {
      forms.append("phone", this.state.phone);
    }
    if (this.state.dob !== "") {
      forms.append("dob", this.state.dob);
    }
    forms.append("gender", this.state.gender);
    return forms;
  };

  EditUser = () => {
    const forms = this._setData();
    const token = this.props.token;
    editUser(forms, token)
      .then((res) => {
        this.setUser(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setUser = (token) => {
    GetUser(token)
      .then((res) => {
        const { result } = res.data;
        this.props.setUsers(result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFile = (event) => {
    this.inputFile.current.click();
    event.preventDefault();
  };

  modalTrigger = () => {
    this.setState({ isShow: !this.state.isShow });
  };

  render() {
    const profilepic = this.props.users.image;
    return (
      <div className="main">
        <Header />
        <div className="jumbotron">
          <h1 className="title">User Profile</h1>
          <div className="wrapper">
            <div className="profile">
              <img src={profilepic ? process.env.REACT_APP_HOST + profilepic : Default} alt="" />
              <div className="name">
                <strong>{this.props.users.display_name}</strong>
                <br />
                {this.props.users.email}
              </div>
              <div className="button">
                <input type="file" hidden name="image" ref={this.inputFile} onChange={this.fileChange} />
                <button className="btn btn-warning chose" onClick={this.handleFile}>
                  choose photo
                </button>
                <button className="btn btn-primary">Remove photo</button>
                <button className="btn btn-light">Edit password</button>
              </div>
              <p className="text">
                Do you want to save <br /> the change?
              </p>
            </div>
            <div className="second-btn">
              <input type="file" hidden />
              <button className="btn btn-warning chose" onClick={this.EditUser}>
                Save Change
              </button>
              <button className="btn btn-primary">Cancel</button>
              <button className="btn btn-light" onClick={this.modalTrigger}>
                Log out
              </button>
            </div>
            <div className="forms">
              <div className="radio-input">
                <div class="form-check form-check-inline">
                  <input class="form-check-input shadow-none" type="radio" name="gender" id="inlineRadio1" /*  checked={this.props.users.gender === "Male" ? true : null} */ value="Male" onChange={this.formChange} />
                  <label class="form-check-label male-label" for="inlineRadio1">
                    Male
                  </label>
                </div>
                <div class="form-check form-check-inline female">
                  <input class="form-check-input shadow-none" type="radio" name="gender" id="inlineRadio2" value="Female" onChange={this.formChange} /* checked={this.props.users.gender === "Female" ? true : null} */ />
                  <label class="form-check-label female-label" for="inlineRadio2">
                    Female
                  </label>
                </div>
              </div>
              <div className="form-left">
                <div className="contact">
                  <p>Contact</p>
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Email address :
                      </label>
                      <input type="email" class="form-control shadow-none" id="exampleInputEmail1" placeholder={this.props.users.email} aria-describedby="emailHelp" name="email" onChange={this.formChange} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Delivery adress :
                      </label>
                      <input type="text" class="form-control shadow-none" id="exampleInputPassword1" placeholder={this.props.users.delivery_adress} name="delivery_adress" onChange={this.formChange} />
                    </div>
                  </form>
                </div>
                <div className="detail">
                  <p>Detail</p>
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Display name :
                      </label>
                      <input type="text" placeholder={this.props.users.display_name} class="form-control shadow-none" id="exampleInputEmail1" aria-describedby="emailHelp" name="display_name" onChange={this.formChange} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        First name :
                      </label>
                      <input type="text" placeholder={this.props.users.first_name} class="form-control shadow-none" id="exampleInputPassword1" name="first_name" onChange={this.formChange} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Last name :
                      </label>
                      <input type="text" placeholder={this.props.users.last_name} class="form-control shadow-none" id="exampleInputPassword1" name="last_name" onChange={this.formChange} />
                    </div>
                  </form>
                </div>
              </div>
              <div className="form-right">
                <div class="mb-3 mobile-number">
                  <label for="exampleInputPassword1" class="form-label">
                    Mobile number :
                  </label>
                  <input type="text" placeholder={this.props.users.phone} class="form-control shadow-none" id="exampleInputPassword1" name="phone" onChange={this.formChange} />
                </div>
                <div class="mb-3 dob">
                  <label for="exampleFormControlInput1" class="form-label">
                    DD/MM/YYYY:
                  </label>
                  <input type="date" placeholder={this.props.users.dob} class="form-control shadow-none" date aria-label="YYYY/MM/DD" name="dob" onChange={this.formChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
        {/* MODAL */}
        <Modal show={this.state.isShow} centered>
          <Modal.Body className="modal-body">
            <p className="modal-text">Are you sure to Log Out ?</p>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <div className="modal-btn">
              <button className="btn btn-light" onClick={this.modalTrigger}>
                No
              </button>
              <button className="btn btn-warning">Yes</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToPropps = (dispacth) => {
  return {
    setUsers: bindActionCreators(saveAction, dispacth),
    setAuth: bindActionCreators(loginAction, dispacth),
  };
};

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPropps
)(Profile);
