//Code that starts app goes here
//React modules
const React = require('react');
const ReactDOM = require('react-dom');
// const { Router, Route, Link, IndexRoute, hashHistory, RouterContext } = require('react-router');

//import components here
// const Nav = require('./nav/nav');

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
    <div className='app-shell'>
      <div className=''>
        <div className=''>
          <h1>{'Hello, World!'}</h1>
        </div>
      </div>
    </div>
    );
  }

};

ReactDOM.render( <App />, document.getElementById('app'));