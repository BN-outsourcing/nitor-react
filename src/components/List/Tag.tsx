import { useGSAP } from "@gsap/react";
import axios from "axios";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { TagType } from "../../types/axiosType";
import { useQuery } from "react-query";
import { listTagClickAtom } from "../../Atom/tag";
import { useRecoilState } from "recoil";
import gsap from "gsap";
import { blurAnimtaion } from "../../utils/gsap";

const TagLayout = styled.nav`
    display: inline-flex;
    /* border: 1px solid rgba(255,255,255,0.5); */
    /* padding: 8px 14px; */
    box-sizing: border-box;
    border-radius: 12px;
    margin-top: 10px;
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    text-transform: uppercase;
    gap: 10px 0;
    position: relative;
    z-index: 2;
    .a {
        display: inline-block;
        padding: calc(12/18*1em) calc(25/18*1em);
        color: #fff;
        font-size: 18px;
        white-space: nowrap;
        transition: color .4s;
        cursor: pointer;
        &:hover {
            color : #000;
        }
        &.act {
            color: #000;
        }
    }
    .b {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 42px;
        border-radius: 1000px;
        background: #fff;
        pointer-events: none;
        z-index: -1;
    }

    @media screen and (max-width : 1024px) {
        flex-wrap: wrap;
        .a {
            font-size: 16px;
        }
    }
    
    @media screen and (max-width : 820px) {
        /* margin-top: 45px; */
        .a {
            font-size: 14px;
        }
    }

`;

const tagFetch = async ()=>{
    const response = await axios.get('/api.json');
    const {data : {tag}} : { data : {tag: TagType[]} } = response; // 구조분해
    return tag;
}

export default function Tag() {

    const {data : tag} = useQuery('tagData',tagFetch);
    const [clickTag,setClickTag] = useRecoilState(listTagClickAtom);

    // 태그관련
    const tagRef = useRef<HTMLElement | null>(null);
    const bRef = useRef(null);
    const tabOver = (e : React.MouseEvent<HTMLDivElement, MouseEvent>,color? : string)=>{
        
        const target = e.target as HTMLElement; //  HTMLElement 타입으로 변경

        let colorChange;

        switch(color) {
            case "color01" :
                colorChange = '#fff07f';
            break;
            case "color02" :
                colorChange = '#fb5513';
            break;
            case "color03" :
                colorChange = '#ff096e';
            break;
            case "color04" :
                colorChange = '#8337ec';
            break;
            case "color05" :
                colorChange = '#3a87ff';
            break;
            default :
                colorChange = '#fff';
            break;
        }

        const tagElement = tagRef.current;

        if(tagElement instanceof HTMLElement){
            if(target.classList.contains('act')) return;
            gsap.to(tagElement.querySelector('.act'),{
                color : "#fff",
                duration : 0.4,
            })
        }

        gsap.to(bRef.current,{
            backgroundColor : colorChange,
            width : target.clientWidth,
            top : target.offsetTop + target.clientHeight/2,
            left : target.offsetLeft,
            duration : 0.8
        });

    }
    const tabLeave = ()=>{
        if(tagRef.current){

            const element = tagRef.current as HTMLElement;
            const act = element.querySelector('.act');

            if(act === null) return;

            if(act instanceof HTMLElement) {

                let colorChange;

                switch(clickTag) {
                    case 1 :
                        colorChange = '#fff07f';
                    break;
                    case 2 :
                        colorChange = '#fb5513';
                    break;
                    case 3 :
                        colorChange = '#ff096e';
                    break;
                    case 4 :
                        colorChange = '#8337ec';
                    break;
                    case 5 :
                        colorChange = '#3a87ff';
                    break;
                    default :
                        colorChange = '#fff';
                    break;
                }

                gsap.to(act,{
                    color : "#000",
                    duration : 0.4,
                })

                gsap.to(bRef.current,{
                    backgroundColor : colorChange,
                    width : act.clientWidth,
                    top : act.offsetTop + act.clientHeight/2,
                    left : act.offsetLeft,
                    color : "#000",
                    duration : 0.8
                });

            }

        }
    }
    // tab클릭했을때 번호 state 수정
    const tabClick = ((type : number)=>{
        setClickTag(type);
    })

    useGSAP(()=>{

        if(!tagRef.current) return;

        blurAnimtaion(tagRef.current);

    },[tagRef.current]);

    useGSAP(()=>{

        if(tagRef.current){

            const element = tagRef.current as HTMLElement;

            const act = element.querySelector('.act');

            if(act === null) return;

            if(act instanceof HTMLElement) {

                let colorChange;

                switch(clickTag) {
                    case 1 :
                        colorChange = '#fff07f';
                    break;
                    case 2 :
                        colorChange = '#fb5513';
                    break;
                    case 3 :
                        colorChange = '#ff096e';
                    break;
                    case 4 :
                        colorChange = '#8337ec';
                    break;
                    case 5 :
                        colorChange = '#3a87ff';
                    break;
                    default :
                        colorChange = '#fff';
                    break;
                }

                gsap.to(act,{
                    color : "#000",
                    duration : 0.4,
                })

                gsap.to(bRef.current,{
                    backgroundColor : colorChange,
                    width : act.clientWidth,
                    top : act.offsetTop + act.clientHeight/2,
                    left : act.offsetLeft,
                    duration : 0.8
                });

            }

        }

    },{dependencies : [clickTag,tagRef.current], scope : tagRef})

    useEffect(()=>{

        const resizeHanlder = ()=>{

            if(tagRef.current){

                const element = tagRef.current as HTMLElement;
                const act = element.querySelector('.act');
    
                if(act === null) return;
    
                if(act instanceof HTMLElement) {
    
                    let colorChange;
    
                    switch(clickTag) {
                        case 1 :
                            colorChange = '#fff07f';
                        break;
                        case 2 :
                            colorChange = '#fb5513';
                        break;
                        case 3 :
                            colorChange = '#ff096e';
                        break;
                        case 4 :
                            colorChange = '#8337ec';
                        break;
                        case 5 :
                            colorChange = '#3a87ff';
                        break;
                        default :
                            colorChange = '#fff';
                        break;
                    }
    
                    gsap.to(act,{
                        color : "#000",
                        duration : 0.2,
                    })
    
                    gsap.to(bRef.current,{
                        backgroundColor : colorChange,
                        width : act.clientWidth,
                        top : act.offsetTop + act.clientHeight/2,
                        left : act.offsetLeft
                    });
    
                }
    
            }

        }

        window.addEventListener('resize',resizeHanlder);

        return ()=>{
            window.removeEventListener('resize',resizeHanlder);
        }

    },[clickTag]);

    return (
        <TagLayout 
            className="tag"
            ref={tagRef}
        >
            <div
                className={`a ${clickTag === 0 ? "act" : ""}`}
                onMouseOver={(e)=> tabOver(e)}
                onMouseLeave={tabLeave}
                onClick={()=>tabClick(0)}
            >ALL</div>
            {
                tag?.map((el)=>
                    <div
                        key={el.type} 
                        className={`a ${clickTag === el.type ? "act" : ""}`}
                        onMouseOver={(e)=> tabOver(e,el.color)}
                        onMouseLeave={tabLeave}
                        onClick={(_)=>tabClick(el.type)}
                    >{el.name}</div>
                )
            }
            <div className="b" ref={bRef}></div>
        </TagLayout>
    )
}