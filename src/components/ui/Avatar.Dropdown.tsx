import React from "react";
import { Dropdown } from "@nextui-org/react";
import { SignOutButton, useUser } from "@clerk/nextjs";
const AvatarDropdown = () => {
  const { user } = useUser();
  return (
    <Dropdown>
      <Dropdown.Trigger>
        {user && (
          <div className="flex items-center justify-center space-x-2 mx-1">
            <img
              src={user.profileImageUrl}
              alt="profile image"
              className="h-12 w-12 rounded-full border-2 p-[2px] border-blue-700"
            />
          </div>
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu aria-label="Static Actions" color="success">
        <Dropdown.Item key="new">new</Dropdown.Item>
        <Dropdown.Item key="copy">Copy link</Dropdown.Item>
        <Dropdown.Item key="edit">Edit file</Dropdown.Item>
        <Dropdown.Item key="delete" withDivider color="error">
          <SignOutButton>Sign Out</SignOutButton>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AvatarDropdown;
