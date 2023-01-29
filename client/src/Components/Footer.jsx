import React from "react";

import styled from "styled-components";
import { primary, sub, dtFontSize } from "../styles/mixins";
import github from "../assets/github.svg";
import notion from "../assets/notion.png";

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 200px;
  background-color: ${sub.sub700};
  color: white;
  display: flex;
  position: relative;

  p {
    font-size: ${dtFontSize.small};
    font-weight: 300;
  }

  .frogroup {
    font-weight: 600;
    color: green;
    font-size: ${dtFontSize.xsmall};
    margin-left: 10px;

    @media screen and (max-width: 500px) {
      font-size: 10px;
    }
  }
`;

const FooterContent = styled.div`
  display: flex;
  margin-left: 10px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 500px) {
    justify-content: space-evenly;
  }
`;

const LogoContainer = styled.div`
  width: max-content;

  svg {
    width: 120px;
  }

  @media screen and (max-width: 500px) {
    svg {
      width: 60px;
    }
  }
`;

const FooterHeadContainer = styled.div`
  display: flex;
  align-items: center;

  .copyright {
    margin-left: 10px;
    font-size: ${dtFontSize.xsmall};

    @media screen and (max-width: 500px) {
      display: none;
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  font-size: ${dtFontSize.small};
  align-items: center;
  margin-left: 20px;

  @media screen and (max-width: 500px) {
    margin: 0 5px;
  }

  a {
    text-decoration: none;
    color: inherit;

    :hover {
      cursor: pointer;
      color: ${primary.primary200};
    }
  }

  .logo {
    width: 15px;
    background-color: white;
    border-radius: 50%;
    margin-right: 5px;
    @media screen and (max-width: 500px) {
      margin: 0;
    }
  }

  .link {
    font-weight: 800;
    margin-right: 20px;

    @media screen and (max-width: 500px) {
      margin-right: 5px;
    }
  }

  span {
    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const TeamInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GroupContainer = styled.div`
  display: flex;
  margin-right: 10px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }

  @media screen and (max-width: 500px) {
    font-size: 10px;
  }

  p {
    font-weight: 800;
    margin-right: 10px;
  }

  a {
    text-decoration: none;
    color: inherit;
    margin-right: 5px;
    font-size: ${dtFontSize.small};

    :hover {
      color: ${primary.primary300};
    }

    @media screen and (max-width: 500px) {
      font-size: 10px;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterHeadContainer>
          <LogoContainer>
            <svg
              width="153"
              height="34"
              viewBox="0 0 153 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.75 5C27.0815 5 27.3995 5.1317 27.6339 5.36612C27.8683 5.60054 28 5.91848 28 6.25V13.125C27.1712 13.125 26.3763 13.4542 25.7903 14.0403C25.2042 14.6263 24.875 15.4212 24.875 16.25C24.875 17.0788 25.2042 17.8737 25.7903 18.4597C26.3763 19.0458 27.1712 19.375 28 19.375V26.25C28 26.5815 27.8683 26.8995 27.6339 27.1339C27.3995 27.3683 27.0815 27.5 26.75 27.5H4.25C3.91848 27.5 3.60054 27.3683 3.36612 27.1339C3.1317 26.8995 3 26.5815 3 26.25V19.375C3.8288 19.375 4.62366 19.0458 5.20971 18.4597C5.79576 17.8737 6.125 17.0788 6.125 16.25C6.125 15.4212 5.79576 14.6263 5.20971 14.0403C4.62366 13.4542 3.8288 13.125 3 13.125V6.25C3 5.91848 3.1317 5.60054 3.36612 5.36612C3.60054 5.1317 3.91848 5 4.25 5H26.75Z"
                fill="#070707"
              />
              <path
                d="M15.5 10C16.3284 10 17 9.32843 17 8.5C17 7.67157 16.3284 7 15.5 7C14.6716 7 14 7.67157 14 8.5C14 9.32843 14.6716 10 15.5 10Z"
                fill="#F0BF10"
              />
              <path
                d="M15.5 25.5C16.3284 25.5 17 24.8284 17 24C17 23.1716 16.3284 22.5 15.5 22.5C14.6716 22.5 14 23.1716 14 24C14 24.8284 14.6716 25.5 15.5 25.5Z"
                fill="#F0BF10"
              />
              <path d="M16.59 13H14.45V20H16.59V13Z" fill="white" />
              <path
                d="M35.16 27V10.86H39.84V27H35.16ZM37.5 8.61C36.64 8.61 35.94 8.36 35.4 7.86C34.86 7.36 34.59 6.74 34.59 6C34.59 5.26 34.86 4.64 35.4 4.14C35.94 3.64 36.64 3.39 37.5 3.39C38.36 3.39 39.06 3.63 39.6 4.11C40.14 4.57 40.41 5.17 40.41 5.91C40.41 6.69 40.14 7.34 39.6 7.86C39.08 8.36 38.38 8.61 37.5 8.61ZM53.0934 10.62C54.3734 10.62 55.5134 10.88 56.5134 11.4C57.5334 11.9 58.3334 12.68 58.9134 13.74C59.4934 14.78 59.7834 16.12 59.7834 17.76V27H55.1034V18.48C55.1034 17.18 54.8134 16.22 54.2334 15.6C53.6734 14.98 52.8734 14.67 51.8334 14.67C51.0934 14.67 50.4234 14.83 49.8234 15.15C49.2434 15.45 48.7834 15.92 48.4434 16.56C48.1234 17.2 47.9634 18.02 47.9634 19.02V27H43.2834V10.86H47.7534V15.33L46.9134 13.98C47.4934 12.9 48.3234 12.07 49.4034 11.49C50.4834 10.91 51.7134 10.62 53.0934 10.62ZM70.1728 27.24C68.6528 27.24 67.2828 26.9 66.0628 26.22C64.8428 25.52 63.8728 24.55 63.1528 23.31C62.4528 22.07 62.1028 20.61 62.1028 18.93C62.1028 17.23 62.4528 15.76 63.1528 14.52C63.8728 13.28 64.8428 12.32 66.0628 11.64C67.2828 10.96 68.6528 10.62 70.1728 10.62C71.5328 10.62 72.7228 10.92 73.7428 11.52C74.7628 12.12 75.5528 13.03 76.1128 14.25C76.6728 15.47 76.9528 17.03 76.9528 18.93C76.9528 20.81 76.6828 22.37 76.1428 23.61C75.6028 24.83 74.8228 25.74 73.8028 26.34C72.8028 26.94 71.5928 27.24 70.1728 27.24ZM70.9828 23.4C71.7428 23.4 72.4328 23.22 73.0528 22.86C73.6728 22.5 74.1628 21.99 74.5228 21.33C74.9028 20.65 75.0928 19.85 75.0928 18.93C75.0928 17.99 74.9028 17.19 74.5228 16.53C74.1628 15.87 73.6728 15.36 73.0528 15C72.4328 14.64 71.7428 14.46 70.9828 14.46C70.2028 14.46 69.5028 14.64 68.8828 15C68.2628 15.36 67.7628 15.87 67.3828 16.53C67.0228 17.19 66.8428 17.99 66.8428 18.93C66.8428 19.85 67.0228 20.65 67.3828 21.33C67.7628 21.99 68.2628 22.5 68.8828 22.86C69.5028 23.22 70.2028 23.4 70.9828 23.4ZM75.2128 27V23.7L75.3028 18.9L75.0028 14.13V4.74H79.6828V27H75.2128ZM83.1143 27V10.86H87.7943V27H83.1143ZM85.4543 8.61C84.5943 8.61 83.8943 8.36 83.3543 7.86C82.8143 7.36 82.5443 6.74 82.5443 6C82.5443 5.26 82.8143 4.64 83.3543 4.14C83.8943 3.64 84.5943 3.39 85.4543 3.39C86.3143 3.39 87.0143 3.63 87.5543 4.11C88.0943 4.57 88.3643 5.17 88.3643 5.91C88.3643 6.69 88.0943 7.34 87.5543 7.86C87.0343 8.36 86.3343 8.61 85.4543 8.61ZM99.2477 27.24C97.4077 27.24 95.7877 26.88 94.3877 26.16C93.0077 25.44 91.9377 24.46 91.1777 23.22C90.4177 21.96 90.0377 20.53 90.0377 18.93C90.0377 17.31 90.4077 15.88 91.1477 14.64C91.9077 13.38 92.9377 12.4 94.2377 11.7C95.5377 10.98 97.0077 10.62 98.6477 10.62C100.228 10.62 101.648 10.96 102.908 11.64C104.188 12.3 105.198 13.26 105.938 14.52C106.678 15.76 107.048 17.25 107.048 18.99C107.048 19.17 107.038 19.38 107.018 19.62C106.998 19.84 106.978 20.05 106.958 20.25H93.8477V17.52H104.498L102.698 18.33C102.698 17.49 102.528 16.76 102.188 16.14C101.848 15.52 101.378 15.04 100.778 14.7C100.178 14.34 99.4777 14.16 98.6777 14.16C97.8777 14.16 97.1677 14.34 96.5477 14.7C95.9477 15.04 95.4777 15.53 95.1377 16.17C94.7977 16.79 94.6277 17.53 94.6277 18.39V19.11C94.6277 19.99 94.8177 20.77 95.1977 21.45C95.5977 22.11 96.1477 22.62 96.8477 22.98C97.5677 23.32 98.4077 23.49 99.3677 23.49C100.228 23.49 100.978 23.36 101.618 23.1C102.278 22.84 102.878 22.45 103.418 21.93L105.908 24.63C105.168 25.47 104.238 26.12 103.118 26.58C101.998 27.02 100.708 27.24 99.2477 27.24ZM116.854 33.06C115.334 33.06 113.864 32.87 112.444 32.49C111.044 32.13 109.874 31.58 108.934 30.84L110.794 27.48C111.474 28.04 112.334 28.48 113.374 28.8C114.434 29.14 115.474 29.31 116.494 29.31C118.154 29.31 119.354 28.94 120.094 28.2C120.854 27.46 121.234 26.36 121.234 24.9V22.47L121.534 18.42L121.474 14.34V10.86H125.914V24.3C125.914 27.3 125.134 29.51 123.574 30.93C122.014 32.35 119.774 33.06 116.854 33.06ZM116.134 26.22C114.634 26.22 113.274 25.9 112.054 25.26C110.854 24.6 109.884 23.69 109.144 22.53C108.424 21.35 108.064 19.98 108.064 18.42C108.064 16.84 108.424 15.47 109.144 14.31C109.884 13.13 110.854 12.22 112.054 11.58C113.274 10.94 114.634 10.62 116.134 10.62C117.494 10.62 118.694 10.9 119.734 11.46C120.774 12 121.584 12.85 122.164 14.01C122.744 15.15 123.034 16.62 123.034 18.42C123.034 20.2 122.744 21.67 122.164 22.83C121.584 23.97 120.774 24.82 119.734 25.38C118.694 25.94 117.494 26.22 116.134 26.22ZM117.064 22.38C117.884 22.38 118.614 22.22 119.254 21.9C119.894 21.56 120.394 21.09 120.754 20.49C121.114 19.89 121.294 19.2 121.294 18.42C121.294 17.62 121.114 16.93 120.754 16.35C120.394 15.75 119.894 15.29 119.254 14.97C118.614 14.63 117.884 14.46 117.064 14.46C116.244 14.46 115.514 14.63 114.874 14.97C114.234 15.29 113.724 15.75 113.344 16.35C112.984 16.93 112.804 17.62 112.804 18.42C112.804 19.2 112.984 19.89 113.344 20.49C113.724 21.09 114.234 21.56 114.874 21.9C115.514 22.22 116.244 22.38 117.064 22.38ZM137.049 27.24C135.329 27.24 133.799 26.88 132.459 26.16C131.139 25.44 130.089 24.46 129.309 23.22C128.549 21.96 128.169 20.53 128.169 18.93C128.169 17.31 128.549 15.88 129.309 14.64C130.089 13.38 131.139 12.4 132.459 11.7C133.799 10.98 135.329 10.62 137.049 10.62C138.749 10.62 140.269 10.98 141.609 11.7C142.949 12.4 143.999 13.37 144.759 14.61C145.519 15.85 145.899 17.29 145.899 18.93C145.899 20.53 145.519 21.96 144.759 23.22C143.999 24.46 142.949 25.44 141.609 26.16C140.269 26.88 138.749 27.24 137.049 27.24ZM137.049 23.4C137.829 23.4 138.529 23.22 139.149 22.86C139.769 22.5 140.259 21.99 140.619 21.33C140.979 20.65 141.159 19.85 141.159 18.93C141.159 17.99 140.979 17.19 140.619 16.53C140.259 15.87 139.769 15.36 139.149 15C138.529 14.64 137.829 14.46 137.049 14.46C136.269 14.46 135.569 14.64 134.949 15C134.329 15.36 133.829 15.87 133.449 16.53C133.089 17.19 132.909 17.99 132.909 18.93C132.909 19.85 133.089 20.65 133.449 21.33C133.829 21.99 134.329 22.5 134.949 22.86C135.569 23.22 136.269 23.4 137.049 23.4Z"
                fill="white"
              />
              <path
                d="M37.5 9C39.433 9 41 7.433 41 5.5C41 3.567 39.433 2 37.5 2C35.567 2 34 3.567 34 5.5C34 7.433 35.567 9 37.5 9Z"
                fill="#F0BF10"
              />
              <path
                d="M149.5 30C151.433 30 153 28.433 153 26.5C153 24.567 151.433 23 149.5 23C147.567 23 146 24.567 146 26.5C146 28.433 147.567 30 149.5 30Z"
                fill="#F0BF10"
              />
            </svg>
          </LogoContainer>
          <p className="copyright">Copyright ©</p>
          <span className="frogroup">🐸 frogroup</span>
        </FooterHeadContainer>
        <LinkContainer>
          <a
            href="https://github.com/codestates-seb/seb41_main_020"
            className="link"
          >
            <img className="logo" src={github} alt="github" />
            <span>Github</span>
          </a>
          <a
            href="https://www.notion.so/ffbb3cab6709480f8466d9bee1c503d3"
            className="link"
          >
            <img className="logo" src={notion} alt="notion" />
            <span>Notion</span>
          </a>
        </LinkContainer>
        <TeamInfoContainer>
          <GroupContainer>
            <p>Frontend</p>
            <a href="https://github.com/codemodel6" className="member">
              👦🏻 김경배
            </a>
            <a href="https://github.com/zemma0618" className="member">
              👩🏻 김혜원
            </a>
            <a href="https://github.com/yeonhwan" className="member">
              👦🏻 박연환
            </a>
          </GroupContainer>
          <GroupContainer>
            <p>Backend</p>
            <a href="https://github.com/kimjeonghui" className="member">
              👩🏻 김정희
            </a>
            <a href="https://github.com/Sungho95" className="member">
              👦🏻 박성호
            </a>
            <a href="https://github.com/MyCatlikesChuru" className="member">
              👦🏻 이재혁
            </a>
          </GroupContainer>
        </TeamInfoContainer>
      </FooterContent>
    </FooterContainer>
  );
}
