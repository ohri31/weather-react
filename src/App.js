import React, { Component } from 'react';

class App extends Component {
  constructor () {
    super();
    this.state = {
      keyword: ''
    }
    
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  search(e) {
    e.preventDefault();
    window.location = "/search/" + this.state.keyword;
  }

  onChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  // A hack to get the url parameter in the parent component
  componentDidMount() {
    let location = window.location.href;
    let res = location.split("/");

    if(res[res.length - 2] === "search")
      this.setState({keyword: decodeURIComponent(res[res.length - 1])});
  }

  render() {
    return (
      <div className="App">
        <nav id="mainNav" className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand mainNav-heading" href="/">Weather<blue>App</blue></a>
            </div>

            <div className="navbar-right">
              <form action="" method="post">
                <div className="input-group menu-search">
                  <input type="text" className="form-control" name="keyword" placeholder="Search" value={this.state.keyword} onChange={this.onChange} />
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit" onClick={this.search}>
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </nav>
        <div className="container"> 
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
