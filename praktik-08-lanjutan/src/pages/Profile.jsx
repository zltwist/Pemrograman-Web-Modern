import React from "react";

const Profile = () => {
  const username = localStorage.getItem("username");

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {username}!</p>
    </div>
  );
};

export default Profile;