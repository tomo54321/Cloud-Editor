export function getLangID(lang){
	switch(lang){
		case "html":
			return "lang;html";
			break;
		default:
			return "default;blank";
			break;
	}
}