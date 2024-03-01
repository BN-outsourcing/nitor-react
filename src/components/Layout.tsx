import { Outlet } from "react-router-dom";
import HeaderLayout from "./Header";
import FooterLayout from "./Footer";
import ClickMenu from "./ClickMenu";
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