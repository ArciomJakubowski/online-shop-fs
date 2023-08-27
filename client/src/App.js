import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Orders from "./components/orders";
import Favorites from "./components/favorites";
import Cart from "./components/cart";
import Login from "./layouts/login";
import Products from "./layouts/products";
import Main from "./components/page/main";
import Admin from "./layouts/admin";
import Users from "./layouts/users";
import LogOut from "./layouts/logOut";
import ProtectedRoute from "./components/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";
import ProtectedRouteForAdminPage from "./components/protectedRouteForAdminPage";

function App() {
    return (
        <div>
            <AppLoader>
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/logout" component={LogOut} />
                    <ProtectedRoute path="/orders" component={Orders} />
                    <ProtectedRoute path="/cart" component={Cart} />
                    <ProtectedRoute path="/favorites" component={Favorites} />
                    <Route path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <ProtectedRoute
                        path="/products/:prodId?/:edit?"
                        component={Products}
                    />
                    <ProtectedRouteForAdminPage
                        path="/admin/:edit?/:create?"
                        component={Admin}
                    />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
        </div>
    );
}

export default App;
