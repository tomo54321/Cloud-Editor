var app = {};
		
app.lines = 1;
app.hasBottom = true;
	$(document).ready(function(){
		app.textarea = $(".textareas");
		app.lineList = $(".line-numbers");	

		if(!app.hasBottom){
			$("#editor .bottombar").remove();
		}
		
		$(".display-editor").click(function(){
			$(app.textarea).focus();
		});
		
	});

	$('.display-editor').keydown(function(e) {
		var code = e.keyCode || e.which;
		$(".line.active-line").removeClass(".active-line");
		
		//setTimeout(updateBottomBar, 2);
		//Tab Button
		if (code == '9') {
			e.preventDefault();
			document.execCommand('styleWithCSS',true,null);
            document.execCommand('indent',true,null);
			
		}
		
		//Enter Button
		if (code == '13') {
			handleEnter();
		}
		
		//Backspace button
		if (code == '8') {
			handleDelete();
		}
		
		//Delete Button
		if (code == '46') {
			handleDelete();
		}
		
	});
	
function handleDelete(){
	setTimeout(updateLineNumbers, 1);
}

function handleEnter(){
	setTimeout(updateLineNumbers, 1);
	if($(".display-editor").children("div").length == 0) $(".display-editor").append("<div></div>");
}

function updateLineNumbers(){
	line_count = $(".display-editor").children("div").length;
	$(".line-numbers").html("");
	for(i=1;i<=line_count;i++){
		$(".line-numbers").append("<span class='line' data-line='"+i+"'>"+i+"</span>");
	}
	
	if(line_count == 0){
		$(".line-numbers").append("<span class='line' data-line='1'>1</span>");
	}
	
}

