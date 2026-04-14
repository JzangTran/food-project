import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;

export function createStompClient() {
  if (stompClient) return stompClient;

  stompClient = new Client({
    webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
    reconnectDelay: 5000,
    debug: () => {},
  });

  return stompClient;
}