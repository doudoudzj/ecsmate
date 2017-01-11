angular.module("vpsmate.filters",[]).filter("iftrue",function(){return function(a,b){return b?a:""}}).filter("ifmatch",function(){return function(a,b){return b[0].match(new RegExp("^"+b[1]+"$"))?a:""}}).filter("ifnotmatch",function(){return function(a,b){return b[0].match(new RegExp("^"+b[1]+"$"))?"":a}}).filter("ifin",function(){return function(a,b){return typeof b[1][b[0]]!="undefined"?a:""}}).filter("ifnotin",function(){return function(a,b){return typeof b[1][b[0]]!="undefined"?"":a}}).filter("ifverget",function(){return function(c,e){if(!e[0]||!e[1]){return""}var a=e[0].split(".");var b=e[1].split(".");for(var d=0;d<a.length;d++){if(b.length==d){return c}if(a[d]==b[d]){continue}else{if(a[d]>b[d]){return c}else{return""}}}if(a.length!=b.length){return""}return c}}).filter("urlencode",function(){return function(a){return a?encodeURIComponent(a):""}}).filter("netiface.updown",function(){return function(a){return a=="up"?'<span class="label label-success">启用</span>':'<span class="label label-warning">停用</span>'}}).filter("netiface.encap",function(){return function(a){if(a=="Local Loopback"){return"本地环路"}if(a=="Ethernet"){return"以太网"}if(a=="Point-to-Point Protocol"){return"点对点"}if(a=="UNSPEC"){return"未识别"}return a}}).filter("loadavg.overload",function(){return function(a,c){if(!a){return""}var b=a-c;b=parseInt(b*100/c);if(b<0){return'<span class="label label-success">'+Math.abs(b)+"%空闲</span>"}else{if(b>100){return'<span class="label label-important">'+b+"%过载</span>"}else{return'<span class="label label-warning">'+b+"%过载</span>"}}}}).filter("uptime.idlerate",function(){return function(a){if(!a){return""}var b=parseInt(a);if(b<10){return'<span class="label label-important">'+a+"空闲</span>"}else{if(b<25){return'<span class="label label-warning">'+a+"空闲</span>"}else{return'<span class="label label-success">'+a+"空闲</span>"}}}}).filter("space.used",function(){return function(a){if(!a){return""}var b=parseInt(a);if(b>90){return'<span class="label label-important">'+a+"</span>"}else{if(b>75){return'<span class="label label-warning">'+a+"</span>"}else{return'<span class="label label-success">'+a+"</span>"}}}}).filter("space.free",function(){return function(a){if(!a){return""}var b=parseInt(a);if(b<10){return'<span class="label label-important">'+a+"</span>"}else{if(b<25){return'<span class="label label-warning">'+a+"</span>"}else{return'<span class="label label-success">'+a+"</span>"}}}}).filter("service.status",function(){return function(a){if(!a){return'<span class="label">未安装</span>'}return a=="running"?'<span class="label label-success">运行中</span>':'<span class="label label-important">已停止</span>'}}).filter("user.lock",function(){return function(a){return a?'<span class="label">锁定</span>':'<span class="label label-success">正常</span>'}}).filter("site.status",function(){return function(a){return a=="on"?'<span class="label label-success">启用</span>':'<span class="label label-important">停用</span>'}}).filter("site.engine",function(){return function(a){if(a=="static"){return"静态"}else{if(a=="fastcgi"){return"FastCGI"}else{if(a=="scgi"){return"SCGI"}else{if(a=="uwsgi"){return"uWSGI"}else{if(a=="redirect"){return"跳转"}else{if(a=="rewrite"){return"重写"}else{if(a=="proxy"){return"反代"}else{if(a=="return"){return"错误"}else{return a}}}}}}}}}}).filter("site.port",function(){return function(a){if(a=="80"){return"http"}else{if(a=="443"){return"https"}else{return""}}}}).filter("site.default_server",function(){return function(a){return !a?'<span class="label label-info">默认</span>':""}}).filter("bytes2human",function(){return function(e){var d=["G","M","K"];var a=d.length;var b=[];for(var c=0;c<a;c++){b[c]=1<<(a-c)*10}for(var c=0;c<a;c++){if(e>=b[c]){return Math.round((e/b[c])*10)/10+d[c]}}return e+"B"}}).filter("mysql.user",function(){return function(a){return a==""?'<span class="text-error">任意</span>':a}}).filter("mysql.haspasswd",function(){return function(a){return a=="N"?'<span class="text-error">否</span>':"是"}}).filter("mysql.grant",function(){return function(a){return a=="N"?"否":"是"}}).filter("mysql.privtype",function(){return function(a,b){if(a=="*"||a==""){return"全局指定"}if(a==b){return"按数据库指定"}return"通配符"}}).filter("mysql.privtype_en",function(){return function(a,b){if(a=="*"||a==""){return"global"}if(a==b){return"bydb"}return"wildcard"}}).filter("mysql.privs",function(){return function(a,d){if(!a){return"---"}var f=["Select_priv","Insert_priv","Update_priv","Delete_priv","Create_priv","Alter_priv","Index_priv","Drop_priv","Create_tmp_table_priv","Show_view_priv","Create_routine_priv","Alter_routine_priv","Execute_priv","Create_view_priv","Event_priv","Trigger_priv","Lock_tables_priv","References_priv"];var e=["File_priv","Super_priv","Process_priv","Reload_priv","Shutdown_priv","Show_db_priv","Repl_client_priv","Repl_slave_priv","Create_user_priv"];if(d=="global"){f=f.concat(e)}var c=0;for(var b=0;b<f.length;b++){if(a[f[b]]=="Y"){c++}}if(c==0){return d=="global"?"无全局权限":"无权限"}else{if(c==f.length){return"所有权限"}else{return"部分权限"}}}});