// Package imports
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Local imports
import Signup from '../Authentication/Signup';
import userEvent from '@testing-library/user-event';
// import { postUser } from '../../services';

// Api to mock
// import firebase from 'firebase';
// jest.mock('firebase');
// const mockedFb = firebase;

const mockLogin = {
  name: "nick",
  email: "n@1.com",
  password: '123456',
  about: 'this is about me :)'
};

const mockSignup = jest.fn();
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => {
    return {
      signup: mockSignup
    }
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
    // render the component
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    //get the input fields
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    const aboutInput = screen.getByLabelText('Tell us something about yourself');
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    //populate the input fields
    userEvent.type(nameInput, mockLogin.name);
    userEvent.type(emailInput, mockLogin.email);
    userEvent.type(passwordInput, mockLogin.password);
    userEvent.type(confirmPasswordInput, mockLogin.password);
    userEvent.type(aboutInput, mockLogin.about);

    //check the input field were populated
    expect(nameInput.value).toBe(mockLogin.name);
    expect(emailInput.value).toBe(mockLogin.email);
    expect(passwordInput.value).toBe(mockLogin.password);
    expect(confirmPasswordInput.value).toBe(mockLogin.password);
    expect(aboutInput.value).toBe(mockLogin.about);

    // submit the form 
    await waitFor(async () => {
      //submit the form
      await userEvent.click(submitButton);
    });

    expect(mockSignup).toHaveBeenCalled();
  });

});