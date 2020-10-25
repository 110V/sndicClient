import *as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home'
import Result from '../pages/Result'

const Root: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/result/:word" component={Result} />
            <Redirect path="*" to="/" />
        </Switch>
    </BrowserRouter>
)

export default Root;