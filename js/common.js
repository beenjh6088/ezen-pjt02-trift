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
let pick = null;
let deck = null;
let index = null;
const cardDetail = document.querySelector(".modal.cardDetail");

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
  let moreDetail = document.querySelector(".moreDetail");

  toggleHoveringOnGnb();

  if(pageName == "write.html"){
    punInOutPictures();
    rateOutOfN();
  }else if(pageName == "index.html" || pageName == "history.html") {
    letsMoveWithMouse();
    rateOutOfN();
  }
  if(moreDetail) {
    openMoreDetail(moreDetail);
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
  const rating = document.querySelector(".rating")
  if(rating.classList.contains("disabled") == true) return;
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
function openCardDetail(event) {
  // console.log('callCardDetail')
  pick = event.target.closest("tft-card");
  deck = pick.parentNode.children;
  index = Array.from(deck).indexOf(pick);
  let title = pick.getAttribute("title");
  let userName = pick.getAttribute("userName");
  let likeAmount = pick.getAttribute("likeAmount") ? parseInt(pick.getAttribute("likeAmount")) : 0;
  let viewAmount = pick.getAttribute("viewAmount") ? parseInt(pick.getAttribute("viewAmount"))+1 : 1;
  let spot = pick.getAttribute("spot");
  let catg = pick.getAttribute("catg");
  let signatureImg = pick.getAttribute("signatureImg") ? pick.getAttribute("signatureImg") : "";
  let star = pick.getAttribute("star") && isNaN(pick.getAttribute("star")) == false ? parseInt(pick.getAttribute("star")) : 0;
  let date = pick.getAttribute("date");
  // let content = pick.getAttribute("content");
  let text = pick.getAttribute("text");
  let addr = pick.getAttribute("addr");
  let pics = document.querySelectorAll(`tft-card:nth-child(${index}) .howManyPics`);
  let imgs = pick.getAttribute("imgs");
  let key = pick.getAttribute("key");
  // console.log(pics)
  // console.log(`imgs`)
  // console.log(imgs)

  // console.log(`pick`)
  // console.log(pick)
  // console.log(userName)
  // console.log(spot)
  // console.log(catg)
  // console.log(image)
  // console.log(rating)
  // console.log(date)
  // console.log(content)
  // console.log(addr)
  console.log(`key`)
  console.log(key)
  
  // deck.forEach((c) => {c.querySelector('.modal').classList.remove("active")});
  // for(let i = 0; i < deck.length; i++) {}

  // 해당 태그에 속성값으로 조회수 저장
  pick.setAttribute("viewAmount", viewAmount);

  // 모달창으로 데이터 보내기. send data to modal(cardDetail)
  document.querySelector(".title", cardDetail).innerHTML = title;
  document.querySelector(".roundedRectangle.view", cardDetail).innerHTML = viewAmount;
  document.querySelector(".roundedRectangle.like", cardDetail).innerHTML = likeAmount;
  document.querySelector(".articleInfo_writer_name", cardDetail).innerHTML = userName;
  document.querySelector(".description_info_container_fields_row_input[type=text]", cardDetail).value = addr;
  document.querySelector(".description_info_container_fields_row_input[type=date]", cardDetail).value = date;
  // 기존에 있는 색칠된 별 지우기
  document.querySelectorAll(".star").forEach((s) => {s.classList.remove("selected")})
  // star 속성에 저장된 값만큼 selected 해주기
  document.querySelectorAll(".star").forEach(function(s, idx) {
    if(s.dataset.value == star) s.classList.add("selected")
  })
  // 시그니처 이미지 세팅
  document.querySelector(".description_image_container_addButton").style.background = `url(${signatureImg}) no-repeat center/cover`
  document.querySelector(".description_image_container_addButton_addText").style.display = "none";
  // 카테고리 세팅
  document.querySelector(".description_info_container_catg").innerHTML = `<span>${catg}</span>`
  // 장소 세팅
  document.querySelector(".description_info_container_spot").innerHTML = `<a href='javascript:;'>${spot}</a>`
  // 내용 세팅
  document.querySelector(".frmWrite_body_content_textarea").value = text;
  // 조각 이미지 세팅
  document.querySelector(".frmWrite_body_file").innerHTML = ""
  // 샘플 이미지
  if(pics.length > 0){
    for(let i = 0; i < pics.length; i++) {
      let img = document.createElement("img");
      img.classList.add("frmWrite_body_file_picture")
      img.setAttribute("src", pics[i].value);
      document.querySelector(".frmWrite_body_file").appendChild(img)
    }
    // 실제 기록할 때 넣은 이미지
  }else {
    // 로컬스토리지에 사진을 저장하면 용량초과 에러메세지 떠서 주석처리
    // if(imgs) {
    //   for(let i = 0; i < imgs.length; i++) {
    //     let img = document.createElement("img");
    //     img.classList.add("frmWrite_body_file_picture");
    //     img.setAttribute("src", imgs[i]["data-src"]);
    //     document.querySelector(".frmWrite_body_file").appendChild(img)
    //   }
    // }
    // console.log(`imgs`)
    // console.log(imgs)
  }

  // 삭제를 위한 카드 ID를 삭제하기 버튼에 세팅
  let deleteCard = document.querySelector(".moreDetail_list_item.delete")
  if(deleteCard) {
    deleteCard.setAttribute("data-value", key)
  }
  cardDetail.classList.add("active");
}


// Card Detail 모달창 닫기
function closeCardDetail() {
  document.querySelector(".modal.cardDetail").classList.remove("active");
}


// Card Detail 좋아요 개수 증가
function likeCard() {
  // console.log('likeCard');
  let likeAmount = pick.getAttribute("likeAmount") ? parseInt(pick.getAttribute("likeAmount"))+1 : 1;

  // 해당 태그에 속성값으로 좋아요 개수 저장
  pick.setAttribute("likeAmount", likeAmount);
  
  // 모달창에 하트 개수 표시
  document.querySelector(".roundedRectangle.like", cardDetail).innerHTML = likeAmount;

  // 카드에 하트 개수 표시
  document.querySelector(`tft-card:nth-child(${index+1}) .cardBottom_heart_cnt`).innerHTML = likeAmount;
}


// 더보기창 열기
function openMoreDetail(moreDetail) {
  // document.querySelector(".more").click(function() { console.log(1) })
  
  // 더보기창 열기
  document.querySelector(".more").addEventListener("click", function() {
    moreDetail.classList.add("active");
  });

  // 더보기창 닫기
  window.addEventListener("click", function(e) {
    let hasMoreDetail = ( e.target.closest(".moreDetail") || e.target.closest(".more") )? true : false;
    if(!hasMoreDetail) {
      moreDetail.classList.remove("active");
    }
  })
}