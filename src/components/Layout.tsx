import { Outlet } from "react-router-dom";
import HeaderLayout from "./Header";
import FooterLayout from "./Footer";
import ClickMenu from "./ClickMenu";
import styled from "styled-components";
import { useState } from "react";
import i18n from "../locales/i18n";

const LangBtn = styled.ul`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
`;
const TestBtn = styled.button`
`;

export default function Layout() {

    const [langMenu,setLangMenu] = useState('en');

    const langBtn = (language : string) =>{
        if(langMenu){
            i18n.changeLanguage(language);
            setLangMenu(language);
            document.documentElement.lang = language;
        }
    }

    return (
        <> 
            <HeaderLayout/>
            <LangBtn>
                <TestBtn
                    type="button"
                    onClick={()=>langBtn('ko')}
                >국문</TestBtn>
                <TestBtn
                    type="button"
                    onClick={()=>langBtn('en')}
                >영문</TestBtn>
            </LangBtn>
            <ClickMenu/>
                <Outlet/>
            <FooterLayout/>
        </>
    )
}