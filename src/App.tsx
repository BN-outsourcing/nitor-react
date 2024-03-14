import {RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./routes/Main";
import Layout from "./components/Layout";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import About from "./routes/About/About";
import List from "./routes/OutWork/List/List";
import View from "./routes/OutWork/View/View";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger,TextPlugin);

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        path : "",
        element : <Main/>
      },
      {
        path : "/about",
        element : <About/>
      },
      {
        path : "/outwork",
        children : [
          {
            path : "",
            element : <List/>,
          },
          {
            path : "view/:id",
            element : <View/>,
          }
        ]
      }
    ]
  }
]);

const GlobalStyle = createGlobalStyle`
  ${reset}
  html::-webkit-scrollbar {width: 8px;}
  html::-webkit-scrollbar-thumb {background-color: #2f3542; border-radius: 10px;}
  a {
    text-decoration: none;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  body {
    background: #101010;
  }
`;

function App() {

  return (
    <>
      <GlobalStyle/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
