import React, { Component } from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

import Weather from './Weather';

class Single extends Component {
    constructor() {
        super();

        this.state = {
            woeid: '',
            name: '',
            loading: true,
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

        arr.forEach(function(item) {
            retarr.push(item);
        });

        this.setState({
            days: retarr,
            name: response.data.title,
            loading: false
        });
    }

    handleError(error) {
        alert(error.response.data.error);
    }

    render () {
        const days = this.state.days;
        return (
            <section className="row">
                {
                    this.state.loading
                    &&
                    <div style={{ height: '500px' }} className="col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
                        <img style={{width: "100%", margin: "0 auto"}} src={'http://i.giftrunk.com/44frgm.gif'} />
                    </div>
                }
                {
                    !this.state.loading
                    &&
                    days.map((e, i) => 
                        <Weather key={`cities-${i}`}
                            woeid={this.state.woeid}
                            days={true}
                            name={this.state.name}
                            day={e}
                            fromAPI={false}
                            host={this.props.host}
                            />
                    )
                }
            </section>
        );
    }
}

export default Single;