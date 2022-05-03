// Package imports
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Local imports
import Login from '../Authentication/Login';

// mock credentials
const mockLoginCredentialsHappy = {
  email: 'test@mock.com',
  password: 'test-password'
}

//mock functions
const mockLoginFn = jest.fn()
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => {
    return {
      login: mockLoginFn
    }
  }
}));

describe('Login component', () => {

  test('should match the snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render the login component', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    screen.getByText('E-mail');
    screen.getByText('Password');
    screen.getByRole('button');
  });

  test('should call login with the correct credentials', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByRole('textbox', { name: 'email' });
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /log in/i });

    await userEvent.type(emailInput, mockLoginCredentialsHappy.email, { delay: 1 });
    await userEvent.type(passwordInput, mockLoginCredentialsHappy.password, { delay: 1 });

    // submit the login form 
    await waitFor(async () => {
      await userEvent.click(loginButton);
    });

    // assertions
    expect(mockLoginFn).toHaveBeenCalled();
    expect(mockLoginFn.mock.calls[0][0]).toBe(mockLoginCredentialsHappy.email);
    expect(mockLoginFn.mock.calls[0][1]).toBe(mockLoginCredentialsHappy.password);
  });


  test('should set an error message if login credentials are missing values', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /log in/i });

    await userEvent.type(passwordInput, mockLoginCredentialsHappy.password, { delay: 1 });

    // submit the login form 
    await waitFor(async () => {
      await userEvent.click(loginButton);
    });

    //check the login function was not called and an error was set
    await expect(mockLoginFn).not.toHaveBeenCalled();
    expect(screen.getByRole('alert').textContent).toBe('Email and password are required')
  });
});

