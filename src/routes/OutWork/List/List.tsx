import styled from "styled-components"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { footerAtom } from "../../../Atom/footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getTrigger } from "../../../lib/gsap";
import ListView from "./ListView";

const OutWorkLayout = styled.div`
    background: #000;
    color: #fff;
    padding: 220px 0 50px;
    @media screen and (max-width : 820px) {
        padding: 170px 0 50px;
    }
`;

const Wrapper = styled.div`
    max-width: 1820px;
    width: 95%;
    margin: 0 auto;
`;

const H1 = styled.h1`
    font-size: 120px;
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    overflow: hidden;

    span {
        display: inline-block;
    }

    @media screen and (max-width : 1280px) {
        font-size: 90px;
    }

    @media screen and (max-width : 1024px) {
        font-size: 80px;
    }

    @media screen and (max-width : 820px) {
        font-size: 52px;
    }

    @media screen and (max-width : 480px) {
        font-size: 32px;
    }

`;

const Tag = styled.nav`
    display: inline-flex;
    border: 1px solid rgba(255,255,255,0.5);
    padding: 8px 14px;
    box-sizing: border-box;
    border-radius: 12px;
    margin-top: 65px;
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
        border-radius: 10px;
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
        margin-top: 45px;
        .a {
            font-size: 14px;
        }
    }

`;


const Glasses = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    font-family: "Pretendard";
    top: 0;
    left: 0;
    z-index: 55;
    background-color: rgba(255,255,255,0.5);
    border-radius: 1000px;
    backdrop-filter: blur(15px);
    width: calc(236.13/18*1em);
    height: calc(50.68/18*1em);
    font-size: 18px;
    letter-spacing: -0.025em;
    pointer-events: none;
    opacity: 0;

    @media screen and (max-width : 1280px) {
        font-size: 16px;
    }

`;

type TagType = {
    type : number
    name : string,
    color : string
}

export interface Item {
    id : number;
    tag : number[] | TagType[];
    eng : string;
    title : string;
    desc : string;
    image : string[];
}

export default function List() {

    const setFooter = useSetRecoilState(footerAtom);
    const [item,setItme] = useState<Item[]>([]);
    const [filterItem,setFilterItem] = useState<Item[]>([]);
    const [tag,setTag] = useState<TagType[]>([]);
    const [clickTag,setClickTag] = useState(0);

    useEffect(()=>{

        setFooter('outwork');

        axios.get('/api.json')
        .then(({data})=>{
            const {product,tag} : {product : Item[], tag : TagType[]} = data;

            // product 와 tag를 비교해서 product의 tag를 수정해줍니다
            product.forEach(product => {
                const productTags = product.tag; 
                const matchedTags : TagType[] = [];
          
                productTags.forEach(productTag => {
                  const matchedTag = tag.find(tag => tag.type === productTag);
                  if (matchedTag) {
                    matchedTags.push(matchedTag);
                  }
                });
          
                product.tag = matchedTags;
            });

            setItme(product);
            setTag(tag);

        })

    },[]);

    useEffect(()=>{
        if(clickTag === 0) return setFilterItem(item);
        const filter = item.filter(item=>{
            const tags = item.tag;
            const find = tags.find(tag=>{
                if(typeof tag === "object"){
                    return tag.type === clickTag;
                }
            })
            if(find) return true;
        });
        setFilterItem(filter);
    },[clickTag,item]);

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
                duration : 0.2,
            })
        }

        gsap.to(bRef.current,{
            backgroundColor : colorChange,
            width : target.clientWidth,
            top : target.offsetTop + target.clientHeight/2,
            left : target.offsetLeft
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
                    duration : 0.2,
                })

                gsap.to(bRef.current,{
                    backgroundColor : colorChange,
                    width : act.clientWidth,
                    top : act.offsetTop + act.clientHeight/2,
                    left : act.offsetLeft,
                    color : "#000"
                });

            }

        }
    }
    const tabClick = ((type : number)=>{
        setClickTag(type);
    })
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

    // 돋보기 애니메이션
    const glassRef = useRef<HTMLDivElement>(null);
    const onMove = (e : React.MouseEvent<HTMLElement>)=>{
        const cosX = e.clientX;
        const cosY = e.clientY;

        if(glassRef.current){
            const target = glassRef.current as HTMLElement;
            gsap.set(target,{
                top : cosY - (target.clientHeight / 2),
                left : cosX - (target.clientWidth / 2)
            });
        }

    }

    // 전체 애니메이션
    const owlRef = useRef(null);
    useGSAP(()=>{

        gsap.fromTo('.h1 span',{
            yPercent : 100,
        },{
            yPercent : 0,
            ease : "back.inOut(1.4)",
            duration : 0.8,
            scrollTrigger : getTrigger('.h1')
        })

        gsap.fromTo('.tag',{
            y : 50,
            opacity : 0
        },{
            y : 0,
            opacity : 1,
            ease : "back.inOut(1.4)",
            duration : 0.8,
            scrollTrigger : getTrigger('.tag')
        });

    },{dependencies : [owlRef.current], scope : owlRef});

    return (
        <>

            <OutWorkLayout
                ref={owlRef}
                onMouseMove={(e)=>onMove(e)}
            >
                <Wrapper>

                    <H1 className="h1">
                        <span>OUR WORK</span>
                    </H1>

                    <Tag 
                        className="tag"
                        ref={tagRef}
                    >
                        <div
                            className={`a ${clickTag === 0 ? "act" : ""}`}
                            onMouseOver={(e)=> tabOver(e)}
                            onMouseLeave={tabLeave}
                            onClick={(_)=>tabClick(0)}
                        >ALL</div>
                        {
                            tag.map((el)=>
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
                    </Tag>

                    {/* 아이템 리스트 */}
                    <ListView 
                        item={filterItem}
                        glass={glassRef}
                    />
                    
                </Wrapper>
            </OutWorkLayout>

            <Glasses ref={glassRef}>
                프로젝트 더 알아보기 🔍
            </Glasses>

        </>
    )
}