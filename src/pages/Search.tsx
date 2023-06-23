import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AlbumType[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLastSearch(searchInput);
    setIsLoading(true);
    const response = await searchAlbumsAPI(searchInput);
    setSearchInput('');
    setIsLoading(false);
    setShowResults(true);
    setResults(response);
  };

  const resultsList = results
    .map((album) => (
      <li key={ album.collectionId }>
        <p>{album.artistName}</p>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <h3>{album.collectionName}</h3>
        </Link>
      </li>));

  return (
    <main>
      {
        isLoading
          ? <LoadingPage />
          : (
            <>
              <form onSubmit={ (e) => handleSubmit(e) }>
                <input
                  type="text"
                  name="search-artist-input"
                  id="search-artist-input"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                  value={ searchInput }
                  onChange={ (e) => setSearchInput(e.target.value) }
                />
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ searchInput.length <= 1 }
                >
                  Procurar
                </button>
              </form>
              { showResults
                && (results.length > 0 ? (
                  <section>
                    <h2>{`Resultado de álbuns de: ${lastSearch}`}</h2>
                    <ul>
                      {resultsList}
                    </ul>
                  </section>
                ) : (
                  <section>
                    <h2>{`Resultado de álbuns de: ${lastSearch}`}</h2>
                    <h3>Nenhum álbum foi encontrado</h3>
                  </section>
                ))}
            </>
          )
      }
    </main>
  );
}

export default Search;
