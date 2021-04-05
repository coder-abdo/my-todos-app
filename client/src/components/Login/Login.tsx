import { ChangeEvent, FormEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import styles from "./login.module.scss";
import { SocialBtn } from "../commons/SocialBtn";
import { useStore } from "../../store";
export const Login = observer(() => {
  const history = useHistory();
  const store = useStore();
  const [user, setUser] = useState({ username: "", password: "" });
  const [err, setError] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", user)
      .then((res) => {
        Cookie.set("token", res.data.token);
        store.saveToken(res.data.token);
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err?.response.data);
        setError("username or passowrd invalid");
      });
    setUser({ username: "", password: "" });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}> welcome back </h1>
      {err && <h3 className={styles.errMsg}>{err}</h3>}
      <SocialBtn socialClass={styles.social}>
        <svg
          className={`${styles.socialIcon} ${styles.googleIcon}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z" />
        </svg>
        <span className={styles.socialText}>login by google</span>
      </SocialBtn>
      <SocialBtn socialClass={styles.social}>
        <svg
          className={`${styles.socialIcon} ${styles.fbIcon}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
        </svg>
        <span className={styles.socialText}>login by facebook</span>
      </SocialBtn>
      <div>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          className={styles.input}
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <button className={styles.submitBtn} type="submit">
        login
      </button>
    </form>
  );
});
