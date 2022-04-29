// Package imports
import { Row, Col } from 'react-bootstrap';

// Local imports
import { useAuth } from '../context/AuthContext';
import Users from './Users';

export default function UsersContainer ({ users }) {
  const { currentUser } = useAuth();
  return (
    <Row
      xs={1}
      md={2}
      className='g-4 mt-auto'
    >
      {users.map(user => (
        user.uid === currentUser.uid
          ? null
          : (<Col key={user.name}>
            <Users user={user} />
          </Col>)
      ))}
    </Row>
  );
}
