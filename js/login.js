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
function login(e, cb) {
  e.preventDefault();
  localStorage.setItem("isLogin", true);
  // 로그인 성공시 이젠 페이지로 이동
  history.back();
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
  let history = document.querySelector(".highMenus_item.history > a");
  let write = document.querySelector(".highMenus_item.write > a");
  let isLogin = localStorage.getItem("isLogin");
  if(isLogin =="true") {
    // 로그인된 상태로 인한 stranger 은폐 및 member 표시
    strangers.forEach((s) => s.classList.remove("active"))
    members.forEach((m) => m.classList.add("active"))
    history.setAttribute("href", "./history.html")
    write.setAttribute("href", "./write.html")
  }else {
    // 로그아웃된 상태로 인한 member 은폐 및 stranger 표시
    strangers.forEach((s) => s.classList.add("active"))
    members.forEach((m) => m.classList.remove("active"))
    history.setAttribute("href", "./login.html")
    write.setAttribute("href", "./login.html")
  }
}

