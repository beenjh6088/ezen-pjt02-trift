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
  let fileContainer = document.querySelector(".description_image_container");
  let fileContainerName = document.querySelector(".description_info_container_spot");

  try {
    // fetch를 사용해서 이미지를 가져옴
    const response = await fetch(filePath);
    // blob은 바이너리 데이터를 다루기 위해 사용. 파일이나 이미지 처리시 필요
    const blob = await response.blob();

    // console.log(response)
    // console.log(blob)

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
    let keywordCATG = (items[i].querySelector(".spot_body_recommend_list_item_category")) ? (items[i].querySelector(".spot_body_recommend_list_item_category").value.toLowerCase()) : "";
    if(
      keywordKR.includes(search) ||
      keywordEN.includes(search) ||
      keywordCATG.includes(search)
    ) {
      items[i].style.display = "block";
    }else {
      items[i].style.display = "none";
    }
  }
}


