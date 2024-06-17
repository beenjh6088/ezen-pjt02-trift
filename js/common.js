/*
***********************************************************************************************************************************************
CREATION DATE : 2024.05.30
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

let userArr = [];
let url = `${window.location.protocol+"//"+window.location.host+"/"}`;
let isLogin = false;
let strangers, members;


// 페이지 로드시 초기화 작업
function init() {
  setData();
  includeHtml();
  setAbsLink();
  makeEvents();
}


// 비동기 데이터 세팅
function setData() {
  setTimeout(() => {
    userArr = JSON.parse(JSON.stringify(UserObj)).users;
    // 로그인 페이지에서 isLogin 값 변경 후 index.html로 페이지 이동이 일어나 비동기 호출이 필요.
    checkIsLogin();
    }, 0);
}

// 모듈화
function includeHtml() {
  const includeTarget = document.querySelectorAll('.includeJs');
  includeTarget.forEach(function(el, idx) {
    const targetFile = el.dataset.includeFile;
    if(targetFile){
      let xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
          this.status === 200 ? (el.innerHTML = this.responseText) : null
          this.status === 404 ? (el.innerHTML = 'include not found.') : null
        }
      }
      xhttp.open('GET', url+targetFile, false);
      xhttp.send();
      return;
    }
  });
};

// link라는 클래스가 붙으면 절대경로로 넣어주기
function setAbsLink() {
  links = document.querySelectorAll(".link");
  links.forEach(function(link, idx) {
    let val = link.getAttribute("href");
    let addr = url+val;
    link.setAttribute("href", addr);
  }); 
}


// 이벤트 넣어주기
function makeEvents() {
  let pageName = getPageName();

  toggleHoveringOnGnb();
  letsMoveWithMouse();
  rateOutOfN();

  if(pageName == "write.html"){
    punInOutPictures();
  }
}


// Global Navigation Bar에 호버링 기능 부여
function toggleHoveringOnGnb() {
  const highMenus = document.querySelectorAll(".highMenus_item");
  const midContents = document.querySelectorAll(".midContent");
  const midMenus = document.querySelectorAll(".middleMenus_item")
  
  // highMenus_item mouseover 이벤트
  highMenus.forEach(highmenu => {
    let highmenu_item = document.getElementById(highmenu.dataset.tab);
    highmenu.addEventListener("mouseover", function() {
      // 모든 탭 콘텐츠 비활성화
      midContents.forEach(mc => mc.classList.remove("active"));

      // 현재 탭과 연결된 콘텐츠 활성화
      if(highmenu_item != null) {
        highmenu_item.classList.add("active");
      }
    });
  });

  // highMenus_item mouseleave 이벤트
  midContents.forEach(content => {
    content.addEventListener("mouseleave", function() {
      // 마우스가 탭 콘텐츠를 벗어나면 콘텐츠 비활성화
      content.classList.remove("active");
    });
  });

  // middleMenus_item mouseover 이벤트
  midMenus.forEach(midMenu => {
    midMenu.addEventListener("mouseover", function() {
      // 모든 탭 콘텐츠 비활성화
      midMenus.forEach(lc => lc.classList.remove("active"));

      // 현재 탭과 연결된 콘텐츠 활성화
      midMenu.classList.add("active")
    })
  })
}


// mousemove or drag 기능
function letsMoveWithMouse() {
  const cards = document.querySelector('.cards');
  const cardDeck = document.querySelectorAll(".cards .card");

  // 마우스 클릭 중인지 확인하는 변수
  let isMouseDown = false;
  let startX, scrollLeft;
  
  if(cards != null) {
    cards.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      cardDeck.forEach(c => c.classList.remove("active"));
      e.target.closest(".card") ? e.target.closest(".card").classList.add("active") : null;
      // 드래그를 시작한 지점의 x 좌표
      startX = e.pageX - cards.offsetLeft;
      // 현재 얼만큼 스크롤되었는지 변수
      scrollLeft = cards.scrollLeft;
    });
    
    cards.addEventListener('mouseleave', (e) => {
      isMouseDown = false;
      cardDeck.forEach(c => c.classList.remove("active"));
    });
    
    cards.addEventListener('mouseup', (e) => {
      isMouseDown = false;
      cardDeck.forEach(c => c.classList.remove("active"));
    });
    
    cards.addEventListener('mousemove', (e) => {
      // 마우스 클릭이 아닐 떄는 실행 중지
      if (!isMouseDown) return;
    
      // 이 함수의 정상적인 실행을 위해 HTML 태그의 내장 이벤트 중지
      e.preventDefault();
  
      // 마우스로 클릭한 시점부터 놓기까지의 거리만큼 스크롤로 이동하기
      const x = e.pageX - cards.offsetLeft;
      const walk = (x - startX) * 1;
      cards.scrollLeft = scrollLeft - walk;
    });
  }
}

// 별로 평점 매기기
function rateOutOfN() {
  const stars = document.querySelectorAll(".star");
  // const ratingValue = document.getElementById("rating-value");

  // 특정 위치의 별을 클릭하면 클리한 별의 왼쪽 위치의 별까지 선택
  // 클릭된 별을 클릭하면 원상복귀
  stars.forEach(star => {
      star.addEventListener("click", function() {
          // const value = this.getAttribute("data-value");
          // ratingValue.textContent = value;

          let isSelected = this.classList.contains("selected");
          clearSelection();
          if(isSelected == false) {
            this.classList.add("selected");
          }
          // this.nextElementSibling?.classList.add("selected");
          // this.previousElementSibling?.classList.add("selected");
      });
  });

  function clearSelection() {
      stars.forEach(star => {
          star.classList.remove("selected");
      });
  }
}


// 페이지 이름 가져오기
function getPageName() {
  let pageName = null;
  var tempPageName = location.href;
  let strPageName = tempPageName.split("/");
  pageName = strPageName[strPageName.length-1].split("?")[0];
  return pageName;
}

// Card Detail 모달창 열기
function oepnCardDetail(event) {
  console.log('callCardDetail')
  let pick = event.target.closest("tft-card");
  let deck = pick.parentNode.children;
  let index = Array.from(deck).indexOf(pick);
  const cardDetail = document.querySelector(".modal.cardDetail");
  let title = pick.getAttribute("title");
  let subtitle = pick.getAttribute("subtitle");
  let userName = pick.getAttribute("userName");
  let likeAmount = pick.getAttribute("likeAmount");
  let image = pick.getAttribute("image") ? pick.getAttribute("image") : "";

  console.log(pick)
  // console.log(deck)
  // console.log(`index : ${index}`)
  
  // deck.forEach((c) => {c.querySelector('.modal').classList.remove("active")});
  // for(let i = 0; i < deck.length; i++) {}
  console.log(cardDetail)
  // 모달창으로 데이터 보내기. send data to modal(cardDetail)
  document.querySelector(".title", cardDetail).innerHTML = title;

  cardDetail.classList.add("active");
  
}

// Card Detail 모달창 닫기
function closeCardDetail() {
  document.querySelector(".modal.cardDetail").classList.remove("active");
}