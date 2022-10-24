import React, { useCallback, useEffect, useState } from 'react';
import './moviegrid.scss';
import MovieCard from '../movie-card/MovieCard';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
const MovieGrid = (props) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();
    useEffect(() => {
        if (keyword === undefined) {
            if (props.category === category.movie) {
                fetch(
                    `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=a3f403e8e0828c9ff77566a30f71cbd4`,
                )
                    .then((res) => res.json())
                    .then((res) => {
                        setItems([...items, ...res.results]);
                        setTotalPage(res.total_pages);
                    });
            } else if (props.category === category.tv) {
                fetch(`https://api.themoviedb.org/3/tv/popular?page=${page}&api_key=a3f403e8e0828c9ff77566a30f71cbd4`)
                    .then((res) => res.json())
                    .then((res) => {
                        setItems([...items, ...res.results]);
                        setTotalPage(res.total_pages);
                    });
            }
        } else {
            fetch(
                `https://api.themoviedb.org/3/search/${
                    category[props.category]
                }?api_key=a3f403e8e0828c9ff77566a30f71cbd4&language=en-US&query=${keyword}&page=${page}&include_adult=false`,
            )
                .then((res) => res.json())
                .then((res) => {
                    setItems([...items, ...res.results]);
                    setTotalPage(res.total_pages);
                });
        }
    }, [page, keyword, props.category]);

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className="movie-grid">
                {items.map((item, index) => (
                    <MovieCard category={props.category} item={item} key={index} />
                ))}
            </div>
            {page < totalPage ? (
                <div className="movie-grid_loadmore">
                    <OutlineButton className="small" onClick={() => setPage(page + 1)}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}
        </>
    );
};

const MovieSearch = (props) => {
    const history = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            history(`/${category[props.category]}/search/${keyword}`);
            window.location.reload(true);
        }
    }, [keyword, props.category, history]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
            />
            <Button className="small" onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
};

export default MovieGrid;
