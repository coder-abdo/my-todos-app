import axios from "axios";
import { useEffect } from "react";
export const Profile = () => {
  const getProfileData = async () => {
    try {
      axios({
        url: "http://localhost:5000/user/profile",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div>
      <h1>welcome you !!</h1>
    </div>
  );
};
