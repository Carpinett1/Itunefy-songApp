import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { SongType } from '../types';
import MusicCardFavorites from '../components/MusicCardFavorites';
import LoadingPage from '../components/LoadingPage';
import '../styles/favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateFavList = async () => {
    setIsLoading(true);
    const response = await getFavoriteSongs();
    setFavorites(response);
    setIsLoading(false);
  };

  useEffect(() => {
    updateFavList();
  }, []);

  const favoritesList = favorites.map((song) => (
    <li className="favorites-songs-container" key={ song.trackId }>
      <MusicCardFavorites
        song={ song }
        updateFavList={ updateFavList }
      />
    </li>
  ));

  if (isLoading) {
    return (
      <section className="loading-container">
        <LoadingPage />
      </section>
    );
  }

  return (
    <section className="favorites-container">
      <h1>Meus Favoritos</h1>
      <hr />
      <ul>
        {favoritesList}
      </ul>
    </section>
  );
}

export default Favorites;
