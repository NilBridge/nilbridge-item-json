const axios = require("axios").default;
const https = require('https');
const fs = require('fs');
var cp = require("child_process");
const path = require("path");
const latest = require("./latest");
const build = require("../build");

function loadJson(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        return null;
    }
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
console.log('latest >>',latest_v);

cp.execFileSync('.\\src\\download.bat', [latest_v]);

console.log('download donw ,start build');

build(latest_v);