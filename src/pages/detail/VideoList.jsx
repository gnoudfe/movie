import React, { useEffect, useRef, useState } from 'react';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useParams } from 'react-router-dom';

const VideoList = (props) => {
    const { category } = useParams();
    const [videos, setVideos] = useState([]);

    // useEffect(() => {

    //     // const getVideos = async () => {
    //     //     const res = await tmdbApi.getVideos(category, props.id);
    //     //     setVideos(res.cast.slice(0, 5));
    //     // };

    //     // getVideos();
    // });
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=a3f403e8e0828c9ff77566a30f71cbd4&language=en-US`,
        )
            .then((res) => res.json())
            .then((json) => setVideos(json.results.slice(0, 5)));
        // const getCredits = async () => {
        //     const response = await tmdbApi.credits(category, props.id);
        //     setCasts(response.cast.slice(0, 5));
        // };
        // getCredits();
    }, [category, props.id]);
    return (
        <>
            {videos.map((video, i) => (
                <Video key={i} item={video} />
            ))}
        </>
    );
};

const Video = (props) => {
    const item = props.item;
    const iframRef = useRef(null);

    useEffect(() => {
        const height = (iframRef.current.offsetWidth * 9) / 16 + 'px';
        iframRef.current.setAttribute('height', height);
    }, []);
    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    );
};

export default VideoList;
