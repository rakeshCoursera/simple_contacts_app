import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./components/app";
import NotFound from "./components/notFound";

// application routes made with react router
const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes;