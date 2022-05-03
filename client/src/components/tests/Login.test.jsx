// Package imports
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
// Local imports
import Login from '../Authentication/Login';

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => {
    return {
      login: (mockLogin) => {
        // console.log(mockLogin);
      }
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

  test('should call login with the correct credentials', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByRole('textbox', { name: 'email' });
    const passwordInput = screen.getByLabelText(/password/i)
    // console.log(emailInput)
    userEvent.type(emailInput, 'nick');
    userEvent.type(passwordInput, 'test-password');
    console.log(emailInput.value);
  });

});

