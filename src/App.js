import 'swiper/swiper.min.css';
import './App.scss';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RoutesConfig from './config/Routes';
import publicRoutes from './config/Routes';
import DefaultLayout from './layout/DefaultLayout';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
            {/* <>
                <Route
                    render={(props) => (
                        <>
                            <Header {...props} />
                            <RoutesConfig />
                            <Footer />
                        </>
                    )}
                />
            </> */}
        </BrowserRouter>
    );
}

export default App;
