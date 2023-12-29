import { useSocket } from '@/context/SocketProvider';
import { useAppSelector } from '@/redux/store';
import React from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';

const NotificationDropdown = () => {
  const socket = useSocket();

  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const handleClick = async () => {
    if (!socket) return;
    socket.postNotification('Hi!!!');
  };

  return (
    <div>
      {signedInUser && (
        <MdOutlineNotificationsNone
          className="h-8 w-8 cursor-pointer"
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default NotificationDropdown;
