import { Outlet } from 'react-router-dom';
import Header from './Header';
import '../styles/layout.css';

function Layout() {
  return (
    <div className="page">
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
