function importJs(jsFilePath) {
  let js = document.createElement("script");

  js.type = "text/javascript";
  js.src = jsFilePath;

  document.body.appendChild(js);
}
importJs("./js/class/Card.js")