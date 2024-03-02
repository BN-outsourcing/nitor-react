import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import styled from "styled-components";
import { getTrigger } from "../../lib/gsap";

const ImgGrid = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    margin: 0 auto;
    gap: 100px;
    margin-top: 100px;
    padding-right: calc(110*100/1920*1vw);
    box-sizing: border-box;

    @media screen and (max-width : 1280px) {
        padding-right: 2.5%;
    }

    @media screen and (max-width : 1024px) {
        gap: 50px;
    }

    @media screen and (max-width : 820px) {
        flex-direction: column;
        align-items: flex-start;
    }

`;

const ImgGridItem = styled.div`
    
    flex: none;

    &:nth-of-type(2) {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    p {
        font-size: 18px;
        font-family: "Pretendard";
        line-height: calc(30/18);
        letter-spacing: -0.025em;
        margin-top: calc(30/18*1em);
        text-align: left;
        word-break: keep-all;
    }

    .right {
        width: 90%;
        max-width: 820px;
        margin-left: auto;
    }

    .imgs {
        position: relative;
        .img {
            border-radius: 25px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            &::after {
                content: '';
                display: block;
                padding-bottom: calc(776/1032*100%);
            }
        }

        .back {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #000;
            transform-origin: right;
        }

    }

    @media screen and (max-width : 1280px) {
        flex: 0.5;
    }

    @media screen and (max-width : 1024px) {
        p {
            font-size: 16px;
        }
    }

    @media screen and (max-width : 820px) {

        width: 60%;

        &:nth-of-type(2) {
            width: 80%;
            margin-left: auto;
        }

    }

    @media screen and (max-width : 480px) {

        p {
            font-size: 14px;
        }

    }

`;

export default function ImgGridLayout() {

    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(()=>{

        if(gridRef.current){

            gridRef.current.querySelectorAll('.imgs').forEach(el=>{

                gsap.fromTo(el.querySelector('.back'),{
                    scaleX : 1
                },{
                    scaleX : 0,
                    scrollTrigger : getTrigger(el)
                });

            });

            gsap.fromTo(gridRef.current.querySelector('.right p'),{
                y : 50,
                opacity : 0
            },{
                y : 0,
                opacity : 1,
                scrollTrigger : getTrigger(gridRef.current.querySelector('.right p'))
            });

        }


    },[gridRef.current]);
    
    return (

        <ImgGrid ref={gridRef}>
            <ImgGridItem>
                <div className="imgs">
                    <img src="/image/about/grid-img01.png" alt=""/>
                    <div className="back"></div>
                </div>
            </ImgGridItem>
            <ImgGridItem>
                <div className="right">
                    <div className="imgs">
                        <div className="img" style={{backgroundImage : 'url(/image/about/grid-img02.png)'}}/>
                        <div className="back"></div>
                    </div>
                    <p>
                        NITOR의 VI는 전진하는 빛이 매질을 만나 분산되는 순간이 담겨있습니다.<br/>
                        각자 다른 속도와 각도로 분산되는 빛의 형태는 NITOR가 제공하는<br/>
                        크리에이티브 솔루션의 무한한 가능성을 상징합니다.
                    </p>
                </div>
            </ImgGridItem>
        </ImgGrid>

    )

}