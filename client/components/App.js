const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div className='app'>
        <div className="">
          <div className="">
            {'Hello, WOr'}
          </div>
        </div>
      </div>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('app'));