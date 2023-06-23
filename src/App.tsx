import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <h1>Favorites</h1> } />
        <Route path="/profile" element={ <h1>Profile</h1> } />
        <Route path="/profile/edit" element={ <h1>ProfileEdit</h1> } />
        <Route path="/*" element={ <h1>Not Found</h1> } />
      </Route>
    </Routes>
  );
}

export default App;
