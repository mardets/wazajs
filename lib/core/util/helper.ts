export class Helper {
		
	constructor() {
	}
	
	static filter(array: any, path:string) {
		for(let i=0; i < array.length; i++) {
			if(window.location.hash.substring(1, window.location.hash.length) == path && typeof path.indexOf(path.length-1) == 'number' && path && typeof path.indexOf(path.length-1) != -1) {
				return array[i];
			} else {
				if(array[i].path == path) {
					return array[i];
				} 
			}
			
		}
	}

	static hashToControllerName(value: string) {
		let strValue = '';
		let upperStrValue = '';
		if(value.charAt(value.length-1) === 's') {
			strValue = value.substring(0, value.length-1) + 'Controller';
			upperStrValue = strValue.charAt(0).toUpperCase() + strValue.substring(1, strValue.length);
		} 
		else if(value === '') {
			return 'HomeController';
		}
		else {
			strValue = value + 'Controller';
			upperStrValue = strValue.charAt(0).toUpperCase() + strValue.substring(1, strValue.length);
		}
		
		return upperStrValue;
	}
	
	static xmlToJson(xml: any) {
		var obj = {};
		
		if(xml.nodeType == 1) {
			if(xml.attributes.length > 0) {
				obj["@attributes"] = {};
				for(let j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if(xml.nodeType == 3) {
			obj = xml.nodeValue;
		}
		
		var textNodes = [].slice.call(xml.childNodes).filter((node:any) => {
			return node.nodeType === 3;
		});
		
		if(xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
			obj = [].slice.call(xml.childNodes).reduce((text:string, node:any) => {
				return text + node.nodeValue;
			}, "");
		} else if(xml.hasChildNodes()) {
			for(let i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if(typeof obj[nodeName] == "undefined") {
					obj[nodeName] = this.xmlToJson(item);
				} else {
					if(typeof obj[nodeName].push == "undefined") {
						let old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(this.xmlToJson(item));
				}
				
			}
		}
		return obj;
	}
}