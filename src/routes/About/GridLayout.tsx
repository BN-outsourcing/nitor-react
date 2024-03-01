import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 200px calc(230*100/1920*1vw);
    margin-top: 460px;

    @media screen and (max-width : 1280px) {
        gap: 150px 80px;
        margin-top: 360px;
    }

    @media screen and (max-width : 1024px) {
        gap: 150px 50px;
        margin-top: 260px;
    }

    @media screen and (max-width : 820px) {
        grid-template-columns: repeat(2,1fr);
        gap: 100px 50px;
        margin-top: 260px;
    }

    @media screen and (max-width : 480px) {
        grid-template-columns: 1fr;
        gap: 75px 50px;
        margin-top: 150px;
    }


`;

const Item = styled.div`
    
    &:nth-of-type(2) {
        grid-column: 2 span;
    }

    h3 {
        font-size: calc(52*100/1920*1vw);
        line-height: calc(80/70);
        font-family: 'Neue Haas Grotesk Display Pro';
        font-weight: 500;
        text-transform: uppercase;
    }

    ul {
        margin-top: 40px;
        li {
            font-size: 18px;
            font-family: "Pretendard";
            margin-left: 1.2em;
            text-indent: -1.2em;
            line-height: normal;
            &::before {
                width: 7px;
                height: 7px;
                content: '';
                display: inline-block;
                vertical-align: middle;
                transform: translateY(-25%);
                border-radius: 100px;
                background: #fff;
                margin-right: 8px;
            }
            + li {
                margin-top: calc(15/18*1em);
            }
        }
    }

    @media screen and (max-width : 1280px) {
        h3 {
            font-size: 36px;
        }
        ul {
            margin-top: 30px;
            li {
                font-size: 16px;
            }
        }
    }

    @media screen and (max-width : 1024px) {
        h3 {
            font-size: 32px;
        }
    }

    @media screen and (max-width : 820px) {
        &:nth-of-type(2) {
            grid-column: auto;
        }
        h3 {
            font-size: 30px;
        }
    }

    @media screen and (max-width : 480px) {
        &:nth-of-type(2) {
            grid-column: auto;
        }
        h3 {
            font-size: 36px;
        }
        ul {
            margin-top: 20px;
            li {
                font-size: 14px;
            }
        }
    }

`;


export default function GridLayout() {
    return (
        <Grid>
            <Item>
                <h3>branding</h3>
                <ul>
                    <li>기업 및 제품 브랜드 로고 및 디자인 시스템</li>
                    <li>서비스 통합 디자인 시스템 정립</li>
                </ul>
            </Item>
            <Item>
                <h3>
                    exhibition graphic
                </h3>
                <ul>
                    <li>전시 키 비주얼</li>
                    <li>그래픽 패널</li>
                    <li>사인 디자인</li>
                </ul>
            </Item>
            <Item>
                <h3>graphic</h3>
                <ul>
                    <li>기업 브랜딩</li>
                    <li>제품 브랜딩</li>
                    <li>서비스 통합 디자인 시스템 정립</li>
                </ul>
            </Item>
            <Item>
                <h3>
                    editorial<br/>
                    <span>&</span> package
                </h3>
                <ul>
                    <li>카탈로그 디자인</li>
                    <li>리플렛 디자인</li>
                    <li>리플렛 디자인</li>
                </ul>
            </Item>
            <Item>
                <h3>
                    GUI <span>&</span> ux
                </h3>
                <ul>
                    <li>모바일·웹 인터페이스</li>
                    <li>아이콘 및 픽토그램 디자인</li>
                </ul>
            </Item>
        </Grid>
    )
}