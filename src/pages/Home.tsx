import { useAppSelector } from "../app/hooks";
import { useGetUsersQuery } from "../features/api/apiSlice";
import { useTranslation } from "react-i18next";
import "./Home.css";

// 1. Notice we REMOVED the DashboardLayout import entirely!
// 2. We REMOVED the logout logic because the Header handles it now.

export default function Home() {
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  // RTK Query handles loading, data, and error automatically!
  // skip the query if user is not ADMIN
  const { data: allUsers = [], isLoading, isError } = useGetUsersQuery(undefined, {
    skip: currentUser?.role !== "ADMIN"
  });

  if (!currentUser) {
    return null;
  }

  return (
    <div className="home-container">
      
      {/* Welcome Message specific to the Home page content area */}
      <h2 style={{ color: '#0f3a61', marginBottom: '24px' }}>
        {t("Welcome to the Tetra Pak Digital Platform")}
      </h2>

      {isError && <div className="error-alert">{t("Failed to load users")}</div>}

      {/* Admin View */}
      {currentUser.role === "ADMIN" ? (
        <div className="admin-panel">
          <div className="panel-header">
            <h3>{t("All Users (Admin View)")}</h3>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <span>{t("Loading...")}</span>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>{t("First Name")}</th>
                  <th>{t("Last Name")}</th>
                  <th>{t("Email")}</th>
                  <th>{t("Mobile")}</th>
                  <th>{t("Role")}</th>
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
        /* Operator View */
        <div className="profile-card">
          <h3>{t("My Profile (Operator View)")}</h3>
          <p><strong>{t("First Name")}:</strong> {currentUser.firstName}</p>
          <p><strong>{t("Last Name")}:</strong> {currentUser.lastName}</p>
          <p><strong>{t("Email")}:</strong> {currentUser.email}</p>
          <p><strong>{t("Mobile")}:</strong> {currentUser.mobile}</p>
          <p><strong>{t("Role")}:</strong> {currentUser.role}</p>
        </div>
      )}
    </div>
  );
}