// Package imports
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Local imports
import Signup from '../Authentication/Signup';

const mockLogin = {
  name: 'nick',
  email: 'n@1.com',
  password: '123456',
  about: 'this is about me :)'
};

// This is incomplete.
const mockSignup = jest.fn();
mockSignup.mockReturnValue({
  user: {
    uid: '1'
  }
});
console.log(mockSignup());

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => {
    return {
      signup: mockSignup
    };
  }
}
));

describe('Signup component', () => {
  test('should match the snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render the signup component', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    screen.getByLabelText('Name');
    screen.getByLabelText('E-mail');
    screen.getByLabelText('Password');
    screen.getByLabelText('Confirm password');
    screen.getByText('Tell us something about yourself');
    screen.getByRole('button');
  });

  test('should call signup with the correct credentials', async () => {
    // Render the component
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    // Get the input fields
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    const aboutInput = screen.getByLabelText('Tell us something about yourself');
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    // Populate the input fields
    await userEvent.type(nameInput, mockLogin.name, { delay: 1 });
    await userEvent.type(emailInput, mockLogin.email, { delay: 1 });
    await userEvent.type(passwordInput, mockLogin.password, { delay: 1 });
    await userEvent.type(confirmPasswordInput, mockLogin.password, { delay: 1 });
    await userEvent.type(aboutInput, mockLogin.about, { delay: 1 });

    // Check the input field were populated
    expect(nameInput.value).toBe(mockLogin.name);
    expect(emailInput.value).toBe(mockLogin.email);
    expect(passwordInput.value).toBe(mockLogin.password);
    expect(confirmPasswordInput.value).toBe(mockLogin.password);
    expect(aboutInput.value).toBe(mockLogin.about);

    // Submit the form
    await waitFor(async () => {
      await userEvent.click(submitButton);
    });

    expect(mockSignup).toHaveBeenCalled();
    expect(mockSignup.mock.calls[0][0]).toBe(mockLogin.email);
    expect(mockSignup.mock.calls[0][1]).toBe(mockLogin.password);
  });

});