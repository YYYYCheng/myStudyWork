addloadEvent(styleHeaderSiblings("h1"));

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



function styleHeaderSiblings(tag){
  var elems = document.getElementsByTagName(tag);
  var elem;
  for(var i=0; i<elems.length;i++){
    elem = getNextElement(elems[i].nextSibling);
    elem.style.fontWeight = "bold";
    elem.style.fontSize = "1.2em";
  }
}
function getNextElement(node){
  if(node.nodeType == 1){
    return node;
  }//如果该节点为元素节点，则返回该节点
  if(node.nextSibling){
    return getNextElement(node.nextSibling);
  }//如果该节点不是元素节点且存在后代节点，则将其后代节点再次带入函数
  return null;//遍历查找后代节点直到找到第一个元素节点，否则返回null
}
