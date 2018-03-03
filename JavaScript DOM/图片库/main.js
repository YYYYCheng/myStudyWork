addloadEvent(prepareGallery);
addloadEvent(preparePlaceholder);

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

function prepareGallery(){
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++){
    links[i].onclick = function(){
      return !showPic(this);
    }
  }
};
function showPic(whichpic){
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
  var description = document.getElementById("description");
  if(description.firstChild.nodeType == 3){
    description.firstChild.nodeValue = text;
  }
  return true;
};
function preparePlaceholder(){
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","ff.png");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var txt = document.createTextNode("choose an image");
  description.appendChild(txt);
  var gallery = document.getElementById("imagegallery");
  insertAfter(placeholder,gallery);
  insertAfter(description,placeholder);
}
function insertAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}
