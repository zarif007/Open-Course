'use client';

import { notificationToast } from '@/components/ui/Notification.Toast';
import { useAppSelector } from '@/redux/store';
import { INotification } from '@/types/notification';
import {
  notificationApiEndpoint,
  notificationApiEndpointDevelopment,
} from '@/utils/apiEndpoints';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  postNotification: (msg: INotification) => any;
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
    (notification) => {
      if (socket) {
        socket.emit('event: postNotification', {
          message: notification,
          receiver: notification.receiver,
        });
      }
    },
    [socket]
  );

  const onMessageRec = useCallback((notification: string) => {
    const data = JSON.parse(notification).message;
    notificationToast({
      title: 'Replied',
      message: data.text,
      link: data.link,
      image: data.initiator.image,
    });
  }, []);

  useEffect(() => {
    if (!signedInUser?.id) return;

    const _socket = io(notificationApiEndpoint, {
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
