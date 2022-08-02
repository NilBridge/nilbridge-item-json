const readline = require('readline');
const fs = require('fs');
const { execSync } = require('child_process');
const ITEMTEXTURES_PATH = '.\\resources\\textures\\item_texture.json'
const BLOCKTEXTURES_PATH = '.\\resources\\textures\\terrain_texture.json'

function loadJson(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        return null;
    }
}

function mkDir(path) {
    fs.mkdirSync('./web/' + path, { recursive: true });
}

function getTextues(version) {
    let TEXTURE_ITEMS = loadJson(ITEMTEXTURES_PATH);
    let TEXTURE_TERRAIN = loadJson(BLOCKTEXTURES_PATH)
    fs.writeFileSync('./web/' + version + '/textures_terrain.json', JSON.stringify(TEXTURE_TERRAIN.texture_data, null, 4));
    fs.writeFileSync('./web/' + version + '/textures_item.json', JSON.stringify(TEXTURE_ITEMS.texture_data, null, 4));
}


function getText(version) {
    mkDir(version + '\\texts');
    fs.copyFileSync('./resources/texts/languages.json',`./web/${version}/texts/languages.json`);
    fs.readdirSync('./resources/texts/').forEach(v => {
        if (v.endsWith('.lang')) {
            let language = v.split('.')[0];
            console.log('reading', `./resources/texts/${v}`);
            var rl = readline.createInterface({
                input: fs.createReadStream(`./resources/texts/${v}`, { encoding: "utf8" })
            });
            let tmp_data = {};
            rl.on('line', (input) => {
                if (input.startsWith("#") == false) {
                    input = input.replace("#", '').trim();
                    let sp = input.split("=");
                    if (sp[0] && sp[1]) {
                        tmp_data[sp[0]] = sp[1];
                    }
                }
            });
            rl.on('close', () => {
                console.log('write', v);
                fs.writeFileSync(`./web/${version}/texts/${language}.json`, JSON.stringify(tmp_data, null, 4), (err) => {
                    if(err){
                        console.log('error when write texts/'+language+'.json');
                        console.log(err);
                    }else{
                        console.log(`write texts/${language}.json done`)
                    }
                });
            });
        }
    });
}

module.exports = (ver) => {
    console.log('start build');
    // 获取lang文件
    getText(ver);
    // 获取textures文件
    getTextues(ver);
    // 把原版textures文件夹与云端同步
    execSync('xcopy /e /i /Q /y "./resources/textures" "./web/'+ver+'/textures"');
}