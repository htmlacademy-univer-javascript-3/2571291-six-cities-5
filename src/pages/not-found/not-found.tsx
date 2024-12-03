import { Routes } from '@/app';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>
      <Link to={Routes.MAIN}>Go to main page</Link>
    </div>
  );
}

export default NotFound;
