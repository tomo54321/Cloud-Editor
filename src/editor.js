var app = {};
		
app.lines = 1;
app.hasBottom = true;
	$(document).ready(function(){
		app.textarea = $(".textareas");
		app.lineList = $(".line-numbers");	

		if(!app.hasBottom){
			$("#editor .bottombar").remove();
		}
		
	});
	
	app.autoheight = function(a) {
		if (!$(a).prop('scrollTop')) {
			do {
				var b = $(a).prop('scrollHeight');
				var h = $(a).height();
				$(a).height(h - 5);
			}
			while (b && (b != $(a).prop('scrollHeight')));
		};
		$(a).height($(a).prop('scrollHeight') + 20);
	}
	
	$('.textareas').keydown(function(e) {
		var code = e.keyCode || e.which;
		app.autoheight($(app.textarea));
		$(".line.active-line").removeClass(".active-line");
		setTimeout(updateBottomBar, 2);
		//Tab Button
		if (code == '9') {
			e.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;

			// set textarea value to: text before caret + tab + text after caret
			$(app.textarea).val($(app.textarea).val().substring(0, start)
						+ "\t"
						+ $(app.textarea).val().substring(end));

			// put caret at right position again
			this.selectionStart =
			this.selectionEnd = start + 1;
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
}


function updateLineNumbers(){
	line_count = $(app.textarea).val().split("\n").length;
	$(".line-numbers").html("");
	for(i=1;i<=line_count;i++){
		$(".line-numbers").append("<span class='line' data-line='"+i+"'>"+i+"</span>");
	}
	
}

function updateBottomBar(){
	if(app.hasBottom){
		line_count = $(app.textarea).val().split("\n").length;
		letter_count = $(app.textarea).val().split("").length;
		$("#editor .bottombar .ltrc").text("length: "+letter_count);
		$("#editor .bottombar .lc").text("lines: "+line_count);
	}
}

function autoLanguageTextCheck(){
	if($(app.textarea).val().startsWith("<html>") || $(app.textarea).val().toLowerCase().startsWith("<!doctype>") || $(app.textarea).val().toLowerCase().startsWith("<!doctype html>")){
		
		if($(app.textarea).val().includes("<?") || $(app.textarea).val().includes("<?php")){
			$(".doctype").text("Document Type: HTML with PHP");
		}else
			$(".doctype").text("Document Type: HTML");
		
	}else if($(app.textarea).val().startsWith("<?")){
		$(".doctype").text("Document Type: PHP Document");
	}else if($(app.textarea).val().toLowerCase().startsWith("#lang-css")){
		$(".doctype").text("Document Type: Cascading Style Sheet");
	}else if($(app.textarea).val().toLowerCase().startsWith("//lang-js")){
		$(".doctype").text("Document Type: JavaScript");
	}else if($(app.textarea).val().toLowerCase().startsWith("//lang-jquery")){
		$(".doctype").text("Document Type: jQuery JavaScript");
	}
}
