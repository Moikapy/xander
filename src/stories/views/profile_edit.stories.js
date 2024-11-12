import ProfileEdit from "../../views/profile_edit";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "view/profile edit",
  component: ProfileEdit,
  // parameters: {
  //   // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  //   layout: "centered",
  // },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const View = {
  args: {},
};
// Story where all fields are pre-filled to simulate an existing user profile
export const FilledProfile = {
  args: {
    user_name: "John Doe",
    name: "John Doe",
    handle: "@johndoe",
    bio: "Coffee lover and tech enthusiast.",
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
};

// Story where the user is in the process of editing their profile
export const EditingProfile = {
  args: {
    user_name: "Jane Doe",
    name: "Jane Doe",
    handle: "@janedoe",
    bio: "Gamer, developer, and AI enthusiast.",
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
};

// Story to show the profile with a background color customization option
export const CustomBackground = {
  args: {
    user_name: "Alex Smith",
    name: "Alex Smith",
    handle: "@alexsmith",
    bio: "Designer and traveler.",
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    backgroundColor: "#f0f0f0", // Custom background color
  },
  parameters: {
    backgrounds: {
      default: "custom",
      values: [
        { name: "custom", value: "#f0f0f0" },
      ],
    },
  },
};