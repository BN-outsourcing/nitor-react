import styled from "styled-components";

export const CursorType1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    font-family: "Pretendard";
    top: 0;
    left: 0;
    z-index: 9999999;
    background-color: rgba(255,255,255,0.5);
    border-radius: 1000px;
    backdrop-filter: blur(15px);
    padding: ${10/18}em ${25/18}em;
    font-size: 18px;
    letter-spacing: -0.025em;
    pointer-events: none;
    transform: rotate(-15deg) scale(0);
    white-space: nowrap;
    img {
        margin-left: 6px;
    }

    @media screen and (max-width : 1280px) {
        font-size: 16px;
    }

`;