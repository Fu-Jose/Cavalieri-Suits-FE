import React, { useState, useEffect, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "../../client/backend";
import Conversations from "./Conversations";
import Message from "./Message";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { user } = useSelector((state) => state.userInfo);
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(
          `/api/chat/conversations/` + user._id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(
          "/api/chat/messages/" + currentChat._id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.length > 0) {
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.post("/api/chat/messages", message, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {!user ? (
        <div
          className="alert alert-danger container text-center col-2 my-5"
          role="alert"
        >
          Su sesión ha caducado. Cierre sesión y vuelva a intentarlo.
        </div>
      ) : (
        <div className="row mx-auto col-12 col-md-10">
          <div className="col-3 my-5 px-4">
            <strong className="fs-4">CLIENTES</strong>
            <input
              className="rounded border mt-3 mb-2 mx-1 p-1"
              placeholder="Buscar un cliente"
            />
            {conversations.map((c) => (
              <div
                onClick={() => setCurrentChat(c)}
                style={{ cursor: "pointer" }}
              >
                <Conversations
                  key={c._id}
                  conversation={c}
                  currentUser={user}
                />
              </div>
            ))}
          </div>
          <div className="col-9 p-4 my-3 justify-content-evenly bg-light">
            {currentChat ? (
              <>
                <div
                  className="chatBoxTop d-flex flex-column rounded overflow-auto bg-light"
                  style={{ height: "400px" }}
                >
                  {messages.length > 0 ? (
                    messages.map((m) => (
                      <div key={m._id} ref={scrollRef}>
                        <Message
                          key={m._id}
                          message={m}
                          own={m.sender === user._id}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center mt-5">
                      Historial vacío. Envía un mensaje...
                    </div>
                  )}
                </div>
                <div className="chatBoxBottom d-flex pt-4">
                  <textarea
                    className="form-control m-3"
                    placeholder="Escriba un mensaje..."
                    rows="2"
                    style={{ resize: "none" }}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="btn btn-primary rounded-circle my-4"
                    onClick={handleSubmit}
                  >
                    <BiSend />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center mt-5">
                Historial vacío. Envía un mensaje...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
