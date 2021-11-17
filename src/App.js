import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./routing/PrivateRoute";

import Navbar from "./components/Navbar/Navbar";
import Backdrop from "./components/Navbar/Backdrop";
import Sidedrawer from "./components/Navbar/Sidedrawer";
import Newsletter from "./components/Newsletter";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

import AdminScreen from "./screens/admin/AdminScreen";
import BestSellerScreen from "./screens/admin/BestSellersScreen";
import CartScreen from "./screens/CartScreen";
import FavoritesScreen from "./screens/profile/FavoritesScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MessagesScreen from "./screens/admin/MessagesScreen";
import MessengerScreen from "./screens/profile/MessengerScreen";
import OrderHistoryScreen from "./screens/profile/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import ProductDetail from "./screens/ProductDetail";
import ProductsScreen from "./screens/admin/ProductsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ReviewsScreen from "./screens/admin/ReviewsScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import StatsScreen from "./screens/admin/StatsScreen";
import TransactionsScreen from "./screens/admin/TransactionsScreen";
import UsersScreen from "./screens/admin/UsersScreen";

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
      <ScrollToTop />
      <Navbar click={() => setSideToggle(true)} />
      <Sidedrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/products" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <PrivateRoute exact path="/admin" component={AdminScreen} />
          <PrivateRoute
            exact
            path="/admin/bestsellers"
            component={BestSellerScreen}
          />
          <PrivateRoute
            exact
            path="/admin/messages"
            component={MessagesScreen}
          />
          <PrivateRoute
            exact
            path="/admin/products"
            component={ProductsScreen}
          />
          <PrivateRoute exact path="/admin/reviews" component={ReviewsScreen} />
          <PrivateRoute exact path="/admin/stats" component={StatsScreen} />
          <PrivateRoute
            exact
            path="/admin/transactions"
            component={TransactionsScreen}
          />
          <PrivateRoute exact path="/admin/users" component={UsersScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/profile/favorites" component={FavoritesScreen} />
          <Route
            exact
            path="/profile/historial"
            component={OrderHistoryScreen}
          />
          <Route exact path="/profile/messages" component={MessengerScreen} />
          <Route exact path="/shipping" component={ShippingAddressScreen} />
          <Route exact path="/payment" component={PaymentMethodScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/orderhistory" component={OrderHistoryScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/resetpassword/:resetToken"
            component={ResetPasswordScreen}
          />
        </Switch>
      </main>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
