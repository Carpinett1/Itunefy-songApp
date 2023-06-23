import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { SongType } from '../types';
import MusicCardFavorites from '../components/MusicCardFavorites';

function Favorites() {
  const [favorites, setFavorites] = useState<SongType[]>([]);

  useEffect(() => {
    const api = async () => {
      const response = await getFavoriteSongs();
      setFavorites(response);
    };
    api();
  }, [favorites]);

  const favoritesList = favorites.map((song) => (
    <li key={ song.trackId }>
      <MusicCardFavorites
        song={ song }
        setFavorites={ setFavorites }
        favorites={ favorites }
      />
    </li>
  ));

  return (
    <>
      <h1>Meus Favoritos</h1>
      <ul>
        {favoritesList}
      </ul>
    </>
  );
}

export default Favorites;
