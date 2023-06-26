import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      setUserData(response);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <main>
      <img src={ userData.image } data-testid="profile-image" alt="Foto do usuario" />
      <Link to="/profile/edit">Editar perfil</Link>
      <h3>Nome</h3>
      <p>{userData.name}</p>
      <h3>Email</h3>
      <p>{userData.email}</p>
      <h3>Descrição</h3>
      <p>{userData.description}</p>
    </main>
  );
}

export default Profile;
