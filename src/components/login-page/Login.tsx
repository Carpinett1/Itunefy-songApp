import { useState } from 'react';
import { createUser } from '../../services/userAPI';
import LoadingPage from '../LoadingPage';

function Login() {
  const [login, setLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await createUser({ name: login });
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <main>
      <h1>Pagina de Login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="login"
          id="login"
          data-testid="login-name-input"
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
