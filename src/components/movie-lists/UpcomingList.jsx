import React, { useEffect, useState } from 'react';
import './movielist.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from '../movie-card/MovieCard';
const UpcomingList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (props.type === 'upcoming') {
            fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a3f403e8e0828c9ff77566a30f71cbd4`)
                .then((res) => res.json())
                .then((res) => setItems(res.results));
        }
    });
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

export default UpcomingList;
