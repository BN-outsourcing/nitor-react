import styled from "styled-components"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import ListView from "./ListView";
import SubLayoutTit, { SubLayout } from "../../../components/Layout/SubLayout";
import { useQuery } from "react-query";
import { Item, TagType } from "../../../types/axiosType";
import { useRecoilValue } from "recoil";
import { listTagClickAtom } from "../../../Atom/tag";
import Tag from "../../../components/List/Tag";
import {CursorType1} from "../../../components/Cursor";

const Wrapper = styled.div`
    max-width: 1820px;
    width: 95%;
    margin: 0 auto;
`;

// item 가져오기
const itemFetch = async ()=>{
    const response = await axios.get('/api.json');

    const {data} = response;

    const {product,tag} : {product : Item[], tag : TagType[]} = data;

    // product 와 tag를 비교해서 product의 tag를 수정해줍니다
    for (const item of product){
        const productTags = item.tag; 
        const matchedTags : TagType[] = [];
    
        productTags.forEach(productTag => {
            const matchedTag = tag.find(tag => tag.type === productTag);
            if (matchedTag) {
            matchedTags.push(matchedTag);
            }
        });
    
        item.tag = matchedTags;
    }

    return product;

}

export default function List() {

    const {data : item} = useQuery('itemData',itemFetch);

    const [filterItem,setFilterItem] = useState<Item[]>([]);
    const clickTag = useRecoilValue(listTagClickAtom);

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
    const onMove = (e : React.MouseEvent<HTMLElement>)=>{
        const cosX = e.clientX;
        const cosY = e.clientY;

        if(glassRef.current){
            const target = glassRef.current as HTMLElement;
            gsap.set(target,{
                top : cosY,
                left : cosX
            });
        }

    }

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
                프로젝트 더 알아보기 <img src="/image/icon/magnifying.png" alt="" />
            </CursorType1>

        </>
    )
}