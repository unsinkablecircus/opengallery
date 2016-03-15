import React from 'react';
import {Route} from 'react-router';
import App from './components/App'

// import component modules as needed

export default function getRoutes() {
  return (
    <Route path='/' component={App}>
    </Route>
  )
}