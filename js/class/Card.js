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

class Card extends HTMLElement {
  connectedCallback() {
    const sampleImage = [
      '/images/banner/banner_kor1.png',
      '/images/banner/banner_kor2.png',
      '/images/banner/banner_kor3.png',
      '/images/banner/banner_main1.png',
      '/images/banner/banner_main2.png'
    ]
    let title = this.getAttribute("title") ? this.getAttribute("title") : "Enter a Title";
    let userName = this.getAttribute("userName") ? this.getAttribute("userName") : "Enter a Username";
    let likeAmount = (this.getAttribute("likeAmount") == null || isNaN(this.getAttribute("likeAmount"))) ? 0 : parseInt(this.getAttribute("likeAmount")) >= 1000 ? Math.floor(parseInt(this.getAttribute("likeAmount"))/1000)+"K" : parseInt(this.getAttribute("likeAmount"));
    let viewAmount = 0;
    let spot = this.getAttribute("spot") ? this.getAttribute("spot") : "Enger a spot";
    let subtitle = this.getAttribute("subtitle") ? this.getAttribute("subtitle") : "Enter a Subtitle";
    let image = this.getAttribute("image") ? this.getAttribute("image") : "/images/common/default.png";
    let rating = (this.getAttribute("rating") == null || isNaN(this.getAttribute("rating")) == true) ? 0 : parseInt(this.getAttribute("rating")) > 5 ? 5 : parseInt(this.getAttribute("rating"));
    let strRating = "";
    // 새로고침할 때마다 변수값이 바뀌는 이슈
    let howManyPics = Math.floor(Math.random()*5)+1;
    let hiddens = "";
    // console.log(howManyPics)
    
    // 별점 매기기
    for(let i = 0; i < rating; i++){
      strRating += `<li><img class="cardBottom_rating_star" src="/images/icons/starF.png" alt="rating"></li>`
    }
    for(let i = rating; i < 5; i++) {
      strRating += `<li><img class="cardBottom_rating_star" src="/images/icons/starE.png" alt="rating"></li>`
    }

    // 조각 이미지 세팅
    for(let i = 0; i < howManyPics; i++) {
      hiddens += `<input type='hidden' value='${sampleImage[i]}' name='howManyPics' class='howManyPics'>`
    }
    
    //조회수, 좋아요 개수 세팅
    // hiddens += `<input type='hidden' value='${viewAmount}' class='viewAmount'>`


    this.innerHTML = `
      <div class="card" ondblclick="oepnCardDetail(event);">
        <div class="cardTop" style="background: url('${image}') no-repeat;">
        ${hiddens}
          <div class="cardTop_profile">
            <!-- <a href="#"> -->
              <img class="cardTop_profile_img"src="../../images/icons/accountIcon.png" alt="profileImg">
              <p class="cardTop_profile_userName">${userName}</p>
            <!-- </a> -->
          </div>
        </div>
        <div class="cardBottom">
          <ul class="cardBottom_location">
            <li class="cardBottom_location_location_1"><a href="#">${spot}</a></li>
          </ul>
          <ul class="cardBottom_cardContent">
            <!-- <a href="#"> -->
            <li class="cardBottom_cardContent_title">${title}</li>
            <li class="cardBottom_cardContent_body">${subtitle}</li>
            <!-- </a> -->
          </ul>
          <ul class="cardBottom_rating">
            ${strRating}
          </ul>
          <ul class="cardBottom_heart">
            <li class="cardBottom_heart_icon"><img src="../../images/icons/heartWhite.png" alt="heart"></li>
            <li class="cardBottom_heart_cnt">${likeAmount}</li>
          </ul>
        </div>
      </div>
    `;
  }
}
customElements.define("tft-card", Card);