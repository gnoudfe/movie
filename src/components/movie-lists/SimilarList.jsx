import React, { useEffect, useState } from 'react';
import './movielist.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link, useParams } from 'react-router-dom';
import Button from '../button/Button';
import MovieCard from '../movie-card/MovieCard';
import apiConfig from '../../api/apiConfig';
import tmdbApi, { category } from '../../api/tmdbApi';
const SimilarList = (props) => {
    const [items, setItems] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        if (props.type === 'similar') {
            fetch(
                `https://api.themoviedb.org/3/movie/${props.id}/similar?api_key=a3f403e8e0828c9ff77566a30f71cbd4&language=en-US`,
            )
                .then((res) => res.json())
                .then((res) => setItems(res.results));
        }
    }, [category, props.id]);
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

export default SimilarList;
