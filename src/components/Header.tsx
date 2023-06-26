import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import LoadingPage from './LoadingPage';

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
  }, []);

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <header data-testid="header-component">
      <h2>TrybeTunes</h2>
      <nav>
        <NavLink data-testid="link-to-search" to="/search">Pesquisar</NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      </nav>
      <img src={ user.image } alt="Foto do Usuario" />
      <p data-testid="header-user-name">{user.name}</p>
    </header>
  );
}

export default Header;
