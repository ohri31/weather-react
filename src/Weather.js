import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import config from 'react-global-configuration';

class Weather extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            name: '',
            day: '',
            weather: []
        }
    }

    componentDidMount() {
        let woeid = this.props.woeid;
        let host = config.get('host');

        axios.get(host + "?command=location&woeid=" + woeid, {})
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    }

    handleSuccess(response) {
        this.setState({
            name: response.data.title,
            weather: response.data.consolidated_weather[this.props.daynum],
            loading: false
        });

        let day = moment(response.data.consolidated_weather[this.props.daynum].applicable_date);
        let stringday = day.format("dddd");

        this.setState({day: stringday});
    }

    handleError(error) {
        //alert(error.response.error.data);
    }

    formatTemp(temp) {
        return Math.round(temp * 100) / 100 + "C";
    }

    render () {
        const {name, weather, day} = this.state;

        return (
            <div>
                {
                    this.state.loading
                    &&
                    <div style={{ height: '500px' }} className="col-md-4 col-sm-12 col-xs-12">
                        <img style={{width: "100%", margin: "0 auto"}} src={'http://i.giftrunk.com/44frgm.gif'} />
                    </div>
                }
                {
                    !this.state.loading
                    &&
                    <a href={'/weather/'+this.props.woeid}>
                        <div style={{ height: '500px' }}  className="col-md-4 col-sm-12 col-xs-12">
                            <div className="weather">
                                <img style={{width: "60%", margin: "0 auto"}} src={'https://www.metaweather.com/static/img/weather/' + weather.weather_state_abbr + '.svg'} />
                                <h2>{ name }</h2>
                                { this.props.day && <h2>{ day }</h2> }
                                <h3>{ weather.weather_state_name }</h3>
                                <h3>{ this.formatTemp(weather.the_temp) }</h3>
                                <h4>Min. { this.formatTemp(weather.min_temp) }</h4>
                                <h4>Max. { this.formatTemp(weather.max_temp) }</h4>
                            </div>
                        </div>
                    </a>
                }     
            </div>
        )
    }
}

export default Weather;