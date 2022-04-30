// Package imports
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Local imports
import Signup from '../Authentication/Signup';

const mockLogin = {
  name: "nick",
  email: "n@1.com",
  password: '123456'

};

jest.mock('../../context/AuthContext.js', () => ({
  useAuth: () => {
    return {
      signup: (email, password ) => {
      return {
        user: {
          uid: '12345'
        }
      }
    }
  } 
  }
}));

jest.mock('../../services', () => ({
  postUser: (user) => {
    console.log(user);
  } 
}));

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
    screen.getByText('Name');
    screen.getByText('E-mail');
    screen.getByText('Password');
    screen.getByText('Confirm password');
    screen.getByText('Tell us something about yourself');
    screen.getByRole('button');
  });

});