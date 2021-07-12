import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import BasicPets from "../src/components/BasicPets";
import ThePets from "./components/ThePets";
import client from "./client"
import Fragment from "./components/Fragment"
import OptimisticPets from "./components/OptimisticUI";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const Routing = () => {
  return (
    <Router>
      <div>
        <li>
          <Link to="/">Update from mutation</Link>
        </li>
        <li>
          <Link to="/basicPets">Basic Pets</Link>
        </li>
        <li>
          <Link to="/optimistic">Optimistic UI</Link>
        </li>
        <li>
          <Link to="/fragment">Fragment</Link>
        </li>
      </div>
      <Switch>
        <Route exact path="/" component={ThePets} />
        <Route path="/basicPets" component={BasicPets} />
        <Route path="/optimistic" component={OptimisticPets} />
        <Route path="/fragment" component={Fragment} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routing />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
