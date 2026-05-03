import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { useGetUsersQuery } from "../features/api/apiSlice";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  // RTK Query handles loading, data, and error automatically!
  // skip the query if user is not ADMIN
  const { data: allUsers = [], isLoading, isError } = useGetUsersQuery(undefined, {
    skip: currentUser?.role !== "ADMIN"
  });

  const handleLogout = () => {
    dispatch(logout());          // clears Redux + localStorage automatically
    navigate("/");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <div>
          <h2>Home</h2>
          <p className="welcome-text">
            Welcome, {currentUser.firstName} ({currentUser.role})
          </p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {isError && <div className="error-alert">Failed to load users</div>}

      {currentUser.role === "ADMIN" ? (
        <div className="admin-panel">
          <div className="panel-header">
            <h3>All Users</h3>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <span>Loading...</span>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="profile-card">
          <h3>My Profile</h3>
          <p><strong>First Name:</strong> {currentUser.firstName}</p>
          <p><strong>Last Name:</strong> {currentUser.lastName}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Mobile:</strong> {currentUser.mobile}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
        </div>
      )}
    </div>
  );
}
