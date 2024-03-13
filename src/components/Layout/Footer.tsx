import { useRecoilState } from "recoil";
import styled, { css } from "styled-components"
import { footerAtom } from "../../Atom/footer";
import { useLocation } from "react-router-dom";
import { PageProps } from "../../types/styled";
import { useEffect } from "react";

const Footer = styled.footer<PageProps>`

    width: 100%;
    box-sizing: border-box;
    z-index: 2;
    color: #fff;
    font-family: 'Neue Haas Grotesk Display Pro';
    text-transform: uppercase;
    font-weight: 500;
    /* padding: 40px 0; */
    padding: 25px 0;

    ${props=>{
        if(props.$page === "main"){
            return css`
                position: absolute;
                bottom: 0;
                left: 0;
            `;
        }
    }}

`;

const Wrapper = styled.div`
    width: ${100 - (100/1920*100)}%;
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;

    @media screen and (max-width : 820px) {
        display: block;
    }

`;

export const Address = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    text-transform: capitalize;

    dl {
        &:nth-of-type(1){
            flex: 0 0 100%;
        }
    }

    @media screen and (max-width:820px) {
        

    }

`;

export const AddressDl = styled.dl`
    font-size: 16px;
    dt {
        color: #666666;
    }
    dd {
        margin-top: calc(10/16*1em);
        letter-spacing: 0.025em;
        line-height: calc(24/16);
    }
    @media screen and (max-width : 820px) {
        font-size: 14px;
    }
`;

const Copy = styled.div`
    text-align: right;
    font-size: 13px;
    white-space: nowrap;
    margin-left: auto;
    color : #b3b3b3;
    > p {
        margin-top: 30px;
    }
    @media screen and (max-width : 820px) {
        font-size: 12px;
        margin: 30px auto 0;
        text-align: center;
    }
`;

const TopBtn = styled.div`
    font-size: 12px;
    border: 1px solid #fff;
    border-radius: 10px;
    width: 62px;
    height: 62px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    cursor: pointer;
    transition: all .4s;
    transition-property: background, color;

    i {
        font-size: 18px;
        margin-bottom: 5px;
    }

    &:hover {
        background: #fff;
        color : #000;
    }

    @media screen and (max-width : 820px) {
        margin: 0 auto;
        width: 52px;
        height: 52px;
    }

`;

export default function FooterLayout() {

    const [footerState,setFooterState] = useRecoilState(footerAtom);
    const {pathname} = useLocation();

    const topClickhanlder = ()=>{
        window.scrollTo(0,0);
    }

    useEffect(()=>{
        if(pathname !== '/'){
            setFooterState('');
        }
    },[pathname]);
    
    return (
        <Footer $page={footerState}>

            <Wrapper>

                {
                    pathname !== "/" ?
                    <Address>

                        <AddressDl>
                            <dt>ADDRESS</dt>
                            <dd>3F, 10 Worldcup bukro 42 dagil, Mapogu, Seoul, S. Korea</dd>
                        </AddressDl>

                        <AddressDl>
                            <dt>TEL.</dt>
                            <dd>+82 02 2039 7282</dd>
                        </AddressDl>
                        
                        <AddressDl>
                            <dt>MAIL</dt>
                            <dd>sid@nitordesign.net</dd>
                        </AddressDl>

                    </Address>
                    : null
                }
                
            
                <Copy>
                    {
                        pathname !== "/" 
                        ?
                        <TopBtn onClick={topClickhanlder}>
                            <i className="xi-arrow-up"></i>
                            <p>Top</p>
                        </TopBtn>
                        : 
                        null
                    }
                    <p>© nitor. all rights reserved.</p>
                </Copy>

            </Wrapper>

        </Footer>
    )
}