import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swAlert from 'sweetalert';

function Resultados() {

    let query = new URLSearchParams(window.location.search);

    let keyword = query.get('keyword');

    const [moviesResult, setMoviesResult] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=ebf329b4e06c36a4d94b1edaf92cfece&language=es-ES&page=1&include_adult=false&query=${keyword}`;
        axios.get(endPoint).then(response => {
            const moviesArray = response.data.results;
            if (moviesArray.length === 0) {
                swAlert({
                    title: "Tu busqueda no arrojo resultados",
                    icon: "warning",
                    button: "OK",
                    closeModal: true,
                }).close();
            }
            setMoviesResult(moviesArray);
        }).catch(error => {
            console.log(error);
        });
    }); 

    return (
        <>
            <h2>
                Buscaste: <em>{keyword}</em>
            </h2>
            {moviesResult.length === 0 && <h3>No hay resultados</h3>}
            <div className='row'>
                {
                    moviesResult.map((movie, index) => {
                        return (
                            <div className='col-4' key={index}>
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

export default Resultados;