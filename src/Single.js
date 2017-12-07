import React, { Component } from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

import Weather from './Weather';

class Single extends Component {
    constructor() {
        super();

        this.state = {
            woeid: '',
            days: []
        }
    }

    componentDidMount() {
        let woeid = this.props.match.params.woeid;
        let host = config.get('host');

        this.setState({woeid: woeid});

        axios.get(host + "?command=location&woeid=" + woeid, {})
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    }

    handleSuccess(response) {
        let arr = response.data.consolidated_weather;
        let retarr = [];

        arr.forEach(function(item, key) {
            retarr.push(key);
        });

        this.setState({days: retarr});
    }

    handleError(error) {
        alert(error.response.data.error);
    }

    render () {
        const days = this.state.days;
        return (
            <section className="row">
                {
                    days.map((e, i) => 
                        <Weather key={`cities-${i}`}
                            woeid={this.state.woeid}
                            day={true}
                            daynum={e}
                            host={this.props.host}
                            />
                    )
                }
            </section>
        );
    }
}

export default Single;