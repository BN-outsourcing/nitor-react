import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { useRecoilState } from "recoil";
import { headerAtom } from "../../Atom/header";
import { useEffect, useRef, useState } from "react";
import i18n from "../../locales/i18n";

const Header = styled.header`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99999;
    color: #fff;
    mix-blend-mode: exclusion;

    .wrapper {
        width: ${100 - (100/1920*100)}%;
        max-width: 1600px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 0;
        position: relative;
        z-index: 55;
        transition: transform .4s;
    }

    .logo {
        width: 117.6px;
        &.hide {
            visibility: hidden;
        }
    }

    &.hide {
        .wrapper {
            transform: translateY(-100%);
        }
    }

    @media screen and (max-width : 820px) {
        
        .logo {
            width: 75px;
        }

        .wrapper {
            padding: 20px 0;
        }

    }

`;

const Flex = styled.div`
    display: flex;
`;

const LangBtn = styled.div`
    display: flex;
    button {
        all: unset;
        font-size: 18px;
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        position: relative;
        color: #6a6a6a;
        cursor: pointer;
        &.act {
            color: #fff;
        }
        + button {
            margin-left: 13px;
            padding-left: 13px;
            &::before {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                height: 80%;
                background: #a7aba7;
                width: 1px;
                content: '';
            }
        }
    }

    @media screen and (max-width:820px) {
        button {
            font-size: 14px;
        }
    }

`;

const MenuBtn = styled.div`

    // position: absolute;
    // right: 50px;
    // top: 30px;
    position: relative;
    width: 30px;
    height: 15px;
    cursor: pointer;
    margin-left: 20px;

    div {
        background: #fff;
        width: 100%;
        height: 2px;
        position: absolute;
        transition: .4s;
        transition-property: transform, top;
        &:nth-of-type(1) {
            top: 0;
        }
        &:nth-of-type(1) {
            top: 100%;
        }
    }

    &.act {
        div {
            &:nth-of-type(1){
                top: 50%;
                transform: translateY(-50%) rotate(45deg);
            }
            &:nth-of-type(2){
                top: 50%;
                transform: translateY(-50%) rotate(-45deg);
            }
        }
    }

`;

const Logo = styled.button`
    all: unset;
    cursor: pointer;
`;

export default function HeaderLayout() {

    const navigate = useNavigate();

    const [headerState,setHeader] = useRecoilState(headerAtom);
    const [scrollDown,setScrollDown] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const {pathname} = useLocation();

    const [langMenu,setLangMenu] = useState('ko');

    const langBtn = (language : string) =>{
        if(langMenu){
            i18n.changeLanguage(language);
            setLangMenu(language);
            document.documentElement.lang = language;
            window.scrollTo(0,0);
        }
    }

    useEffect(()=>{

        if(!headerRef.current) return;

        if(headerRef) setScrollDown(false);

        let lastScroll = 0;

        const scrollHanlder = ()=>{

            if(headerRef){

                const scrollTo = window.scrollY;

                if(scrollTo > lastScroll){
                    setScrollDown(true);
                }else{
                    setScrollDown(false);
                }
                
                lastScroll = scrollTo;

            }

        }

        window.addEventListener('scroll',scrollHanlder);
        
        return ()=>{
            window.removeEventListener('scroll',scrollHanlder);
        }

    },[headerRef.current]);

    const headerOver = ()=>{
        setScrollDown(false);
    }

    return (
        <>
            <Header 
                ref={headerRef} 
                className={scrollDown ? "hide" : ""}
                onMouseOver={headerOver}
            >
                <div className="wrapper">

                    {
                        <Logo 
                            onClick={()=>{
                                navigate('/');
                                setHeader(false);
                            }}
                            className={`logo ${pathname === "/" ? headerState ? "" : "hide" : ""}`}
                        >
                            <img src="/image/logo.png" alt=""/>
                        </Logo>
                    }
                    
                    <Flex>
                        <LangBtn>
                            <button className={langMenu === "ko" ? "act" : ""} onClick={()=>langBtn('ko')}>KR</button>
                            <button className={langMenu === "en" ? "act" : ""} onClick={()=>langBtn('en')}>EN</button>
                        </LangBtn>

                        <MenuBtn 
                            className={`${headerState ? "act" : ''}`} 
                            onClick={()=>{setHeader(!headerState)}}
                        >
                            <div></div>
                            <div></div>
                        </MenuBtn>
                    </Flex>

                </div>
            </Header>
        </>
    )
}