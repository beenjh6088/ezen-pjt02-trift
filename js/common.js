let bookarr = [];
const url = `${window.location.protocol+"//"+window.location.host+"/"}`;

function init() {
  setData();
  includeHtml();
  setAbsLink();
  makeEvents();
}


// JSON 데이터 가져오기
function setData() {
  bookarr = JSON.parse(JSON.stringify(BookObj)).books;
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
  const highMenus = document.querySelectorAll(".highMenu-item");
  const midContents = document.querySelectorAll(".midContent");
  const midMenus = document.querySelectorAll(".middleMenu-item")

  // highMenu-item mouseover 이벤트
  highMenus.forEach(highmenu => {
    highmenu.addEventListener("mouseover", function() {
      // 모든 탭 콘텐츠 비활성화
      midContents.forEach(tc => tc.classList.remove("active"));

      // 현재 탭과 연결된 콘텐츠 활성화
      let highmenu_item = document.getElementById(highmenu.dataset.tab);
      if(highmenu_item != null) {
        document.getElementById(highmenu.dataset.tab).classList.add("active");
      }
    });
  });

  // highMenu-item mouseleave 이벤트
  midContents.forEach(content => {
    content.addEventListener("mouseleave", function() {
      // 마우스가 탭 콘텐츠를 벗어나면 콘텐츠 비활성화
      content.classList.remove("active");
    });
  });

  // middleMenu-item mouseover 이벤트
  midMenus.forEach(midMenu => {
    midMenu.addEventListener("mouseover", function() {
      // 모든 탭 콘텐츠 비활성화
      midMenus.forEach(lc => lc.classList.remove("active"));

      // 현재 탭과 연결된 콘텐츠 활성화
      midMenu.classList.add("active")
    })
  })

  // middleMenu-item mouseleave 이벤트
}