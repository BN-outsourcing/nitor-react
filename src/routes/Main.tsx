import styled from "styled-components"
import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { footerAtom } from "../Atom/footer";

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
    const [change,setChange] = useState('/video/main01.mp4');
    const [bgIndex,setBgIndex] = useState(0);

    // 영상 데이터 가져오기
    useEffect(()=>{

        setFooter('main');

        axios.get('/api.json')
        .then(({data})=>{
            const {main} = data;
            setBackground(main.image);
            setChange(main.image[0]);
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

        setChange(background[bgIndex]);        

    }

    return (
        <Wrapper 
            onClick={onClick}
        >
            <VideoElm src={change} loop={true} autoPlay={true} muted={true} playsInline={true} />
            <Tbx>
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