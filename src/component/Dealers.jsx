import React from 'react';
import "./item.css";



const Dealers =(props)=>{






 return (<div className="d-main">
 <div className="dealer">
 <button onClick={()=>{props.setActive('DF','DOVES')}}>DOVES</button>
  <button onClick={()=>{props.setActive('MD','MERIDIAN')}}>MERIDIAN</button>
   <button onClick={()=>{props.setActive('OR','ORGANICO')}}>ORGANICO</button>
    <button onClick={()=>{props.setActive('LK','LUKES')}}>LUKES</button>
    <button onClick={()=>{props.setActive('PE','PESUNION')}}>PESUNION</button>
    <button onClick={()=>{props.setActive('FE','FISH4EVER')}}>FISH4EVER</button>
    <button onClick={()=>{props.setActive('OL','PBROS')}}>PBROS</button>
    <button onClick={()=>{props.setActive('WT','PALEO')}}>PALEO</button>
  </div>

  

    </div>
)

}
 export default Dealers
