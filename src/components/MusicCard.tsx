import { useState } from 'react';
import checked from '../images/checked_heart.png';
import empty from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { SongType } from '../types';

type MusicCardProps = {
  song: SongType,
};

function MusicCard({ song }:MusicCardProps) {
  const { previewUrl, trackName, trackId } = song;
  const [favoriteMusic, setFavoriteMusic] = useState(false);

  const handleChange = () => {
    setFavoriteMusic(!favoriteMusic);
    if (favoriteMusic) {
      removeSong(song);
    } else {
      addSong(song);
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
