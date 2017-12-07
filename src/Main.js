import React, { Component } from 'react';

import Weather from './Weather';

class Main extends Component {
    constructor () {
        super();
        
        this.state = {
            cities: [2344116, 638242, 44418, 565346, 560743, 9807]
        }
    }

    render () {
        const cities = this.state.cities;
        console.log(this.props.host);

        return (
            <section className="row">
            {
                cities.map((e, i) => 
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

export default Main;