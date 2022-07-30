const axios = require("axios").default;
const https = require('https');
const fs = require('fs');
var cp = require("child_process");
const path = require("path");
const latest = require("./latest");
const build = require("../build");
const { randomUUID } = require("crypto");

function loadJson(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        return null;
    }
}

function transformDate(format) {
    format = format ? format : 'YYYY-MM-DD hh:mm:ss';
    let mode = '';
    var d = new Date(); //创建一个Date对象
    var localTime = d.getTime();
    var localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
    var gmt = localTime + localOffset; //GMT时间
    var offset = 8; //以夏威夷时间为例，东10区
    var hawaii = gmt + (3600000 * offset);
    var date = new Date(hawaii);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    mode = format.replace(/YYYY/, formatNumber(year)).replace(/MM/, formatNumber(month)).replace(/DD/, formatNumber(day));
    mode = mode.replace(/hh/, formatNumber(hour)).replace(/mm/, formatNumber(minute)).replace(/ss/, formatNumber(second));

    function formatNumber(n) {
        const str = n.toString();
        return str[1] ? str : '0' + str;
    }
    return mode;
}

/*
if(fs.existsSync('lattest.json')){
    fs.rmSync('latest.json');
}
cp.execSync('curl https://bedrock.dev/_next/data/6P4hX70_3vHNSlt_WlpsI/zh/packs.json --output latest.json');
*/

const webdata = loadJson("latest.json");
let versions = webdata.pageProps.versions;
let latest_v = latest(versions);
let path_id = randomUUID();
console.log('latest >>', latest_v);

cp.execFileSync('.\\src\\download.bat', [latest_v]);

fs.writeFileSync("./web/build.json", JSON.stringify({ build_time: transformDate() , version : latest_v , id:path_id}));

console.log('download donw ,start build');

build(latest_v+'/'+path_id);

