/*
***********************************************************************************************************************************************
CREATION DATE : 2024.06.15
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

/*
대표이미지 선택
async는 비동기 기능 예약어로 File 객체 정보 받을 때 필요해서 사용함.
*/
async function setSignatureImage(event) {
  let target = event.target ? event.target : null;
  let fileName = target.innerText;
  let targetItem = target.parentNode;
  let targetList = targetItem.parentNode.children;
  let targetIndex = Array.from(targetList).indexOf(targetItem)
  let filePath = document.querySelector(`.spot_body_recommend_list_item:nth-child(${targetIndex+1}) .spot_body_recommend_list_item_iamge`).value;
  let fileCategory = document.querySelector(`.spot_body_recommend_list_item:nth-child(${targetIndex+1}) .spot_body_recommend_list_item_categoryKR`).value;
  let fileContainer = document.querySelector(".description_image_container");
  let fileContainerName = document.querySelector(".description_info_container_spot");
  let fileContainerCate = document.querySelector(".description_info_container_catg span");

  try {
    // fetch를 사용해서 이미지를 가져옴
    const response = await fetch(filePath);
    // blob은 바이너리 데이터를 다루기 위해 사용. 파일이나 이미지 처리시 필요
    const blob = await response.blob();

    // console.log(response)
    // Response {type: 'cors', url: 'https://media.istockphoto.com/id/1373031825/ko/%EC…20&c=N4aY-UbOV5pg051JZg0n_wR6kZO32DB-CsWwLQJxrVE=', redirected: false, status: 200, ok: true, …}
    // console.log(blob)
    // Blob {size: 42577, type: 'image/jpeg'}

    // Blob 객체를 File 객체로 변환. readAsDataURL를 사용하기 위해 File객체로 변환
    file = new File([blob], fileName, {type: blob.type});

    let img = document.createElement("img");
    img.classList.add("description_image_container_signatureImage");
    img.setAttribute("src", filePath);
    img.setAttribute("alt", fileName);
    img.addEventListener("click", function() {
      openModal();
    });

    // 이전에 로드된 시그니처 사진 제거
    let prevImage = document.querySelectorAll(".description_image_container_signatureImage");
    prevImage.forEach(i => { fileContainer.removeChild(i); })

    // 새로운 시그니처 사진 추가
    fileContainer.appendChild(img);

    // 새로운 시그니처 사진 이름 추가
    fileContainerName.innerText = fileName;
    fileContainerCate.innerText = fileCategory;
  }catch(error) {
    console.log("Error loading image : ", error);
  }finally {
    // 시그니처 사진 선택 후 닫기
    document.querySelector("#spot").click();
  }
}

// 파일다이얼로그로 사진 추가 및 삭제 이벤트
function punInOutPictures() {
  let fileContainer = document.querySelector(".frmWrite_body_file")
  let uploadIcon = document.querySelector(".frmWrite_body_file_picture.active");
  let fileInput = document.querySelector(".frmWrite_body_file_picture_fileDialog");
  let limit = 5;
  let cnt = 0;

  if(uploadIcon) {
    uploadIcon.addEventListener("click", function() {
        fileInput.click();
    });
  }

  if(fileInput) {
    fileInput.addEventListener("change", function() {
      let reader = new FileReader();
      const files = fileInput.files;

      // 이미지는 최대 5개까지 포스트 가능
      if(cnt == limit) {
        alert("이미지는 최대 5개까지 올릴 수 있습니다.")
        return;
      }

      reader.onload = function(event) {
        let img = document.createElement("img");
        img.classList.add("frmWrite_body_file_picture");
        img.setAttribute("src", event.target.result);
        // 추가된 사진을 더블클릭하면 해당 사진 삭제하는 이벤트 추가
        img.addEventListener("dblclick", function(e) {
          fileContainer.removeChild(img)
        })
        // 사진을 추가할 때마다 `사진 추가하기` 아이콘을 부모요소 맨 뒤에 배치
        uploadIcon = fileContainer.removeChild(uploadIcon);
        fileContainer.appendChild(img);
        fileContainer.appendChild(uploadIcon);
      }
      reader.readAsDataURL(files[0])

      cnt++;
    });
  }
}

// 모달창 열기
function openModal() {
  let spot = document.querySelector("#spot");
  spot.style.display = "block"
}

// 모달창 닫기
function closeModal(event) {
  let spot = document.querySelector("#spot");
  let isModal = event.target.closest(".spot_body") ? true : false;
  // isModal 값이 false일 때 모달창 종료
  if(!isModal) {
    spot.style.display = "none"
  }
}

// 검색조건에 맞는 결과 찾는 필터링 기능
function filter() {
  let search = document.querySelector(".spot_body_search_key").value.toLowerCase();
  let items = document.querySelectorAll(".spot_body_recommend_list_item");

  for(let i = 0; i < items.length; i++) {
    let keywordKR = (items[i].querySelector(".spot_body_recommend_list_item_keywordKR")) ? (items[i].querySelector(".spot_body_recommend_list_item_keywordKR").value.toLowerCase()) : "";
    let keywordEN = (items[i].querySelector(".spot_body_recommend_list_item_keywordEN")) ? (items[i].querySelector(".spot_body_recommend_list_item_keywordEN").value.toLowerCase()) : "";
    let catgegoryKR = (items[i].querySelector(".spot_body_recommend_list_item_categoryKR")) ? (items[i].querySelector(".spot_body_recommend_list_item_categoryKR").value.toLowerCase()) : "";
    let catgegoryEN = (items[i].querySelector(".spot_body_recommend_list_item_categoryKR")) ? (items[i].querySelector(".spot_body_recommend_list_item_categoryKR").value.toLowerCase()) : "";
    if(
      keywordKR.includes(search) ||
      keywordEN.includes(search) ||
      catgegoryKR.includes(search) ||
      catgegoryEN.includes(search) 

    ) {
      items[i].style.display = "block";
    }else {
      items[i].style.display = "none";
    }
  }
}


/*
기록하기 버튼 활성화 여부 판단
주소, 날짜, 제목, 내용에 값이 하나라도 없을경우 기록하기 버튼은 비활성화
*/
function checkInputs() {
  let inputData = document.querySelectorAll(".description_info_container_fields_row_input");
  let textTitle = document.querySelector(".frmWrite_body_header_input").value.trim();
  let textArea = document.querySelector(".frmWrite_body_content_textarea").value.trim();
  let recordButton = document.querySelector("#frmWrite_body_button_record");
  let isFull = true;

  // 주소, 날짜에 공백있는지 검사
  for(let i = 0; i < inputData.length; i++) {
    let inputDatum = inputData[i];
    if(inputDatum.value.trim() == ""){
      isFull = false;
      break;
    }
  }
  // 제목에 공백있는지 검사
  if(textTitle == "") {
    isFull = false;
  }
  // 내용에 공백있는지 검사
  if(textArea == "") {
    isFull = false;
  }

  // 필수 입력사항이 기입되었을 경우 버튼 활성화
  if(isFull) {
    recordButton.classList.remove("deactivated");
  }else {
    recordButton.classList.add("deactivated");
  }
}

// 기록하기 버튼 활성화 방법에 대한 안내 툴팁 이벤트
document.querySelector("#frmWrite_body_button_record.deactivated").addEventListener("mouseover", function() {
  document.querySelector(".button.deactivated + .frmWrite_body_button_guide") ? document.querySelector(".button.deactivated + .frmWrite_body_button_guide").classList.remove("hide") : null;
})
document.querySelector("#frmWrite_body_button_record.deactivated").addEventListener("mouseout", function() {
  document.querySelector(".button.deactivated + .frmWrite_body_button_guide") ? document.querySelector(".button.deactivated + .frmWrite_body_button_guide").classList.add("hide") : null;
})



// 카드 추가하기
function addCard(frm) {
  let addButton = document.querySelector("#frmWrite_body_button_record")

  // 기록하기 버튼이 비활성화되어 있을 경우에는 카드 추가 불가
  if(addButton.classList.contains("deactivated")) {
    // return;
  }
  let signatureImg = document.querySelector(".description_image_container_signatureImage")
  let catg = document.querySelector(".description_info_container_catg > span").innerText;
  let spot = document.querySelector(".description_info_container_spot") ? document.querySelector(".description_info_container_spot").innerText : "";
  let addr = frm.description_info_container_fields_row_inputAddr.value;
  let date = frm.description_info_container_fields_row_inputDate.value;
  let star = document.querySelector(".star.selected") ? parseInt(document.querySelector(".star.selected").getAttribute("data-value")) : 0;
  let title = frm.frmWrite_body_header_input.value;
  // NULL or img tag
  let imgs = document.querySelectorAll(".frmWrite_body_file_picture:not(.active)")
  let text = frm.frmWrite_body_content_textarea.value;

  console.log(signatureImg)
  console.log(catg)
  console.log(spot)
  console.log(addr)
  console.log(date)
  console.log(star)
  console.log(title)
  console.log(imgs)
  console.log(text)

  // card 정보를 담는 객체 생성.
  let cards = localStorage.getItem("cards") == null ? [] : localStorage.getItem("cards");
  let tftCard = document.createElement("tft-card");
  // 시그니처 이미지는 숨긴 자식요소로 세팅.
  if(signatureImg){
    let hddSignatureImg = document.createElement("input");
    hddSignatureImg.setAttribute("type", "hidden");
    hddSignatureImg.setAttribute("data-class", signatureImg.classList[0]);
    hddSignatureImg.setAttribute("data-src", signatureImg.getAttribute("src"));
    hddSignatureImg.setAttribute("data-alt", signatureImg.getAttribute("alt"));
    tftCard.appendChild(hddSignatureImg);
  }
  // 카테고리
  tftCard.setAttribute("catg", catg);
  // 장소
  tftCard.setAttribute("spot", spot);
  // 주소
  tftCard.setAttribute("addr", addr);
  // 날짜
  tftCard.setAttribute("date", date);
  // 별점
  tftCard.setAttribute("star", star);
  // 제목
  tftCard.setAttribute("title", title);
  // 작은 이미지들 숨긴 자식요소로 세팅.
  if(imgs) {
    imgs.forEach(i => {
      let hddImgs = document.createElement("input");
      hddImgs.setAttribute("type", "hidden");
      hddImgs.setAttribute("data-class", i.classList[0]);
      hddImgs.setAttribute("data-src", i.getAttribute("src"));
      hddImgs.setAttribute("data-alt", i.getAttribute("alt"));
      tftCard.appendChild(hddImgs);
    });
  }
  // 내용
  if(title.length != 0) {
    let hddText = document.createElement("input");
    hddText.setAttribute("type", "hidden");
    hddText.setAttribute("data-value", text);
    tftCard.appendChild(hddText);
  }
  // 사용자 이름
  tftCard.setAttribute("userName", "AKIRA");

  // cards 배열에 tftCard 객체 추가
  cards.push(tftCard);

  // 로컬스토리지에 저장해서 페이지를 이동해도 해당 객체 유지
  localStorage.setItem("cards", cards)

  console.log(`cards : `);
  console.log(cards)
  // console.log(cards)
}