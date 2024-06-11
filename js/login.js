/*
***********************************************************************************************************************************************
CREATION DATE : 2024.06.10
CREATION USER : EZEN Laboratory Number 2 Trift 
                JH.B : supporter for professionals
                HJ.C : professional for rendering
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
  localStorage.setItem("isLogin", true);
  location.href = url;
}

// 로그아웃 기능
function logout(e) {
  e.preventDefault();
  localStorage.setItem("isLogin", false);
  checkIsLogin();
}

// 로그인 관련 컴포넌트 상태 변경
function checkIsLogin() {
  strangers = document.querySelectorAll(".header_top_user .stranger");
  members = document.querySelectorAll(".header_top_user .member");
  let isLogin = localStorage.getItem("isLogin");
  if(isLogin =="true") {
    console.log("checkIsLogin login")
    // 로그인된 상태로 인한 stranger 은폐 및 member 표시
    console.log(strangers);
    console.log(members);
    strangers.forEach((s) => s.classList.remove("active"))
    members.forEach((m) => m.classList.add("active"))
    
  }else {
    console.log("checkIsLogin logout")
    // 로그아웃된 상태로 인한 member 은폐 및 stranger 표시
    console.log(members);
    console.log(strangers);
    strangers.forEach((s) => s.classList.add("active"))
    members.forEach((m) => m.classList.remove("active"))
  }
}
