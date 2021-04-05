import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import styles from "./app.module.scss";
import { Navbar } from "./components/commons/Navbar/Navbar";
import { Register } from "./components/Register/Register";
import { useStore } from "./store";
import { PrivateRoute } from "./components/commons/ProtectedRoute";
import { Profile } from "./components/Profile/Profile";
function App() {
  const store = useStore();
  return (
    <div className={styles.wrapper}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            path="/profile"
            isAuthenticated={store.token ? true : false}
            component={Profile}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default observer(App);
