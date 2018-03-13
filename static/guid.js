/**
 * 功能: 生成GUID
 * 函数详单：
   jxd.utils.guid.get32 - 生成32位GUID
   jxd.utils.guid.get36 - 生成36位GUID    
 */

//模拟命名空间
if (typeof(jxd) == "undefined") {
	jxd = {};
}
if (typeof(jxd.utils) == "undefined") {
	jxd.utils = {};
}
if (typeof(jxd.utils.guid) == "undefined") {
	jxd.utils.guid = {};
}

//生成32位GUID
jxd.utils.guid.get32 = function() {
	return jxd.utils.guid.generate(false);
}

//生成36位GUID
jxd.utils.guid.get36 = function() {
	return jxd.utils.guid.generate(true);
}

jxd.utils.guid.generate = function(p_bAddSep) {
	var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if(p_bAddSep && ((i==8)||(i==12)||(i==16)||(i==20))) {
    	  guid += "-";
      }
    }
    return guid; 
}

