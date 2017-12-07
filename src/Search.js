import React, { Component } from 'react';
import axios from 'axios';
import config from 'react-global-configuration';

import Weather from './Weather';

class Search extends Component {
    constructor () {
        super();
        this.state = {
            found: true,
            results: []
        }
    }

    componentDidMount() {
        let keyword = this.props.match.params.keyword;
        let host = config.get('host');

        console.log(config.get('host'));

        axios.get(host + "?command=search&keyword=" + keyword, {})
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this));
    }

    handleSuccess(response) {
        let arr = [];

        response.data.forEach(function(item) {
            arr.push(item.woeid);
        });

        this.setState({
            results: arr
        });

        if(this.state.results.length === 0) this.setState({found: false}); 
    }

    handleError(error) {
        this.setState({found: false});
    }

    render () {
        const results = this.state.results;

        return (
            <section className="row">
            {
                !this.state.found 
                &&
                <div className="col-md-offset-3 col-md-6 col-sm-12 col-xs-12" style={{ textAlign: "center", color: "#d5d5d5" }}>
                    <h1>No results found. Try changing the keyword.</h1>
                </div>
            }
            {
                results.map((e, i) => 
                    <Weather key={`cities-${i}`}
                        woeid={e}
                        day={false}
                        daynum={0}
                        host={this.props.host}
                        />
                )
            }
            </section>
        )
    }
}

export default Search;