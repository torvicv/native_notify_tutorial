'use client';

import { logout } from "@/app/actions/auth";

const AdminDashboard = (({user}) => {
    return (
        <>
        <h1>Hello admin {user.username}</h1>
        <button onClick={logout}>
          Logout
        </button>
      </>
    );
});

export default AdminDashboard;