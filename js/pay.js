let allC = document.getElementsByClassName('calculation'); // 获取所有的 计算 按钮
let result = document.getElementsByClassName('result')[0]; // 合计金额
let checkedAllBox = document.getElementById("checkedAllBox"); // 全选框
let allCheck = document.getElementsByClassName('cart-item-check'); // 多选框
let allD = document.getElementsByClassName('delete'); //删除按钮
let allXx = document.getElementsByClassName('allXx')[0]; // 删除全部
let elements = document.getElementsByClassName('cart-item'); // 商品项
let integral = document.getElementById('integral'); //积分
let body = document.getElementsByTagName('body')[0]
let money = document.getElementsByClassName('money');
let numArr = [];
let shoppingBox = document.getElementsByClassName("shoppingBox")[0];
let cart_img = document.getElementsByClassName('cart-img');

// body.onload = function () {

if (localStorage) {
  let commodityData = JSON.parse(localStorage.getItem('commodityData'))
  // console.log(commodityData)
  let cart_tab_body = document.createElement('div');
  cart_tab_body.className = 'cart_tab_warp_body';
  commodityData.map(function (e, i) {
    let itemCart = document.createElement('div');
    itemCart.innerHTML = `<div class="cart-item" id="cart-item" >
        <span class="store">店铺:<a class="tao_store"></a></span>
        <div class="box_border">
          <input type="checkbox" class="cart-item-check" id="cart-item-check">
          <a class="cart-img">
            <img alt="" class="tao_img">
            <p class="title"></p>
            <p class="color"></p>
            <p class="bz"></p>
          </a>
          <div class="operation">
            <a href="" class="price" id="unitPrice">9999</a>
            <a class="number">
              <button class="calculation">-</button>
              <b class="num"></b>
              <button class="calculation">+</button>
            </a>
            <a class="money" id="money"></a>
            <a class="delete" id="delete">删除</a>
          </div>
        </div>
      </div>`;


    cart_tab_body.appendChild(itemCart);

  })
  shoppingBox.insertBefore(cart_tab_body, allXx);



  let tao_store = document.getElementsByClassName("tao_store");
  let price = document.getElementsByClassName("price");
  let num = document.getElementsByClassName("num");
  let title = document.getElementsByClassName("title");
  let tao_img = document.getElementsByClassName("tao_img");
  let number = document.getElementsByClassName("number");

  for (let i = 0; i < commodityData.length; i++) {
    price[i].innerHTML = commodityData[i].price
    money[i].innerHTML = commodityData[i].price
    num[i].innerHTML = commodityData[i].num
    title[i].innerHTML = commodityData[i].info
    tao_img[i].src = commodityData[i].src;
    tao_store[i].innerHTML = commodityData[i].store
    number[i].setAttribute("id", commodityData[i].id)

  }

  // console.log(commodityData.splice(1,1))




  for (let i = 0; i < allD.length; i++) {
    allD[i].onclick = function () {
      let tr = this.parentNode.parentNode.parentNode;
      tr.parentNode.removeChild(tr);
      term();
      commodityData.splice(i, 1)
      let comD = JSON.stringify(commodityData)
      localStorage.setItem("commodityData", comD)
      calculation();


    };
  }


  allXx.onclick = function () {
    // let sure = window.confirm('确定要删除所有商品吗？');
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i].children[1].children[0].checked) {
        elements[i].parentNode.removeChild(elements[i]);
        commodityData.splice(i, 1)
        let comD = JSON.stringify(commodityData)
        localStorage.setItem("commodityData", comD)
        calculation()
      }
    }
    // localStorage.removeItem("commodityData")

    if(commodityData.length == 0){
     checkedAllBox.checked = false;
    }
  }




  // 计算合计金额 
  function calculation() {
    let sum = 0;
    for (let j of allCheck) { // 遍历每个多选框 找到对应值的节点 判断每个选框是否为选中状态，把处于选中状态的商品的金额加到合计金额中
      let adm = j.parentNode.children[2].children[2].innerHTML;
      if (j.checked) {
        sum += parseInt(adm);
      }
    }
    result.innerHTML = '合计：' + parseInt(sum) + '元';
  }








  init()

  // 商品数量调整
  for (let i = 0; i < allC.length; i++) {
    allC[i].onclick = function (event) {
      let num = parseInt(this.parentNode.children[1].innerHTML);
      if ((this.innerHTML == '-' && num > 1) || (this.innerHTML == '+' && num < 1000)) {
        // alert(eval(num+this.innerHTML+1));
        this.parentNode.children[1].innerHTML = eval(num + this.innerHTML + 1);
        // 把计算后的值赋给节点
      }
      this.parentNode.parentNode.children[2].innerHTML = parseInt(this.parentNode.parentNode.children[0].innerHTML) * parseInt(this.parentNode.children[1].innerHTML) + ".00"; // 金额改变

      // if (i == 1 || i == 0) {
      //   this.parentNode.parentNode.children[0].innerHTML = parseInt(numArr[0]) * parseInt(this.parentNode.children[1].innerHTML);
      // }
      // if (i == 3 || i == 2) {
      //   this.parentNode.parentNode.children[0].innerHTML = parseInt(numArr[1]) * parseInt(this.parentNode.children[1].innerHTML);
      // }
      // if (i == 5 || i == 4) {
      //   this.parentNode.parentNode.children[0].innerHTML = parseInt(numArr[2]) * parseInt(this.parentNode.children[1].innerHTML);
      // }
      // if (i == 7 || i == 6) {
      //   this.parentNode.parentNode.children[0].innerHTML = parseInt(numArr[3]) * parseInt(this.parentNode.children[1].innerHTML);
      // }
      calculation();
      numUpdate()


    }
  }

  function init() {
    for (let a of money) {
      a.innerHTML = parseInt(a.parentNode.children[0].innerHTML) * parseInt(a.parentNode.children[1].children[1].innerHTML) + ".00";
    }
  }





  function term() {
    //声名变量用于保存合计结果
    //先将checkedAllBox设置为选中状态（默认状态）
    checkedAllBox.checked = true;

    for (let j of allCheck) {
      //判断四个多选框是否全选
      //只要有一个没选中就不是全选
      if (!j.checked) {
        //一旦 进入判断 则证明不是全选状态
        //将checkedAllBox设置为没选中状态
        checkedAllBox.checked = false;
        //一旦进去判断，说明已经得出结果，不用再继续执行循环
        break;
      };
    };
  }

  // 给每一个多选框绑定点击事件
  for (let i of allCheck) {
    i.onclick = function () {
      term();
      calculation();
    }
  }

  //全选
  checkedAllBox.onclick = function () {
    for (let i of allCheck) {
      i.checked = true;
      if (!this.checked) {
        i.checked = false;
      }
    }
    calculation();
  }

  // numUpdate()
  function numUpdate() {
    console.log(event.target.parentNode)
    // commodityData //数据对象
    commodityData.map(function (e, i) {
      if (e.id == event.target.parentNode.id) {
        e.num = event.target.parentNode.children[1].innerHTML
      }
    })
    localStorage.setItem("commodityData", JSON.stringify(commodityData));
  }

  storeLocation()

  function storeLocation() {
    for (let i of cart_img) {
      i.onclick = function () {

        if (localStorage) {

          if (i.parentNode.children[2].children[1].id < 5000) {
            window.location.href = "../pages/search_result.html"
          } else {
            window.location.href = "../pages/detail_page.html"
          }
        }
      }
    }
  }


  // }
  // }
  // xhr.send()


  }

