let user = document.getElementById('user');
let pwd = document.getElementById('pwd');
let login = document.getElementById('login');

let userDt = localStorage.getItem('name');
let pwdData = localStorage.getItem('password');
console.log(userDt,pwdData)
// console.log(user.value ,pwd.value)
window.onkeyup = function(event){
  if(event.keyCode == 13 && user.value == userDt && pwd.value == pwdData){
    user.form.submit();
  }else if(user.value != userDt || pwd.value != pwdData){
    alert("请输入正确的用户与密码")
  }
}
login.onclick = function(){
  if(user.value == userDt && pwd.value == pwdData){
    this.form.submit();
  }else if(!userDt&&!pwdData){
    alert("请注册")
    window.location.href = "../pages/sign_in.html"    
  }else if(user.value != userDt || pwd.value != pwdData){
    alert("请输入正确的用户与密码")
  }
}
if(userDt&&pwdData){
  setTimeout(function(){
    window.location.href = "../index.html"
  },2000)
}

