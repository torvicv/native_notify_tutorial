'use client';

import { signOut } from "next-auth/react";

const AdminDashboard = (({user}) => {
    return (
        <>
        <h1>Hello admin {user.username}</h1>
        <button onClick={signOut}>
          Logout
        </button>
      </>
    );
});

export default AdminDashboard;