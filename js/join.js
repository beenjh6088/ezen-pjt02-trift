let userId=["abcde","asdfg"]
let name=["김삿갓","정말로"]
let pwd=["111111","222222"]

function idvali(frm){
	if(frm.id.value == ""){
		alert("ID를 입력하지 않으셨습니다.")
		frm.id.focus();
		return false;
	}
	var idCheck = userId.indexOf(frm.id.value)
	if(idCheck == -1){
		alert("해당 ID로 계속 진행하실 수 있습니다.")
		frm.name.focus()
	}
}