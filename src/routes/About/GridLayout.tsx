import { useRef } from "react";
import styled from "styled-components";
import SubLayoutTit from "../../components/Layout/SubLayout";
import { getTrigger } from "../../utils/gsap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const Wrapper = styled.div`
    margin-top: 275px;
    
    @media screen and (max-width: 1024px) {
        margin-top: 205px;
    }

    @media screen and (max-width: 820px) {
        margin-top: 175px;
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

        <Wrapper>
            <SubLayoutTit>
                <p><i>OUR </i>CORE</p>
                <p><span>S</span>OLUTI<span>O</span>NS</p>
            </SubLayoutTit>
            <Grid ref={gridRef}>
                <Item className="item">
                    <h3>branding</h3>
                    <ul>
                        <li>브랜드 개발 (네이밍, 포지셔닝, 비전&미션 구축)</li>
                        <li>기업 및 제품 브랜드 로고 디자인(BI&CI)</li>
                        <li>브랜드 비주얼 가이드라인 개발</li>
                    </ul>
                </Item>
                <Item className="item">
                    <h3>
                        exhibition graphic
                    </h3>
                    <ul>
                        <li>전시 키 비주얼</li>
                        <li>그래픽 패널</li>
                        <li>사인 디자인</li> 
                    </ul>
                </Item>
            </Grid>
            <Grid ref={gridRef2}>
                <Item className="item">
                    <h3>graphic</h3>
                    <ul>
                        <li>기업 및 제품 그래픽 디자인</li>
                        <li>키 비주얼 디자인</li>
                        <li>일러스트·삽화</li>
                    </ul>
                </Item>
                <Item className="item">
                    <h3>editorial · package</h3>
                    <ul>
                        <li>카탈로그·브로슈어 디자인</li>
                        <li>포스터·리플릿 디자인</li>
                        <li>제품 패키지 디자인</li>
                        <li>인쇄 및 제작 공정 진행</li>
                    </ul>
                </Item>
                <Item className="item">
                    <h3>gui · ux</h3>
                    <ul>
                        <li>모바일·웹 인터페이스</li>
                        <li>아이콘 및 픽토그램 디자인</li>
                    </ul>
                </Item>
            </Grid>
        </Wrapper>

    )
}