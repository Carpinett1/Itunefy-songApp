import { useEffect, useState } from 'react';
import checked from '../images/checked_heart.png';
import empty from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { SongType } from '../types';

type MusicCardProps = {
  song: SongType,
  favorites?: SongType[],
  fetchFavoriteList: () => void;
};

function MusicCard({ song, favorites = undefined, fetchFavoriteList }:MusicCardProps) {
  const { previewUrl, trackName, trackId } = song;
  const [favoriteMusic, setFavoriteMusic] = useState(false);

  useEffect(() => {
    if (!favorites) setFavoriteMusic(true);
    else {
      const isFavorite = favorites.find((elem) => song.trackId === elem.trackId);
      if (isFavorite) {
        setFavoriteMusic(true);
      }
    }
  }, [favorites, song.trackId]);

  const handleChange = () => {
    setFavoriteMusic(!favoriteMusic);
    if (favoriteMusic) {
      removeSong(song);
      fetchFavoriteList();
    } else {
      addSong(song);
      fetchFavoriteList();
    }
  };

  return (
    <>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ String(trackId) }>
        {favoriteMusic
          ? <img src={ checked } alt="favorite" />
          : <img src={ empty } alt="favorite" />}
      </label>
      <input
        type="checkbox"
        checked={ favoriteMusic }
        onChange={ handleChange }
        id={ String(trackId) }
      />
    </>
  );
}

export default MusicCard;
