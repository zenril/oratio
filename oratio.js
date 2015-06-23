/*  This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/> */
    

if (!document.querySelectorAll) {
    document.querySelectorAll = function(selector) {
        var doc = document,
            head = doc.documentElement.firstChild,
            styleTag = doc.createElement('STYLE');
        head.appendChild(styleTag);
        doc.__qsaels = [];
 
        styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
        window.scrollBy(0, 0);
 
        return doc.__qsaels;
    }
}

function Oratio(){
	var self = this;
	self._settings = {
		'attr' : 'data-auto-scaler',
		'klass' : 'apm-auto-scaler',
		'buckets' : {
			'xs': '0',
			'sm': '768px',
			'md': '992px',
			"lg": '1200px'
		},
		'margins' : {
			'top' : '15px',
			'bottom' : '15px'
		}
	}

	self.settings = function(settings,v){
		//getter
		if(!settings) return self._settings;

		//
		if(typeof settings == 'string' && v && self._settings[settings]){
			self._settings[settings] = v;
			return;
		}

		var keys = Object.keys(settings);
		for(var k = 0;k < keys.length;k++){
			var key = keys[k];
			var value = settings[keys];
			if(self._settings[key]){
				self._settings[key] = value;
			}
		}
	}

	self.make = function(){
		

		var buffers = {};
		var cache = {};
		var keys = Object.keys(self._settings.buckets);		
		var regex = new RegExp("(scale|ratio)-("+keys.join("|")+")-(\\d+-\\d+|\\d+)");

		for(var k =0; k < keys.length; k++){
			buffers[keys[k]] =  [];
		}
		
		var dom = document.querySelectorAll('[' + self._settings.attr + ']');

		for(var j =0; j < dom.length; j++){
			var domElement = dom[j];
			var attrValue = domElement.getAttribute(self._settings.attr);

			var classString = domElement.className; // returns the string of all the classes for myDiv
			var newClass = classString.concat( self._settings.klass + " " + attrValue + " "); // Adds the class "main__section" to the string (notice the leading space)
			domElement.className = newClass; // sets className to the new string

			var sizes = attrValue.split(" ");
			for(var i = 0; i < sizes.length;i++){
			    var options = sizes[i].match(regex);
			    var id = options[0];
			    var type = options[1];

			    if(cache[id]) continue;
			    cache[id] = true;

			    var size = options[2];
			    var scale = options[3];

			    if(type =='ratio'){
			    	scale = (+ scale.split("-")[1]) / (+ scale.split("-")[0]) * 100;
			    }

			    buffers[size].push(
			    	"div." + id + "{ width: 100%; position: relative; padding-bottom: "+scale+"%; }"
			    );

			}
		}

		var output = "";
		for(var k =0; k < keys.length; k++){
			var bucketSize = self._settings.buckets[keys[k]];
			if(/^0([^0-9]*)/.test(bucketSize)){
				output += buffers[keys[k]].join("\n") + "\n";
				continue;
			}
			output +=  "\n@media (min-width: "+bucketSize+") {\n" + buffers[keys[k]].join("\n") + "\n}" + "\n";
		
		}
		output += "." + self._settings.klass + " > content { \nposition: absolute; top: 0; bottom: 0; left: 0; right: 0; text-align: center; \n}\n ";
		output += "." + self._settings.klass + " { \nmargin-top:" + self._settings.margins.top +"; margin-bottom:" + self._settings.margins.bottom +"; \n}\n";

		var css = output;
	    var head = document.head || document.getElementsByTagName('head')[0];
	    var style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	}

}
