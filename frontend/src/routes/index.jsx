import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from '../utilities/history'
import MaintenancePage from '../views/pages/maintenance'
import ErrorPage from '../views/pages/errors'
import NotFoundPage from '../views/pages/pageNotFound'
import Config from '../config/config'
import AboutUsPage from '../views/pages/about-us'
import ContactPage from '../views/pages/contact'
import Root from '../views/components/root'
import LogInPage from '../views/pages/log-in';
import AddProductPage from "../views/pages/add-product";
import { ProductListPage } from "../views/product-list/index1";
import ProductOverviewPage from "../views/pages/product-overview";
import AdminPage from "../views/pages/admin-page";
import AddToDBPage from "../views/pages/add-to-db";
import EmailList from "../views/pages/email-list/emailList";
import EmailListRemove from "../views/pages/email-list/emailListRemove";
import EditProduct from "../views/pages/edit-product/index";
import CartPage from "../views/pages/cartPage";
import CheckoutPage from "../views/pages/checkout";
import OrdersPage from "../views/pages/active-orders";
import OrderPage from "../views/pages/order";
import AddDiscountPage from "../views/pages/add-discount";
import AddDiscountOnePage from "../views/pages/add-discount-one";
import PopularProducts from "../views/pages/popular-products";
 
const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path='/maintenance' component={MaintenancePage} />
            <Route exact path='/error' component={ErrorPage} />
            <Route exact path='/not-found' component={NotFoundPage} />

            <Route exact path={`${Config.prefixUrl}/about-us`} component={AboutUsPage} />
            <Route exact path={`${Config.prefixUrl}/contact`} component={ContactPage} />

            <Route exact path={`${Config.prefixUrl}/home`} component={Root} />

            <Route exact path={`${Config.prefixUrl}/admin`} component={LogInPage} />

            <Route exact path={`${Config.prefixUrl}/product-list`} component={ProductListPage} />
            <Route path={`${Config.prefixUrl}/product/:id`} component={ProductOverviewPage} />

            <Route exact path={`${Config.prefixUrl}/admin-page`} component={AdminPage} />

            <Route exact path={`${Config.prefixUrl}/add-product`} component={AddProductPage} />
            <Route exact path={`${Config.prefixUrl}/edit-product`} component={EditProduct} />
            <Route exact path={`${Config.prefixUrl}/add-to-db`} component={AddToDBPage} />
            <Route exact path={`${Config.prefixUrl}/cart-page`} component={CartPage} />
            <Route exact path={`${Config.prefixUrl}/checkout`} component={CheckoutPage} />
            <Route exact path={`${Config.prefixUrl}/orders`} component={OrdersPage} />
            <Route exact path={`${Config.prefixUrl}/order/:id`} component={OrderPage} />
            <Route exact path={`${Config.prefixUrl}/add-discount`} component={AddDiscountPage} />
            <Route exact path={`${Config.prefixUrl}/add-discount-one`} component={AddDiscountOnePage} />
            <Route exact path={`${Config.prefixUrl}/najprodavaniji-proizvodi`} component={PopularProducts} />

            <Route exact path={`${Config.prefixUrl}/email-list-remove/:id`} component={EmailListRemove} />
            <Route exact path={`${Config.prefixUrl}/email-list`} component={EmailList} />



            <Redirect from='/' to={`${Config.prefixUrl}/home`} />
        </Switch>
    </Router>
);

export default AppRouter;