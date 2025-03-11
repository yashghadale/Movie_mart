import { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState ([]);
  const [isLoading, setIsLoading] = useState (false);

  const fetchMovies = async () => {
    
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if(data.Response=='False'){
        setErrorMessage(data.error||'failed to fetch movies');
        setMovieList([]);
        return;
      }
     setMovieList(data.results||[]);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies');
    } 
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main >
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img className="w-60 h-auto mx-auto" src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy 
   Without the Hassle </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies px-4 md:px-10 lg:px-16 xl:px-20">
  <h2 className="mt-[20px] text-center">All Movies</h2>
  {isLoading ? (
    <Spinner />
  ) : errorMessage ? (
    <p className="text-red-500">{errorMessage}</p>
  ) : (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  )}
</section>

      </div>
    </main>
  );
};

export default App;
