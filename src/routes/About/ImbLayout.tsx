import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import styled from "styled-components"
import { getTrigger } from "../../lib/gsap";

const Imb = styled.div`
    position: relative;
    .img {
        position: absolute;
        right: calc(130/1600*100%);
        top: calc(60/1460*100%);
        width: calc(620*100/1920*1vw);
        cursor: none;
        border-radius: 1000px;
    }

    @media screen and (max-width: 1024px) {
        .img {
            top: 1.5%;
            right: 0;
        }
    }

`;

const Tit = styled.h2`
    font-size: 120px;
    line-height: calc(140/120);
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    text-transform: uppercase;
    position: relative;
    z-index: 2;
    pointer-events: none;

    div {
        overflow: hidden;
    }

    span {
        font-family: 'Big Daily Short';
    }
    i {
        font-style: italic;
    }

    @media screen and (max-width : 1480px) {
        
        font-size: 100px;

    }

    @media screen and (max-width : 1280px) {
        
        font-size: 90px;

    }

    @media screen and (max-width : 1024px) {
        
        font-size: 70px;

    }

    @media screen and (max-width : 820px) {
        
        font-size: 42px;

    }

    @media screen and (max-width : 480px) {
        
        font-size: 32px;

    }

`;

const Search = styled.div`

    margin-top: 80px;
    max-width: 400px;

    .seb {
        padding: calc(20/24*1em) 0;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'Neue Haas Grotesk Display Pro';
        border-bottom: 1px solid #fff;
        p {
            display: inline-block;
            border-right: 2px solid #4d4d4d;
            padding-right: 7px;
        }
        i {
            font-size: calc(32/20*1em);
        }
    }

    .sound {

        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        font-size: 20px;
        opacity: 0.6;
        margin-top: calc(25/24*1em);
        display: inline-flex;
        align-items: center;
        span {
            display: inline-flex;
            img {
                margin: 0 5px;
            }
        }
        i {
            margin-left: calc(10/20*1em);
            font-size: calc(30/20*1em);
        }

    }

    dl {
        margin-top: calc(25/24*1em);
        font-family: 'Neue Haas Grotesk Display Pro';
        font-size: 20px;
        font-weight: 500;
        dt {
            text-transform: uppercase;
        }
        dd {
            margin-top: calc(20/24*1em);
        }
    }

    @media screen and (max-width : 1280px) {
        
        margin-top: 80px;
        width: 60%;

        .seb,
        .sound,
        dl {
            font-size: 22px;
        }

    }

    @media screen and (max-width : 1024px) {
        
        .seb,
        .sound,
        dl {
            font-size: 20px;
        }

    }

    @media screen and (max-width : 820px) {
        
        margin-top: 60px;
        width: 100%;

        .seb {
            width: 90%;
            max-width: 250px;
        }

        .seb,
        .sound,
        dl {
            font-size: 18px;
        }

    }

    @media screen and (max-width : 480px) {
        
        margin-top: 40px;

        .seb,
        .sound,
        dl {
            font-size: 16px;
        }

    }


`;

const Tbx = styled.div`

    margin-top: 350px;
    /* padding-left: calc(300*100/1920*1vw); */
    box-sizing: border-box;
    margin-left: auto;
    text-align: right;
    overflow: hidden;

    .inline {

        font-size: calc(52*100/1920*1vw);
        font-family: 'Neue Haas Grotesk Display Pro';
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: -0.025em;
        line-height: calc(64/52);
        text-align: left;
        display: inline-block;
        i {
            font-style: italic;
        }

        .right {
            text-align: right;
        }

        .fade {
            overflow: hidden;
        }
        
        .desc {
            font-size: 18px;
            margin-top: calc(40/18*1em);
            letter-spacing: -0.025em;
            font-family: "Pretendard";
            line-height: calc(30/18);
            text-align: left;
            word-break: keep-all;
        }

    }
    

    @media screen and (max-width: 1280px) {
        margin-top: 300px;
    }

    @media screen and (max-width: 820px) {
        margin-top: 150px;
        
        .inline {
            font-size: calc(40*100/820*1vw);
            .desc {
                font-size: 16px;
            }
        }

    }

    @media screen and (max-width: 480px) {
        
        .inline {
            .desc {
                font-size: 14px;
            }
        }

    }

`;

type Props = {
    cursorRef : React.RefObject<HTMLDivElement>
}

export default function ImbLayout({cursorRef} : Props) {

    const imgRef = useRef(null);
    useGSAP(()=>{

        if(imgRef.current){

            const target = imgRef.current as HTMLElement;

            gsap.fromTo(target,{
                filter : "blur(5px)"
            },{
                filter : "blur(0px)",
                ease : "back.inOut(1.4)",
                duration : 0.8,
                scrollTrigger : {
                    trigger : target,
                    start : "top bottom-=15%"
                }
            })

        }

    },[imgRef.current]);

    const imgOver = ()=>{
        gsap.to(cursorRef.current,{
            opacity : 1
        })
    }
    const imgLeave = ()=>{
        gsap.to(cursorRef.current,{
            opacity : 0
        })
    }

    const titRef = useRef(null);
    useGSAP(()=>{

        if(titRef.current){

            const target = titRef.current as HTMLElement;

            target.querySelectorAll('div p').forEach(el=>{
                gsap.fromTo(el,{
                    yPercent : 100
                },{
                    yPercent : 0,
                    ease : "back.inOut(1.4)",
                    duration : 0.8,
                    scrollTrigger : {
                        trigger : target,
                        start : "top bottom-=15%"
                    }
                })
            })

        }

    },[titRef.current]);

    const searchRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{

        if(!searchRef.current) return;

        const char = searchRef.current.querySelector('.seb p')?.textContent as string;
        gsap.set(searchRef.current.querySelector('.seb p'),{
            text : ""
        })
        gsap.fromTo(searchRef.current.querySelector('.seb p'),{
            borderColor : "#000"
        },{
            borderColor : "#4d4d4d",
            yoyo : true,
            repeat : -1
        });

        const typingTl = gsap.timeline({
            scrollTrigger : getTrigger(searchRef.current.querySelector('.seb'))
        })
        typingTl.fromTo(searchRef.current.querySelector('.seb'),{
            y : 50,
            opacity : 0
        },{
            y : 0,
            opacity : 1,
            onComplete : ()=>{
                if(!searchRef.current) return;
                
                gsap.fromTo(searchRef.current.querySelector('.seb p'),{
                    text : ""
                },{
                    text : char,
                    yoyo : true,
                    repeat : -1,
                    repeatDelay : 3,
                    ease : "none"
                })
            }
        });

        typingTl.fromTo(searchRef.current.querySelector('.sound'),{
            y : 50,
            opacity : 0
        },{
            y : 0,
            opacity : 0.6
        },">-=50%");

        searchRef.current.querySelectorAll('dl').forEach(el=>{

            typingTl.fromTo(el,{
                y : 50,
                opacity : 0
            },{
                y : 0,
                opacity : 1
            },">-=50%");

        });


    },[searchRef.current]);

    const tbxRef = useRef(null);
    useGSAP(()=>{

        if(tbxRef.current){

            const target = tbxRef.current as HTMLElement;

            const fadeTl = gsap.timeline({
                scrollTrigger : getTrigger(target)
            })
            fadeTl.fromTo(target.querySelector('.right'),{
                x : 50,
                opacity : 0
            },{
                x : 0,
                opacity : 1
            })
            target.querySelectorAll('.fade p').forEach(el=>{
                fadeTl.fromTo(el,{
                    yPercent : 100,
                },{
                    yPercent : 0,
                },">-=50%")
            })


            gsap.fromTo(target.querySelector('.desc'),{
                y : 50,
                opacity : 0,
            },{
                y : 0,
                opacity : 1,
                ease : "back.inOut(1.4)",
                duration : 0.8,
                scrollTrigger : getTrigger(target.querySelector('.desc'))
            })

        }

    },[tbxRef.current]);


    return (

        <Imb>

            <div 
                className="img"
                ref={imgRef}
                onMouseOver={imgOver}
                onMouseLeave={imgLeave}
            >
                <img src="/image/about/img.png" alt=""/>
            </div>

            <Tit ref={titRef}>
                <div><p>wanna e<span>xp</span>erience</p></div>
                <div><p><i>who</i> we are<span>?</span></p></div>
            </Tit>

            <Search ref={searchRef}>
                <div className="seb">
                    <p>NITOR</p>
                    <i className="xi-search"/>
                </div>
                <div className="sound">
                    <span>[ni <img src="/image/about/icon.png" alt=""/> tor, 니토르]</span>
                    <i className="xi-volume-up"/>
                </div>
                <dl>
                    <dt>Brightness, splendor</dt>
                    <dd>빛, 광채, 광휘</dd>
                </dl>
                <dl>
                    <dt>Foward, advanced</dt>
                    <dd>나아가다, 도달하다</dd>
                </dl>
            </Search>

            <Tbx ref={tbxRef}>
                <div className="inline">
                    <p className="right">In all areas where</p>
                    <div className="fade"><p>visual communication is needed in our daily lives,</p></div>
                    <div className="fade"><p>NITOR wants to spread that <i>light</i> constantly.</p></div>
                    <p className="desc">
                        우리의 일상 속 비주얼 커뮤니케이션이 필요한 모든 분야에<br/>
                        NITOR는 그 빛을 끊임없이 확산시키고자 합니다.
                    </p>
                </div>
            </Tbx>

        </Imb>

    )
}