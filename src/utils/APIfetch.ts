import axios from "axios";
import { Item, TagType } from "../types/axiosType";

// item 가져오기
export const itemFetch = async ()=>{
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


// item info
export const itemInfoFetch = async (id? : string)=>{
    return await axios.get('/api.json')
    .then(({data})=>{
        const {product,tag} : {product : Item[], tag : TagType[]} = data;

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

        const filter = product.filter((e : Item)=>e.id === Number(id));

        return filter[0];
    })
}