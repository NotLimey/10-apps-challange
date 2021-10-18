import React from 'react'
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import CountDownTimer from './pages/CountDownTimer';
import DrawingApp from './pages/DrawingApp';
import GithubProfiles from './pages/GithubProfiles';
import NotesApp from './pages/NotesApp';
import QuizApp from './pages/QuizApp';
import RecipeApp from './pages/RecipeApp';
import TodoApp from './pages/TodoApp';
import './scss/main.scss';

const App = () => {
    return (
      <Switch>
        <Route exact path="/">
          <div className="projects">
            <Link to="/CountDownTimer">CountdownTimer</Link><br />
            <Link to="/QuizApp">QuizApp</Link><br />
            <Link to="/RecipeApp">RecipeApp</Link><br />
            <Link to="/NotesApp">NotesApp</Link><br />
            <Link to="/TodoApp">TodoApp</Link><br />
            <Link to="/GithubProfiles">GithubProfiles</Link><br />
            <Link to="/DrawingApp">DrwaingApp</Link><br />
          </div>
        </Route>
        <Route exact path="/CountDownTimer">
          <CountDownTimer />
        </Route>
        <Route exact path="/QuizApp">
          <QuizApp />
        </Route>
        <Route path="/RecipeApp">
          <RecipeApp />
        </Route>
        <Route exact path="/NotesApp">
          <NotesApp />
        </Route>
        <Route exact path="/TodoApp">
          <TodoApp />
        </Route>
        <Route exact path="/GithubProfiles">
          <GithubProfiles />
        </Route>
        <Route exact path="/DrawingApp">
          <DrawingApp />
        </Route>
      </Switch>
    )
}

export default App;