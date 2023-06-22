import { Route, Routes } from 'react-router-dom';
import Login from './components/login-page/Login';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/search" element={ <h1>Search</h1> } />
        <Route path="/album/:id" element={ <h1>Album</h1> } />
        <Route path="/favorites" element={ <h1>Favorites</h1> } />
        <Route path="/profile" element={ <h1>Profile</h1> } />
        <Route path="/profile/edit" element={ <h1>ProfileEdit</h1> } />
        <Route path="/*" element={ <h1>Not Found</h1> } />
      </Routes>
    </>
  );
}

export default App;
