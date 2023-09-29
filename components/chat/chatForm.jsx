import "./chat.css";
import React, { useState } from "react";
import "../../Pages/script.js";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ChatUtils from "./chat.js";
import { useCookies } from "react-cookie";

const socket = ChatUtils.connect("ws://localhost:9999");

socket.onopen = () => {
  console.log("Conneté au serveur");
};

function ChatForm() {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie] = useCookies(["user-id"]);

  function handleClickSend(data) {
    data.user = cookies["user-id"];
    socket.send(JSON.stringify(data));
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleClickSend)}>
        <TextField
          {...register("message")}
          id="outlined-multiline-static"
          label="message"
          multiline
          maxRows={4}
          placeholder="Default Value"
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
}

export default ChatForm;
