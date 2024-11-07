
import Navbar from '../../components/Navbar';

export default {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the navbar",
    },
  },
};


// Default navbar story
export const Component = {
  args: {},
};

// Light theme variant
export const LightTheme = {
  args: {
    className: 'bg-white',
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
 },
};

// Dark theme variant
export const DarkTheme = {
  args: {
    className: 'bg-gray-800',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

// Mobile viewport
export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// With custom brand name
export const CustomBrand = {
  args: {},
  render: () => (
    <Navbar>

    </Navbar>
  ),
};

// With additional actions
export const WithActions = {
  args: {},
  render: () => (
    <Navbar>
    </Navbar>
  ),
};