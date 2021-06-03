import axios from 'axios';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import './App.css';
import FooterComp from './components/FooterComp';
import NavbarComp from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'
import { keepLogin, getProductAction } from './action'
import { connect } from 'react-redux'
import { URL_API } from './Helper';
import ProductManagePage from './pages/ProductManagePage';
import NotFoundPage from './pages/NotFoundPage'
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail'
import ShoppingCartPage from './pages/ShoppingCartPage';
import TransactionPage from './pages/TransactionPage';
import CheckOutPage from './pages/CheckOutPage';
import HistoryPage from './pages/HistoryPage';

// page utama: app.js, ketika di refresh, app.js pasti merefresh
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  reLogin = () => {
    let idToken = localStorage.getItem("tkn_id")
    console.log("id token", idToken)
    if (idToken) {
      axios.post(URL_API + `/users/keep`, {
        id: idToken
      }) //diganti pake route baru
        .then(res => {
          // console.log("res", res.data[0])
          this.props.keepLogin(res.data[0])
        })
        .catch(err => {
          console.log("keeplogin :", err)
        })
    }
  }

  // getProducts = () => {
  //   axios.get(URL_API + '/products')
  //     .then((res) => {
  //       this.props.getProductAction(res.data)
  //     })
  //     .catch((err) => [
  //       console.log("get product error", err)
  //     ])
  // }

  componentDidMount() {
    this.reLogin()
    this.props.getProductAction()
  }

  render() {
    return (
      <>
        <NavbarComp />
        {/* apabila ada page not found bisa keluar not found */}
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/client" component={LoginPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/products-detail" component={ProductDetail} />
          <Route path="/shopping-cart" component={ShoppingCartPage} />
          {
            this.props.role === "Admin" &&
            <>
              <Route path="/product-management" component={ProductManagePage} />
              <Route path="/transaction-management" component={TransactionPage} />
            </>
          }
          {
            this.props.role === "User" &&
            <>
              <Route path="/check-out" component={CheckOutPage} />
              <Route path="/history" component={HistoryPage} />
            </>
          }
          <Route path="*" component={NotFoundPage} />

        </Switch>
        <FooterComp />
      </>
    );
  }
}

// mendapatkan data role untuk routing page
const mapStateToProps = ({ authReducer }) => {
  return {
    role: authReducer.role
  }
}
export default connect(mapStateToProps, { keepLogin, getProductAction })(App);
