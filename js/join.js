let userId=localStorage.getItem("userId");
userId = (userId != null) ? userId.split(",") : [];
let name2=localStorage.getItem("name2");
name2 = (name2 != null) ? name2.split(",") : [];
let password=localStorage.getItem("password");
password = (password != null) ? password.split(",") : [];

console.log(userId);
console.log(name2);
console.log(password);

let checkId = false;

function idvali(frm){
	if(frm.id.value == ""){
		alert("ID를 입력하지 않으셨습니다.")
		frm.id.focus();
		return false;
	}

	var idCheck = userId.indexOf(frm.id.value)
	if(idCheck == -1){
		alert("해당 ID로 계속 진행하실 수 있습니다.");
		checkId = true;
		frm.name1.focus()
	}else{
		alert("동일한 id를 가진 회원이 존재합니다.")
		frm.id.value="";
		checkId = false;
		frm.id.focus();
	}
}

function checkData(){
		let id = document.getElementById("id");
		let name1 = document.getElementById("name1");
		let pwd = document.getElementById("pwd");
		let pwd2 = document.getElementById("pwd2");

		if(id.value =="") {
			alert("id가 입력되지 않았습니다.");
			id.focus();
			return false;
		}
		if(!checkId){
			alert("id 중복확인을 하지 않았습니다.");
			id.focus();
			return false;
		}
		if(name1.value =="") {
			alert("성명이 입력되지 않았습니다.");
			name1.focus();
			return false;
		}
		if(pwd.value =="") {
			alert("PW가 입력되지 않았습니다.");
			pwd.focus();
			return false;
		}
		if(pwd2.value =="") {
			alert("비밀번호 확인이 입력되지 않았습니다.");
			pwd2.focus();
			return false;
		}

		if(pwd.value != pwd2.value){
			alert("비밀번호가 서로 일치하지 않습니다.")
			pwd.value = "";
			pwd2.value = "";
			pwd.focus();
			return false;
		}
		
		userId.push(id.value);
		name2.push(name1.value);
		password.push(pwd.value)
		console.log(userId,name2,password);

		

		localStorage.setItem("userId", userId);
		localStorage.setItem("name2", name2);
		localStorage.setItem("password", password);

		location.href = "./login.html";
}