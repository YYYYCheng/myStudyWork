addloadEvent(stripeTables);
addloadEvent(highLightRows);

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

function addClass(element,value){
  if(!element.clssName){
    element.className = value;
  }else{
    element.className += " value";
  }
}
