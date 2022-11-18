import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


function Detalle() {

    const [movie, setMovie] = useState(null);

    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);

    let movieID = query.get('movieID');

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=ebf329b4e06c36a4d94b1edaf92cfece&language=es-ES`;
        axios.get(endPoint).then(response => {
            const movieData = response.data;
            setMovie(movieData);
        }).catch(error => {
            console.log(error);
        });
    }, [movieID]);


    return (
        <>
            {!token && <Navigate to='/' />}
            {!movie && <p>Cargando...</p>}
            {movie &&
                <>
                    <h2>Título: {movie.title}</h2>
                    <div className='row'>
                        <div className='col-4'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster" />
                        </div>
                        <div className='col-8'>
                            <h5>Detalle de la película</h5>
                            <h5>Fecha de estreno: {movie.release_date}</h5>
                            <h5>Reseña:</h5>
                            <p>{movie.overview}</p>
                            <h5>Rating: {movie.vote_average}</h5>
                            <h5>Generos</h5>
                            <ul>
                                {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Detalle;