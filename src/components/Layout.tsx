import { Outlet, useLocation } from "react-router-dom";
import HeaderLayout from "./Layout/Header";
import FooterLayout from "./Layout/Footer";
import ClickMenu from "./Layout/ClickMenu";
import { useEffect } from "react";

export default function Layout() {
    
    const {pathname} = useLocation();

    // 페이지 이동시 맨위로
    useEffect(()=>{
      window.scrollTo(0,0);
    },[pathname]);

    return (
        <> 
            <HeaderLayout/>
            <ClickMenu/>
                <Outlet/>
            <FooterLayout/>
        </>
    )
}