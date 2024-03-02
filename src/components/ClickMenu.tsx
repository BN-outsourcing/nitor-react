import { useRecoilState } from "recoil";
import styled from "styled-components"
import { headerAtom } from "../Atom/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const OverMenu = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding: 170px 2.5% 80px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 55;
    color: #fff;
    transform: translateY(-100%);
    transition: transform .4s;
    overflow: hidden;

    &.act {
        transform: translateY(0);
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(/image/menu/menu-background.jpg) no-repeat center/cover;
        z-index: -1;
    }

    @media screen and (max-width : 1024px) {
        padding: 125px 2.5% 80px;
    }

    @media screen and (max-width : 820px) {
        overflow-y: auto;
        padding: 100px 2.5% 50px;
        box-sizing: border-box;
        height: 100%;
        background-color: #000;
        background: url(/image/menu/menu-background.jpg) no-repeat center/cover;
        justify-content: flex-start;
        &::after {display: none}
    }

`;

const H2 = styled.h2`
    font-size: calc(100*100/1920*1vw);
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    text-transform: uppercase;
    position: relative;
    z-index: 2;
    pointer-events: none;
    p {
        overflow: hidden;
        em {
            display: inline-block;
        }
    }
    span {
        font-family: 'Big Daily Short';
    }
    i {
        font-style: italic;
    }

    @media screen and (max-width : 1024px) {
        
        font-size: calc(100*100/1480*1vw);

    }

    @media screen and (max-width : 820px) {
        
        font-size: calc(100*100/1280*1vw);

    }

`;


const Card = styled.div`

    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 60%;
    right: 5%;
    gap: 40px;
    transform: translateY(-50%) rotate(-15deg);
    width: 60%;
    
    > div {
        flex: 1;
        border-radius: 20px;
        max-width: 450px;
        position: relative;
        cursor: pointer;
        background-color: #fff;

        &::before {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url(/image/menu/background-b.png) no-repeat center/cover;
            content: '';
            opacity: 1;
            transition: opacity .4s;
        }

        &::after {
            content: '';
            display: block;
            padding-bottom: 100%;
        }

        .obj {
            position: absolute;
            right: 10%;
            bottom: 10%;
            width: 40%;
        }

        dl {
            position: absolute;
            top: 6%;
            left: 6%;

            dt {
                font-size: 32px;
                font-family: 'Neue Haas Grotesk Display Pro';
                font-weight: 500;
                img {
                    margin-right: 10px;
                    vertical-align: middle;
                }
            }
            dd {
                font-size: 18px;
                margin-top: 10px;
                letter-spacing: -0.025em;
                font-family: "Pretendard";
            }

        }

        &:nth-of-type(2){
            .obj {
                width: 50%;
            }
        }

        &:hover {
            color: #000;
            &::before {
                opacity: 0;
            }
            dl {
                dt {
                    img {
                        filter: invert(1);
                    }
                }
            }
        }

    }

    @media screen and (max-width : 1024px) {
        
        width: 70%;
        top: 52.5%;
        gap: 20px;

        > div {
            dl {
                dt {
                    font-size: 24px;
                }
                dd {
                    font-size: 14px;
                }
            }
        }

    }

    @media screen and (max-width : 820px) {

        position: static;
        transform: none;
        width: 80%;
        transform: none;
        flex-direction: column;
        margin: 50px auto;
        gap: 40px;


    }

`;

const Address = styled.div`
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    p {
        font-size: 16px;
        line-height: calc(24/16);
        &:nth-of-type(1){
            flex: 0 0 100%;
        }
    }
    
    @media screen and (max-width : 820px) {
        position: static;
        p {
            font-size: 14px;
        }
    }

`;


export default function ClickMenu() {

    const naviagate = useNavigate();
    const {pathname} = useLocation();
    const [headerState,setHeaderState] = useRecoilState(headerAtom);

    useEffect(()=>{
        setHeaderState(false);
    },[pathname]);

    const h2Ref = useRef<HTMLHeadingElement>(null);
    const addRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{

        if(headerState){

            if(!h2Ref.current) return;

            h2Ref.current.querySelectorAll('p em').forEach(el=>{
                gsap.fromTo(el,{
                    yPercent : 100,
                },{
                    yPercent : 0,
                    duration : 0.8,
                    ease : "back.inOut(1.4)"
                })
            });

            if(!addRef.current) return;
            gsap.fromTo(addRef.current,{
                x : -50,
                opacity : 0
            },{
                x : 0,
                opacity : 1,
                duration : 0.8,
                ease : "back.inOut(1.4)"
            });

            if(!cardRef.current) return;
            cardRef.current.querySelectorAll('.item').forEach((el,index)=>{
                gsap.fromTo(el,{
                    y : 50,
                    opacity : 0
                },{
                    y : 0,
                    opacity : 1,
                    duration : 0.8,
                    delay : index * 0.2,
                    ease : "back.inOut(1.4)"
                })
            })

        }

    },[headerState,h2Ref.current,addRef.current])

    return (
        <OverMenu className={headerState ? "act" : ""}>

            <H2 ref={h2Ref}>
                <p><em>for you <span>&</span></em></p>
                <p><em><i>our</i> inspiration</em></p>
            </H2>

            <Card ref={cardRef}>
                <div 
                    className="item"
                    onClick={()=>{
                        setHeaderState(false);
                        naviagate('/about');
                    }}
                >
                    <dl>
                        <dt><img src="/image/menu/icon.png" alt="" />ABOUT</dt>
                        <dd>끊임없이 나아가는 빛, 니토르</dd>
                    </dl>
                    <div className="obj">
                        <img src="/image/menu/obj.png" alt="" />
                    </div>
                </div>
                <div 
                    className="item"
                    onClick={()=>{
                        setHeaderState(false);
                        naviagate('/outwork');
                    }}
                >
                    <dl>
                        <dt><img src="/image/menu/icon.png" alt="" />WORK</dt>
                        <dd>비주얼 커뮤니케이션이 필요한 모든 곳</dd>
                    </dl>
                    <div className="obj">
                        <img src="/image/menu/obj02.png" alt="" />
                    </div>
                </div>
            </Card>

            <Address ref={addRef}>
                <p>3F, 10, World Cup buk-ro 42da-gil, Mapo-gu, Seoul, Republic of Korea</p>
                <p>T. +82 02 2039 7282</p>
                <p>E. sid@nitordesign.net</p>
            </Address>

        </OverMenu>
    )
}