import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components"
import { footerAtom } from "../Atom/footer";
import { useLocation } from "react-router-dom";

interface FooterProps {
    $page : string
}

const Footer = styled.footer<FooterProps>`

    width: 100%;
    box-sizing: border-box;
    z-index: 2;
    color: #fff;
    text-transform: uppercase;
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;

    ${props=>{
        switch(props.$page){
            case "main" : 
                return css`
                    position: absolute;
                    bottom: 50px;
                    left: 0;
                `;
            case "about" : 
                return css`
                    padding-bottom: 80px;
                `;
            case "outwork" : 
                return css`
                    padding-bottom: 50px;
                `;
        }
    }}

`;

const Wrapper = styled.div`
    max-width: 1820px;
    width: 95%;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
`;

const Address = styled.div`
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 25px;
`;

const Floor = styled.p`
    font-size: 16px;
    line-height: calc(24/16);

    @media screen and (max-width : 820px) {
        font-size: 14px;
    }

`;

const TelMail = styled.dl`
    font-size: 16px;
    dd {
        margin-top: calc(10/16*1em);
    }
    @media screen and (max-width : 820px) {
        font-size: 14px;
    }
`;

const Copy = styled.div`
    text-align: right;
    font-size: 16px;
    white-space: nowrap;
    margin-left: auto;
    p {
        margin-top: 10px;
    }
    @media screen and (max-width : 820px) {
        font-size: 14px;
    }
`;

export default function FooterLayout() {

    const footerState = useRecoilValue(footerAtom);

    const {pathname} = useLocation();
    
    return (
        <Footer $page={footerState}>

            <Wrapper>

                {
                    pathname !== "/" ?
                    <Address>

                        <Floor>
                            3F, 10 Worldcup bukro<br/>
                            42 dagil, mapogu, seoul,<br/>
                            s. korea (03930)
                        </Floor>

                        <TelMail>
                            <dt>tel.</dt>
                            <dd>+82 02 2039 7282</dd>
                        </TelMail>
                        <TelMail>
                            <dt>Mail</dt>
                            <dd>design@nitordesign.net</dd>
                        </TelMail>
                    </Address>
                    : null
                }
                
            
                <Copy>
                    {
                        pathname !== "/" ?
                            <img src="/image/f_logo.png" alt=""/>
                        : null
                    }
                    <p>© nitor. all rights reserved.</p>
                </Copy>

            </Wrapper>

        </Footer>
    )
}