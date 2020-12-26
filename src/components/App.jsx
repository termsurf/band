
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Home from './Home'
import Song from './Song'
import About from './About'

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/code/home" component={About} />
        <Route exact path="/tune/:id" component={Song} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default App
