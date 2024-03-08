import styled from "styled-components"
import { useSetRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { footerAtom } from "../Atom/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: background .4s;
`;

const Tbx = styled.dl`
    text-align: center;
    position: relative;
    z-index: 2;
    transform: translateY(-5%);
    dt {
        margin: 0 auto;
    }
    dd {
        color: #fff;
        margin-top: calc(30/28*1em);
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        font-size: 28px;
        text-transform: uppercase;
        span {
            font-family: 'Big Daily Short';
        }
        i {
            font-style: italic;
        }
    }

    @media screen and (max-width : 1280px) {
        dt {
            width : 387px;
        }
        dd {
            font-size: 26px;
        }
    }

    @media screen and (max-width : 1024px) {
        dt {
            width : 70%;
        }
        dd {
            font-size: 20px;
        }
    }

    @media screen and (max-width : 820px) {
        dd {
            font-size: 16px;
        }
    }

`;

const VideoDiv = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const VideoElm = styled.video`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default function Main() {

    const setFooter = useSetRecoilState(footerAtom);

    const [background,setBackground] = useState<string[]>([]);
    const [bgIndex,setBgIndex] = useState(0);

    // 영상 데이터 가져오기
    useEffect(()=>{

        setFooter('main');

        axios.get('/api.json')
        .then(({data})=>{
            const {main} = data;
            setBackground(main.image);
        })
        .catch(e=>{
            console.log(e);
        })

    },[]);

    // 배경화면 클릭
    const onClick = ()=>{

        if(bgIndex >= background.length - 1){
            setBgIndex(0);
        }else{
            setBgIndex(bgIndex + 1);
        }

    }

    const tbxRef = useRef<HTMLDListElement>(null);
    useGSAP(()=>{

        if(!tbxRef.current) return;

        const tl = gsap.timeline();

        tl
        .fromTo(tbxRef.current.querySelector('dt'),{
            filter : `blur(10px)`
        },{
            filter : "blur(0px)",
            duration : 0.8,
        })
        .fromTo(tbxRef.current.querySelector('dd'),{
            filter : `blur(10px)`
        },{
            filter : "blur(0px)",
            duration : 0.8,
        },">-=50%")
        

    },[tbxRef.current]);

    return (
        <Wrapper 
            onClick={onClick}
        >
            <VideoDiv>
                {
                    background.map((e,i)=>
                        <VideoElm 
                            key={i} 
                            src={e} 
                            loop={true} 
                            autoPlay={true} 
                            muted={true} 
                            playsInline={true} 
                            style={{opacity : bgIndex === i ? 1 : 0}}
                        />
                    )
                }
            </VideoDiv>
            <Tbx ref={tbxRef}>
                <dt>
                    <img src="/image/main/logo.png" alt=""/>
                </dt>
                <dd>
                    for you <span>&</span> <i>our inspiration</i>
                </dd>
            </Tbx>
        </Wrapper>
    )
}