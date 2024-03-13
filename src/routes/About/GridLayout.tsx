import { useRef } from "react";
import styled from "styled-components";
import SubLayoutTit from "../../components/Layout/SubLayout";
import { getTrigger } from "../../utils/gsap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";


type WrapperProps = {
    $language? : string
}

const Wrapper = styled.div<WrapperProps>`
    margin-top: ${props=>{
        if(props.$language === "ko") {
            return 275
        }else{
            return 525
        }
    }}px;
    
    @media screen and (max-width: 1024px) {
        margin-top: ${props=>{
            if(props.$language === "ko") {
                return 205
            }else{
                return 325
            }
        }}px;
    }

    @media screen and (max-width: 820px) {
        margin-top: ${props=>{
            if(props.$language === "ko") {
                return 150
            }else{
                return 225
            }
        }}px;
    }

`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 170px 80px;
    margin-top: 135px;

    + div {
        margin-top: 170px;
    }

    @media screen and (max-width : 1280px) {
        gap: 170px 80px;
        /* margin-top: 360px; */
    }

    @media screen and (max-width : 1024px) {
        gap: 170px 50px;
        /* margin-top: 260px; */
    }

    @media screen and (max-width : 820px) {
        grid-template-columns: repeat(2,1fr);
        gap: 100px 50px;
        margin-top: 85px;
        + div {
            margin-top: 100px;
        }
    }

    @media screen and (max-width : 480px) {
        grid-template-columns: 1fr;
        gap: 75px 50px;
        + div {
            margin-top: 75px;
        }
    }


`;

const Item = styled.div`
    
    /* &:nth-of-type(2) {
        grid-column: 2 span;
    } */

    h3 {
        font-size: 42px;
        line-height: calc(80/70);
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        text-transform: uppercase;
        white-space: nowrap;
    }

    ul {
        font-size: 18px;
        margin-top: calc(25/18*1em); 
        padding-top: calc(35/18*1em);
        border-top: 1px solid #fff;
        li {
            font-family: "Pretendard";
            line-height: normal;
            word-break: keep-all;
            span {
                font-size: 14px;
            }
            + li {
                margin-top: calc(15/18*1em);
            }
        }
    }

    @media screen and (max-width : 1280px) {
        h3 {
            font-size: 34px;
        }
        ul {
            font-size: 16px;
        }
    }

    @media screen and (max-width : 1024px) {
        h3 {
            font-size: 24px;
        }
    }

    @media screen and (max-width : 820px) {
        &:nth-of-type(2) {
            grid-column: auto;
        }
        h3 {
            font-size: 22px;
        }
    }

    @media screen and (max-width : 480px) {
        &:nth-of-type(2) {
            grid-column: auto;
        }
        h3 {
            font-size: 24px;
        }
        ul {
            font-size: 14px;
        }
    }

`;




export default function GridLayout() {

    const {t,i18n} = useTranslation();

    const gridRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{

        if(gridRef.current){

            gridRef.current.querySelectorAll('.item').forEach(el=>{

                const itemTl = gsap.timeline({
                    defaults : {
                        ease : "back.inOut(1.4)",
                        duration : 0.4,
                    },
                    scrollTrigger : getTrigger(el)
                })

                itemTl.fromTo(el.querySelector('h3'),{
                    filter : "blur(10px)"
                },{
                    filter : "blur(0px)"
                })

                el.querySelectorAll('ul li').forEach(li=>{

                    itemTl.fromTo(li,{
                        filter : "blur(5px)"
                    },{
                        filter : "blur(0px)"
                    },">-=75%")

                })

                
            })

        }

    },[gridRef.current]);

    const gridRef2 = useRef<HTMLDivElement>(null);
    useGSAP(()=>{

        if(!gridRef2.current) return;

        gridRef2.current.querySelectorAll('.item').forEach(el=>{

            const itemTl = gsap.timeline({
                defaults : {
                    ease : "back.inOut(1.4)",
                    duration : 0.4,
                },
                scrollTrigger : getTrigger(el)
            });

            itemTl.fromTo(el.querySelector('h3'),{
                filter : "blur(10px)"
            },{
                filter : "blur(0px)"
            });

            el.querySelectorAll('ul li').forEach(li=>{

                itemTl.fromTo(li,{
                    filter : "blur(5px)"
                },{
                    filter : "blur(0px)"
                },">-=75%")

            });
            
        });

    },[gridRef2.current]);

    return (

        <Wrapper $language={i18n.language}>
            <SubLayoutTit>
                <p><i>OUR </i>CORE</p>
                <p><span>S</span>OLUTI<span>O</span>NS</p>
            </SubLayoutTit>
            <Grid ref={gridRef}>
                <Item className="item">
                    <h3>branding</h3>
                    <ul>
                        {
                            (t('about.branding',{returnObjects : true}) as Array<any>).map((e,index)=>{
                                return (
                                    <li key={index}>
                                        {
                                            i18n.language === "en" && index === 0 ? 
                                            <>{e.text} <span>{e.span}</span></> : e
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Item>
                <Item className="item">
                    <h3>
                        exhibition graphic
                    </h3>
                    <ul>
                        {
                            (t('about.exhibition',{returnObjects : true}) as Array<any>).map((e,index)=><li key={index}>{e}</li>)
                        }
                    </ul>
                </Item>
            </Grid>
            <Grid ref={gridRef2}>
                <Item className="item">
                    <h3>graphic</h3>
                    <ul>
                        {
                            (t('about.graphic',{returnObjects : true}) as Array<any>).map((e,index)=><li key={index}>{e}</li>)
                        }
                    </ul>
                </Item>
                <Item className="item">
                    <h3>editorial · package</h3>
                    <ul>
                        {
                            (t('about.editorial',{returnObjects : true}) as Array<any>).map((e,index)=><li key={index}>{e}</li>)
                        }
                    </ul>
                </Item>
                <Item className="item">
                    <h3>gui · ux</h3>
                    <ul>
                        {
                            (t('about.gui',{returnObjects : true}) as Array<any>).map((e,index)=><li key={index}>{e}</li>)
                        }
                    </ul>
                </Item>
            </Grid>
        </Wrapper>

    )
}