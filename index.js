// 需要本脚本执行在能连外网的机器上，如oss
// 需要安装node, 然后npm install
// 需要设置crond，作定时任务
// 需要设置oss到zepplin免密登录（ssh-copyid)
// 需要本机有wget, unzip, rsync命令
// node index.js 同步上一个小时的日志
// node index.js 2016092710 同步指定日期小时的日志
var api = require( 'rongcloud-sdk' );
var child_process = require('child_process');
var URL = require("url");
var path = require("path");
var process = require('process');

// config begin ------------
const LOCAL_DIR = '/Users/sliu/tmp/ronglog';
const REMOTE_DIR = 'freekeer@123.56.230.49:/usr/freekeer/ronglogs';
// config end -------------

const ZIP_DIR = `${LOCAL_DIR}/zipdir`;
const LOG_DIR = `${LOCAL_DIR}/logs`;

var appkey = 'k51hidwq182cb';
var appsecret = 'ipfsMgWf650e1X';

function pad(num) {
	if(num>9) {
		return num + "";
	} else {
		return 0 + "" + num;
	}
}

function formatLastHour() {
	let now = new Date();
	let year = now.getFullYear();
	let month = now.getMonth() + 1;
	let date = now.getDate();
	let hour = now.getHours() - 1;
	return year + pad(month) + pad(date) + pad(hour);
}


let hour = "";
if(process.argv.length > 2) {
  hour = process.argv[process.argv.length - 1];
} else {
  hour = formatLastHour();
}

console.log('-----------------');
console.log('sync rong logs: ', hour);

api.init( appkey, appsecret );
var log = api.message.history(hour, 'json', (err, m) => {
	const url = JSON.parse(m).url;
    console.log("url:", url);
    if(!url) {
    	return;
    }
    var parsed = URL.parse(url);
    var basename = path.basename(parsed.pathname);
    console.log('basename:', basename);
    child_process.exec(`wget ${url};unzip -u ${basename} -d ${LOG_DIR};rsync -avz ${LOG_DIR} ${REMOTE_DIR}`, {cwd: ZIP_DIR}, (err, a)=> {
    	console.log('sync ok!', err, a);
    });    
});