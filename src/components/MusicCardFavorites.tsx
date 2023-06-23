import { useState } from 'react';
import checked from '../images/checked_heart.png';
import empty from '../images/empty_heart.png';
import { removeSong } from '../services/favoriteSongsAPI';
import { SongType } from '../types';

type MusicCardProps = {
  song: SongType,
  favorites: SongType[],
  setFavorites: (array:SongType[]) => void
};

function MusicCardFavorites({ song, favorites, setFavorites }:MusicCardProps) {
  const { previewUrl, trackName, trackId } = song;
  const [favoriteMusic, setFavoriteMusic] = useState(true);

  const callback = () => {
    const newData = favorites.filter((elem) => elem.trackId === song.trackId);
    setFavorites(newData);
  };

  const handleChange = () => {
    callback();
    removeSong(song);
    setFavoriteMusic(false);
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

export default MusicCardFavorites;
