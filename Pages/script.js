const socket = new WebSocket("ws://localhost:9999");
socket.onopen = () => {
  console.log("Conneté au serveur");
};
socket.onmessage = (event) => {
  console.log(event);
};
export default socket;
