var ulNode = document.getElementsByTagName('ul')[0];
var articleNodes = document.getElementsByTagName('article');
var headerNode = document.getElementsByTagName('header')[0];
var rightNode = document.getElementsByClassName('right')[0];
var moretutorials = document.getElementsByClassName('moretutorials')[0];
//以下函数是绑定监听函数的兼容写法，可供全局使用
function addEvent(element,type,handler,useCapture){
  if(element.addEventListener){
   element.addEventListener(type,handler,useCapture);
  }else{
   element.attchEvent("on"+type,handler);
  }
  }
//结束兼容监听函数


// ulNode.addEventListener('click',function(e){
//   if(e.target.nodeName =="A" && e.target.textContent =="目录"){
//     for(let i =0;i<articleNodes.length;i++){
//       e.preventDefault();
//       articleNodes[i].setAttribute('style','display:block');
//     }
    
//   }else{
//     for(let i= 0;i<articleNodes.length;i++){
//       if(e.target.nodeName =="A" && e.target.textContent !==articleNodes[i].dataset.parent){
//         e.preventDefault();
//         articleNodes[i].setAttribute('style','display:none');
//       }else if(e.target.nodeName =="A" && (e.target.textContent ==articleNodes[i].dataset.parent || e.target.textContent ==articleNodes[i].dataset.catalog)) {
//         e.preventDefault();
//         articleNodes[i].setAttribute('style','display:block');
//       }
//   }
  
    
//   }
// },false);

// addEvent(ulNode,'click',hand,false);
// function hand(e){
//   //e.currentTarget.style.backgroundColor = 'red';

// }


//以下函数实现点击顶部菜单栏按钮,左侧菜单隐藏
function hiddenlet(){
  var button  = document.getElementsByClassName('icofont-navigation-menu')[0];
  var i =2;
  button.addEventListener('click',function(e){
    var e = e ||window.e;
    target = e.target ||e.srcElement;
    if(i % 2 ==0){
      headerNode.setAttribute('style','display:none');
      rightNode.setAttribute('style','margin-left:20px')
    
    i++;
    

    }else if(i % 2 ==1){
      headerNode.setAttribute('style','display:block');
      rightNode.setAttribute('style','')
    
    i++;
    }
    
  },false);
}
hiddenlet();


//以下函数实现点击更多教程，出现和隐藏子菜单
function showmore(){
  var button = document.getElementsByClassName('icofont-book')[0];
  
  //alert(this);
  document.addEventListener('click',function(e){
    var e = e ||window.e;
    target = e.target ||e.srcElement;
    if(target.className == "icofont-book" && window.getComputedStyle(moretutorials).display =="none"){
      $(moretutorials).slideDown('slow',function(){
        
        //moretutorials.setAttribute('style','display:block;');
        //此处使用jquery ,但函数内好像不需要改变样式，j q好像自动改变了display的属性。
    });
      
    
    

    }else {
      $(moretutorials).slideUp("slow");
      //moretutorials.setAttribute('style','display:none');
      
    }

  },false);
  
}
showmore();



//以下函数实现点击左侧菜单导航，筛选切换不同的文章

function changeArticel(){

  //先定义一个handler函数，里面实现筛选功能
   function handler(e){
     for(let i =0;i<articleNodes.length;i++){
//先判断点的是不是a标签，因为我们监听函数是定义在ul身上，所以点击li,ul，i的标签也可能会触发监听函数。使得e.target这个事件目标可能是li，那
//ul.textcontent就复杂了，带有后代所有文本内容，而a标签的textcontent只有自身的。
      if(e.target.nodeName =="A"){
        articleNodes[i].style.display ='none';
        if( e.target.textContent=="目录"){
          articleNodes[i].style.display ='block';
         }else if(e.target.textContent == articleNodes[i].dataset.parent ){
           
          
           console.log(e.target.textContent);
           articleNodes[i].style.display ='block';
          // e.preventDefault();
          }else if(e.target.textContent == articleNodes[i].dataset.catalog ){
          
          console.log(e.target.textContent);
         articleNodes[i].style.display ='block';
        //  e.preventDefault();
         }else{
          // e.preventDefault();
          //最后一种情况，如果目录的名称 不等于上面2种情况，如文章没写就没有data-parent等，这时候就仅仅阻止默认事件，页面空白
        
         }
      }
       
     }
     e.preventDefault();
   }
 
 
  addEvent(ulNode,'click',handler,false);
}
changeArticel();


//以下实现日夜切换的下啦菜单
function daynight(){
  topilist.forEach(function(ele,index){
    ele.addEventListener('click',function(){
      if(this.className =='icofont-audio'){
          this.className ='icofont-volume-mute';
          style.innerText = '#top >div>i:nth-child(1):hover::after{content:"打开声音"}';
      document.head.appendChild(style);
      }else if(this.className =='icofont-volume-mute'){
          this.className ='icofont-audio';
          
          style.innerText = '#top >div>i:nth-child(1):hover::after{content:"关闭声音"}';
      document.head.appendChild(style);
      }else if(this.className == 'icofont-settings'){
          
          if(i%2 == 0){
              //console.log(i)
          //topdiv.setAttribute('style','display:block');
          $(topdiv).slideDown('slow',function(){
              //this.nextElementSibling.setAttribute('style','display:block');
          });
          i++;
          }else{//console.log(i);
              //topdiv.setAttribute('style','display:none'); 
              $(topdiv).slideUp("slow");
              i++; 
          }
          
          
      }
    });
});
}
daynight();


function ajaxtest(){
  var aaa = document.getElementById('aaa');
  aaa.addEventListener('click',ajax,false);
  function ajax(){
    rightNode.setAttribute('style','display:none');
    var xhr = new XMLHttpRequest();
    xhr.open('GET','tt.html',true);
    xhr.responseType ='document';
    xhr.onreadystatechange =function(){
      if(xhr.readyState ==4){
        if(xhr.status ==200){
          var result = xhr.responseXML;
          rightNode.setAttribute('style','display:none');
          var ttt = result.getElementById('ttt');
          document.body.appendChild(ttt);
          //console.log(ttt.nodeName);
          var link =document.createElement('link');
          link.rel="stylesheet";
          link.href ='style1.css';
          var head = document.getElementsByTagName('head')[0];
          head.appendChild(link);
      }
        }
      }
      
    }
    xhr.send();
    
    
   
    
  }
}
ajaxtest();