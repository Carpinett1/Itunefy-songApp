import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import { getUser, updateUser } from '../services/userAPI';
import { UserType } from '../types';

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserType>({
    name: '',
    email: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      setUserData(response);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const update = async () => {
      setIsLoading(true);
      const response = await updateUser(userData);
      if (response === 'OK') navigate('/profile');
    };
    update();
  };

  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validateForm = userData.name.length > 1
    && regexEmail.test(userData.email)
    && userData.description.length > 1;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <form onSubmit={ handleSubmit }>
        <img src={ userData.image } alt="Foto do usuário" />
        <input
          type="text"
          name="image"
          id="image"
          placeholder="Insira um link"
          data-testid="edit-input-image"
          value={ userData.image }
          onChange={ handleChange }
        />
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          name="name"
          id="name"
          data-testid="edit-input-name"
          value={ userData.name }
          onChange={ handleChange }
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          data-testid="edit-input-email"
          value={ userData.email }
          onChange={ handleChange }
        />
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          name="description"
          id="description"
          data-testid="edit-input-description"
          value={ userData.description }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ !validateForm }
        >
          Salvar
        </button>
      </form>
    </main>
  );
}

export default ProfileEdit;
