import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatUtils from "./chat.js";

import React, { useState } from "react";

const socket = ChatUtils.connect("ws://localhost:9999");
console.log(socket);

socket.onopen = () => {
  console.log("Conneté au serveur");
};

export default function ChatHistory() {
  const [messageList, setMessageList] = useState([]);

  socket.onmessage = (event) => {
    setMessageList([...messageList, { data: event.data }]);
    console.log(event.data);
  };

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {messageList.map((message, index) => {
          console.log(messageList);
          return (
            <div>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary="Robert" secondary={message.data} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
      </List>
    </div>
  );
}
