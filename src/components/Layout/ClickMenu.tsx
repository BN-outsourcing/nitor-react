import styled from "styled-components"
import { Tit } from "./SubLayout";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { headerAtom } from "../../Atom/header";
import { useEffect } from "react";

const Menu = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #101010;
    height: 100%;
    z-index: 9999;
    opacity: 0;
    transition: .4s;
    transition-property: opacity, visibility;
    visibility: hidden;

    &.act {
        opacity: 1;
        visibility: visible;
    }

`;

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    max-width: 1600px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    justify-content: space-between;

    @media screen and (max-width : 820px) {
        width: 94.79166666666667%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (max-width:820px) {
        h2 {
            display: none;
        }
    }

`;

const Address = styled.address`
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    font-size: 16px;
    margin-top: 100px;
    line-height: ${24/16};
    p {
        letter-spacing: 0.025em;
        + p {
            margin-top: 30px;
        }
        span {
            color: #666666;
        }
    }

    @media screen and (max-width : 820px) {
        position: absolute;
        bottom: 5%;

        font-size: 14px;

        p {
            + p {
                margin-top: 15px;
            }
        }

    }

`;

const Links = styled.ul`
    font-size: 120px;
    font-weight: 500;
    font-family: 'Neue Haas Grotesk Display Pro';
    li {
        + li {
            margin-top: 1em;
        }
    }
    a {
        color: #fff;
    }

    span {
        transition: transform .4s;
        display: inline-block;
        &:hover {
            transform: translateX(10%);
        }
    }

    @media screen and (max-width : 1280px) {
        font-size: 100px;
    }

    @media screen and (max-width : 1024px) {
        font-size: 80px;
    }

    @media screen and (max-width : 820px) {
        font-size: 70px;
        order: -1;
        margin-bottom: 20px;
        width: 100%;
        a {
            display: block;
        }
    }

    @media screen and (max-width : 480px) {
        font-size: 50px;
    }

`;


export default function ClickMenu() {

    const [headerState,setHeaderState] = useRecoilState(headerAtom);
    const {pathname} = useLocation();
    useEffect(()=>{
        setHeaderState(false);
    },[pathname]);

    return (
        <Menu className={`${headerState ? "act" : ""}`}>
            <Wrapper>
                <Flex>
                    <Tit>
                        <p><em>for you <span>&</span></em></p>
                        <p><em><i>our</i> inspiration</em></p>
                    </Tit>
                    <Address>
                        <p>
                            3F, 10 Worldcup bukro 42 dagil, Mapogu,
                            <br/>Seoul, Republic of Korea
                        </p>
                        <p>
                            <span>Tel</span> +82 02 2039 7282
                        </p>
                        <p>
                            <span>Mail</span> sid@nitordesign.net
                        </p>
                    </Address>
                </Flex>

                <Links>
                    <li><Link to={'/about'}><span>About</span></Link></li>
                    <li><Link to={'/outwork'}><span>Work</span></Link></li>
                </Links>

            </Wrapper>
        </Menu>
    )
}