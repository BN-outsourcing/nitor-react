import styled from "styled-components"
import ImbLayout from "./ImbLayout";
import ImgGridLayout from "./ImgGridLayout";
import GridLayout from "./GridLayout";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { footerAtom } from "../../Atom/footer";

const AboutLayout = styled.div`
    background-color: #000000;
    color: #fff;
    padding: 215px 0 240px;
    background-image: url(/image/about/background.jpg);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
    position: relative;

    @media screen and (max-width : 820px){
        padding: 145px 0 80px;
    }

`;

const Wrppaer = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    width: 95%;
`;

export default function About() {

    const setFooter = useSetRecoilState(footerAtom);

    useEffect(()=>{
        setFooter('about');
    })

    return (
        <AboutLayout>
            
            <Wrppaer>
                <ImbLayout/>
            </Wrppaer>

            <ImgGridLayout/>

            <Wrppaer>
                <GridLayout/>
            </Wrppaer>  

        </AboutLayout>
    )

}