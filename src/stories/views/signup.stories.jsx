import Signup from '../../views/signup';

export default {
  title: 'view/Signup',
  component: Signup,
  tags: ['autodocs'],
  argTypes: {
    handleSignup: {action: 'signup submitted'},
    error: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

// Default state
export const Default = {
  args: {
    handleSignup: (data) => console.log('Signup submitted:', data),
    error: null,
  },
}

// Error state
export const WithError = {
  args: {
    handleSignup: (data) => console.log('Signup submitted:', data),
    error: 'Invalid email address format',
  },
};

// Loading state simulation
export const Loading = {
  args: {
    handleSignup: () => new Promise((resolve) => setTimeout(resolve, 2000)),
    error: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulates the loading state when the form is being submitted',
      },
    },
  },
};

// Playing test example
export const FilledForm = {
  args: {
    handleSignup: (data) => console.log('Signup submitted:', data),
    error: null,
  },
  play: async ({canvasElement, args}) => {
    const canvas = within(canvasElement);

    // Fill in the email field
    const emailInput = canvas.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@example.com', {
      delay: 100,
    });

    // Fill in the password field
    const passwordInput = canvas.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123', {
      delay: 100,
    });

    // Submit the form
    const submitButton = canvas.getByRole('button', {name: /sign up/i});
    await userEvent.click(submitButton);

    // Verify the handleSignup was called with correct data
    await waitFor(() => {
      expect(args.handleSignup).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  },
};
