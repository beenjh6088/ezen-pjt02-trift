let bookarr = [];
const url = `${window.location.protocol+"//"+window.location.host+"/"}`;

function init() {
  setData();
  includeHtml();
  setAbsLink();
  makeEvents();
}

function setData() {
  bookarr = JSON.parse(JSON.stringify(BookObj)).books;
}

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

function setAbsLink() {
  links = document.querySelectorAll(".link");
  links.forEach(function(link, idx) {
    let val = link.getAttribute("href");
    let addr = url+val;
    link.setAttribute("href", addr);
  }); 
}

function makeEvents() {
  const highmenus = document.querySelectorAll(".highmenu-item");
  const tabContents = document.querySelectorAll(".tab-content");

  highmenus.forEach(highmenu => {
    highmenu.addEventListener("mouseover", function() {
          // 모든 탭 콘텐츠 비활성화
          tabContents.forEach(tc => tc.classList.remove("active"));

          // 현재 탭과 연결된 콘텐츠 활성화
          // console.log(document.getElementById(highmenu.dataset.tab))
          let highmenu_item = document.getElementById(highmenu.dataset.tab);
          if(highmenu_item != null) {
            document.getElementById(highmenu.dataset.tab).classList.add("active");
          }
      });
  });

  tabContents.forEach(content => {
      content.addEventListener("mouseleave", function() {
          // 마우스가 탭 콘텐츠를 벗어나면 콘텐츠 비활성화
          content.classList.remove("active");
      });
  });
}