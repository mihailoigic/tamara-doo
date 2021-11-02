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
import ProductListPage from '../views/product-list';
 
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

            <Redirect from='/' to={`${Config.prefixUrl}/home`} />
        </Switch>
    </Router>
);

export default AppRouter;