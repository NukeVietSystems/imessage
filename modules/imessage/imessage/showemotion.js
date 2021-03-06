/* *
 * @Project NUKEVIET-MUSIC
 * @Author PHAN TAN DUNG (phantandung92@gmail.com)
 * @Createdate 26 - 12 - 2010 5 : 12
 */

var clientPC = navigator.userAgent.toLowerCase(); // Get client info
var is_ie = ((clientPC.indexOf('msie') != -1) && (clientPC.indexOf('opera') == -1));
var baseHeight;

if (is_ie && typeof(baseHeight) != 'number'){
	baseHeight = document.selection.createRange().duplicate().boundingHeight;
}

// Chen doan ma vao
function nvm_insert_text(text, spaces){
	if (spaces){
		text = ' ' + text + ' ';
	}
	
	var textarea = document.getElementById('q');

	if (!isNaN(textarea.selectionStart)){
		var sel_start = textarea.selectionStart;
		var sel_end = textarea.selectionEnd;
		mozWrap(textarea, text, '');
		textarea.selectionStart = sel_start + text.length;
		textarea.selectionEnd = sel_end + text.length;
	}
	else if (textarea.createTextRange && textarea.caretPos){
		if (baseHeight != textarea.caretPos.boundingHeight) 
		{
			textarea.focus();
			storeCaret(textarea);
		}
		var caret_pos = textarea.caretPos;
		caret_pos.text = caret_pos.text.charAt(caret_pos.text.length - 1) == ' ' ? caret_pos.text + text + ' ' : caret_pos.text + text;
	}else{
		textarea.value = textarea.value + text;
	}

	textarea.focus();
}

function mozWrap(txtarea, open, close){
	var selLength = (typeof(txtarea.textLength) == 'undefined') ? txtarea.value.length : txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	var scrollTop = txtarea.scrollTop;
	if (selEnd == 1 || selEnd == 2) {
		selEnd = selLength;
	}
	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selEnd);
	var s3 = (txtarea.value).substring(selEnd, selLength);
	txtarea.value = s1 + open + s2 + close + s3;
	txtarea.selectionStart = selStart + open.length;
	txtarea.selectionEnd = selEnd + open.length;
	txtarea.focus();
	txtarea.scrollTop = scrollTop;
	return;
}

function storeCaret(textEl){
	if (textEl.createTextRange){
		textEl.caretPos = document.selection.createRange().duplicate();
	}
}