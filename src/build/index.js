const readline = require('readline');
const fs = require('fs');
const ITEMTEXTUES_PATH = '.\\resources\\textures\\item_texture.json'

function loadJson(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        return null;
    }
}

function mkDir(path){
    fs.mkdirSync('./web/'+path,{recursive:true});
}

function getTextues(version){
    let TEXTURE = loadJson(ITEMTEXTUES_PATH);
    fs.writeFileSync('./web/'+version+'/textures.json',JSON.stringify(TEXTURE.texture_data,null,4));
}


function getText(version){
    mkDir(version+'\\texts');
    fs.readdirSync('./resources/texts/').forEach(v=>{
        if(v.endsWith('.lang')==false)return;
        var rl = readline.createInterface({
            input : fs.createReadStream(`./resources/texts/${v}`,{encoding:"utf8"})
        });
        let data = {};
        rl.on('line',(input)=>{
            if(input.startsWith("#")==false){
                input = input.replace("#",'').trim();
                let sp = input.split("=");
                //console.log(sp[0],sp[1]);
                if(sp[0] && sp[1]){
                    data[sp[0]] = sp[1];
                }
            }
        });
        console.log('write',v);
        fs.writeFile(`./web/${version}/texts/${v.split('.')[0]}.json`,JSON.stringify(data,null,4),(err)=>{
            console.log(err);
        });
    });
}

module.exports = (ver)=>{
    getText(ver);
    getTextues(ver);
}