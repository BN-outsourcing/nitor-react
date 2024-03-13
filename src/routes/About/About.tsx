import styled from "styled-components"
import ImbLayout from "./ImbLayout";
import ImgGridLayout from "./ImgGridLayout";
import GridLayout from "./GridLayout";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { SubLayout } from "../../components/Layout/SubLayout";

const Wrppaer = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    width: ${100 - (100/1920*100)}%;
`;

const ScrollDown = styled.div`
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    font-family: 'Neue Haas Grotesk Display Pro';
    z-index: 999;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: opacity.4s;
    i {
        font-size: 22px;
        letter-spacing: -0.025em;
        margin-top: ${15/22}em;
    }
    &.act {
        opacity: 0;
    }
`;

gsap.registerPlugin(ScrollTrigger,TextPlugin);

export default function About() {

    const [sdOpacity,setSdOpacity] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const subRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{

        ScrollTrigger.create({
            trigger : subRef.current,
            start : "top+=10 top",
            // markers : true,
            onEnter : ()=>{
                setSdOpacity(true);
            },
            onLeaveBack : ()=>{
                setSdOpacity(false);
            }
        })

    },[subRef.current]);

    /* const curosrRef = useRef<HTMLDivElement>(null);
    const onMove = useCallback((e : React.MouseEvent<HTMLElement>)=>{
        const cosX = e.clientX;
        const cosY = e.clientY;

        if(curosrRef.current){

            gsap.set(curosrRef.current,{
                top : cosY,
                left : cosX
            });

        }

    },[curosrRef.current]); */

    useGSAP(()=>{
        
        if(!scrollRef.current) return;

        gsap.fromTo(scrollRef.current.querySelector('i'),{
            y : 15
        },{
            y : 0,
            yoyo : true,
            ease : "power1.inOut",
            duration : 1,
            repeat : -1
        })

    },[scrollRef.current]);

    return (
        <>
            <ScrollDown ref={scrollRef} className={sdOpacity ? "act" : ""}>
                <i className="xi-angle-down"></i>
            </ScrollDown>

            <SubLayout
                ref={subRef}
                $page="about"
            >
                <Wrppaer>
                    <ImbLayout/>
                </Wrppaer>

                <ImgGridLayout/>

                <Wrppaer>
                    <GridLayout/>
                </Wrppaer>  

            </SubLayout>
            {/* <CursorType1
                ref={curosrRef}
            >당신과 우리의 영감을 위해 <img src="/image/icon/light.png" alt="" />
            </CursorType1> */}
        </>
    )

}