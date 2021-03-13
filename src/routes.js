import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AllEntries from "./components/AllEntries";
import AllTrips from "./components/AllTrips";
import EditEntry from "./components/EditEntry";
import AddEntry from "./components/AddEntry";
import SingleEntry from "./components/SingleEntry";

function Routes() {
  return (
    <Switch>
      <Route exact path="/trips" component={AllTrips} />
      <Route exact path="/trips/:id/entries" component={AllEntries} />
      <Route exact path="/:id/entries/:id" component={SingleEntry} />
      <Route path="/:id/entries/add" component={AddEntry} />
      <Route path="/:id/entries/:id/edit" component={EditEntry} />
    </Switch>
  );
}

export default Routes;
