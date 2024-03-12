import { useRecoilState } from "recoil";
import styled from "styled-components"
import { headerAtom } from "../../Atom/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Tit } from "./SubLayout";
import { blurAnimtaion } from "../../utils/gsap";
import { Address, AddressDl } from "./Footer";
import { CursorType1 } from "../Cursor";
import gsap from "gsap";

const OverMenu = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding: ${155/1080*100}vh 0 ${55/1080*100}vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 9999;
    color: #fff;
    transform: translateY(-100%);
    transition: transform .4s;
    overflow: hidden;
    background: rgba(000,000,000,0.7);
    backdrop-filter: blur(10px);

    &::-webkit-scrollbar {width: 8px;}
    &::-webkit-scrollbar-thumb {background-color: #2f3542; border-radius: 10px;}

    &.act {
        transform: translateY(0);
    }

    @media screen and (max-width : 1024px) {
        padding: 125px 2.5% 80px;
    }

    @media screen and (max-width : 820px) {
        overflow-y: auto;
        padding: 100px 0 50px;
        box-sizing: border-box;
        height: 100%;
        background-color: #000;
        background: url(/image/menu/menu-background.jpg) no-repeat center/cover;
        justify-content: flex-start;
        &::after {display: none}
    }

`;

type WrapperProps = {
    $type? : boolean
}
const Wrapper = styled.div<WrapperProps>`
    width: ${props=>{
        if(props.$type){
            return 100 - (100/1920*100)
        }else{
            return 100 - (320/1920*100)
        }
    }}%;
    margin: 0 auto;


    @media screen and (max-width : 820px) {
        width: 94.79166666666667%;
    }
    
`;

const Card = styled.div`

    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 70%;
    right: ${130/1920*100}vw;
    gap: 50px;
    transform: translateY(-50%) rotate(-15deg);;
    transform-origin: top;
    width: 100%;
    pointer-events: none;
    
    > div {
        flex: 0 0 auto;
        pointer-events: all;
        width: ${500/1920*100}vw;
        position: relative;
        cursor: pointer;
        background-color: #fff;
        border-radius: 30px;
        overflow: hidden;

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
            right: ${35/500*100}%;
            bottom: ${50/500*100}%;
            width: ${222/500*100}%;
            transition: opacity.4s;
            opacity: 1;

            &.w {
                opacity: 0;
            }

        }

        &:nth-of-type(2){
            .obj {
                width: ${263/500*100}%;
            }
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

        &:hover {
            color: #000;

            .obj { 
                opacity: 0;
                &.w {
                    opacity: 1;
                }
            }

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
        
        top: 55%;
        gap: 20px;

        > div {
            width: ${500/1600*100}vw;
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
        width: 70%;
        transform: none;
        flex-direction: column;
        margin: 50px auto;
        gap: 40px;

        > div {
            width: 100%;
        }


    }

    @media screen and (max-width : 480px) {

        width: 80%;

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
    const cursorRef = useRef<HTMLDivElement>(null);

    useGSAP(()=>{

        if(headerState){

            if(!h2Ref.current) return;
            blurAnimtaion(h2Ref.current,undefined,0.2);

        }

    },[headerState,h2Ref.current])

    const onMove = (event : React.MouseEvent<HTMLDivElement>)=>{
        const target = cursorRef.current
                            
        const cosX = event.clientX;
        const cosY = event.clientY;

        gsap.set(target,{
            top : cosY,
            left : cosX
        });
    }

    const onOver = ()=>{
        if(cursorRef.current){
            const target = cursorRef.current as HTMLElement;
            gsap.to(target,{
                scale : 1,
                rotate : -15,
                duration : 0.4,
            });
        }
    }
    const onLeave = ()=>{
        if(cursorRef.current){
            const target = cursorRef.current as HTMLElement;
            gsap.to(target,{
                scale : 0,
                rotate : -15,
                duration : 0.4,
            });
        }
    }

    return (
        <>
            <OverMenu 
                onMouseMove={onMove}
                className={headerState ? "act" : ""}
            >

                <Wrapper>
                    <Tit ref={h2Ref}>
                        <p><em>for you <span>&</span></em></p>
                        <p><em><i>our</i> inspiration</em></p>
                    </Tit>
                </Wrapper>

                <Card>
                    <div 
                        className="item"
                        onMouseOver={onOver}
                        onMouseLeave={onLeave}
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
                        <div className="obj w">
                            <img src="/image/menu/obj_w.png" alt="" />
                        </div>
                    </div>
                    <div 
                        className="item"
                        onMouseOver={onOver}
                        onMouseLeave={onLeave}
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
                        <div className="obj w">
                            <img src="/image/menu/obj02_w.png" alt="" />
                        </div>
                    </div>
                </Card>

                <Wrapper $type={true}>
                    <Address ref={addRef}>

                        <AddressDl>
                            <dt>Address</dt>
                            <dd>3F, 10 Worldcup bukro 42 dagil, Mapogu, Seoul, S. Korea</dd>
                        </AddressDl>

                        <AddressDl>
                            <dt>tel.</dt>
                            <dd>+82 02 2039 7282</dd>
                        </AddressDl>

                        <AddressDl>
                            <dt>Mail</dt>
                            <dd>design@nitordesign.net</dd>
                        </AddressDl>

                    </Address>
                </Wrapper>

            </OverMenu>
            <CursorType1 ref={cursorRef}>
                니트로를 더 알고싶다면? <img src="/image/icon/eyes.png" alt="" />
            </CursorType1>
        </>
    )
}