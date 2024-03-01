import { Link, useLocation } from "react-router-dom";
import styled from "styled-components"
import { useRecoilState } from "recoil";
import { headerAtom } from "../Atom/header";

const Header = styled.header`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    color: #fff;

    .wrapper {
        max-width: 1820px;
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 0;
        position: relative;
        z-index: 55;
    }

    .logo {
        &.hide {
            visibility: hidden;
        }
    }

    .menu {
        // position: absolute;
        // right: 50px;
        // top: 30px;
        position: relative;
        width: 40px;
        height: 20px;
        cursor: pointer;
        margin-left: auto;
        div {
            background: #fff;
            width: 100%;
            height: 2px;
            position: absolute;
            transition: .4s;
            transition-property: transform, top;
            &:nth-of-type(1) {
                top: 0;
            }
            &:nth-of-type(1) {
                top: 100%;
            }
        }

        &.act {
            div {
                &:nth-of-type(1){
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg);
                }
                &:nth-of-type(2){
                    top: 50%;
                    transform: translateY(-50%) rotate(-45deg);
                }
            }
        }

    }

    @media screen and (max-width : 820px) {
        
        .logo {
            width: 100px;
        }

        .wrapper {
            padding: 20px 0;
        }

    }

`;

export default function HeaderLayout() {

    const [headerState,setHeader] = useRecoilState(headerAtom);

    const {pathname} = useLocation();

    return (
        <Header>
            <div className="wrapper">

                {
                    <Link to={"/"} className={`logo ${pathname === "/" ? headerState ? "" : "hide" : ""}`}>
                        <img src="/image/logo.png" alt=""/>
                    </Link>
                }
                
                <div 
                    className={`menu ${headerState ? "act" : ''}`} 
                    onClick={()=>{setHeader(!headerState)}}
                >
                    <div></div>
                    <div></div>
                </div>

            </div>
        </Header>
    )
}