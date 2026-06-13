import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Welcome to DevConnect
        </h1>

        <div className="space-y-3 mb-6">
          <h2 className="text-xl font-semibold">{user?.name}</h2>

          <p className="text-gray-600">{user?.email}</p>
        </div>

        <button
          onClick={logoutHandler}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;