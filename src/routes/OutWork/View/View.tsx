import styled, { css } from "styled-components"
import { ColorP } from "../../../components/p";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import gsap from "gsap";
import { blurAnimtaion, getTrigger } from "../../../utils/gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { itemInfoFetch } from "../../../utils/APIfetch";
import { SubLayout } from "../../../components/Layout/SubLayout";

/* const ViewLayout = styled.div`
    padding: 225px 0 150px;
    color: #fff;

    @media screen and (max-width : 820px) {
        padding: 150px 0 125px;
    }

`; */

const Wrapper = styled.div`
    max-width: 1600px;
    width: ${100 - (100/1920*100)}%;
    margin: 0 auto;
`;

const TitleBox = styled.div`

    > p {
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        font-size: 18px;
        text-transform: uppercase;
    }

    dl {
        display: flex;
        font-family: 'Pretendard';
        justify-content: space-between;
        gap: 50px;
        dt {
            text-transform: uppercase;
            font-weight: 500;
            font-size: 72px;
            line-height: calc(84/72);
            white-space: nowrap;
        }
        dd {
            font-weight: 400;
            line-height: calc(30/18);
            word-break: keep-all;
            font-size: 18px;
        }
    }

    .tag {
        display: flex;
        gap: 9px;
        margin-top: 30px;
    }

    @media screen and (max-width : 1280px) {
        
        dl {
            dt {
                font-size: 62px;
            }
        }

    }

    @media screen and (max-width : 1024px) {
        
        dl {
            flex-direction: column;
            gap: 25px;
            dt {
                font-size: 48px;
            }
            dd {
                font-size: 16px;
            }
        }

    }

    @media screen and (max-width : 820px) {
        
        > p {
            font-size: 16px;
        }

        dl {
            flex-direction: column;
            gap: 25px;
            margin-top: 5px;
            dt {
                font-size: 42px;
            }
            dd {
                font-size: 16px;
            }
        }

    }

    @media screen and (max-width : 480px) {
        
        > p {
            font-size: 14px;
        }

        dl {
            flex-direction: column;
            gap: 25px;
            dt {
                font-size: 32px;
            }
            dd {
                font-size: 14px;
            }
        }

    }

`;

const Img = styled.div`
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #fff;
    border-radius: 20px;
    &::after{
        content: '';
        display: block;
        padding-bottom: calc(899/1599*100%);
    }

    @media screen and (max-width : 1024px) {
        border-radius: 10px;
    }

`;

const SlideBox = styled.div`
    margin-top: 80px;
    position: relative;
    cursor: none;

    .swiper-slide {
        position: relative;
        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(000,000,000,0.8);
            opacity: 1;
            transition: opacity .4s;
        }

        &.swiper-slide-active {
            &::after {
                opacity: 0;
            }
        }

    }

`;

type ButtonType = {
    $type? : string
}
const Button = styled.button<ButtonType>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width : calc(120/18*1em);
    height : calc(54/18*1em);
    border-radius : 10000px;
    font-size : 18px;
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    letter-spacing: -0.025em;
    backdrop-filter: blur(15px);
    background-color: rgba(000,000,000,0.1);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.3);
    cursor: pointer;
    overflow: hidden;
    text-transform: uppercase;
    padding: 0;
    box-shadow: 5px 5px 7px 0px rgba(0, 0, 0, 0.2);
    transition: .4s;
    transition-property: background-color, color;
    ${props=>{
        switch(props.$type){
            case "right" :
                return css`
                    right : calc(215*100/1920*1vw);
                    i {
                        margin-left: 10px;
                    }
                `;
            default :
                return css`
                    left: calc(215*100/1920*1vw);
                    i {
                        margin-right: 10px;
                    }
                `;
        }
    }};
    &:hover {
        background-color: rgba(255,255,255,1);
        color: #000;
    }

    @media screen and (max-width : 1024px) {
        font-size : 16px;
    }

    @media screen and (max-width : 820px) {
        display : none;
        ${props=>{
        switch(props.$type){
            case "right" :
                return css`
                    right : 3%;
                    i {
                        margin-left: 10px;
                    }
                `;
            default :
                return css`
                    left: 3%;
                    i {
                        margin-right: 10px;
                    }
                `;
            }
        }};
        font-size : 14px;
    }

    @media screen and (max-width : 480px) {
        font-size : 12px;
    }

`;
const Drag = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 122px;
    background-color: rgba(255,255,255,0.3);
    backdrop-filter: blur(15px);
    border-radius: 1000px;
    overflow: hidden;
    color: #000;
    font-size: 18px;
    letter-spacing: -0.025em;
    font-family: "Pretendard";
    pointer-events: none;
    transform: rotate(-30deg) scale(0);
    &::after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
    dl {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        dd {
            margin-top: calc(5/18*1em);
        }
    }
`;

const Flex = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-top: 40px; */
    p {
        font-size: 32px;
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        color: #fff;
        opacity: 0.3;
        &.act {
            opacity: 1;
        }
    }
    div {
        width: 20px;
        height: 2px;
        background: #fff;
        opacity: 0.3;
        margin: 0 20px;
    }

    @media screen and (max-width : 1024px) {
        p {
            font-size: 24px;
        }
        div {
            width: 15px;
            margin: 0 10px;
        }
    }

`;

const Back = styled.div`
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    font-size: 18px;
    /* margin: 45px auto 0; */
    text-align: center;
    margin-left: 20px;
    a {
        width: calc(210/20*1em);
        height: calc(50/20*1em);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 1000px;
        color: #fff;
        border: 1px solid #fff;
        background-color: #000;
        transition: .4s;
        transition-property: background-color,color;
        &:hover {
            background-color: #fff;
            color: #000;
        }
    }

    @media screen and (max-width: 1024px) {
        font-size: 16px;
    }

    @media screen and (max-width: 820px) {
        font-size: 14px;
    }

`;


export default function View() {

    const {id} = useParams();
    // const [data,setData] = useState<Item | null>(null);
    const {i18n} = useTranslation();

    const [index,setIndex] = useState('00');
    const [last,setLast] = useState('00');

    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const dragRef = useRef(null);

    const {data} = useQuery("iteminfo",()=>itemInfoFetch(id));

    const slideMove = useCallback((e : React.MouseEvent<HTMLDivElement>)=>{
        if(dragRef.current){

            const target = dragRef.current as HTMLElement;

            const cosX = e.clientX;
            const cosY = e.clientY;

            gsap.set(target,{
                top : cosY - (target.clientHeight / 2),
                left : cosX - (target.clientWidth / 2)
            })

        }
    },[dragRef.current]);

    const slideOver = useCallback(()=>{
        if(dragRef.current){
            gsap.to(dragRef.current,{
                scale : 1,
                rotate : -30,
                duration : 0.2
            })
        }
    },[dragRef.current])

    const slideLeave = useCallback(()=>{
        if(dragRef.current){
            gsap.to(dragRef.current,{
                scale : 0,
                rotate : -30,
                duration : 0.2
            })
        }
    },[dragRef.current]);


    // 타이틀 부분 애니메이션
    const titleRef = useRef(null);
    useGSAP(()=>{
        
        if(titleRef.current){
    
            blurAnimtaion('.e-tit',"5px");
            blurAnimtaion('.tit dt');
            blurAnimtaion('.tit dd');

            const tagTl = gsap.timeline({
                scrollTrigger : getTrigger('.tag')
            })
            gsap.utils.toArray('.tag p').forEach((e,index)=>{
                const element = e as HTMLElement;
                tagTl.fromTo(element,{
                    filter : `blur(10px)`
                },{
                    filter : "blur(0px)",
                    duration : 0.8,
                },index === 0 ? '' : ">-=50%" );
            });
            
        }

    },{dependencies : [titleRef.current,data], scope : titleRef});

    // 슬라이드 부분 애니메이션
    const slideRef = useRef<SwiperRef>(null);
    useGSAP(()=>{
        if(!slideRef.current) return;
        blurAnimtaion(slideRef.current);
    },[slideRef.current]);

    // 페이징
    const pageRef = useRef(null);
    useGSAP(()=>{

        if(pageRef.current){

            const target = pageRef.current as HTMLElement;
            blurAnimtaion(target);

        }

    },{dependencies : [pageRef.current,data], scope : pageRef});

    return (
        <>
            <SubLayout>
                {
                    data ? 
                    <>
                        <Wrapper>
                            <TitleBox ref={titleRef}>
                                <p className="e-tit">{data.smallText}</p>
                                <dl className="tit">
                                    <dt dangerouslySetInnerHTML={{__html : data[i18n.language].title}}>
                                    </dt>
                                    <dd 
                                        dangerouslySetInnerHTML={{__html : data[i18n.language].desc}}
                                    />
                                </dl>
                                <div className="tag">
                                    {
                                        data.tag.map((el)=>{
                                            if(typeof el === "object"){
                                                return <ColorP key={el.type} className={el.color}>{el.name}</ColorP>
                                            }
                                        })
                                    }
                                </div>
                            </TitleBox>
                        </Wrapper>

                        <SlideBox 
                            onMouseMove={(e)=>slideMove(e)}
                            onMouseLeave={slideLeave}
                        >
                            <Button 
                                ref={prevRef}
                                onMouseLeave={slideOver}
                                onMouseOver={slideLeave}
                            ><i className="xi-arrow-left"></i> Prev</Button>
                            <Swiper
                                ref={slideRef}
                                spaceBetween={0}
                                slidesPerView={1}
                                centeredSlides={true}
                                loop={true}
                                modules={[Navigation]}
                                speed={800}
                                navigation = {{
                                    prevEl : prevRef.current,
                                    nextEl : nextRef.current
                                }}
                                breakpoints={{
                                    821 : {
                                        spaceBetween : 50,
                                        slidesPerView : 1.33
                                    },
                                    1025 : {
                                        spaceBetween : `${100/1920*100}%`,
                                        slidesPerView : 1.33
                                    },
                                }}
                                onInit={(swiper)=>{
                                    setIndex(String(swiper.realIndex+1).padStart(2,'0'));
                                    setLast(String(swiper.slides.length).padStart(2,'0'));
                                }}
                                onSlideChange={(swiper)=>{
                                    setIndex(String(swiper.realIndex+1).padStart(2,'0'));
                                }}
                                onSliderMove={(_, event)=>{
                                    if(dragRef.current && event instanceof MouseEvent){

                                        const target = dragRef.current as HTMLElement;
                            
                                        const cosX = event.clientX;
                                        const cosY = event.clientY;
                            
                                        gsap.set(target,{
                                            top : cosY - (target.clientHeight / 2),
                                            left : cosX - (target.clientWidth / 2)
                                        })
                            
                                    }
                                }}
                            >
                                {
                                    data.image.map((e,i)=>
                                        <SwiperSlide 
                                            key={i*2} 
                                            onMouseOver={slideOver}
                                        >
                                            <Img style={{backgroundImage : `url(${e})`}}></Img>
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                            <Button 
                                ref={nextRef}
                                onMouseLeave={slideOver}
                                onMouseOver={slideLeave} 
                                $type={'right'}
                            >Next <i className="xi-arrow-right"></i></Button>
                        </SlideBox>

                        <Flex ref={pageRef}>
                            <Page>
                                <p className="act">{index}</p>
                                    <div></div>
                                <p>{last}</p>
                            </Page>

                            <Back>
                                <Link to={'/outwork'}>BACK TO LIST</Link>
                            </Back>
                        </Flex>
                    </>
                    :
                    null
                }
            </SubLayout>

            <Drag ref={dragRef}>
                <dl>
                    <dt><img src="/image/icon/hand.png" alt="손" width={26} /></dt>
                    <dd>DRAG</dd>
                </dl>
            </Drag>

        </>
    )
}