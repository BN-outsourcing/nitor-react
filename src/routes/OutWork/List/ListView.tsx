import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { getTrigger } from "../../../lib/gsap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ColorP } from "../../../components/p";
import { Item } from "./List";
import gsap from "gsap";

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

type Props = {
    item : Item[],
    glass : React.RefObject<HTMLDivElement>
}

export default function ListView({item,glass} : Props) {

    const navigate = useNavigate();

    // 클릭 이벤트
    const itemOnClick = (id : number)=>{
        navigate(`view/${id}`);
    }

    // 돋보기
    const onOver = ()=>{
        if(glass.current){
            const target = glass.current as HTMLElement;
            gsap.to(target,{
                opacity : 1,
                rotate : -15
            });
        }
    }
    const onLeave = ()=>{
        if(glass.current){
            const target = glass.current as HTMLElement;
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
    },{dependencies : [gridRef.current, item], scope : gridRef})

    return (
        <Grid
            ref={gridRef}
        >
            
            {
                item.map((el)=>
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
    )
}