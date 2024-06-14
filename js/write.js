// 대표이미지 선택
function setSignatureImage() {
  let fileInput = document.querySelector(".description_image_container_addButton_fileDialog");
  // let uploadIcon = document.querySelector(".description_image_container_addButton");
  let uploadIcon = document.querySelector(".description_image_container");
  let uploadText = document.querySelector(".description_info_container_spot > a");
  let fileContainer = document.querySelector(".description_image_container");

  if(uploadIcon) {
    uploadIcon.addEventListener("click", function() {
      fileInput.click();
    })
  }

  if(uploadText) {
    uploadText.addEventListener("click", function() {
      fileInput.click();
    })
  }

  if(fileInput) {
    fileInput.addEventListener("change", function() {
      let reader = new FileReader();
      let files = fileInput.files;

      reader.onload = function(e) {
        // console.log(e.target)
        let img = document.createElement("img");
        img.classList.add("description_image_container_signatureImage");
        img.setAttribute("src", e.target.result);

        // 이전에 로드된 시그니처 사진 제거
        let prevImage = document.querySelectorAll(".description_image_container_signatureImage");
        prevImage.forEach(i => { fileContainer.removeChild(i); })

        // 새로운 시그니처 사진 추가
        fileContainer.appendChild(img);

        // 확장자를 제외한 파일 이름 추가
        let fileName = new String(files[0].name);
        fileName = fileName.substring(0, fileName.indexOf("."))
        uploadText.innerHTML = fileName;
      }
      reader.readAsDataURL(files[0]);
    })
  }
}


// 파일다이얼로그로 사진 추가 및 삭제 이벤트
function punInOutPictures() {
  console.log("openFileDialog");
  let fileContainer = document.querySelector(".frmWrite_body_file")
  let uploadIcon = document.querySelector(".frmWrite_body_file_picture");
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
        fileContainer.appendChild(img);
      }
      reader.readAsDataURL(files[0])

      cnt++;
    });
  }

}