var app = {};
		
app.lines = 1;
app.hasBottom = true;

app.startCurBlink = 0;
app.lang="blank";
app.events = {};

app.events.isReady = new Event("isready");


app.settings = {};

	$(document).ready(function(){
		app.textarea = $(".textareas");
		app.lineList = $(".line-numbers");	
		
		if(!app.hasBottom){
			$("#editor .bottombar").remove();
		}
		
		$("#editor-whighlights").click(function(){
			$(app.textarea).focus();
		});
		
		app.init();
	});
	
	
	app.init = function(){
		$(app.textarea)[0].dispatchEvent(app.events.isReady);
	};
	
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
	
	$('.textareas').keyup(function(e) {
		handleHighlighting();
		updateCursor();
	});

function handleHighlighting(){
	var ft = $(app.textarea).val();
	ft = ft.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
	
	if(app.lang != "blank"){
		ft = highlight(ft);
	}
		
	$('#editor-whighlights').html(ft);
}
	
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


var input = document.querySelector('.textareas'),
    output = document.querySelector('.area-mirror span'),
    position = document.querySelector('.syntaxse-cursor');

function updateCursor(){	
		
		if(app.startCurBlink != 0){
			clearTimeout(app.startCurBlink);
		}
		$(".syntaxse-cursor").addClass("isTyping");
		app.startCurBlink = setTimeout(function(){ $(".syntaxse-cursor").removeClass("isTyping"); }, 1000);
		
		$(".area-mirror").css({"width": $(app.textarea).css("width")});
		
         output.innerHTML = input.value.substr( 0, input.selectionStart ).replace(/\n$/,"\n\001").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

        /* the fun part! 
           We use an inline element, so getClientRects[2] will return a collection of rectangles wrapping each line of text.
           We only need the position of the last rectangle.
         */
        var rects = output.getClientRects(),
            lastRect = rects[ rects.length - 1 ],
            top = lastRect.top - input.scrollTop,
            left = lastRect.left+lastRect.width;
        /* position the little div and see if it matches caret position :) */
        position.style.cssText = "top: "+(top - 8)+"px;left: "+(left - 58)+"px";
	
}

app.settings.setDoctype=function(type){
	if(app.lang == "blank"){
		
		var pseType = type.split(";")[1];
		
		console.log("Doctype set to "+type);
		if(app.hasBottom){
			$(".bottombar .doctype").text("Document Type: "+pseType);
		}
		
		app.lang = pseType;
		
	}
	else{
		throw new Error("Cannot set editor language as a language has already been set.");
	}
	
};