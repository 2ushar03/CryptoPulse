import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from './components/header';
import Homepage from './page/homepage';
import Cryptocoinpage from './page/cryptocoinpage';
import 'react-alice-carousel/lib/alice-carousel.css';

function App() {
  return(
    <BrowserRouter>
    <div>
      <Header/>
      <Routes>
      <Route path="/" Component={Homepage}/>
      <Route path="/coins/:id" Component={Cryptocoinpage}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
