import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Product.scoped.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CardProduct from '../../components/CardProduct/CardProduct';
import CardCoupon from '../../components/CardCoupon/CardCoupon';
import motherDays from '../../assets/icons/mother_event.png';
import sundayMorning from '../../assets/icons/sunday_event.png';
import helloween from '../../assets/icons/halloween_event.png';

import {connect} from 'react-redux';

import {getProduct, searchProduct} from '../../utils/product';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        favorite: [],
        coffee: [],
        nonCoffee: [],
        foods: [],
        search: [],
      },
      event: {
        eventHelloween: 'HAPPY HALLOWEEN!',
        eventSundayMorning: 'Get a cup of coffee for free on sunday morning',
        eventMotherDays: 'HAPPY MOTHER’S DAY!',
      },
      eventKet: {
        ketHelloween:
          'Do you like chicken wings? Get 1 free only if you buy pinky promise',
        ketSundayMorning: 'Only at 7 to 9 AM',
        ketMotherDays: 'Get one of our favorite menu for free!',
      },
      promo: {
        helloween: 'helloween',
        sundayMorning: 'sunday-morning',
        motherDay: 'motherDays',
      },
      picPromo: {
        picHelloween: helloween,
        picSundayMorning: sundayMorning,
        picMotherDays: motherDays,
      },
    };
  }

  getFavorite = (category) => {
    getProduct(category)
      .then((res) => {
        this.setState({
          product: {...this.state.product, favorite: res.data.data},
        });
      })
      .catch((err) => {
        console.log('ERROR GET PRODUCT', err);
      });
  };

  getSearch = (search) => {
    searchProduct(search)
      .then((res) => {
        this.setState({
          product: {...this.state.product, search: res.data.data},
        });
      })
      .catch((err) => {
        console.log('ERROR GET PRODUCT', err);
      });
  };

  getCoffee = (category) => {
    getProduct(category)
      .then((res) => {
        this.setState({
          product: {...this.state.product, coffee: res.data.data},
        });
      })
      .catch((err) => {
        console.log('ERROR GET PRODUCT', err);
      });
  };

  getNonCoffee = (category) => {
    getProduct(category)
      .then((res) => {
        this.setState({
          product: {...this.state.product, nonCoffee: res.data.data},
        });
      })
      .catch((err) => {
        console.log('ERROR GET PRODUCT', err);
      });
  };

  getFoods = (category) => {
    getProduct(category)
      .then((res) => {
        this.setState({
          product: {...this.state.product, foods: res.data.data},
        });
      })
      .catch((err) => {
        console.log('ERROR GET PRODUCT', err);
      });
  };

  componentDidMount() {
    this.getFavorite('favorite');
    this.getCoffee('coffee');
    this.getNonCoffee('non coffee');
    this.getFoods('food');
    this.props.match.params.category === 'search' &&
      this.getSearch(this.props.location.search.slice(3));
  }

  componentDidUpdate(prevProps) {
    prevProps.location.search !== this.props.location.search &&
      this.getSearch(this.props.location.search.slice(3));
  }

  render() {
    const {helloween, sundayMorning, motherDay} = this.state.promo;
    const {picHelloween, picSundayMorning, picMotherDays} = this.state.picPromo;
    const {
      eventHelloween,
      eventMotherDays,
      eventSundayMorning,
    } = this.state.event;
    const {ketHelloween, ketSundayMorning, ketMotherDays} = this.state.eventKet;

    const {product} = this.state;
    const {favorite, coffee, nonCoffee, foods, search} = product;
    const category = this.props.match.params.category;

    return (
      <>
        <Navbar history={this.props.history} />
        <div className="row">
          <div className="col-lg-4 col-md-6 wrapper-left border">
            <div className="wrapper-title-promo">
              <p className="title-promo"> Promo Today</p>
              <p className="info-promo">
                Coupons will be updated every weeks. <br />
                Check them out!
              </p>
            </div>
            <div className="wrapper-cuppon">
              <Link to="">
                <CardCoupon
                  event={motherDay}
                  pic={picMotherDays}
                  nameEvent={eventMotherDays}
                  ketEvent={ketMotherDays}
                />
              </Link>
              <CardCoupon
                event={sundayMorning}
                pic={picSundayMorning}
                nameEvent={eventSundayMorning}
                ketEvent={ketSundayMorning}
              />
              <CardCoupon
                event={motherDay}
                pic={picMotherDays}
                nameEvent={eventMotherDays}
                ketEvent={ketMotherDays}
              />
              <CardCoupon
                event={helloween}
                pic={picHelloween}
                nameEvent={eventHelloween}
                ketEvent={ketHelloween}
              />
            </div>
            <button className="btn-cuppon">Apply Coupon</button>
            <p className="title-terms">Terms and Condition</p>
            <ol className="terms">
              <li>You can only apply 1 coupon per day</li>
              <li>It only for dine in</li>
              <li>Buy 1 get 1 only for new user</li>
              <li>Should make member card to apply coupon</li>
            </ol>
            <div className="link-promo">
              <Link to="/" className="link">
                Edit Promo
              </Link>
              <Link to="/promo/add" className="link">
                Add Promo
              </Link>
            </div>
          </div>

          <div className="col-lg-8 col-md-6">
            <ul className="wrapper-menu-category">
              <li className={category === undefined ? 'active-menu' : null}>
                <NavLink to="/product">Favorite & Promo</NavLink>
              </li>
              <li className={category === 'coffee' ? 'active-menu' : null}>
                <NavLink to="/product/coffee">Coffee</NavLink>
              </li>
              <li className={category === 'non+coffee' ? 'active-menu' : null}>
                <NavLink to="/product/non+coffee">Non Coffee</NavLink>
              </li>
              <li className={category === 'food' ? 'active-menu' : null}>
                <NavLink to="/product/food">Foods</NavLink>
              </li>
              {/* <li>Add-on</li> */}
            </ul>
            <div className="col-lg-12 d-flex wrapper-card-product">
              {category === 'search'
                ? search.map((data, index) => {
                    return (
                      <CardProduct
                        dataProduct={data}
                        index={index}
                        key={data.id}
                      />
                    );
                  })
                : category === 'coffee'
                ? coffee.map((data, index) => {
                    return (
                      <CardProduct
                        dataProduct={data}
                        index={index}
                        key={data.id}
                      />
                    );
                  })
                : category === 'non+coffee'
                ? nonCoffee.map((data, index) => {
                    return (
                      <CardProduct
                        dataProduct={data}
                        index={index}
                        key={data.id}
                      />
                    );
                  })
                : category === 'food'
                ? foods.map((data, index) => {
                    return (
                      <CardProduct
                        dataProduct={data}
                        index={index}
                        key={data.id}
                      />
                    );
                  })
                : favorite.map((data, index) => {
                    return (
                      <CardProduct
                        dataProduct={data}
                        index={index}
                        key={data.id}
                      />
                    );
                  })}
            </div>
            {this.props.token ? (
              this.props.users.role === 'admin' ? (
                <div className="admin-link">
                  <a href="/product/edit/:id">Edit product</a>
                  <a href="/product/add">Add new product</a>
                </div>
              ) : null
            ) : null}
          </div>
          <div />
        </div>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Product);

// <div className="admin-link">
//               <a href="/product/edit/:id">Edit product</a>
//               <a href="/product/add">Add new product</a>
//             </div>
