'use client';

import { useAppSelector } from '@/redux/store';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  postNotification: (msg: string) => any;
  messages: string[];
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);

  return state;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const postNotification: ISocketContext['postNotification'] = useCallback(
    (msg) => {
      if (socket) {
        socket.emit('event: postNotification', {
          message: msg,
        });
      }
    },
    [socket]
  );

  const onMessageRec = useCallback((msg: string) => {
    console.log('from Server', msg);
  }, []);

  useEffect(() => {
    if (!signedInUser?.id) return;

    const _socket = io('http://localhost:5001', {
      query: { userId: signedInUser.id },
    });
    _socket.on('message', onMessageRec);
    setSocket(_socket);

    return () => {
      _socket.disconnect();
      _socket.off('message', onMessageRec);
      setSocket(undefined);
    };
  }, [signedInUser]);

  return (
    <SocketContext.Provider value={{ postNotification, messages: [] }}>
      {children}
    </SocketContext.Provider>
  );
};
