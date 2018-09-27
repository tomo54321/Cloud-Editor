/*

	WIP HTML Parser for the Cloud Syntaxse Editor

*/

$("#editor textarea").on("isready", function(){
	app.settings.setDoctype("mdl;html;langtype");
});



function highlight(str){
	var colors = {
		"tag" : "7a00ff",
		"attr" : "e45612",
		"quote" : "0095ff",
	};

	var st = str;
	
	var valid_tags = ["html", "head", "body", "title", "meta", "link", "script", "iframe", "div", "span", "object", "table", "h1", "h2"];
	
	st = st.replace( new RegExp("&lt;!---(.*?)---&gt;", 'g'), "<span class='syntaxse-comment'>&lt;!---$1---&gt;</span>");
	st = st.replace( new RegExp("&lt;!--(.*?)--&gt;", 'g'), "<span class='syntaxse-comment'>&lt;!--$1--&gt;</span>");
	st = st.replace( new RegExp("&lt;!DOCTYPE (.*?)&gt;", 'g'), "<span class='syntaxse-comment'>&lt;!DOCTYPE $1&gt;</span>");
	st = st.replace( new RegExp("&lt;!doctype (.*?)&gt;", 'g'), "<span class='syntaxse-comment'>&lt;!doctype $1&gt;</span>");
	
	for(i=0;i<valid_tags.length;i++){
		st = st.replace( new RegExp("&lt;"+valid_tags[i]+"(.*?)&gt;", 'g'), "<span class='syntaxse-tag'>&lt;"+valid_tags[i]+"<span class='syntaxse-attr'>$1</span>&gt;</span>");
		st = st.replace( new RegExp("&lt;/"+valid_tags[i]+"&gt;", 'g'), "<span class='syntaxse-tag'>&lt;/"+valid_tags[i]+"&gt;</span>");
	}
	st = st.replace(/"(.*?)"/g, "<span class='syntaxse-string'>&quot;$1&quot;</span>");

	return st;
}