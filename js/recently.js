function renderRecentlyData() {
  console.log(`renderRecentlyData`)
  let cards = localStorage.getItem("cards") == null ? [] : JSON.parse(localStorage.getItem("cards"));
  const latestContainer = document.querySelector(".latest_container_content");
  if(cards.length == 0) {
    latestContainer.innerHTML = "<h3>업로드하신 데이터가 없습니다.<h3>"
    return;
  }
  // console.log(cards)
  cards.forEach(function(card) {
    // console.log(card);
    let key = card["key"] ? card["key"] : "TMP"+(new Date().getTime());
    let signatureImg = card["signatureImg"] ? card["signatureImg"]["data-src"] : "/images/common/default.png";
    let catg = card["catg"] ? card["catg"] : "Enter a category";
    let spot = card["spot"] ? card["spot"] : "Enger a spot";
    let addr = card["addr"] ? card["addr"] : "";
    let date = card["date"] ? card["date"] : "";
    let star = (card["star"] == null || isNaN(card["star"]) == true) ? 0 : parseInt(card["star"]) > 5 ? 5 : parseInt(card["star"]);
    let title = card["title"] ? card["title"] : "Enter a Title";
    let imgs = card["imgs"];
    let userName = card["userName"] ? card["userName"] : "Enter a Username";
    let text = card["text"] ? card["text"] : "";

    let tftCard = document.createElement("tft-card");
    tftCard.setAttribute("key", key)
    tftCard.setAttribute("signatureImg", signatureImg)
    tftCard.setAttribute("catg", catg)
    tftCard.setAttribute("spot", spot)
    tftCard.setAttribute("addr", addr)
    tftCard.setAttribute("date", date)
    tftCard.setAttribute("star", star)
    tftCard.setAttribute("title", title)
    tftCard.setAttribute("imgs", imgs)
    tftCard.setAttribute("userName", userName)
    tftCard.setAttribute("text", text)
    latestContainer.appendChild(tftCard);
  })
}


function deleteCard(card) {
  let cards = localStorage.getItem("cards") == null ? [] : JSON.parse(localStorage.getItem("cards"));
  let cardId = card.getAttribute("data-value");
  console.log(cards)
  console.log(cardId)
  if(cards.length > 0) {
    for(let i =0; i < cards.length; i++) {
      if(cardId == cards[i].key) {
        console.log("able to delete")
        cards.splice(i, 1)
        break;
      }
    }
    console.log(cards)
    localStorage.setItem("cards", JSON.stringify(cards))
    location.href = "../recently.html";
  }
}