import { useAppSelector } from '@/redux/store';
import React from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';

const NotificationDropdown = () => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );
  return (
    <div>
      {signedInUser && (
        <MdOutlineNotificationsNone className="h-8 w-8 cursor-pointer" />
      )}
    </div>
  );
};

export default NotificationDropdown;
