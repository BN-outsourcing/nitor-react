import styled from "styled-components"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ListView from "./ListView";
import SubLayoutTit, { SubLayout } from "../../../components/Layout/SubLayout";
import { useQuery } from "react-query";
import { Item } from "../../../types/axiosType";
import { useRecoilValue } from "recoil";
import { listTagClickAtom } from "../../../Atom/tag";
import Tag from "../../../components/List/Tag";
import {CursorType1} from "../../../components/Cursor";
import { itemFetch } from "../../../utils/APIfetch";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
    max-width: 1820px;
    width: 94.79166666666667%;
    margin: 0 auto;
    max-width: 1600px;
`;


export default function List() {

    const {data : item} = useQuery('itemData',itemFetch);

    const {t} = useTranslation();

    const [filterItem,setFilterItem] = useState<Item[]>([]);
    const clickTag = useRecoilValue(listTagClickAtom);

    useEffect(()=>{

        setTimeout(()=>{
            window.scroll(0,sessionStorage.y);
        },100)

    },[item]);

    // 필터데이터
    useEffect(()=>{

        if(!item) return;

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


    // 돋보기 애니메이션
    const glassRef = useRef<HTMLDivElement>(null);
    const onMove = useCallback((e : React.MouseEvent<HTMLElement>)=>{
        const cosX = e.clientX;
        const cosY = e.clientY;

        if(glassRef.current){
            const target = glassRef.current as HTMLElement;
            gsap.set(target,{
                top : cosY,
                left : cosX
            });
        }

    },[glassRef.current]);

    return (
        <>
            <SubLayout
                $page="list"
                onMouseMove={(e)=>onMove(e)}
            >
                <Wrapper>

                    <SubLayoutTit>OUR WORK</SubLayoutTit>

                    <Tag/>

                    {/* 아이템 리스트 */}
                    <ListView 
                        item={filterItem}
                        glass={glassRef}
                    />
                    
                </Wrapper>
            </SubLayout>
            <CursorType1 ref={glassRef}>
                {t('list.glass')} <img src="/image/icon/magnifying.png" alt="" />
            </CursorType1>
        </>
    )
}