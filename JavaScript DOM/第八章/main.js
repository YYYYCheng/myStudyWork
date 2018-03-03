addloadEvent(displayAbbreviations);
addloadEvent(displayCitations);

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


function displayAbbreviations(){
  //取得所有缩略词
  var abbreviations = document.getElementsByTagName("abbr");
  if(abbreviations.length < 1) return false;
  var defs = new Array();
  //遍历这些缩略词
  for(var i=0; i<abbreviations.length;i++){
    defs[abbreviations[i].lastChild.nodeValue] = abbreviations[i].getAttribute("title");
  }
  //创建定义列表
  var dlist =document.createElement("dl");
  //遍历定义
  for(key in defs){
    var definition = defs[key];
  //创建定义标题
    var dtitle = document.createElement("dt");
    var dtitle_txt = document.createTextNode(key);
    dtitle.appendChild(dtitle_txt);
  //创建定义描述
    var ddesc = document.createElement("dd");
    var ddesc_txt = document.createTextNode(definition);
    ddesc.appendChild(ddesc_txt);
  //把他们添加到定义列表
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  //创建标题
  var header = document.createElement("h2");
  var header_txt = document.createTextNode("Abbreviations");
  header.appendChild(header_txt);
  //把标题添加到页面主题
  document.body.appendChild(header);
  //把定义列表添加到页面主题
  document.body.appendChild(dlist);
}
function displayCitations(){
  //取得所有引用
  var quotes = document.getElementsByTagName("blockquote");
  //遍历引用
  for(var i=0;i<quotes.length;i++){
  //如果没有cite属性，继续循环
    if(!quotes[i].getAttribute("cite"))continue;
  //保存cite属性
    var url = quotes[i].getAttribute("cite");
  //取得引用中所有元素节点
    var quoteElements = quotes[i].getElementsByTagName("*");
  //如果没有元素节点，继续循环
    if(quoteElements.length < 1)continue;
  //取得引用中的最后一个元素节点
    var elem = quoteElements[quoteElements.length - 1];
  //创建标记
    var link = document.createElement("a");
    var link_txt = document.createTextNode("source");
    link.appendChild(link_txt);
    link.setAttribute("href", url);
  //把标记添加到引用中的最后一个元素节点
    elem.appendChild(link);
  }
}
