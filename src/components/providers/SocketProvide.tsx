"use client";

import { mainEndPoint } from "@/utils/apiEndpoints";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io as SocketIOClient } from "socket.io-client";

interface ISocketContext {
  socket: any | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvide = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socketInstance = new (SocketIOClient as any)(mainEndPoint, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvide;
