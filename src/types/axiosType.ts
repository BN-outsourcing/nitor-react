export type TagType = {
    type : number
    name : string,
    color : string
}

export type TextType = {
    title : string,
    desc : string
}

export interface Item {
    id : number;
    tag : number[] | TagType[];
    smallText : string;
    ko : TextType;
    en : TextType;
    image : string[];
    [key : string] : any; // key를 동적으로 불러올때
}