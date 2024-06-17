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
    let userName = this.getAttribute("userName") ? this.getAttribute("userName") : "Enter a Username"
    let title = this.getAttribute("title") ? this.getAttribute("title") : "Enter a Title";
    let subtitle = this.getAttribute("subtitle") ? this.getAttribute("subtitle") : "Enter a Subtitle";
    let likeAmount = isNaN(this.getAttribute("likeAmount")) ? 0 : parseInt(this.getAttribute("likeAmount"));
    let image = this.getAttribute("image") ? this.getAttribute("image") : "../../images/cardImage.png";
    console.log(image)
    
    this.innerHTML = `
      <div class="card" ondblclick="callCardDetail(event);">
        <div class="cardTop" style="background: url('${image}') no-repeat;">
          <div class="cardTop_profile">
            <!-- <a href="#"> -->
              <img class="cardTop_profile_img"src="../../images/icons/accountIcon.png" alt="profileImg">
              <p class="cardTop_profile_userName">${userName}</p>
            <!-- </a> -->
          </div>
        </div>
        <div class="cardBottom">
          <ul class="cardBottom_location">
            <li class="cardBottom_location_location_1"><a href="#">지역</a></li>
            <li class="cardBottom_location_location_2"><a href="#">상세 지역</a></li>
          </ul>
          <ul class="cardBottom_cardContent">
            <!-- <a href="#"> -->
            <li class="cardBottom_cardContent_title">${title}</li>
            <li class="cardBottom_cardContent_body">${subtitle}</li>
            <!-- </a> -->
          </ul>
          <ul class="cardBottom_rating">
            <li><img class="cardBottom_rating_star" src="../../images/icons/starF.png" alt="rating"></li>
            <li><img class="cardBottom_rating_star" src="../../images/icons/starF.png" alt="rating"></li>
            <li><img class="cardBottom_rating_star" src="../../images/icons/starF.png" alt="rating"></li>
            <li><img class="cardBottom_rating_star" src="../../images/icons/starF.png" alt="rating"></li>
            <li><img class="cardBottom_rating_star" src="../../images/icons/starE.png" alt="rating"></li>
          </ul>
          <ul class="cardBottom_heart">
            <li class="cardBottom_heart_icon"><img src="../../images/icons/heartWhite.png" alt="heart"></li>
            <li class="cardBottom_heart_cnt">${likeAmount}</li>
          </ul>
        </div>
      </div>
    `


  }
}
customElements.define("tft-card", Card);