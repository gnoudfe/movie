import React, { useEffect, useState } from 'react';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useParams } from 'react-router-dom';

const RateList = (props) => {
    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${props.id}/rating?api_key=a3f403e8e0828c9ff77566a30f71cbd4&language=en-US`,
        )
            .then((res) => res.json())
            .then((json) => setCasts(json.cast.slice(0, 5)));
        // const getCredits = async () => {
        //     const response = await tmdbApi.credits(category, props.id);
        //     setCasts(response.cast.slice(0, 5));
        // };
        // getCredits();
    }, [category, props.id]);

    return (
        <div className="casts">
            {casts.map((cast, i) => (
                <div className="casts__item" key={i}>
                    <div
                        className="casts__item__img"
                        style={{ backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})` }}
                    ></div>
                    <p className="casts__item__name">{cast.name}</p>
                </div>
            ))}
        </div>
    );
};

export default RateList;
