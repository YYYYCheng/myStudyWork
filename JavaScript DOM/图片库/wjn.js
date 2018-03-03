$(function(){
$("#imagegallery li a").click(function(){
  var $source = $(this).attr("href");
  var $text = $(this).attr("title");
  $("#placeholder").attr("src",$source);
  $("#description").text($text);
  return false;
})
})
