import React, { useEffect, useRef, useState } from 'react';
import './heroslide.scss';
import Button, { OutlineButton } from '../button/Button';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import Modal, { ModalContent } from '../modal/Modal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { category } from '../../api/tmdbApi';
const HeroSlide = () => {
    SwiperCore.use([Autoplay]);
    const [movieItems, setMovieItems] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a3f403e8e0828c9ff77566a30f71cbd4`)
            .then((res) => res.json())
            .then((res) => setMovieItems(res.results));
    });
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 10000 }}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItems.map((item, i) => (
                <TrailerModal key={i} item={item} />
            ))}
        </div>
    );
};

const HeroSlideItem = (props) => {
    const [videos, setVideos] = useState([]);
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=a3f403e8e0828c9ff77566a30f71cbd4`)
            .then((res) => res.json())
            .then((data) => setVideos(data));
    }, [item.id]);

    const setModalActive = () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        if (videos.results.length > 0) {
            const vidSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', vidSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No Trailer';
        }

        modal.classList.toggle('active');
    };
    return (
        <div className={`hero-slide__item ${props.className}`} style={{ backgroundImage: `url(${background})` }}>
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Link to={`/${category.movie}/${item.id}`}>
                            <Button>Watch Now</Button>
                        </Link>
                        <OutlineButton onClick={setModalActive}>Watch Trailer</OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" className="poster-movies" />
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    );
};
export default HeroSlide;
