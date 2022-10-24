import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-lists/MovieList';
import { category, movieType, tvType } from '../api/tmdbApi';
import MovieTopRate from '../components/movie-lists/MovieTopRate';
import TvList from '../components/movie-lists/TvList';
import UpcomingList from '../components/movie-lists/UpcomingList';
import TvOnTheAir from '../components/movie-lists/TvOntheAir';
import TopRated from '../components/movie-lists/TopRatedTV';
const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Upcoming movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <UpcomingList type={movieType.upcoming} category={category.movie} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList type={movieType.popular} category={category.movie} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieTopRate type={movieType.top_rated} category={category.movie} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV </h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <TvList type={tvType.popular} category={category.tv} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>TV Top Rated </h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <TopRated type={tvType.top_rated} category={category.tv} />
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>TV Series </h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <TvOnTheAir type={tvType.on_the_air} category={category.tv} />
                </div>
            </div>
        </>
    );
};

export default Home;
