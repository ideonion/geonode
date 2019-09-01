/*! geonode-assets 01-09-2019 */

define(["module"],function(a){"use strict";function b(a,b){return void 0===a||""===a?b:a}function c(a,c,d,e){if(c===e)return!0;if(a===d){if("http"===a)return b(c,"80")===b(e,"80");if("https"===a)return b(c,"443")===b(e,"443")}return!1}var d,e,f,g,h,i=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],j=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,k=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,l="undefined"!=typeof location&&location.href,m=l&&location.protocol&&location.protocol.replace(/\:/,""),n=l&&location.hostname,o=l&&(location.port||void 0),p={},q=a.config&&a.config()||{};return d={version:"2.0.15",strip:function(a){if(a){a=a.replace(j,"");var b=a.match(k);b&&(a=b[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:q.createXhr||function(){var a,b,c;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(b=0;b<3;b+=1){c=i[b];try{a=new ActiveXObject(c)}catch(a){}if(a){i=[c];break}}return a},parseName:function(a){var b,c,d,e=!1,f=a.lastIndexOf("."),g=0===a.indexOf("./")||0===a.indexOf("../");return-1!==f&&(!g||f>1)?(b=a.substring(0,f),c=a.substring(f+1)):b=a,d=c||b,f=d.indexOf("!"),-1!==f&&(e="strip"===d.substring(f+1),d=d.substring(0,f),c?c=d:b=d),{moduleName:b,ext:c,strip:e}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,e,f){var g,h,i,j=d.xdRegExp.exec(a);return!j||(g=j[2],h=j[3],h=h.split(":"),i=h[1],h=h[0],(!g||g===b)&&(!h||h.toLowerCase()===e.toLowerCase())&&(!i&&!h||c(g,i,b,f)))},finishLoad:function(a,b,c,e){c=b?d.strip(c):c,q.isBuild&&(p[a]=c),e(c)},load:function(a,b,c,e){if(e&&e.isBuild&&!e.inlineText)return void c();q.isBuild=e&&e.isBuild;var f=d.parseName(a),g=f.moduleName+(f.ext?"."+f.ext:""),h=b.toUrl(g),i=q.useXhr||d.useXhr;if(0===h.indexOf("empty:"))return void c();!l||i(h,m,n,o)?d.get(h,function(b){d.finishLoad(a,f.strip,b,c)},function(a){c.error&&c.error(a)}):b([g],function(a){d.finishLoad(f.moduleName+"."+f.ext,f.strip,a,c)})},write:function(a,b,c,e){if(p.hasOwnProperty(b)){var f=d.jsEscape(p[b]);c.asModule(a+"!"+b,"define(function () { return '"+f+"';});\n")}},writeFile:function(a,b,c,e,f){var g=d.parseName(b),h=g.ext?"."+g.ext:"",i=g.moduleName+h,j=c.toUrl(g.moduleName+h)+".js";d.load(i,c,function(b){var c=function(a){return e(j,a)};c.asModule=function(a,b){return e.asModule(a,j,b)},d.write(a,i,c,f)},f)}},"node"===q.env||!q.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"]?(e=require.nodeRequire("fs"),d.get=function(a,b,c){try{var d=e.readFileSync(a,"utf8");"\ufeff"===d[0]&&(d=d.substring(1)),b(d)}catch(a){c&&c(a)}}):"xhr"===q.env||!q.env&&d.createXhr()?d.get=function(a,b,c,e){var f,g=d.createXhr();if(g.open("GET",a,!0),e)for(f in e)e.hasOwnProperty(f)&&g.setRequestHeader(f.toLowerCase(),e[f]);q.onXhr&&q.onXhr(g,a),g.onreadystatechange=function(d){var e,f;4===g.readyState&&(e=g.status||0,e>399&&e<600?(f=new Error(a+" HTTP status: "+e),f.xhr=g,c&&c(f)):b(g.responseText),q.onXhrComplete&&q.onXhrComplete(g,a))},g.send(null)}:"rhino"===q.env||!q.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?d.get=function(a,b){var c,d,e=new java.io.File(a),f=java.lang.System.getProperty("line.separator"),g=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(e),"utf-8")),h="";try{for(c=new java.lang.StringBuffer,d=g.readLine(),d&&d.length()&&65279===d.charAt(0)&&(d=d.substring(1)),null!==d&&c.append(d);null!==(d=g.readLine());)c.append(f),c.append(d);h=String(c.toString())}finally{g.close()}b(h)}:("xpconnect"===q.env||!q.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(f=Components.classes,g=Components.interfaces,Components.utils.import("resource://gre/modules/FileUtils.jsm"),h="@mozilla.org/windows-registry-key;1"in f,d.get=function(a,b){var c,d,e,i={};h&&(a=a.replace(/\//g,"\\")),e=new FileUtils.File(a);try{c=f["@mozilla.org/network/file-input-stream;1"].createInstance(g.nsIFileInputStream),c.init(e,1,0,!1),d=f["@mozilla.org/intl/converter-input-stream;1"].createInstance(g.nsIConverterInputStream),d.init(c,"utf-8",c.available(),g.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),d.readString(c.available(),i),d.close(),c.close(),b(i.value)}catch(a){throw new Error((e&&e.path||"")+": "+a)}}),d});