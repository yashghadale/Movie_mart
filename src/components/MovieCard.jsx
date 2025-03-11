import React from "react";

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
  return (
    <div className="relative w-full max-w-[220px] bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      {/* Movie Poster */}
      <div className="relative w-full h-[320px]">
        <img
          className="w-full h-full object-cover object-top rounded-t-lg transition-all duration-300 group-hover:brightness-75"
          src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
          alt={title}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
          <h3 className="text-lg font-bold truncate">{title}</h3>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <img className="w-4 h-4" src="star.svg" alt="star icon" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <p className="uppercase">{original_language}</p>
            <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
