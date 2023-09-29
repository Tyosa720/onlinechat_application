function ChatUtils() {}

let socket = null;

ChatUtils.connect = (link) => {
  if (socket != null) {
    console.log("deja connecte");
    return socket;
  }
  console.log("pas co");
  socket = new WebSocket(link);
  return socket;
};

ChatUtils.getSessionList = () => {
  console.log(socket);
};

export default ChatUtils;
