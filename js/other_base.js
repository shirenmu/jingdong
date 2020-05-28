$(".navigation_list li").eq(0).addClass("nav_change");
$(".navigation_list li").eq(0).children("a").addClass("a_change");

$(".navigation_list li").on("mouseenter",function(){
  $(this).addClass("nav_change").siblings().removeClass();
  $(this).children("a").addClass("a_change").parent().siblings().children("a").removeClass("a_change");
})








