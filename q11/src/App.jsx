import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './redux/userSlice';
import { Spinner } from '@chakra-ui/react';

const HomePage = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </div>
      ))}
    </div>
  );
};

const UserDetailsPage = ({ id }) => {
  const user = useSelector((state) => state.users.users.find((u) => u.id === parseInt(id)));

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address.street}, {user.address.city}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/:id" element={({ match }) => <UserDetailsPage id={match.params.id} />} />
    </Routes>
  </Router>
);

export default App;