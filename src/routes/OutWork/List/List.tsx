import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { ColorP } from "../../../components/p";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { footerAtom } from "../../../Atom/footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getTrigger } from "../../../lib/gsap";

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

const Grid = styled.div`
    margin-top: 110px;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    box-sizing: border-box;
    width: 90%;
    max-width: 1600px;
    gap: 25px 35px;

    @media screen and (max-width : 1280px) {

    }

    @media screen and (max-width : 1024px) {
        
        grid-template-columns: repeat(2,1fr);

    }

    @media screen and (max-width : 820px) {
        width: 100%;
        margin-top: 80px;
    }

    @media screen and (max-width : 480px) {
        
        grid-template-columns: repeat(1,1fr);

    }

`;

const Item = styled.div`

    position: relative;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: none;

    &::before {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        content: "";
        opacity: 0;
        transition: opacity .4s;
    }

    &::after {
        content: '';
        display: block;
        padding-bottom: calc(640/510*100%);
    }

    > p {
        position: absolute;
        top: calc(25/20*1em);
        left: 50%;
        transform: translateX(-50%);
        font-size: calc(20*100/1920*1vw);
        text-transform: uppercase;
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        white-space: nowrap;
    }

    dl {
        position: absolute;
        top:50%;
        left: calc(30/505*100%);
        transform: translateY(-50%);
        overflow: hidden;

        dt {
            display: flex;
            gap: 9px;

            p {
                font-size: calc(14*100/1920*1vw);
            }

        }

        dd {
            margin-top: calc(23/42*1em);
            font-family: "Pretendard";
            font-size: calc(42*100/1920*1vw);
            font-weight: 500;
            line-height: calc(54/42);
        }

    }

    @media screen and (min-width :821px) {
        
        &:hover {
            &::before {
                opacity: 0.6;
            }

            dl {
                dt {
                    p {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                dd {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

        }

        dl {
            dt {
                p {
                    transform: translateY(100%);
                    opacity: 0;
                    transition: .4s;
                    transition-property: transform, opacity;
                }
            }
            dd {
                transform: translateX(-100%);
                opacity: 0;
                transition: .4s;
                transition-property: transform, opacity;
            }
        }

    }

    @media screen and (max-width : 1280px) {

        > p {
            font-size: calc(20*100/1280*1vw);
        }

        dl {
            dt {
                p {
                    font-size: calc(14*100/1280*1vw);
                }
            }
            dd {
                font-size: calc(32*100/1280*1vw);
            }
        }
    }

    @media screen and (max-width : 1024px) {

        > p {
            font-size: 18px;
        }

        dl {
            dt {
                p {
                    font-size: 14px;
                }
            }
            dd {
                font-size: calc(48*100/1280*1vw);
            }
        }

    }

    @media screen and (max-width : 820px) {

        > p {
            font-size: calc(20*100/820*1vw);
        }

        dl {
            dt {
                p {
                    font-size: 10px;
                }
            }
            dd {
                font-size: calc(42*100/1024*1vw);
            }
        }

    }

    @media screen and (max-width : 480px) {

        > p {
            font-size: 16px;
        }

        dl {
            dt {
                p {
                    font-size: 12px;
                }
            }
            dd {
                font-size: 28px;
            }
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

    const navigate = useNavigate();
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

    // 클릭 이벤트
    const itemOnClick = (id : number)=>{
        navigate(`view/${id}`);
    }

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
    const glassRef = useRef(null);
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
    const onOver = ()=>{
        if(glassRef.current){
            const target = glassRef.current as HTMLElement;
            gsap.to(target,{
                opacity : 1,
                rotate : -15
            });
        }
    }
    const onLeave = ()=>{
        if(glassRef.current){
            const target = glassRef.current as HTMLElement;
            gsap.to(target,{
                opacity : 0,
                onComplete : ()=>{
                    gsap.set(target,{
                        rotate : 0
                    })
                }
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

    // 아이템 애니메이션
    const gridRef = useRef(null);
    useGSAP(()=>{
        if(gridRef.current){

            gsap.utils.toArray('.item').forEach(el=>{
                const item = el as HTMLElement;
                gsap.fromTo(item,{
                    y : 50,
                    opacity : 0
                },{
                    y: 0,
                    opacity : 1,
                    ease : "back.inOut(1.4)",
                    duration : 0.8,
                    scrollTrigger : getTrigger(item)
                })
            })

        }
    },{dependencies : [gridRef.current, filterItem], scope : gridRef})

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
                    
                    <Grid
                        ref={gridRef}
                    >
                        
                        {
                            filterItem.map((el)=>
                                <Item
                                    className="item"
                                    key={el.id}
                                    onClick={()=>itemOnClick(el.id)} 
                                    style={{backgroundImage : `url(${el.image[0]})`}}
                                    onMouseOver={onOver}
                                    onMouseLeave={onLeave}
                                >
                                    <p>{el.eng}</p>
                                    <dl>
                                        <dt>
                                            {
                                                el.tag.map((el,index)=>
                                                    {
                                                        if(typeof el === "object"){

                                                            return (
                                                                <ColorP 
                                                                    key={index} 
                                                                    className={el.color}
                                                                    style={{transitionDelay : `${0.2*index}s`}}
                                                                >{el.name}</ColorP>
                                                            )
                                                            
                                                        }
                                                    }
                                                )
                                            }
                                        </dt>
                                        <dd dangerouslySetInnerHTML={{__html : el.title}} />
                                    </dl>
                                </Item>
                            )
                        }

                    </Grid>
                    
                </Wrapper>
            </OutWorkLayout>

            <Glasses ref={glassRef}>
                프로젝트 더 알아보기 🔍
            </Glasses>

        </>
    )
}