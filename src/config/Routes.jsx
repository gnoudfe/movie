import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
// const RoutesConfig = () => {
//     return (
//         <Routes>
//             <Route path="/:category/search/:keyword" component={Catalog} />
//             <Route path="/:category/:id" component={Detail} />
//             <Route path="/:category" component={Catalog} />
//             <Route path="/" component={Home} exact />
//         </Routes>
//     );
// };

const publicRoutes = [
    {
        path: '/:category/search/:keyword',
        component: Catalog,
    },
    {
        path: '/:category/:id',
        component: Detail,
    },
    {
        path: '/:category',
        component: Catalog,
    },
    {
        path: '/',
        component: Home,
    },
];

export default publicRoutes;
