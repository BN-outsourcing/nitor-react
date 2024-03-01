import styled from "styled-components"

const Imb = styled.div`
    position: relative;
    .img {
        position: absolute;
        right: calc(130/1600*100%);
        top: calc(60/1460*100%);
        width: calc(620*100/1920*1vw);
    }

    @media screen and (max-width: 1024px) {
        .img {
            top: 1.5%;
            right: 0;
        }
    }

`;

const Tit = styled.h2`
    font-size: 120px;
    line-height: calc(140/120);
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 500;
    text-transform: uppercase;
    position: relative;
    z-index: 2;
    span {
        font-family: 'Big Daily Short';
    }
    i {
        font-style: italic;
    }

    @media screen and (max-width : 1480px) {
        
        font-size: 100px;

    }

    @media screen and (max-width : 1280px) {
        
        font-size: 90px;

    }

    @media screen and (max-width : 1024px) {
        
        font-size: 70px;

    }

    @media screen and (max-width : 820px) {
        
        font-size: 42px;

    }

    @media screen and (max-width : 480px) {
        
        font-size: 32px;

    }

`;

const Search = styled.div`

    margin-top: 80px;
    max-width: 400px;

    .seb {
        padding: calc(20/24*1em) 0;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        font-family: 'Neue Haas Grotesk Display Pro';
        border-bottom: 1px solid #fff;
        p {
            display: inline-block;
            border-right: 2px solid #4d4d4d;
            padding-right: 7px;
        }
    }

    .sound {

        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        font-size: 20px;
        opacity: 0.6;
        margin-top: calc(25/24*1em);
        span {
            display: inline-flex;
            img {
                margin: 0 5px;
            }
        }

    }

    dl {
        margin-top: calc(25/24*1em);
        font-family: 'Neue Haas Grotesk Display Pro';
        font-size: 20px;
        font-weight: 500;
        dt {
            text-transform: uppercase;
        }
        dd {
            margin-top: calc(20/24*1em);
        }
    }

    @media screen and (max-width : 1280px) {
        
        margin-top: 80px;
        width: 60%;

        .seb,
        .sound,
        dl {
            font-size: 22px;
        }

    }

    @media screen and (max-width : 1024px) {
        
        .seb,
        .sound,
        dl {
            font-size: 20px;
        }

    }

    @media screen and (max-width : 820px) {
        
        margin-top: 60px;
        width: 100%;

        .seb {
            width: 90%;
            max-width: 250px;
        }

        .seb,
        .sound,
        dl {
            font-size: 18px;
        }

    }

    @media screen and (max-width : 480px) {
        
        margin-top: 40px;

        .seb,
        .sound,
        dl {
            font-size: 16px;
        }

    }


`;

const Tbx = styled.div`

    margin-top: 350px;
    /* padding-left: calc(300*100/1920*1vw); */
    box-sizing: border-box;
    margin-left: auto;
    text-align: right;

    .inline {

        font-size: calc(52*100/1920*1vw);
        font-family: 'Neue Haas Grotesk Display Pro';
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: -0.025em;
        line-height: calc(64/52);
        text-align: left;
        display: inline-block;
        i {
            font-style: italic;
        }

        .right {
            text-align: right;
        }
        
        .desc {
            font-size: 18px;
            margin-top: calc(40/18*1em);
            letter-spacing: -0.025em;
            font-family: "Pretendard";
            line-height: calc(30/18);
            text-align: left;
            word-break: keep-all;
        }

    }
    

    @media screen and (max-width: 1280px) {
        margin-top: 300px;
    }

    @media screen and (max-width: 820px) {
        margin-top: 150px;
        
        .inline {
            font-size: calc(40*100/820*1vw);
            .desc {
                font-size: 16px;
            }
        }

    }

    @media screen and (max-width: 480px) {
        
        .inline {
            .desc {
                font-size: 14px;
            }
        }

    }

`;


export default function ImbLayout() {
    return (

        <Imb>

            <div className="img">
                <img src="/image/about/img.png" alt=""/>
            </div>

            <Tit>
                wanna e<span>xp</span>erience<br/>
                <i>who</i> we are<span>?</span>
            </Tit>
            <Search>
                <div className="seb">
                    <p>NITOR</p>
                    <img src="" alt=""/>
                </div>
                <div className="sound">
                    <span>[ni <img src="/image/about/icon.png" alt=""/> tor, 니토르]</span>
                    <img src="" alt=""/>
                </div>
                <dl>
                    <dt>Brightness, splendor</dt>
                    <dd>빛, 광채, 광휘</dd>
                </dl>
                <dl>
                    <dt>Foward, advanced</dt>
                    <dd>나아가다, 도달하다</dd>
                </dl>
            </Search>

            <Tbx>
                <div className="inline">
                    <p className="right">In all areas where</p>
                    visual communication is needed in our daily lives,<br/>
                    NITOR wants to spread that <i>light</i> constantly.
                    <p className="desc">
                        우리의 일상 속 비주얼 커뮤니케이션이 필요한 모든 분야에<br/>
                        NITOR는 그 빛을 끊임없이 확산시키고자 합니다.
                    </p>
                </div>
            </Tbx>

        </Imb>

    )
}