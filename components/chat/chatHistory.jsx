import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatUtils from "./chat.js";
import Chip from "@mui/material/Chip";
import "./chat.css";
import { useCookies } from "react-cookie";

import React, { useState } from "react";

const socket = ChatUtils.connect("ws://localhost:9999");
console.log(socket.id);

socket.onopen = () => {
  console.log("Conneté au serveur");
};

export default function ChatHistory() {
  const [messageList, setMessageList] = useState([]);
  const [cookies, setCookie] = useCookies(["user-id"]);
  function isOwnMessage(user) {
    if (cookies["user-id"] === user) return true;
    return false;
  }
  socket.onmessage = (event) => {
    setMessageList([...messageList, JSON.parse(event.data)]);
  };

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {messageList.map((data, index) => {
          return (
            <div>
              <ListItem alignItems="flex-start">
                {isOwnMessage(data.user) ? (
                  <>
                    <Chip
                      sx={{
                        height: "auto",
                        minHeight: "24px",
                        alignSelf: "end",
                        marginRight: "0.5rem",
                        "& .MuiChip-label": {
                          display: "block",
                          whiteSpace: "normal",
                        },
                      }}
                      label={data.message}
                    />
                    <ListItemAvatar className="avatar-own">
                      <Avatar
                        sx={{ width: 28, height: 28 }}
                        alt={data.user}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                  </>
                ) : (
                  <>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 28, height: 28 }}
                        alt={data.user}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="user-name-item-text"
                      primary={data.user}
                      secondary={data.message}
                    />
                  </>
                )}
              </ListItem>
            </div>
          );
        })}
      </List>
    </div>
  );
}
