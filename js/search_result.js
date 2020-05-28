let shop_right_box = document.getElementsByClassName("shop_right_box")[0];
let best_shop_r_img = document.getElementsByClassName('best_shop_r_img');
let best_shop_r_price = document.getElementsByClassName('best_shop_r_price');
let best_shop_r_info = document.getElementsByClassName('best_shop_r_info');
let store_name = document.getElementsByClassName("store_name");

let add_cart = document.getElementsByClassName("add_cart");
dataLoad()

function dataLoad() {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xhr.open("Get", "../data/PHILIPS.json", true);


  xhr.onload = function () {
    if (xhr.status == 200) {
      let xhrArr = JSON.parse(xhr.responseText);

      let best_shop_list = document.createElement("ul");
      best_shop_list.className = "best_shop_list"
      xhrArr.map(function (e, index) {
        let li = document.createElement('li');
        li.className = "best_shop_right_item";
        li.innerHTML = `<img src="${xhrArr[index].imgSrc}" alt="" class="best_shop_r_img">
        <strong class="best_shop_r_price"><span>¥ </span><span>${xhrArr[index].price}</span></strong>
        <p class="best_shop_r_info">${xhrArr[index].info}</p>
        <p class="evaluate">已有<a href="">6160</a>人评价</p>
        <a class="store_name">${xhrArr[index].store}</a><i class="add_cart"></i>`
        best_shop_list.appendChild(li);
      })
      shop_right_box.appendChild(best_shop_list)

      // $(".add_cart").on("click",function(){
      //   $(".add_cg_tip").fadeIn(700)
      //   setTimeout(function(){
      //     $(".add_cg_tip").fadeOut()
      //   },2000)
      // })




      let commodityData;


      for (let i = 0; i < add_cart.length; i++) {
        add_cart[i].setAttribute("id",i)
        add_cart[i].onclick = function (event) {

          let dataString = localStorage.getItem('commodityData') //获取数据
          if (!dataString) {
            commodityData = [];
          } else {
            commodityData = JSON.parse(dataString); //将数据转化成对象
          }



          let src = this.parentNode.children[0].src;
          let price = this.parentNode.children[1].children[1].innerHTML;
          let info = this.parentNode.children[2].innerHTML;
          
          let PHILIPS = { //点击创建数据对象
            "info": info,
            "price": price,
            "src": src,
            "num": 1,
            "id": i,
            "store":store_name[0].innerHTML
          }

          // console.log(JSON.parse(commodityData[0]).id,PHILIPS.id)
          // let sss = localStorage.getItem('commodityData') //获取数据
          // let ddd = JSON.parse(sss); //将数据转化成对象
          let flag = false
          for (let j = 0; j < commodityData.length; j++) {
            if (commodityData[j].id == event.target.id) {
              
              // console.log(JSON.parse(ddd[j]).num)
              // PHILIPS.num++
              // commodityData.splice(j, 1)
              // let dataNum = JSON.parse(ddd[j]);
              // console.log(dataNum)

              commodityData[j].num++
              console.log(commodityData[j].num)
              flag = true
              window.location.href = "../pages/pay.html";
              break;
              
              // JSON.parse(ddd[j]).num++;
              // // console.log(JSON.parse(commodityData[j]).num) 

              // commodityData.push(JSON.stringify(PHILIPS)) //添加数据
              // let commodityStr = JSON.stringify(commodityData)
              // if (localStorage) {
                // localStorage.setItem("commodityData", commodityStr);
              //   // window.location.href = "../pages/shopping_cart.html";
              // }
            }
          }
          if(!flag){
            commodityData.push(PHILIPS);
            window.location.href = "../pages/shopping_cart.html";


          }
          
          localStorage.setItem("commodityData",JSON.stringify(commodityData));
            
          // console.log(commodityData)
          // commodityData.push(JSON.stringify(PHILIPS)) //添加数据
          // let commodityStr = JSON.stringify(commodityData)
          // if (localStorage) {
          //   localStorage.setItem("commodityData", commodityStr);
          // }





          // console.log(PHILIPS)


          // let numIf = localStorage.getItem('commodityData'); //获取数据
          // numIfObj = JSON.parse(numIf); // 数据对象
          // // console.log(numIfObj)

          // numIfArr = JSON.parse(numIfObj[i]) //当前对象
          // console.log(numIfArr)
          // // if(numIfArr.num >=1){
          // //   numIfArr.num++
          // //   console.log(numIfArr.num)
          // // }

        }
      }


    }

  }

  xhr.send()

}

