import axios from "axios";
import { useEffect } from "react";

const Profile = () => {

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();

  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default Profile;