let commodity_info_tit = document.getElementById("commodity_info_tit");
let commodity_info_img = document.getElementById("commodity_info_img");
let commodity_info_num = document.getElementById("commodity_info_num");
let commodity_info_moy = document.getElementById("commodity_info_moy");


if(localStorage){
  let commodityData = localStorage.getItem("commodityData")
  commodityObj = JSON.parse(commodityData)
}
let xLength = commodityObj.length-1
commodity_info_tit.innerHTML = commodityObj[xLength].info;
commodity_info_img.src = commodityObj[xLength].src;
commodity_info_num.innerHTML = commodityObj[xLength].num;
commodity_info_moy.innerHTML = commodityObj[xLength].price;

$(".add_info").hide()
 $(".add_info").show(700)