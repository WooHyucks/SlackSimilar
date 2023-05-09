import { BrowserRouter, Switch, Route } from "react-router-dom";
import Slack from "./Slack";
import SlackParmas from "./SlackParmas";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:Id">
          <SlackParmas />
        </Route>
        <Route path="/">
          <Slack />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
