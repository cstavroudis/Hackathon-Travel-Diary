import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AllEntries from "./components/AllEntries";
import EditEntry from "./components/EditEntry";
import AddEntry from "./components/AddEntry";
import SingleEntry from "./components/SingleEntry";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={AllEntries} />
      <Route exact path="/entries/:id" component={SingleEntry} />
      <Route path="/addEntry" component={AddEntry} />
      <Route path="/editEntry/:id" component={EditEntry} />
    </Switch>
  );
}

export default Routes;
