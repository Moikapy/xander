import ProfilePage from "../../views/profile"; // Adjust the import path as needed
import React from "react";
import { fn } from "@storybook/test";

// Default export configuration for Storybook
export default {
  title: "view/profile page",
  component: ProfilePage,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
};

// FullInfo Story: Displays profile with all fields populated
export const FullInfo = {
  args: {
    avatar:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    name: "Embro",
    handle: "embro_handle",
    bio: "I’m a developer focused on building AI tools and content, aiming to inspire and collaborate.",
  },
};

// MissingAvatar Story: Displays profile with no avatar, showing default image
export const MissingAvatar = {
  args: {
    name: "Embro",
    handle: "embro_handle",
    bio: "I’m a developer focused on building AI tools and content, aiming to inspire and collaborate.",
    avatar: "",
  },
};

// NameAndHandleOnly Story: Displays profile with only name and handle
export const NameAndHandleOnly = {
  args: {
    name: "Embro",
    handle: "embro_handle",
    bio: "",
    avatar: "",
  },
};

// DefaultFallbacks Story: Shows component with all fields empty, relying on default placeholders
export const DefaultFallbacks = {
  args: {
    name: "",
    handle: "",
    bio: "",
    avatar: "",
  },
};

// CustomStyledProfile Story: Custom story with specific branded information
export const CustomStyledProfile = {
  args: {
    avatar:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    name: "Moikas LLC",
    handle: "moikas",
    bio: "Dark fantasy coffee and AI studio creating epic gaming experiences.",
  },
};
