import styled from "styled-components"
import ImbLayout from "./ImbLayout";
import ImgGridLayout from "./ImgGridLayout";
import GridLayout from "./GridLayout";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { footerAtom } from "../../Atom/footer";
import gsap from "gsap";

const AboutLayout = styled.div`
    background-color: #000000;
    color: #fff;
    padding: 175px 0 240px;
    background-image: url(/image/about/background.jpg);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
    position: relative;

    @media screen and (max-width : 820px){
        padding: 145px 0 80px;
    }

`;

const Wrppaer = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    width: 95%;
`;

const Curosr = styled.div`
    font-family: "Pretendard";
    font-size: 18px;
    letter-spacing: -0.025em;
    line-height: calc(54/18);
    border-radius: 1000px;
    backdrop-filter: blur(10px);
    background-color: rgba(255,255,255,0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 55;
    width: calc(270/18*1em);
    height: calc(54/18*1em);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    box-shadow: 5px 5px 7px 0px rgba(0, 0, 0, 0.2);
    opacity: 0;

    @media screen and (max-width : 1280px) {
        font-size: 16px;
    }

    @media screen and (max-width : 820px) {
        font-size: 14px;
    }

`;

export default function About() {

    const setFooter = useSetRecoilState(footerAtom);

    useEffect(()=>{
        setFooter('about');
    });

    const curosrRef = useRef<HTMLDivElement>(null);
    const onMove = (e : React.MouseEvent<HTMLElement>)=>{
        const cosX = e.clientX;
        const cosY = e.clientY;

        if(curosrRef.current){

            gsap.set(curosrRef.current,{
                top : cosY - (curosrRef.current?.clientHeight/2),
                left : cosX - (curosrRef.current?.clientWidth/2)
            });

        }

    }

    return (
        <>
            <AboutLayout
                onMouseMove={(e)=>onMove(e)}
            >
                
                <Wrppaer>
                    <ImbLayout
                        cursorRef={curosrRef}
                    />
                </Wrppaer>

                <ImgGridLayout/>

                <Wrppaer>
                    <GridLayout/>
                </Wrppaer>  

            </AboutLayout>
            <Curosr 
                ref={curosrRef}
            >당신과 우리의 영감을 위해 💡</Curosr>
        </>
    )

}