import React from "react";
// import { BiUserCircle } from "react-icons/bi";
import { format, register } from "timeago.js";

export default function Message({ message, own }) {
  register(
    "es_ES",
    (number, index, total_sec) =>
      [
        ["justo ahora", "ahora mismo"],
        ["hace %s segundos", "en %s segundos"],
        ["hace 1 minuto", "en 1 minuto"],
        ["hace %s minutos", "en %s minutos"],
        ["hace 1 hora", "en 1 hora"],
        ["hace %s horas", "in %s horas"],
        ["hace 1 dia", "en 1 dia"],
        ["hace %s dias", "en %s dias"],
        ["hace 1 semana", "en 1 semana"],
        ["hace %s semanas", "en %s semanas"],
        ["1 mes", "en 1 mes"],
        ["hace %s meses", "en %s meses"],
        ["hace 1 año", "en 1 año"],
        ["hace %s años", "en %s años"],
      ][index]
  );

  const timeago = (timestamp) => format(timestamp, "es_ES");

  return (
    <div
      className={own ? "align-self-end message m-3 py-1" : "message m-3 py-1"}
    >
      <div
        className={
          own ? "messageTop d-flex flex-row-reverse" : "messageTop d-flex"
        }
      >
        {/* <BiUserCircle
          className="mx-2"
          style={{ width: "60px", height: "30px" }}
        /> */}
        <p
          className={
            own
              ? "text-white bg-primary p-3 mx-2 mb-0 rounded"
              : "text-white bg-secondary p-3 mx-2 mb-0 rounded"
          }
        >
          {message.text}
        </p>
      </div>
      <div
        className={
          own ? "messageBottom text-end mx-3" : "messageBottom text-start mx-3"
        }
      >
        <span>{timeago(message.createdAt)}</span>
      </div>
    </div>
  );
}
