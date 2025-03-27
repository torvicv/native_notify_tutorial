'use client';

import { signOut } from "next-auth/react";

const UserDashboard = (({user}) => {
    return (
        <>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>
                Logout
            </button>
        </>
    )    
});

export default UserDashboard;