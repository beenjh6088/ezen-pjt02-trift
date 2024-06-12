/*
***********************************************************************************************************************************************
CREATION DATE : 2024.06.10
CREATION USER : EZEN Laboratory Number 2 Trift 
                JH.B : supporter for professionals
                HJ.C : professional for rending
                JS.C : professional for planning
                KJ.L : professional for insight
CREATION DESC : 
                1) 
                2) 
                3) 
                4) 
------------------------------------------------------------------------------------------------------------------------------------------------
REVISION DATE : 
REVISION USER : 
REVISION DESC :
------------------------------------------------------------------------------------------------------------------------------------------------
REVISION DATE : 
REVISION USER : 
REVISION DESC :  
***********************************************************************************************************************************************
*/

// 로그인 기능
function login(e) {
  e.preventDefault();
  console.log("login");
  // isLogin = true;
  // localStorage.setItem("isLogin", true)
  // let strangers = JSON.parse(localStorage.getItem("strangers"))

  // console.log(strangers)
  // console.log(typeof(strangers))

  // isLogin = JSON.parse(localStorage.getItem("isLogin"))
  // isLogin = true;
  // console.log(isLogin)
  localStorage.setItem("isLogin", true);
  checkIsLogin()
  location.href = url;
}

// 로그아웃 기능
function logout(e) {
  e.preventDefault();
  console.log("logout");
  // isLogin = false;
  localStorage.setItem("isLogin", false)
  checkIsLogin()
}

function checkIsLogin() {
  console.log(`stranger`)
  let isLogin = localStorage.getItem("isLogin");
  console.log(isLogin)
  if(isLogin =="true") {
    console.log("checkIsLogin login")
  }else {
    console.log("checkIsLogin logout")
  }
}
