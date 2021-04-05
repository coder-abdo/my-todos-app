import { ChangeEvent, FormEvent, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styles from "./register.module.scss";
export const Register = () => {
  const history = useHistory();
  /**
   * @var user
   * @var errs
   * */
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errs, setErrs] = useState<string[]>([]);
  const [image, setImage] = useState<any>("");

  /**
   * @param event
   * @returns void
   * */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fils = e.target.files as any;
    setImage(fils[0]);
  };
  /**
   * @description submit function that handle register call
   * @param event
   * @returns void
   * */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("avatar", image);
    try {
      Axios({
        url: "http://localhost:5000/auth/register",
        data: formData,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      } as any).then((data) => {
        console.log(data.data);
        history.push("/login");
      });
    } catch (err: unknown | any) {
      console.log(err, err.response.data.errors);
      setErrs(err.response.data.errors);
      throw err;
    }
    setUser({ username: "", email: "", password: "" });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Register</h1>
      {errs && errs.length > 0 && (
        <ul className={styles.errsList}>
          {errs.map((err: string, idx: number) => (
            <li key={idx} className={styles.errsListItem}>
              {err}
            </li>
          ))}
        </ul>
      )}

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
      <div className={styles.emailContainer}>
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
      <div className={styles.fileContianer}>
        <input
          type="file"
          className={styles.fileInput}
          name="file"
          id="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file" className={styles.fileLabel}>
          image upload
        </label>
      </div>
      <button className={styles.submitBtn} type="submit">
        Register
      </button>
      <Link to="/login">already have an account?</Link>
    </form>
  );
};
