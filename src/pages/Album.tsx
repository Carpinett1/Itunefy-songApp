import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingPage from '../components/LoadingPage';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/album.css';

function Album() {
  const initialState = {
    artistId: 0,
    artistName: '',
    collectionId: 0,
    collectionName: '',
    collectionPrice: 0,
    artworkUrl100: '',
    releaseDate: '',
    trackCount: 0,
    trackId: 0,
    trackName: '',
    previewUrl: '',
  };

  const [isLoading, setIsLoading] = useState(true);
  const [albumData, setAlbumData] = useState<[AlbumType, ...SongType[]]>([initialState]);
  const [favorites, setFavorites] = useState<SongType[]>([]);
  const { id } = useParams();
  const { artworkUrl100, artistName, collectionName } = albumData[0];

  useEffect(() => {
    const api = async () => {
      const response = await getMusics(String(id));
      const reponseFav = await getFavoriteSongs();
      setAlbumData(response);
      setFavorites(reponseFav);
      setIsLoading(false);
    };
    api();
  }, [id]);

  const musicCards = albumData.slice(1)
    .map((song) => (
      <li key={ song.trackId } className="album-music-card-container">
        <MusicCard
          song={ song }
          favorites={ favorites }
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
    <section className="album-page-container">
      <section className="album-data-container">
        <img src={ artworkUrl100 } alt="Album Logo" />
        <div className="album-title-container">
          <h2 data-testid="album-name">{collectionName}</h2>
          <div className="subdata-info">
            <h3 data-testid="artist-name">{artistName}</h3>
            <h3>{`${albumData[0].trackCount} Músicas`}</h3>
          </div>
        </div>
      </section>
      <section className="music-card-container">
        <ul>
          {musicCards}
        </ul>
      </section>
    </section>
  );
}

export default Album;
