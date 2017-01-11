var ServiceCtrl=["$scope","$routeParams","Module","Timeout","Request","Backend",function(d,a,g,h,f,c){var e="service";g.init(e,"服务管理");g.initSection("http");d.scope=d;d.info=null;d.loaded=false;d.waiting=true;d.loadInfo=function(){f.get("/query/server.virt,service.**",function(i){if(!d.loaded){d.loaded=true}if(d.info==null){d.info=i}else{deepUpdate(d.info,i)}d.waiting=false})};d.toggleAutostart=function(j,i){var k=d.info["service."+i]["autostart"];f.post("/operation/chkconfig",{name:j,service:i,autostart:!k},function(l){d.loadInfo()})};var b=function(i){return function(k,j){c.call(d,e,"/backend/service_"+i,"/backend/service_"+i+"_"+j,{name:k,service:j},d.loadInfo)}};d.start=b("start");d.stop=b("stop");d.restart=b("restart")}];var ServiceNginxCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.nginx";e.init(c,"Nginx");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.nginx",function(g){var h=g["service.nginx"];if(h){b.installed=true;b.autostart=h.autostart;b.status=h.status;if(b.checkVersion){b.checkVersion()}b.getsettings();b.getcachesettings()}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false});d.get("/client/ip",function(g){b.ip=g})};b.setting={limit_rate:"",limit_conn:"",limit_conn_zone:"",client_max_body_size:"",keepalive_timeout:"",access_status:"off",allow:"",deny:"",gzip:""};b.getsettings=function(){if(!b.installed){return}d.post("/operation/nginx",{action:"gethttpsettings",items:"limit_rate,limit_conn,limit_conn_zone,client_max_body_size,keepalive_timeout,allow[],deny[],gzip"},function(h){if(h.code==0){b.setting=h.data;var g=b.setting;if(g.allow&&g.allow.length>0){g.access_status="white"}else{if(g.deny&&g.deny.length>0){g.access_status="black"}else{g.access_status="off"}}if(g.allow){g.allow=g.allow.join("\n")}if(g.deny){g.deny=g.deny.join("\n")}}},false,true)};b.savesettings=function(){var g=angular.copy(b.setting);g.action="sethttpsettings";g.version=b.pkginfo.version;d.post("/operation/nginx",g,function(h){if(h.code==0){b.getsettings()}})};var f={name:"newcache",mem:"10",path:"/var/www/cache",path_level_1:"1",path_level_2:"2",path_level_3:"0",inactive:"10",inactive_unit:"m",max_size:"100",max_size_unit:"m",autocreate:true};b.proxy_caches=[];b.curcache=-1;b.setcache=function(g){b.curcache=g};b.getcachesettings=function(){if(!b.installed){return}d.post("/operation/nginx",{action:"gethttpsettings",items:"proxy_cache_path[]"},function(h){if(h.code==0){b.proxy_caches=[];var k=h.data.proxy_cache_path;if(k){for(var g=0;g<k.length;g++){var j=angular.copy(f);angular.extend(j,k[g]);b.proxy_caches.push(j)}b.curcache=0}}},false,true)};b.deletecache=function(g){b.proxy_caches.splice(g,1);b.curcache--;if(b.curcache<0&&b.proxy_caches.length>0){b.curcache=0}};b.addcache=function(){var g=b.proxy_caches;g.splice(b.curcache+1,0,angular.copy(f));b.curcache++};b.selectcachefolder=function(g){b.selector_title="请选择缓存目录";b.selector.onlydir=true;b.selector.onlyfile=false;b.selector.load(b.proxy_caches[g].path);b.selector.selecthandler=function(h){$("#selector").modal("hide");b.proxy_caches[g].path=h};$("#selector").modal()};b.savecaches=function(){var g={action:"setproxycachesettings",proxy_caches:angular.toJson(b.proxy_caches)};d.post("/operation/nginx",g,function(h){if(h.code==0){b.getcachesettings()}})}}];var ServiceApacheCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.apache";e.init(c,"Apache");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.httpd",function(f){var g=f["service.httpd"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];var ServiceVsftpdCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.vsftpd";e.init(c,"vsftpd");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.vsftpd",function(f){var g=f["service.vsftpd"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];var ServiceMySQLCtrl=["$scope","$routeParams","Module","Message","Request","Backend",function(c,a,g,f,e,b){var d="service.mysqld";g.init(d,"MySQL");g.initSection("base");c.scope=c;c.info=null;c.loaded=false;c.installed=false;c.waiting=true;c.checking=false;c.processing=false;c.checkInstalled=function(){c.checking=true;e.get("/query/service.mysqld",function(h){var i=h["service.mysqld"];if(i){c.installed=true;c.autostart=i.autostart;c.status=i.status;if(c.checkVersion){c.checkVersion()}}else{c.installed=false}c.loaded=true;c.waiting=false;c.checking=false})};c.updatepwd=function(){if(c.status!="running"){f.setError("MySQL还未启动，无法修改密码！");return}c.processing=true;e.post("/operation/mysql",{action:"updatepwd",newpassword:c.root_passwd,newpasswordc:c.root_passwdc,password:c.root_opasswd},function(h){if(h.code==0){c.root_passwd="";c.root_passwdc="";c.root_opasswd=""}c.processing=false})};c.fupdatepwd=function(){c.processing=true;b.call(c,d,"/backend/mysql_fupdatepwd","/backend/mysql_fupdatepwd",{password:c.root_passwd,passwordc:c.root_passwdc},function(h){if(h.code==0){c.root_passwd="";c.root_passwdc=""}c.processing=false})}}];var ServiceRedisCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.redis";e.init(c,"Redis");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.redis",function(f){var g=f["service.redis"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];var ServiceMemcacheCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.memcache";e.init(c,"Memcache");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.memcached",function(f){var g=f["service.memcached"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];var ServiceMongoDBCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.mongodb";e.init(c,"MongoDB");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.mongod",function(f){var g=f["service.mongod"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];var ServicePHPCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.php";e.init(c,"PHP");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.php-fpm",function(g){var h=g["service.php-fpm"];if(h){b.installed=true;b.autostart=h.autostart;b.status=h.status;if(b.checkVersion){b.checkVersion()}b.getphpsettings();b.getfpmsettings()}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})};b.setting={php:{short_open_tag:false,expose_php:false,max_execution_time:"",memory_limit:"",display_errors:false,post_max_size:"",upload_max_filesize:"","date.timezone":""},fpm:{listen:"",pm:false,"pm.max_children":"","pm.start_servers":"","pm.min_spare_servers":"","pm.max_spare_servers":"","pm.max_requests":"",request_terminate_timeout:"",request_slowlog_timeout:""}};var f=function(g){g=parseInt(g);if(isNaN(g)){g=""}else{g+=""}return g};b.getphpsettings=function(){if(!b.installed){return}d.post("/operation/php",{action:"getphpsettings"},function(h){if(h.code==0){var g=h.data;var i=b.setting.php;i.short_open_tag=(g.short_open_tag&&g.short_open_tag.toLowerCase()=="on");i.expose_php=(g.expose_php&&g.expose_php.toLowerCase()=="on");i.max_execution_time=g.max_execution_time?g.max_execution_time:"";i.memory_limit=g.memory_limit?f(g.memory_limit):"";i.display_errors=(g.display_errors&&g.display_errors.toLowerCase()=="on");i.post_max_size=g.post_max_size?f(g.post_max_size):"";i.upload_max_filesize=g.upload_max_filesize?f(g.upload_max_filesize):"";i["date.timezone"]=g["date.timezone"]?g["date.timezone"]:""}},false,true)};b.getfpmsettings=function(){if(!b.installed){return}d.post("/operation/php",{action:"getfpmsettings"},function(h){if(h.code==0){var g=h.data;var i=b.setting.fpm;i.listen=g.listen?g.listen:"";i.pm=(g.pm&&g.pm.toLowerCase()=="dynamic");i["pm.max_children"]=g["pm.max_children"]?f(g["pm.max_children"]):"";i["pm.start_servers"]=g["pm.start_servers"]?f(g["pm.start_servers"]):"";i["pm.min_spare_servers"]=g["pm.min_spare_servers"]?f(g["pm.min_spare_servers"]):"";i["pm.max_spare_servers"]=g["pm.max_spare_servers"]?f(g["pm.max_spare_servers"]):"";i["pm.max_requests"]=g["pm.max_requests"]?f(g["pm.max_requests"]):"";i.request_terminate_timeout=g.request_terminate_timeout?f(g.request_terminate_timeout):"";i.request_slowlog_timeout=g.request_slowlog_timeout?f(g.request_slowlog_timeout):""}},false,true)};b.updatephpsettings=function(){var g=angular.copy(b.setting.php);g.action="updatephpsettings";d.post("/operation/php",g,b.getphpsettings)};b.updatefpmsettings=function(){var g=angular.copy(b.setting.fpm);g.action="updatefpmsettings";d.post("/operation/php",g,b.getfpmsettings)}}];var ServiceSendmailCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.sendmail";e.init(c,"Sendmail");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.sendmail",function(f){var g=f["service.sendmail"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];var ServiceSSHCtrl=["$scope","$routeParams","Module","Request","Backend","Message",function(c,a,g,f,b,e){var d="service.ssh";g.init(d,"SSH");g.initSection("base");c.scope=c;c.info=null;c.loaded=false;c.installed=false;c.waiting=true;c.checking=false;c.checkInstalled=function(){c.checking=true;f.get("/query/service.sshd",function(h){var i=h["service.sshd"];if(i){c.installed=true;c.autostart=i.autostart;c.status=i.status;c.getsettings();if(c.checkVersion){c.checkVersion()}}else{c.installed=false}c.loaded=true;c.waiting=false;c.checking=false})};c.setting={};c.getsettings=function(){if(!c.installed){return}f.post("/operation/ssh",{action:"getsettings"},function(h){if(h.code==0){c.setting=h.data;c.setting.disable_pwdauth=!c.setting.enable_pwdauth}},false,true)};c.savesettings=function(){var h={};h.action="savesettings";h.port=c.setting.port;h.enable_pwdauth=c.setting.enable_pwdauth;h.enable_sftp=c.setting.enable_sftp;f.post("/operation/ssh",h,function(i){if(i.code==0){c.getsettings()}})};c.savepksettings=function(){var h={};h.action="savesettings";h.pubkey=c.setting.pubkey;h.enable_pubkauth=c.setting.enable_pubkauth;h.enable_pwdauth=!c.setting.disable_pwdauth;f.post("/operation/ssh",h,function(i){if(i.code==0){c.getsettings()}})};c.gensshkey=function(){if(c.setting.pubkey||c.setting.prvkey){c.confirm_title="重新生成公钥/私钥对";c.confirm_body="公钥/私钥已存在，是否覆盖原文件？";$("#confirm").modal();c.confirm=c.dogenkey;return}c.dogenkey()};c.dogenkey=function(){b.call(c,d,"/backend/ssh_genkey","/backend/ssh_genkey",{},{success:function(h){c.getsettings()}})};c.chpasswd=function(){$("#chpasswd").modal()};c.dochpasswd=function(){if(c.newpassword!=c.newpasswordc){e.setError("新密码和确认密码不一致！");return}b.call(c,d,"/backend/ssh_chpasswd","/backend/ssh_chpasswd",{path:c.setting.prvkey,oldpassword:c.oldpassword,newpassword:c.newpassword},{success:function(h){c.oldpassword=c.newpassword=c.newpasswordc=""}})}}];var ServiceIPTablesCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.iptables";e.init(c,"IPTables");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.iptables",function(f){var g=f["service.iptables"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];var ServiceCronCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.cron";e.init(c,"Cron");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.crond",function(f){var g=f["service.crond"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];var ServiceNTPCtrl=["$scope","$routeParams","Module","Request",function(b,a,e,d){var c="service.ntp";e.init(c,"NTP");e.initSection("base");b.scope=b;b.info=null;b.loaded=false;b.installed=false;b.waiting=true;b.checking=false;b.checkInstalled=function(){b.checking=true;d.get("/query/service.ntpd",function(f){var g=f["service.ntpd"];if(g){b.installed=true;b.autostart=g.autostart;b.status=g.status;if(b.checkVersion){b.checkVersion()}}else{b.installed=false}b.loaded=true;b.waiting=false;b.checking=false})}}];