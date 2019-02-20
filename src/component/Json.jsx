
//import React from 'react';
import React, { useState } from 'react';
import Jlist from "../output.json";
import "./item.css";


let productObj =[];



const tTest =(props)=>{

  
  

Jlist.map((items,index) => {



if(productObj.length<Jlist.length){  /// prevent duplicates
   productObj.push({
      //  name:items.denumire,
      name:null,
        value:null,
        //id: 'aa'
    })


}
})

}







function List(props){
  
  const [hov, setHov] = useState(false);  ///  hover STATE
  const [hovItem, setHovItem] = useState(false);
  const [styles, setstyles] = useState({ color:'#ff4c4c' });
  
  
  


////
   tTest(props); ///look up
   for(let x=0; x<productObj.length;x++){   ///set productObj values
  //  productObj[x].value=props.stoc[0];
  //  productObj[x].name=JSON.stringify(props.stoc[0].ID);
  if(props.stoc[x]){
if(!props.stoc[x].CANTITATE.$numberInt){ productObj[x].value=0}else{  ///if item has no value fill with zero
  productObj[x].value=props.stoc[x].CANTITATE.$numberInt;}

  //productObj[x].id=props.stoc[x].ID;
  productObj[x].name=props.stoc[x].DENUMIRE;

}else if(props.cRender){
  productObj[x].name = null;
    productObj[x].value = null;
    //  productObj[x].id = null

}
   }

    


    let class1="stoc";
    let class2="item";
    let stoc=[];
    if(stoc.length===1){
        productObj[0].name="aaaaaa";
        
    }

   
  ////////////// HOVER

 
let hoverIt=(e)=>{
  
 
  console.log(e)
  setHov(true);
 
 setstyles({color:'#126db8'} )
 
 
 
     console.log(styles)
   
    setHovItem(e)
    
  
}

let hoverOut=(e)=>{
  setHov(false);
  
}


////////////// HOVER 

    let iList=[];
    
    
    
    
    

     iList=productObj.map((item,index) => <p onMouseLeave={hoverOut} key={index} ><span onMouseEnter={()=>{hoverIt(index)}}>{item.name}</span></p>);
     stoc=productObj.map((item, index) =>  <p onClick={hoverIt}  key={index}><span>{item.value}</span></p>);
    


     
////////CHANGE COLOR ON HOVER

if(hov){
  iList.filter(a => a.key ? a : false)
  stoc[hovItem] =<p style={styles}><span>{productObj[hovItem].value}</span></p>
  
  
}

////////CHANGE COLOR ON HOVER





       return <div className="main">


        <div className={class2}>{iList}</div>
        <div className={class1}>{stoc}</div>






        </div>

}

export default List;
