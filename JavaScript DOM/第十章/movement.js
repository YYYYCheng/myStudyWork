addloadEvent(positionMessage);
addloadEvent(prepareSlideshow);



function addloadEvent(func){
  var oldonload = window.onload;
  if(typeof window.onload != 'function'){
    window.onload = func;
  }else {
    window.onload = function(){
      oldonload();
      func();
    }
  }
}

function positionMessage(){
  if(!document.getElementById("message"))return false;
  var elem = document.getElementById("message");
  elem.style.position = "absolute";
  elem.style.left = "50px";
  elem.style.top = "100px";//设置初始位置
  moveElement("message",125,25,20);//调用moveElement函数
}

function prepareSlideshow(){
  if(!document.getElementById("linklist"))return false;
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");
  var preview = document.createElement("img");
  preview.setAttribute("src","img.png");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  var list = document.getElementById("linklist");
  insertAfter(slideshow,list);
  var links = list.getElementsByTagName("a");
  links[0].onmouseover = function(){
    moveElement("preview",-100,0,10);
  }//当鼠标在第一个链接时，是图片向左移动100px
  links[1].onmouseover = function(){
    moveElement("preview",-200,0,10);
  }//当鼠标在第二个链接时，是图片向左移动200px
  links[2].onmouseover = function(){
    moveElement("preview",-300,0,10);
  }//当鼠标在第三个链接时，是图片向左移动300px
}


function moveElement(elementID,final_x,final_y,interval){
  if(!document.getElementById(elementID))return false;
  var elem = document.getElementById(elementID);
  if(elem.movement){
    clearTimeout(elem.movement);
  }//如果元素具有movement属性，则清楚队列中的事件
  if(!elem.style.left){
    elem.style.left = "0px";
  }//如果不存在left值，则将其初始化为0px;
  if(!elem.style.top){
    elem.style.top = "0px";
  }//如果不存在top值，则将其初始化为0px;
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  var dist = 0;
  //获取当前位置并将其变成整数
  if(xpos==final_x && ypos==final_y)return true;
 //第十章194页
  if(xpos < final_x){
    dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if(xpos > final_x){
    dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if(ypos < final_y){
    dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if(ypos > final_y){
    dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  //逐步变化并将其最终值赋给元素
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")"//将再次调用函数储存在变量中
  elem.movement = setTimeout(repeat,interval);
}

function insertAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}
