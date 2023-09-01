import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import LoadingPage from './LoadingPage';
import '../styles/header.css';
import logo from '../images/logo.svg';
import profile from '../images/profile.svg';

function Header() {
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      setUser(response);
      setIsLoading(false);
    };
    fetchUser();
  }, [user]);

  if (isLoading) {
    return (
      <header className="header-container-loading">
        <LoadingPage />
      </header>
    );
  }

  return (
    <header data-testid="header-component" className="header-container">
      <h2>
        <img src={ logo } alt="logo" />
        itunefy
      </h2>
      <nav className="link-container">
        <NavLink data-testid="link-to-search" to="/search">Pesquisar</NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      </nav>
      <div className="user-container">
        <img src={ user.image ? user.image : profile } alt="Foto do Usuario" />
        <p data-testid="header-user-name">{user.name}</p>
      </div>
    </header>
  );
}

export default Header;
