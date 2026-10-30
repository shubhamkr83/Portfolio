import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
