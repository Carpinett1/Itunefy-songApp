import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import LoadingPage from '../LoadingPage';

function Login() {
  const [login, setLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createUser({ name: login });
    if (response === 'OK') {
      navigate('/search');
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <main>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <input
          type="text"
          name="login"
          id="login"
          data-testid="login-name-input"
          value={ login }
          placeholder="qual é o seu nome?"
          onChange={ (e) => setLogin(e.target.value) }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ login.length <= 2 }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
