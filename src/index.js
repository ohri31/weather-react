import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import config from 'react-global-configuration';

import './index.css';

import App from './App';
import Main from './Main';
import Search from './Search';
import Single from './Single';

config.set({ host: "http://localhost/weather/weather.php" });

ReactDOM.render(
    <App>
        <BrowserRouter>
            <Switch>
                <Route path="/search/:keyword" component={Search}/>
                <Route path="/weather/:woeid" component={Single}/>
                <Route path="/" component={Main}/>
            </Switch>
        </BrowserRouter>
    </App>, 
document.getElementById('root'));
