import React from "react";
import {withRouter, Switch, Redirect} from 'react-router-dom'

import AuthRoute from './authroute'
import Routes from './routes'

@withRouter
class Router extends React.Component {
    createRoute(item, index) {
        if (item.redirect) {
            return (<Redirect key={index} exact from={item.path} to={item.redirect.path}/>);
        } else {
            return (<AuthRoute key={index} exact path={item.path} component={item.component}/>);
        }
    };

    render() {
        return (
            <Switch>
                {
                    Routes.map((item, index) => {
                            return (
                                this.createRoute(item, index)
                            )
                        }
                    )
                }
            </Switch>
        )
    }
}

export default Router;