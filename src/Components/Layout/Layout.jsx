import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Layout = () => {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
