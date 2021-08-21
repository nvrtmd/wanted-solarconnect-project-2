import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "GmarketSansMedium";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@keyframes DocumentPalette {
  0% {
    background: #90f1ef;
  }
  25% {
    background: #ffd6e0;
  }
  50% {
    background: #ffef9f;
  }
  75% {
    background: #c1fba4;
  }
  100% {
    background: #cddafd;
  }
}

* {
  font-family: "GmarketSansMedium";
}

  body {
    animation-name: DocumentPalette;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
