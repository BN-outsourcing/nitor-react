import styled, { css } from "styled-components";
import { PageProps } from "../../types/styled";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Props } from "../../types/reactType";
import { blurAnimtaion } from "../../utils/gsap";

// 서브페이지 레이아웃
export const SubLayout = styled.div<PageProps>`
    color: #fff;
    padding: 250px 0 150px;
    position: relative;

    @media screen and (max-width : 820px) {
        padding: 180px 0 100px;
    }

    ${props=>{
        switch(props.$page){
            case "about" :
                return css`
                    background-image: url(/image/about/background.jpg);
                    background-repeat: no-repeat;
                    background-position: bottom;
                    background-size: cover;
            `;
            case "list" :
                return css`
                    padding: 140px 0 50px;
            `;
        }
    }};

`;

export const Tit = styled.h2`
    font-size: 88px;
    line-height: calc(125/120);
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    text-transform: uppercase;
    position: relative;
    z-index: 2;
    pointer-events: none;
    color: #fff;

    span {
        font-family: 'Big Daily Short';
    }
    
    i {
        font-style: italic;
    }

    @media screen and (max-width : 1480px) {
        
        font-size: 78px;

    }

    @media screen and (max-width : 1280px) {
        
        font-size: 68px;

    }

    @media screen and (max-width : 1024px) {
        
        font-size: 58px;

    }

    @media screen and (max-width : 820px) {
        
        font-size: 42px;

    }

    @media screen and (max-width : 480px) {
        
        font-size: 32px;

    }

`;


export default function SubLayoutTit({children} : Props) {

    const titRef = useRef<HTMLHeadingElement>(null);
    
    useGSAP(()=>{

        if(!titRef.current) return;
        blurAnimtaion(titRef.current);

    },[titRef.current]);

    return (
        <Tit ref={titRef}>
            {children}
        </Tit>
    )
}