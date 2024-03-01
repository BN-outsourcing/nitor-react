import { useRecoilState } from "recoil";
import styled from "styled-components"
import { headerAtom } from "../Atom/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OverMenu = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding: 80px 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 55;
    color: #fff;
    transform: translateY(-100%);
    transition: transform .4s;
    overflow: hidden;

    &.act {
        transform: translateY(0);
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(/image/menu/menu-background.jpg) no-repeat center/cover;
        z-index: -1;
    }

    .h2 {
        font-size: 100px;
        margin-top: 90px;
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        text-transform: uppercase;
        span {
            font-family: 'Big Daily Short';
        }
        i {
            font-style: italic;
        }
    }

    .address {
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        p {
            font-size: 16px;
            line-height: calc(24/16);
        }
        dl {
            margin-top: 70px;
            dt {
                font-size: 16px;
                color: #666666;
            }
            dd {
                font-size: 16px;
                margin-top: calc(10/16*1em);
            }
        }
    }

    .card {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        bottom: 80px;
        right: 50px;
        width: 100%;
        gap: 40px;
        transform: rotate(-15deg);
        li {
            flex: 1;
            border-radius: 20px;
            background: #acf;
            max-width: 500px;
            position: relative;
            background: #fff;
            cursor: pointer;
            &::before {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: url(/image/menu/background-b.png) no-repeat center/cover;
                content: '';
            }
            &::after {
                content: '';
                display: block;
                padding-bottom: 100%;
            }

            .obj {
                position: absolute;
                right: 10%;
                bottom: 10%;
            }

            dl {
                position: absolute;
                top: 20px;
                left: 20px;

                dt {
                    font-size: 18px;
                    letter-spacing: -0.025em;
                }
                dd {
                    font-size: 32px;
                    font-family: 'Neue Haas Grotesk Display Pro';
                    font-weight: 500;
                    margin-top: 10px;
                    img {
                        margin-right: 10px;
                        vertical-align: middle;
                    }
                }

            }

            &:hover {
                color: #000;
                &::before {
                    opacity: 0;
                }
                dl {
                    dd {
                        img {
                            filter: invert(1);
                        }
                    }
                }
            }

        }
    }

`;

export default function ClickMenu() {

    const {pathname} = useLocation();
    const naviagate = useNavigate();
    const [headerState,setHeaderState] = useRecoilState(headerAtom);

    useEffect(()=>{
        setHeaderState(false);

    },[pathname])

    return (
        <OverMenu className={headerState ? "act" : ""}>

            <h2 className="h2">
                for you <span>&</span><br/>
                <i>our</i> inspiration
            </h2>

            <div className="address">
                <p>
                    3F, 10 Worldcup bukro<br/>
                    42 dagil, mapogu, seoul,<br/>
                    s. korea (03930)
                </p>
                <dl>
                    <dt>TEL</dt>
                    <dd>+82 02 2039 7282</dd>
                </dl>
                <dl>
                    <dt>MAIL</dt>
                    <dd>design@nitordesign.net</dd>
                </dl>
            </div>

            <ul className="card">
                <li onClick={()=>naviagate('/about')}>
                    <dl>
                        <dt>끊임없이 나아가는 빛, 니토르</dt>
                        <dd><img src="/image/menu/icon.png" alt="" />ABOUT</dd>
                    </dl>
                    <div className="obj">
                        <img src="/image/menu/obj.png" alt="" />
                    </div>
                </li>
                <li onClick={()=>naviagate('/outwork')}>
                    <dl>
                        <dt>비주얼 커뮤니케이션이 필요한 모든 곳</dt>
                        <dd><img src="/image/menu/icon.png" alt="" />WORK</dd>
                    </dl>
                    <div className="obj">
                        <img src="/image/menu/obj02.png" alt="" />
                    </div>
                </li>
            </ul>

        </OverMenu>
    )
}