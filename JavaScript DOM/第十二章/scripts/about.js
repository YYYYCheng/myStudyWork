addloadEvent(highLightPage);
addloadEvent(prepareSlideshow);
addloadEvent(prepareInternalnav);
//addloadEvent(preparePlaceholder);
//addloadEvent(prepareGallery);
addloadEvent(stripeTables);
addloadEvent(highLightRows);


function highLightPage(){
  var header = document.getElementsByTagName("header");
  if(header.lenth == 0)return false;
  var navs = header[0].getElementsByTagName("nav");
  if(navs.length == 0)return false;
  var links = navs[0].getElementsByTagName("a");
  var linkurl;
  for(var i=0;i<links.length;i++){
    linkurl = links[i].getAttribute("href");
    if(window.location.href.indexOf(linkurl) != -1){
      links[i].className = "here";
      var linktxt = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute("id",linktxt);
    }
  }
}

function prepareSlideshow(){
  if(!document.getElementById("intro"))return false;
  var intro = document.getElementById("intro");
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");
  var preview = document.createElement("img");
  preview.setAttribute("src","images/xx.jpg");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);
  var links = document.getElementsByTagName("a");
  var destination;
  for(var i=0; i<links.length;i++){
    links[i].onmouseover = function(){
      destination = this.getAttribute("href");
      if(destination.indexOf("index.html") != -1){
        moveElement("preview",0,0,5);
      }
      if(destination.indexOf("about.html") != -1){
        moveElement("preview",-150,0,5);
      }
      if(destination.indexOf("photos.html") != -1){
        moveElement("preview",-300,0,5);
      }
      if(destination.indexOf("live.html") != -1){
        moveElement("preview",-450,0,5);
      }
      if(destination.indexOf("contact.html") != -1){
        moveElement("preview",-600,0,5);
      }
    }
  }
}

function prepareInternalnav(){
  var articles = document.getElementsByTagName("article");
  if(articles.length == 0)return false;
  var nav = articles[0].getElementsByTagName("nav");
  var links = nav[0].getElementsByTagName("a");
  for(var i=0;i<links.length;i++){
    var sectionId = links[i].getAttribute("href").split("#")[1];
    if(!document.getElementById(sectionId))continue;
    document.getElementById(sectionId).style.display = "none";
    links[i].destination = sectionId;
    links[i].onclick = function(){
      showSection(this.destination);
      return false;
    }
  }
}

function prepareGallery(){
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for(var i=0; i<links.length; i++){
    links[i].onclick = function(){
      return !showPic(this);
    }
  }
}

function preparePlaceholder(){
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/ff.png");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var txt = document.createTextNode("choose an image");
  description.appendChild(txt);
  var gallery = document.getElementById("imagegallery");
  insertAfter(description,gallery);
  insertAfter(placeholder,description);
}

function stripeTables(){
  var tables = document.getElementsByTagName("table");//获取所有表格
  var odd, rows;
  for(var i=0;i<tables.length;i++){//遍历所有表格
    odd = false;//初始化为false使第一行不变色
    rows = tables[i].getElementsByTagName("tr");//获取当前表格的所有数据行
    for(var j=0;j<rows.length;j++){//遍历所有数据行
      if(odd == true){
        addClass(rows[j],"odd");
        odd = false;//如果当前行变色则修改odd值为false使下一行不变色
      }else {
        odd = true;//如果当前行不变色则修改odd值为true使下一行变色
      }
    }
  }
}

function highLightRows(){
  var rows = document.getElementsByTagName("tr");
  for(var i=0;i<rows.length;i++){
    rows[i].onmouseover = function(){
      this.style.fontWeight = "bold";
    }
    rows[i].onmouseout = function(){
      this.style.fontWeight = "normal";
    }
  }
}



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

function addClass(element,value){
  if(!element.clssName){
    element.className = value;
  }else{
    element.className += " value";
  }
}

function insertAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
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

function showSection(id){
  var sections = document.getElementsByTagName("section");
  for(var i=0;i<sections.length;i++){
    if(sections[i].getAttribute("id") != id){
      sections[i].style.display = "none";
    }else{
      sections[i].style.display = "block";
    }
  }
}

function showPic(whichpic){
  if(!document.getElementById("placeholder"))return true;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  if(!document.getElementById("description"))return false;
  var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
  var description = document.getElementById("description");
  if(description.firstChild.nodeType == 3){
    description.firstChild.nodeValue = text;
  }
  return true;
}
