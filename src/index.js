import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Story from './components/Story'
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

ReactDOM.render(<Story />, document.getElementById('root'));
