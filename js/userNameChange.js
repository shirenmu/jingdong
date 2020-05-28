let userData = localStorage.getItem('name');
let changeUser = document.getElementById('changeUser');
loginUserChange()
function loginUserChange(){
  if(userData){
    changeUser.innerHTML = userData;
    changeUser.style.color = "#555"
    changeUser.style.marginRight = "12px"
  }
}
