import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

export type CircleProps = {
    cursorRef? : React.RefObject<HTMLDivElement>
}

const CricleLayout = styled.div`

    position: absolute;
    /* right: calc(130/1600*100%); */
    right: 0;
    top: calc(60/1460*100%);
    width: calc(580*100/1920*1vw);
    border-radius: 1000px;
    overflow: hidden;

    &::after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 1024px) {
        top: 1.5%;
        right: 0;
    }

`;

const imageLengthFetch = async () => {
    const response = await axios.get('/api.json');
    const {data : {about : {imageLength}}} : {data : {about : {imageLength : number}}} = response;
    return imageLength;
}

export default function Cricle({cursorRef} : CircleProps) {

    const {data : max} = useQuery('imageLength',imageLengthFetch);
    const [number,setNumber] = useState(0);
    const [over,setOver] = useState(false);

    const imgRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{

        if(!imgRef.current) return

        const target = imgRef.current

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


    },[imgRef.current]);

    const imgOver = useCallback(()=>{
        setOver(true);
        /* gsap.to(cursorRef.current,{
            scale : 1,
            duration : 0.4,
        }) */
    },[]);

    const imgLeave = useCallback(()=>{
        setOver(false);
        /* gsap.to(cursorRef.current,{
            scale : 0,
            duration : 0.4,
        }) */
    },[]);

    useEffect(()=>{

        const TIMER = 150;

        if(max){
            let timer : any;

            if(over){
                clearInterval(timer);
            }else{
                timer = setInterval(()=>{
                    if(number >= max-1){
                        return setNumber(0);
                    }
                    setNumber(number+1);
                },TIMER);
            }

            return ()=>{
                if(timer) clearInterval(timer);
            }
        }
    },[max,number,over]);

    return (
        <CricleLayout 
            ref={imgRef}
            onMouseOver={imgOver}
            onMouseLeave={imgLeave}
        >
            <img src={`/image/about/circle/circle${(number+1).toString().padStart(2,'0')}.jpg`} alt=""/>
        </CricleLayout>
    )
}