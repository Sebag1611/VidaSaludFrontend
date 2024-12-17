/* core */
import {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

/* Exportaciones de 'pages' */
import InicioSesion from "./pages/InicioSesion.jsx";
import Medico from "./pages/Medico.jsx";
import Enfermero from "./pages/Enfermero.jsx";
import axios from "axios";



function App() {
  return (
    <>
       <BrowserRouter>
           <Routes>
               <Route path="/" element={<Navigate to={"/InicioSesion"}/>}></Route>
               <Route path ="/inicioSesion" element={<InicioSesion/>}/>
               <Route path ="/Medico" element={<Medico/>}/>
               <Route path ="/Enfermero" element={<Enfermero/>}/>
           </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
