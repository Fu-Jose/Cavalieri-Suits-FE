import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import axios from "axios";

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios("/users/" + friendId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="d-flex my-2 mx-2 align-items-center">
      {!user.pfp ? <BiUserCircle /> : <img src={user.pfp} alt="user profile" />}
      <span className="mx-2">{user.username}</span>
    </div>
  );
}
