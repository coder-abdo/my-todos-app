import React, { ChangeEvent, FormEvent, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./register.module.scss";
export const Register = () => {
  const history = useHistory();
  /**
   *@var user
   * */
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errs, setErrs] = useState<string[]>([]);
  /**
   * @param event
   * @returns void
   * */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  /**
   * @description submit function that handle register call
   * @param event
   * @returns void
   * */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:5000/auth/register", {
        ...user,
      }).then(() => {
        history.push("/login");
      });
    } catch (err: unknown | any) {
      console.log(err.response.data.errors);
      setErrs(err.response.data.errors);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Register</h1>
      {errs &&
        errs.length > 0 &&
        errs.map((err: string, idx: number) => (
          <ul key={idx}>
            <li>{err}</li>
          </ul>
        ))}
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
        <label htmlFor="email">email:</label>
        <input
          type="email"
          className={styles.input}
          id="email"
          name="email"
          value={user.email}
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
        Register
      </button>
    </form>
  );
};
