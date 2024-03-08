import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import styled from "styled-components"
import { getTrigger } from "../../utils/gsap";
import SubLayoutTit from "../../components/Layout/SubLayout";
import Cricle, { CircleProps } from "../../components/About/Circle";
import { useTranslation } from "react-i18next";

const Imb = styled.div`
    position: relative;
`;

const Search = styled.div`

    margin-top: 180px;
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
        
        margin-top: 100px;
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
        
        margin-top: 80px;
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
        
        margin-top: 60px;

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

    .inline {

        font-size: calc(42*100/1920*1vw);
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
            font-size: 18px;
            .desc {
                font-size: 14px;
            }
        }

    }

`;

export default function ImbLayout({cursorRef} : CircleProps) {

    const {i18n} = useTranslation();

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
            filter : "blur(10px)"
        },{
            filter : "blur(0px)",
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
            filter : "blur(10px)"
        },{
            filter : "blur(0px)"
        },">-=50%");

        searchRef.current.querySelectorAll('dl').forEach(el=>{

            typingTl.fromTo(el,{
                filter : "blur(10px)"
            },{
                filter : "blur(0px)"
            },">-=50%");

        });


    },[searchRef.current]);

    const tbxRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{

        if(tbxRef.current){

            const target = tbxRef.current;

            const fadeTl = gsap.timeline({
                scrollTrigger : getTrigger(target)
            })
            fadeTl.fromTo(target.querySelector('.right'),{
                filter : "blur(10px)"
            },{
                filter : "blur(0)"
            })

            target.querySelectorAll('div').forEach(el=>{
                fadeTl.fromTo(el,{
                    filter : "blur(10px)"
                },{
                    filter : "blur(0px)"
                },">-=50%")
            })


            gsap.fromTo(target.querySelector('.desc'),{
                filter : "blur(10px)"
            },{
                filter : "blur(0px)",
                duration : 0.4,
                scrollTrigger : getTrigger(target.querySelector('.desc'))
            })

        }

    },[tbxRef.current]);


    return (

        <Imb>

            <Cricle cursorRef={cursorRef}/>

            <SubLayoutTit>
                <p>wanna e<span>xp</span>erience</p>
                <p><i>who</i> we are<span>?</span></p>
            </SubLayoutTit>

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
                    {
                        i18n.language === "ko" ?
                        <dd>빛, 광채, 광휘</dd>
                        : null
                    }
                </dl>
                <dl>
                    <dt>Foward, advanced</dt>
                    {
                        i18n.language === "ko" ?
                        <dd>나아가다, 도달하다</dd>
                        : null
                    }
                </dl>
            </Search>

            <Tbx ref={tbxRef}>
                <div className="inline">
                    <p className="right">In all areas where</p>
                    <div>visual communication is needed in our daily lives,</div>
                    <div>NITOR wants to spread that <i>light</i> constantly.</div>
                    <p className="desc">
                        우리의 일상 속 비주얼 커뮤니케이션이 필요한 모든 분야에<br/>
                        NITOR는 그 빛을 끊임없이 확산시키고자 합니다.
                    </p>
                </div>
            </Tbx>

        </Imb>

    )
}