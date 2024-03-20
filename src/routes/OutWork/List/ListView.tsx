import { useGSAP } from "@gsap/react";
import { useCallback, useRef } from "react";
import { blurAnimtaion } from "../../../utils/gsap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ColorP } from "../../../components/p";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { Item } from "../../../types/axiosType";

const Grid = styled.div`
    margin-top: 55px;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    box-sizing: border-box;
    gap: 25px 35px;

    @media screen and (max-width : 1024px) {
        
        grid-template-columns: repeat(2,1fr);
        gap: 50px 35px;

    }

    @media screen and (max-width : 820px) {
        /* margin-top: 80px; */
        gap: 80px 35px;
        grid-template-columns: repeat(1,1fr);
    }

`;

const Items = styled.div`

    position: relative;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: none;
    overflow: hidden;

    &::before {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        content: "";
        opacity: 0;
        transition: opacity .4s;
    }

    &::after {
        content: '';
        display: block;
        padding-bottom: 110%;
    }

    > p {
        position: absolute;
        top: calc(25/20*1em);
        left: 50%;
        transform: translateX(-50%);
        font-size: 20px;
        text-transform: uppercase;
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        white-space: nowrap;
    }

    dl {
        position: absolute;
        top: 10%;
        /* top:50%; */
        left: calc(30/505*100%);
        /* transform: translateY(-50%); */
        overflow: hidden;

        dt {
            display: flex;
            gap: 9px;
            p {
                font-size: 14px;
            }
        }

        dd {
            margin-top: calc(20/42*1em);
            font-family: "Pretendard";
            font-size: 42px;
            font-weight: 500;
            line-height: calc(54/42);
        }

    }

    @media screen and (min-width :821px) {
        
        &:hover {
            &::before {
                opacity: 0.8;
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
            font-size: 16px;
        }

        dl {
            dt {
                p {
                    font-size: 12px;
                }
            }
            dd {
                font-size: 30px;
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
                font-size: 32px;
            }
        }

    }

    @media screen and (max-width : 820px) {

        border-radius: 15px;

        > p {
            font-size: 20px;
        }

        dl {
            dt {
                p {
                    font-size: 14px;
                }
            }
            dd {
                font-size: 42px;
            }
        }

    }

    @media screen and (max-width : 480px) {

        border-radius: 10px;

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
                font-size: 26px;
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
    const {i18n} = useTranslation();

    // 클릭 이벤트
    const itemOnClick = (id : number)=>{
        navigate(`view/${id}`);
    }

    // 돋보기
    const onOver = useCallback(()=>{
        if(glass.current){
            const target = glass.current as HTMLElement;
            gsap.to(target,{
                scale : 1,
                rotate : -15,
                duration : 0.4,
            });
        }
    },[glass.current]);
    const onLeave = useCallback(()=>{
        if(glass.current){
            const target = glass.current as HTMLElement;
            gsap.to(target,{
                scale : 0,
                rotate : -15,
                duration : 0.4,
            });
        }
    },[glass.current]);

    // 아이템 애니메이션
    const gridRef = useRef(null);
    useGSAP(()=>{
        if(gridRef.current){

            gsap.utils.toArray('.item').forEach(el=>{
                const item = el as HTMLElement;
                blurAnimtaion(item);
            })

        }
    },{dependencies : [gridRef.current, item], scope : gridRef})

    return (
        <Grid
            ref={gridRef}
        >
            
            {
                item.map((el)=>
                    <Items
                        className="item"
                        key={el.id}
                        onClick={()=>itemOnClick(el.id)} 
                        style={{backgroundImage : `url(${el.image[0]})`}}
                        onMouseOver={onOver}
                        onMouseLeave={onLeave}
                    >
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
                            <dd dangerouslySetInnerHTML={{__html : el[i18n.language].title}} />
                        </dl>
                    </Items>
                )
            }

        </Grid>
    )
}