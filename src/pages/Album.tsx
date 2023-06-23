import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingPage from '../components/LoadingPage';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from '../components/MusicCard';

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
  const { id } = useParams();
  const { artworkUrl100, artistName, collectionName } = albumData[0];

  useEffect(() => {
    const api = async () => {
      const response = await getMusics(String(id));
      setAlbumData(response);
      setIsLoading(false);
    };
    api();
  }, [id]);

  const musicCards = albumData.slice(1)
    .map((song) => (
      <li key={ song.trackId }>
        <MusicCard
          previewUrl={ song.previewUrl }
          trackName={ song.trackName }
        />
      </li>
    ));

  return (
    <main>
      { isLoading && <LoadingPage /> }
      { !isLoading
        && (
          <>
            <div>
              <img src={ artworkUrl100 } alt="Album Logo" />
              <h2 data-testid="artist-name">{artistName}</h2>
              <h3 data-testid="album-name">{collectionName}</h3>
            </div>
            <div>
              <ul>
                {musicCards}
              </ul>
            </div>
          </>
        )}
    </main>
  );
}

export default Album;
