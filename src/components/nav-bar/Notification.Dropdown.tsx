/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from '@/redux/store';
import React from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/Menu.Bar';
import { useQuery } from '@tanstack/react-query';
import {
  notificationApiEndpoint,
  notificationApiEndpointDevelopment,
} from '@/utils/apiEndpoints';
import { Link } from 'lucide-react';
import { INotification } from '@/types/notification';

const NotificationDropdown = () => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const { data: notifications, isLoading } = useQuery({
    queryKey: [`notification-${signedInUser?.id}`],
    enabled: !!signedInUser?.id,
    queryFn: async () => {
      const { data } = await (
        await fetch(
          `${notificationApiEndpointDevelopment}/api/v1/notification/${signedInUser?.id}`
        )
      ).json();
      // http://localhost:5001/api/v1/notification/657da9bb6aee60b5250517ab

      console.log(data);
      return data;
    },
  });

  const styles = {
    menuBarItems:
      'cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-800 font-semibold',
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="!bg-transparent">
          {signedInUser && (
            <MdOutlineNotificationsNone className="h-8 w-8 cursor-pointer" />
          )}
        </MenubarTrigger>
        <MenubarContent
          align="center"
          className="bg-slate-100 mx-2 mt-1 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 w-[300px] rounded"
        >
          {/* {notifications &&
            notifications.map((notification: INotification, index: number) => (
              <MenubarItem key={index} className={styles.menuBarItems}>
                <Link
                  className="flex space-x-3 items-center justify-center"
                  href={notification.link}
                >
                  <img
                    src={notification.initiator.image}
                    className="w-12 h-12 rounded"
                  />
                  <p>{notification.text}</p>
                </Link>
              </MenubarItem>
            ))} */}
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

// <MdOutlineNotificationsNone className="h-8 w-8 cursor-pointer" />

export default NotificationDropdown;
