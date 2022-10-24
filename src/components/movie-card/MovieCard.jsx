import React from 'react';
import './moviecard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import { category } from '../../api/tmdbApi';
import Button from '../button/Button';

const MovieCard = (props) => {
    const item = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <Button>
                    <FontAwesomeIcon icon={faPlay} />
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
};

export default MovieCard;
