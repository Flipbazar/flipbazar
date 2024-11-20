import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Loading from "./Loading";
import Navbar1 from "./Navbar1";

export default function Header() {
    const navigation = useNavigation();
    const location = useLocation();

    if (navigation.state === "loading") {
        return <Loading />
    }




    if (location.pathname === "/") {
        return <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    }


    if (location.pathname.includes("checkout")) {
        return <main>
            <Outlet />
        </main>
    }


    return <>
        <header>
            <Navbar1 />
        </header>
        <main>
            <Outlet />
        </main>
        <Footer />
    </>

}