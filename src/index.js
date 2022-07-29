const axios = require("axios").default;
const https = require('https');
const fs = require('fs');
var cp = require("child_process");
const path = require("path");

function loadJson(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        return null;
    }
}

if(fs.existsSync('lattest.json')){
    fs.rmSync('latest.json');
}
// cp.execSync('curl https://bedrock.dev/_next/data/6P4hX70_3vHNSlt_WlpsI/zh/packs.json --output latest.json');

let options = {
    url: 'https://bedrock.dev/_next/data/6P4hX70_3vHNSlt_WlpsI/zh/packs.json',
    method: 'GET',
    headers: {
        'host': 'bedrock.dev',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/91.0.4472.114',
        'Content-Type': 'application/json'
    },
    rejectUnauthorized: false
};

const ITEMTEXTUES_PATH = '.\\resources\\textures\\item_texture.json'

function parsePack() {
    let TEXTURE = loadJson(ITEMTEXTUES_PATH);
    fs.writeFileSync('./web/textures.json',JSON.stringify(TEXTURE.texture_data,null,4));
}

const webdata = loadJson("latest.json");
let versions = Object.keys(webdata.pageProps.versions);
console.log(versions[versions.length - 7]);
cp.execFileSync('download.sh', [versions[versions.length - 7]]);
parsePack();