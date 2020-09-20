parcelRequire=function(modules,cache,entry,globalName){var error,previousRequire="function"==typeof parcelRequire&&parcelRequire,nodeRequire="function"==typeof require&&require;function newRequire(name,jumped){if(!cache[name]){if(!modules[name]){var currentRequire="function"==typeof parcelRequire&&parcelRequire;if(!jumped&&currentRequire)return currentRequire(name,!0);if(previousRequire)return previousRequire(name,!0);if(nodeRequire&&"string"==typeof name)return nodeRequire(name);var err=new Error("Cannot find module '"+name+"'");throw err.code="MODULE_NOT_FOUND",err}localRequire.resolve=function resolve(x){return modules[name][1][x]||x},localRequire.cache={};var module=cache[name]=new newRequire.Module(name);modules[name][0].call(module.exports,localRequire,module,module.exports,this)}return cache[name].exports;function localRequire(x){return newRequire(localRequire.resolve(x))}}newRequire.isParcelRequire=!0,newRequire.Module=function Module(moduleName){this.id=moduleName,this.bundle=newRequire,this.exports={}},newRequire.modules=modules,newRequire.cache=cache,newRequire.parent=previousRequire,newRequire.register=function(id,exports){modules[id]=[function(require,module){module.exports=exports},{}]};for(var i=0;i<entry.length;i++)try{newRequire(entry[i])}catch(e){error||(error=e)}if(entry.length){var mainExports=newRequire(entry[entry.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=mainExports:"function"==typeof define&&define.amd?define((function(){return mainExports})):this.formatPackageJSONFile=mainExports}if(parcelRequire=newRequire,error)throw error;return newRequire}({BERS:[function(require,module,exports){"use strict";const PACKAGE_PROPERTY_LIST=Object.freeze(["name","alias","version","description","main","scripts","repository","keywords","author","contributors","license","bugs","homepage"]);module.exports=PACKAGE_PROPERTY_LIST},{}],A4DN:[function(require,module,exports){"use strict";
/*;
	@license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2020-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@license:module;
*/module.exports=async function formatPackageJSONFile(moduleDirectoryPath,optionData){const fs=require("fs"),path=require("path"),util=require("util"),formatJSONFile=require("format-json-file"),fsAsync=fs.promises,DEFAULT_PACKAGE_PROPERTY_LIST=require("./package-property-list.constant.js");try{if("string"==typeof moduleDirectoryPath&&moduleDirectoryPath.length>1&&!0===(await fsAsync.stat(moduleDirectoryPath)).isDirectory()){optionData=optionData||{};const packageJSONFilePath=path.resolve(moduleDirectoryPath,"package.json");if(!0===(await fsAsync.stat(packageJSONFilePath)).isFile()){const packageData=JSON.parse(await fsAsync.readFile(packageJSONFilePath)),currentPackagePropertyList=Object.keys(packageData),PACKAGE_PROPERTY_LIST=!0===Array.isArray(optionData.propertyList)&&optionData.propertyList.length>0?optionData.propertyList:!0===Array.isArray(currentPackagePropertyList)&&currentPackagePropertyList.length>0?currentPackagePropertyList:DEFAULT_PACKAGE_PROPERTY_LIST;return await formatJSONFile(packageJSONFilePath,{sortProperty:!0,propertyList:PACKAGE_PROPERTY_LIST})}throw new Error(["#cannot-find-package-json-file;","cannot format package json file;","cannot find package json file;","@package-json-file-path:",packageJSONFilePath+";"])}throw new Error(["#invalid-module-directory-path;","cannot format package json file;","invalid module directory path;","@module-directory-path:",moduleDirectoryPath+";"])}catch(error){throw new Error(["#cannot-format-package-json-file;","cannot format package json file;","cannot execute format package json file procedure;","@error-data:",util.inspect(error)+";"])}}},{"./package-property-list.constant.js":"BERS"}]},{},["A4DN"]);