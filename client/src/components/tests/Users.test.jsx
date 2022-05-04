// Package imports
import { render, screen } from '@testing-library/react';

// Local imports
import Users from '../Users';

const mockUser = {
  name: 'blue',
  img: '',
  about: 'I\'m blue da ba dee da ba die!'
};

describe('Users component', () => {
  test('should match the snapshot', () => {
    const { container } = render(<Users user={mockUser} />);
    expect(container).toMatchSnapshot();
  });

  test('should render the user card', async () => {
    render(<Users user={mockUser} />);
    const userName = await screen.findByText(mockUser.name);
    const aboutTitle = await screen.findByText(/About me/i);
    const userAbout = await screen.findByText(mockUser.about);
    expect(userName.textContent).toBe(mockUser.name);
    expect(aboutTitle.textContent).toBe('About me');
    expect(userAbout.textContent).toBe(mockUser.about);
  });
});