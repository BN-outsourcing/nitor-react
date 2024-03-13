import gsap from "gsap"
import { SwiperRef } from "swiper/react"

export const getTrigger = (element : any)=>{
    return {
        trigger : element,
        start : "top bottom-=15%",
        // markers : true
    }
}

export const blurAnimtaion = (
    el : HTMLDivElement | HTMLElement | string | SwiperRef, 
    px? : string,
    delay? : number
) =>{
    
    gsap.fromTo(el,{
        filter : `blur(${px ? px : '10px'})`
    },{
        filter : "blur(0px)",
        duration : 0.8,
        delay : delay ? delay : 0,
        scrollTrigger : getTrigger(el)
    });

}