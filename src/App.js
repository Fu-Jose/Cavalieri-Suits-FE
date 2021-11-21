import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./routing/PrivateRoute";

import Navbar from "./components/Navbar/Navbar";
import Backdrop from "./components/Navbar/Backdrop";
import Sidedrawer from "./components/Navbar/Sidedrawer";
import Newsletter from "./components/Newsletter";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

const AdminScreen = React.lazy(() => import("./screens/admin/AdminScreen"));
const BestSellerScreen = React.lazy(() =>
  import("./screens/admin/BestSellersScreen")
);
const CartScreen = React.lazy(() => import("./screens/CartScreen"));
const FavoritesScreen = React.lazy(() =>
  import("./screens/profile/FavoritesScreen")
);
const ForgotPasswordScreen = React.lazy(() =>
  import("./screens/ForgotPasswordScreen")
);
const HomeScreen = React.lazy(() => import("./screens/HomeScreen"));
const LoginScreen = React.lazy(() => import("./screens/LoginScreen"));
const MessagesScreen = React.lazy(() =>
  import("./screens/admin/MessagesScreen")
);
const MessengerScreen = React.lazy(() =>
  import("./screens/profile/MessengerScreen")
);
const OrderHistoryScreen = React.lazy(() =>
  import("./screens/profile/OrderHistoryScreen")
);
const OrderScreen = React.lazy(() => import("./screens/OrderScreen"));
const PaymentMethodScreen = React.lazy(() =>
  import("./screens/PaymentMethodScreen")
);
const PlaceOrderScreen = React.lazy(() => import("./screens/PlaceOrderScreen"));
const ProductScreen = React.lazy(() => import("./screens/ProductScreen"));
const ProfileScreen = React.lazy(() =>
  import("./screens/profile/ProfileScreen")
);
const ProductDetail = React.lazy(() => import("./screens/ProductDetail"));
const ProductsScreen = React.lazy(() =>
  import("./screens/admin/ProductsScreen")
);
const RegisterScreen = React.lazy(() => import("./screens/RegisterScreen"));
const ResetPasswordScreen = React.lazy(() =>
  import("./screens/ResetPasswordScreen")
);
const ReviewsScreen = React.lazy(() => import("./screens/admin/ReviewsScreen"));
const ShippingAddressScreen = React.lazy(() =>
  import("./screens/ShippingAddressScreen")
);
const StatsScreen = React.lazy(() => import("./screens/admin/StatsScreen"));
const TransactionsScreen = React.lazy(() =>
  import("./screens/admin/TransactionsScreen")
);
const UsersScreen = React.lazy(() => import("./screens/admin/UsersScreen"));

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
      <ScrollToTop />
      <Navbar click={() => setSideToggle(true)} />
      <Sidedrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Suspense fallback={<div>LOADING...</div>}>
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
            <PrivateRoute
              exact
              path="/admin/reviews"
              component={ReviewsScreen}
            />
            <PrivateRoute exact path="/admin/stats" component={StatsScreen} />
            <PrivateRoute
              exact
              path="/admin/transactions"
              component={TransactionsScreen}
            />
            <PrivateRoute exact path="/admin/users" component={UsersScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route
              exact
              path="/profile/favorites"
              component={FavoritesScreen}
            />
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
        </Suspense>
      </main>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
