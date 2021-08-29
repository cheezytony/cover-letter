import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CoverLetterPage from './pages/CoverLetter';
import Edit from './pages/Edit';
import Invoice from './pages/Invoice';
import './App.sass';
import { getItem } from './utils/local-storage';
import { CoverLetter, updateCoverLetter } from './store';

function App() {
  const dispatch = useDispatch();
  const data = getItem<CoverLetter>('cover-letter-data');

  dispatch(updateCoverLetter(data));

  return (
    <div className="app">
      <div className="app__container">
        <Router>
          <Switch>
            <Route exact path="/">
              <CoverLetterPage />
            </Route>
            <Route path="/edit">
              <Edit />
            </Route>
            <Route path="/invoice">
              <Invoice />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
