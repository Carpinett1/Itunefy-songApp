import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { SongType } from '../types';
import MusicCard from '../components/MusicCard';

function Favorites() {
  const [favorites, setFavorites] = useState<SongType[]>([]);

  const fetchFavoriteList = async () => {
    const response = await getFavoriteSongs();
    setFavorites(response);
  };

  useEffect(() => {
    fetchFavoriteList();
  }, []);

  const favoritesList = favorites.map((song) => (
    <li key={ song.trackId }>
      <MusicCard song={ song } fetchFavoriteList={ fetchFavoriteList } />
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
