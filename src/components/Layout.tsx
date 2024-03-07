import { Outlet } from "react-router-dom";
import HeaderLayout from "./Layout/Header";
import FooterLayout from "./Layout/Footer";
import ClickMenu from "./Layout/ClickMenu";

export default function Layout() {
    
    return (
        <> 
            <HeaderLayout/>
            <ClickMenu/>
                <Outlet/>
            <FooterLayout/>
        </>
    )
}