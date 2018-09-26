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
	});

function handleHighlighting(){
	var ft = $(app.textarea).val();
	ft = ft.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
	
	ft = highlightHTML(ft);
	
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

function highlightHTML(str){
	
	var colors = {
		"tag" : "7a00ff",
		"attr" : "e45612",
		"quote" : "0095ff",
	};

	var st = str;
	
	
	st = st.replace( new RegExp("&lt;!---(.*?)---&gt;", 'g'), "<span class='syntaxse-comment'>&lt;!---$1---&gt;</span>");
	st = st.replace( new RegExp("&lt;!--(.*?)--&gt;", 'g'), "<span class='syntaxse-comment'>&lt;!--$1--&gt;</span>");
	st = st.replace( new RegExp("&lt;!DOCTYPE (.*?)&gt;", 'g'), "<span class='syntaxse-comment'>&lt;!DOCTYPE $1&gt;</span>");
	st = st.replace( new RegExp("&lt;!doctype (.*?)&gt;", 'g'), "<span class='syntaxse-comment'>&lt;!doctype $1&gt;</span>");
	st = st.replace(/lang=/g, "<span class='syntaxse-attr'>lang=</span>");
	st = st.replace(/"(.*?)"/g, "<span class='syntaxse-string'>&quot;$1&quot;</span>");
	st = st.replace(/&lt;(.*?)&gt;/g, "<span class='syntaxse-tag'>&lt;$1&gt;</span>");

	return st;
}