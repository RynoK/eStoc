import React, { Component } from 'react';
import Jsonl from './component/Json';
import Dealers from './component/Dealers';

import "./component/item.css";



let data2=[];
let emptStoc=[]; /// 0 or negative values array




class App extends Component {

  state={
    lastData:[],
    items:data2,
    cRender: false,
    maker:'All',
    redStoc:'...'
   
   
  


  };

  stylesB ={background:'#ff4c4c'};
    
    
  


getStoc=() => {


  fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitch1-hnbzk/service/http1/incoming_webhook/webhook0", {


    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'

    }
     })




  .then(function(response) {

    return response.json();


  })
 .then(function(myJson) {




  let lastDbItem=myJson[myJson.length-1].stoc;

  let newStoc=lastDbItem.map((item, index)=>{   /// pull last stoc from database


 if(item.CANTITATE.$numberInt < 1 || item.CANTITATE.$numberInt == null){
   emptStoc.push(item)
 }

 return item

  })


data2=newStoc;

    this.setState({items:data2,redStoc:emptStoc.length})
    ///////////
    
    
    
    ///////// 

  }.bind(this))
  .catch((err)=> console.log(err));

//// check for values < 1

};

/// CHANGE INFO BUTTON COLOR  (according to producst out of stock) 
changeC =(notInStock,items) =>{
  let NISPercent =notInStock / items*100;
  if( NISPercent<11){this.stylesB ={background: '#44d45c'};

  }else if(NISPercent>11 && NISPercent< 21 ){
  this.stylesB ={background: '#e0c00a'};
 
  }else if(NISPercent >20  ){
    this.stylesB ={background: '#ff4c4c'};
  
  }
 
}
  
///
  

setActive=(id,maker) =>{
  //console.log("yep",this.state.redStoc)
  //console.log(this.state.cRender)

let doves = data2.filter(a => a.ID[0] + a.ID[1]=== id ? a :false)
this.setState({
items: doves,
cRender: true,
maker: maker,

})

this.emptyStoc(doves)

}



emptyStoc=(doves)=>{
let eStoc = doves.filter(a =>{if(a.CANTITATE.$numberInt == null || a.CANTITATE.$numberInt < 0){return true}})

  this.setState({
redStoc: eStoc.length
  })


}

/////////////// SEARCH BY PRODUCT NAME

findIt =(e)=>{
  let inVal
  if(e){
  inVal = e.target.value;
  }

  
    const input = this.refs.myInput;  
        const value = input.value;  
        inVal = value
        console.log(value)
 
  
this.setState({textArea:inVal})


  
 let find=inVal.split(' ');  /// extend search 
 
 

let regex;

let search

 
 if(find.length === 1){
  
  regex = new RegExp(find[0],'gi' );   ///  regex

  search = data2.filter(a => regex.test(a.DENUMIRE) ? a : false)

  
 } else if(find.length > 1){

  regex = new RegExp(find[0]+'.*'+find[1]+'|'+find[1]+'.*'+find[0],'gi' );   ///  regex

  search = data2.filter(a => regex.test(a.DENUMIRE) ? a : false)
  
 }
 
 this.setState({
  items: search,
  cRender: true
    })
 
}
/////////////// SEARCH BY PRODUCT NAME

////////////// KEY PRESS

keySub = (e) => {
 

 
  if( e.key ==="Enter" ){
 
    console.log(e.key)
   
  
  }
 
}

////////////// KEY PRESS
///////////// NOT IN STOCK - BUTTON

notInS =() =>{
 let nIS= this.state.items.filter(a => a.CANTITATE.$numberInt < 0 || !a.CANTITATE.$numberInt)
 this.setState({items:nIS})
  //this.setState({items})
}

///////////// NOT IN STOCK




componentWillMount(){

  
  


////////////// make requests to server
 let getData= ()=>{
  fetch("http://192.168.0.102:5000/", {

    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
     })


  .then((response)=> {

    return response.json();


  })
 .then((myJson) => {

  let servData= myJson.map(item => item.CANTITATE)


    this.setState({items:servData})



  })
  .catch((err)=>{ console.log(err);if(err) getStoc()})  // if  error get data from database else call the server



}
////////////// make requests to server
////////////// get data from database

let getStoc=() => {


  fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitch1-hnbzk/service/http1/incoming_webhook/webhook0", {

    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
     })


  .then(function(response) {
    return response.json();


  })
 .then(function(myJson) {


  let lastDbItem=myJson[myJson.length-1].stoc;

  let newStoc=lastDbItem.map((item, index)=>{


 return item.$numberInt;

  })

data2=newStoc;

    this.setState({items:data2})

  }.bind(this))
  .catch((err)=> console.log(err))


};
////////////// get data from database
////////////// make requests to server
let interval=0;
let setIn=setInterval(function(){
interval++;console.log(interval);
if(interval>0){clearInterval(setIn)}
///getData(); connect with local the server


},2000)
////////////// make requests to server

}



componentDidMount(){

  this.getStoc()
 
  

}

componentWillUpdate(nextProps,nextState){
  let notInStock=nextState.redStoc;
  let items = nextState.items.length;

 
  
  this.changeC(notInStock,items)
  //console.log(NISCounter,'ss')
  

}





  render() { 
    return (

      <div className="App">
      <Dealers stoc={this.state.items} setActive={this.setActive} />
  {  /*<button onClick={this.getStoc}>CLICK</button>*/}
  
  <div className='search'>

  
  
    <input type="text" ref="myInput" id="item" name="item" placeholder="Search..."  onKeyDown={this.keySub} onChange={this.findIt} >

</input>

<input type="submit" value="Search" onClick={()=>{this.findIt()}}></input>
      
    </div>


    <div className='infos' ><h2>{this.state.maker}</h2><button onClick={this.notInS}style={this.stylesB}>{this.state.redStoc}</button></div>

       <Jsonl stoc={this.state.items} setActive={this.setActive} fromDb={this.state.data} cRender={this.state.cRender}  />


      </div>
    );
  }

}


export default App;
