const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',

    apiKey: 'a3f403e8e0828c9ff77566a30f71cbd4',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
