import './app.css'
import Header from "../header/header";
import Slider from "../slider/slider";
import {ReactElement} from "react";

function App(): ReactElement {
  return (
    <>
      <Header />
      <Slider />
    </>
  )
}

export default App
