let tel = document.getElementById('tel'); // 电话号码
let telTip = document.getElementById('telTip'); // 电话号码
let userName = document.getElementById('name'); // 用户姓名
let nameTip = document.getElementById('nameTip'); // 用户姓名
let passWord = document.getElementById('password'); // 密码
let pwdTip = document.getElementById('pwdTip'); // 密码
let yz = document.getElementById('yz'); // 验证码输入框
let getYzData = document.getElementsByClassName("yz_bg")[0] //验证码获取
let reading = document.getElementById('reading') //阅读条款
let yzData ;


window.onkeyup = function(event){ 
  if(event.keyCode == 13 && yz.value == yzData){ // 如果按下回车键 同时正确输入验证码
    if(Verification(tel,telTip,/^1(3|5|7|8)\d{9}$/)&&Verification(passWord,pwdTip,/^\w{6,16}$/)&&Verification(userName,nameTip,/^\w{4,16}$/)&&reading.checked){ // 如果输入格式无误 ，则将正确的数据存储在本地服务器
      postData()
    }
  }
}

document.getElementsByClassName('button')[0].onclick = function(event){
  if(yz.value == yzData){ // 如果点击按钮 同时正确输入验证码
    if(Verification(tel,telTip,/^1(3|5|7|8)\d{9}$/)&&Verification(passWord,pwdTip,/^\w{6,16}$/)&&Verification(userName,nameTip,/^\w{4,16}$/)&&reading.checked){ // 如果输入格式无误 ，则将正确的数据存储在本地服务器
      postData()
      tel.form.submit()
      
    }
  }else if(yz.value != yzData){
    alert("请输入正确的验证码");
}
}


function postData(){ // 获取输入的手机号 密码  姓名
  let telData =tel.value;
  let name =userName.value;
  let pwd =passWord.value;
  if(localStorage){ // 存入web本地数据
    let arr = [name,telData,pwd];
    localStorage.setItem('name',arr[0]);
    localStorage.setItem('tel',arr[1]);
    localStorage.setItem('password',arr[2]);
  }
}










getYz()
function getYz(){   // 随机4位验证码
  getYzData.onclick = function(){
    yzData = Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10)
    this.innerHTML = yzData;
    this.style.letterSpacing="8px"
    this.style.fontSize = "18px"
   
  }
}

Verification(tel,telTip,/^1(3|5|7|8)\d{9}$/)
Verification(passWord,pwdTip,/^\w{6,16}$/)
Verification(userName,nameTip,/^\w{4,16}$/)
function Verification(name, tip, reg) {  // 输入格式校验
  name.oninput = function () {
    if (reg.test(name.value)) {
      tip.innerHTML = "验证通过"
      tip.style.color = "green";
      return true;
    } else {
      tip.innerHTML = "验证不通过"
      tip.style.color = "red";
      return false;
    }
  }
  return name.oninput()
}