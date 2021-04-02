import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { useStore } from "../../../store";
import styles from "./navbar.module.scss";
export const Navbar = observer(() => {
  const history = useHistory();
  const store = useStore();
  const logout = () => {
    Axios.get("http://localhost:5000/auth/logout")
      .then(() => {
        localStorage.removeItem("token");
        store.saveToken(null);
      })
      .then(() => {
        history.push("/login");
      })
      .catch((err) => console.error(err));
  };
  const GuestUser = () => (
    <>
      <li className={styles.navListItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navListItem}>
        <Link to="/login">Login</Link>
      </li>
      <li className={styles.navListItem}>
        <Link to="/register">Register</Link>
      </li>
    </>
  );
  const RegisteredUser = () => (
    <>
      <li className={styles.navListItem}>
        <Link to="/profile">profile</Link>
      </li>
      <li className={styles.navListItem}>
        <button onClick={logout}>logout</button>
      </li>
    </>
  );
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Home</Link>
      </div>
      <ul className={styles.navList}>
        {store.token ? <RegisteredUser /> : <GuestUser />}
      </ul>
    </nav>
  );
});
