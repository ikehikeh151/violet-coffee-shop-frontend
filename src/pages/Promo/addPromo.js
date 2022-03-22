import React, { Component } from "react";
import "./addPromo.scoped.css";
import { addPromoApi } from "../../utils/promo";
import { connect } from "react-redux";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import Camera from "../../assets/icons/Camera.png";

export class addPromo extends Component {
  constructor(props) {
    super(props);
    this.state = { image: "", newImage: "", category: "" };
    this.inputFile = React.createRef();
  }

  selectedFile = (event) => {
    const img = event.target.files[0];
    this.setState({
      image: img,
      newImage: URL.createObjectURL(img)
    });
  };

  handleFile = (event) => {
    this.inputFile.current.click();
    event.preventDefault();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const token = this.props.token;
    console.log("TOKEN", token);
    const body = new FormData();

    body.append("discount", e.target.discount.value);
    body.append("start_promo", e.target.start_date.value);
    body.append("end_promo", e.target.end_date.value);
    body.append("code_promo", e.target.coupon.value);
    body.append("name", e.target.name_promo.value);
    body.append("price", e.target.price.value);
    body.append("description", e.target.description.value);
    body.append("image", this.state.image);
    if (this.state.category === "food") {
      body.append("size_1", e.target.size_1.checked ? "250gr" : null);
      body.append("size_2", e.target.size_2.checked ? "300gr" : null);
      body.append("size_3", e.target.size_3.checked ? "500gr" : null);
    } else {
      body.append("size_1", e.target.size_1.checked ? "R" : null);
      body.append("size_2", e.target.size_2.checked ? "L" : null);
      body.append("size_3", e.target.size_3.checked ? "XL" : null);
    }
    body.append("home_delivery", e.target.home_delivery.checked ? 1 : 0);
    body.append("dine_in", e.target.dine_in.checked ? 1 : 0);
    body.append("take_away", e.target.take_away.checked ? 1 : 0);
    body.append("category", this.state.category);

    addPromoApi(token, body)
      .then((res) => {
        var x = document.getElementById("snackbar-success");
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
        setTimeout(() => {
          this.props.history.push(`/product`);
        }, 3001);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
        var x = document.getElementById("snackbar-fail");
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 5000);
      });
  };
  render() {
    return (
      <>
        <Navbar />
        <div className="main">
          <div className="pref-link mb-5">
            <a href="/" className="link">
              <p className="pref">Favorite & Promo </p>||
              <p className="ProductName"> Add new promo</p>
            </a>
          </div>

          <form className="forms" onSubmit={this.handleSubmit}>
            <div className="form-left">
              <div className="product-image">
                <img
                  src={this.state.newImage ? this.state.newImage : Camera}
                  alt="promo"
                />
              </div>
              <button className="btn btn-dark">Take a picture</button>
              <input
                type="file"
                hidden
                ref={this.inputFile}
                onChange={this.selectedFile}
              />
              <button
                className="btn btn-warning chose"
                onClick={this.handleFile}>
                Choose from gallery
              </button>
              <div className="delivery-hour">
                <p className="title">Enter the discount :</p>
                <input
                  type="text"
                  class="form-select"
                  name="discount"
                  placeholder="Input Discount"
                  // aria-label="Default select example"
                />
              </div>

              <div className="expire-date ">
                <p className="title-expired">Expired date :</p>
                <input
                  type="date"
                  className="start-date mb-3"
                  placeholder="Select start date"
                  name="start_date"
                />
                <input
                  type="date"
                  className="end-date"
                  placeholder="Select end date"
                  name="end_date"
                />
              </div>

              <div className="input-stock ">
                <p className="title">Input Coupon Code :</p>
                <input
                  class="form-select start"
                  type="text"
                  name="coupon"
                  placeholder="Input Coupon Code"
                />
              </div>
            </div>
            <div className="form-right">
              <div class="mb-5">
                <label for="exampleInputEmail1" class="form-label">
                  Name :
                </label>
                <input
                  type="text"
                  class="form-control shadow-none"
                  id="exampleInputEmail1"
                  name="name_promo"
                  aria-describedby="emailHelp"
                  placeholder="Type promo name min. 50 characters"
                />
              </div>
              <div class="mb-5">
                <label for="exampleInputPassword1" class="form-label">
                  Price :
                </label>
                <input
                  type="text"
                  class="form-control shadow-none"
                  id="exampleInputPassword1"
                  placeholder="Type the normal price"
                  name="price"
                />
              </div>
              <div class="mb-5">
                <label for="exampleInputPassword1" class="form-label">
                  Description :
                </label>
                <input
                  type="text"
                  class="form-control shadow-none"
                  id="exampleInputPassword1"
                  name="description"
                  placeholder="Describe your promo min. 150 characters"
                />
              </div>

              <select
                onChange={(e) => this.setState({ category: e.target.value })}
                name="category"
                className="form-select end"
                aria-label="Default select example"
                style={{ marginBottom: 20 }}>
                <option selected hidden disabled>
                  Category
                </option>
                <option value="coffee">Coffee</option>
                <option value="non coffee">Non Coffee</option>
                <option value="food">Food</option>
              </select>

              <div className="input-size mb-5">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label mb-1">
                  Input product size :
                </label>
                <p className="description">
                  Click size you want to use for this product
                </p>
                <div className="btn-chose">
                  {this.state.category !== "food" ? (
                    <>
                      <input
                        type="checkbox"
                        className="btn-check shadow-none"
                        name="size_1"
                        id="size_1"
                        autoComplete="off"
                      />
                      <label className="btn btn-secondary" htmlFor="size_1">
                        R
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check shadow-none"
                        name="size_2"
                        id="size_2"
                        autoComplete="off"
                      />
                      <label className="btn btn-secondary" htmlFor="size_2">
                        L
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check shadow-none"
                        name="size_3"
                        id="size_3"
                        autoComplete="off"
                      />
                      <label className="btn btn-secondary" htmlFor="size_3">
                        XL
                      </label>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        className="btn-check shadow-none"
                        name="size_1"
                        id="size_1"
                        autoComplete="off"
                      />
                      <label className="btn btn-secondary" htmlFor="size_1">
                        250gr
                      </label>
                      <input
                        type="checkbox"
                        className="btn-check shadow-none"
                        name="size_2"
                        id="size_2"
                        autoComplete="off"
                      />
                      <label className="btn btn-secondary" htmlFor="size_2">
                        300gr
                      </label>
                      <input
                        type="checkbox"
                        className="btn-check shadow-none"
                        name="size_3"
                        id="size_3"
                        autoComplete="off"
                      />
                      <label className="btn btn-secondary" htmlFor="size_3">
                        500gr
                      </label>
                    </>
                  )}
                </div>
              </div>

              <div className="delivery-method">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label mb-1">
                  Delivery method :
                </label>
                <p className="describtion">
                  Click method you want to use for this product
                </p>
                <div className="btn-chose">
                  <input
                    type="checkbox"
                    className="btn-check shadow-none"
                    name="home_delivery"
                    id="home_delivery"
                    autoComplete="off"
                  />
                  <label className="btn btn-secondary" htmlFor="home_delivery">
                    Home Delivery
                  </label>
                  <input
                    type="checkbox"
                    className="btn-check shadow-none"
                    name="dine_in"
                    id="dine_in"
                    autoComplete="off"
                  />
                  <label className="btn btn-secondary" htmlFor="dine_in">
                    Dine in
                  </label>
                  <input
                    type="checkbox"
                    className="btn-check shadow-none"
                    name="take_away"
                    id="take_away"
                    autoComplete="off"
                  />
                  <label className="btn btn-secondary" htmlFor="take_away">
                    Take away
                  </label>
                </div>
              </div>
              <button className="btn btn-primary save" type="submit">
                Save Product
              </button>
              <button className="btn btn-light cancel">Cancel</button>
            </div>
          </form>
        </div>
        <Footer />
        {/* TOAST */}
        <div id="snackbar-success">Promo berhasil ditambahkan!</div>
        <div id="snackbar-fail">Terdapat kesalahan.</div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(addPromo);
