import React, { useEffect, useState } from 'react';
import './movielist.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import apiConfig from '../../api/apiConfig';
import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';
const TvList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (props.type === 'popular') {
            fetch(`https://api.themoviedb.org/3/tv/popular?api_key=a3f403e8e0828c9ff77566a30f71cbd4`)
                .then((res) => res.json())
                .then((res) => setItems(res.results));
        }
    }, []);
    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {items.map((item, i) => (
                    <SwiperSlide key={i}>
                        <MovieCard item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TvList;
