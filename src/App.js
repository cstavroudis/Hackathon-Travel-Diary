import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AllEntries from "./components/AllEntries";
import EditEntry from "./components/EditEntry";
import AddEntry from "./components/AddEntry";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={AllEntries} />
          <Route path="/addEntry" component={AddEntry} />
          <Route path="/editEntry/:id" component={EditEntry} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
