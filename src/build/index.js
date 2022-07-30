const readline = require('readline');
const fs = require('fs');
const { execSync } = require('child_process');
const ITEMTEXTUES_PATH = '.\\resources\\textures\\item_texture.json'

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
    let TEXTURE = loadJson(ITEMTEXTUES_PATH);
    
    fs.writeFileSync('./web/' + version + '/textures.json', JSON.stringify(TEXTURE.texture_data, null, 4));
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
                    //console.log(sp[0],sp[1]);
                    if (sp[0] && sp[1]) {
                        //console.log('set',sp[0],'>>',sp[1]);
                        tmp_data[sp[0]] = sp[1];
                    }
                }
            });
            rl.on('close', () => {
                console.log('write', v);
                //console.log(tmp_data);
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
    getText(ver);
    getTextues(ver);
    execSync('xcopy /e /i /Q /y "./resources/textures" "./web/'+ver+'/textures"');
}