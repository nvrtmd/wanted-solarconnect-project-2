import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyle = createGlobalStyle`
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
