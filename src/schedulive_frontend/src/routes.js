import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { usuarioAutenticado } from "./services/auth";
import Login from "./views/Login";
import Lives from "./views/Lives";
import Dashboard from "./views/Dashboard";
import Sair from "./views/Sair";

const PrivateRoute = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() ?
                (<Component {...props} />) :
                (<Redirect to={"/"} />)
        }
    />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route component={Login} exact path="/" />
            <PrivateRoute component={Lives} exact path="/lives" />
            <PrivateRoute component={Dashboard} exact path="/dashboard" />
            <Route component={Sair} exact path="/sair" />
        </Switch>
    </BrowserRouter>
)

export default Routes;