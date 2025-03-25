'use client';

import { logout } from "@/app/actions/auth";

const UserDashboard = (({user}) => {
    return (
        <>
            <h1>Hello {user.username}</h1>
            <button onClick={logout}>
                Logout
            </button>
        </>
    )    
});

export default UserDashboard;