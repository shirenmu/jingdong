$(".small_img").on("mouseenter",function(){
  $("#big_img").attr("src",this.src)
})

// $(".selective_list li img").on("click",function(){
//   $("#big_img").attr("src",this.src)
//   $(".small_img").eq(0).attr("src",this.src)
// })

let selective_list_lis = document.querySelectorAll(".selective_list li"); // 选择商品
let price = document.getElementById('price'); // 价格
let shop_tit_info = document.getElementById('shop_tit_info');// 商品名称 信息
let big_img = document.getElementById('big_img'); //主图
let small_img_1 = document.getElementsByClassName('small_img')[0]; //第一张图
let store_name = document.getElementById("store_name");
let shopping_cart = document.getElementsByClassName("shopping_cart")[0];



shopping_cart.setAttribute("id",9999)




dataLoad()
function dataLoad(){
  let xhr;
  if(window.XMLHttpRequest){
     xhr = new XMLHttpRequest();
  }else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.open("Get","../data/player.json",true);

  
  

  xhr.onload = function(){
    if(xhr.status == 200){
      let xhrTxt = JSON.parse(xhr.responseText);
      store_name.innerHTML = xhrTxt[0].store;
      for(let i = 0 ; i<selective_list_lis.length;i++){
        selective_list_lis[i].setAttribute("id",9999-i)
        selective_list_lis[i].onclick = function(){
          price.innerHTML = xhrTxt[i].price;
          big_img.src = xhrTxt[i].imgSrc;
          small_img_1.src = xhrTxt[i].imgSrc;
          shop_tit_info.innerHTML = xhrTxt[i].info;
          shopping_cart.setAttribute("id",selective_list_lis[i].id)
          
        }
      } 

      
    }
  }
  xhr.send()

}
// 商品数量调整
let wrap_input_num = document.getElementById("wrap_input_num");
let wrap_input_add = document.getElementById("wrap_input_add");
let wrap_input_rem = document.getElementById("wrap_input_rem");

 

wrap_input_num.value = 1;

wrap_input_add.onclick = function(){
  wrap_input_num.value++;
}

wrap_input_rem.onclick = function(){
  if(wrap_input_num.value>1){
    wrap_input_num.value--; 
  }
}


//加入购物车
let commodityData;


if(!localStorage.getItem("commodityData")){
  commodityData = [];
}else{
  let dataString = localStorage.getItem('commodityData') //获取数据
  commodityData = JSON.parse(dataString); //将数据转化成对象

  
}


shopping_cart.onclick = function(){
    //拿到 price.innerHTML    shop_tit_info.innerHTML  big_img.scr  wrap_input_num.value  
  //     价格                     信息                  图片地址           商品数量
  // 存入 localStorage
  if(localStorage.getItem('name')&&localStorage.getItem('password')){
    let playerObj = {
      "info":shop_tit_info.innerHTML,
      "price":price.innerHTML,
      "src":big_img.src,
      "num":wrap_input_num.value,
      "store":store_name.innerHTML,
      "id":shopping_cart.id
    }
  
    console.log(playerObj.id)
  
    commodityData.push(playerObj)
    let commodityStr = JSON.stringify(commodityData)
    if(localStorage){
      localStorage.setItem("commodityData",commodityStr);
      window.location.href = "../pages/shopping_cart.html"
    }
  }else{
    alert("请登录(注册)")
    window.location.href = "../pages/sign_in.html"
  }
  
}




