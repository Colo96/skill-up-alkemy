import { Link, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swAlert from 'sweetalert';

function Listado() {

    let token = sessionStorage.getItem('token');

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=ebf329b4e06c36a4d94b1edaf92cfece&language=es-ES&page=1';
        axios.get(endPoint).then(response => {
            const apiData = response.data;
            setMoviesList(apiData.results);
        }).catch(error => {
            swAlert({
                title: "Hubo errores, intenta mas tarde",
                icon: "warning",
                button: "OK",
            });
        });
    }, [setMoviesList]);


    return (
        <>
            {!token && <Navigate to='/' />}
            <div className='row'>
                {
                    moviesList.map((movie, index) => {
                        return (
                            <div className='col-3' key={index}>
                                <div className="card my-4">
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {movie.title.substring(0, 30)}...
                                        </h5>
                                        <p className="card-text">
                                            {movie.overview.substring(0, 100)}...
                                        </p>
                                        <Link to={`/detalle?movieID=${movie.id}`} className='btn btn-primary'>View detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Listado;