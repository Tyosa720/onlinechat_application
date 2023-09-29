import React from "react";

import ChatHistory from "../../components/chat/chatHistory";
import ChatForm from "../../components/chat/chatForm";

function Chat() {
  return (
    <div>
      <ChatHistory></ChatHistory>
      <ChatForm></ChatForm>
    </div>
  );
}

export default Chat;
