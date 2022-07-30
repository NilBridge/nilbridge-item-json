# Nilbridge-item-json

NilBridge提供的开放MC查询api

## 使用方法

请求`mc-item.nilbridge.site/build.json`

``` json
{
  "build_time": "2022-07-30 10:29:07",  // 最新的构建时间，时区为东八区
  "version": "1.19.20.24",   // 最新的版本号
  "id": "0f1fd89f-47e2-4ce9-a768-d7ec0f78086a"  // 路径id，使用不同的id防止缓存
}
```

## 现有api

### 从物品名称获取对应贴图

```
[GET] mc-item.nilbridge.site/{version}/{id}/textures.json 
```
内容来自于官方包的textures/item_textures.json

响应格式

*注：因为篇幅限制只展示部分*

``` json
{
    "acacia_door": {
        "textures": "textures/items/door_acacia"
    },
    "armor_stand": {
        "textures": "textures/items/armor_stand"
    },
    "arrow": {
        "textures": "textures/items/arrow"
    },
    "axe": {
        "textures": [
            "textures/items/wood_axe",
            "textures/items/stone_axe",
            "textures/items/iron_axe",
            "textures/items/gold_axe",
            "textures/items/diamond_axe",
            "textures/items/netherite_axe"
        ]
    },
    "banner_pattern": {
        "textures": "textures/items/banner_pattern"
    }
}
```

### 获取所有语言

```
[GET] mc-item.nilbridge.site/{version}/{id}/texts/languages.json
```

响应格式

*注：因为篇幅限制只展示部分*

``` json
[
    "en_US",
	"el_GR",
	"fi_FI",
	"hu_HU",
	"id_ID",
	"nb_NO",
	"pl_PL",
	"sk_SK",
	"sv_SE",
	"tr_TR",
	"uk_UA"
]
```

### 获取lang文件

```
[GET] mc-item.nilbridge.site/{version}/{id}/texts/{language}.json
```

`{language}`需要替换成语言名称，也就是上一个API里面展示的

响应格式

*注：因为篇幅限制只展示部分*

``` json
{
    "tile.warped_roots.warpedRoots.name": "诡异菌根",
    "tile.red_flower.allium.name": "绒球葱",
    "tile.red_flower.blueOrchid.name": "兰花",
    "tile.red_flower.cornflower.name": "矢车菊",
    "tile.red_flower.houstonia.name": "茜草花",
    "tile.red_flower.name": "花",
    "tile.red_flower.lilyOfTheValley.name": "铃兰",
    "tile.red_flower.oxeyeDaisy.name": "滨菊",
    "tile.red_flower.poppy.name": "玫瑰",
    "tile.red_flower.tulipOrange.name": "橙色郁金香",
    "tile.red_flower.tulipPink.name": "粉红色郁金香",
    "tile.red_flower.tulipRed.name": "红色郁金香",
    "tile.red_flower.tulipWhite.name": "白色郁金香",
    "tile.wither_rose.name": "凋零玫瑰",
    "tile.furnace.name": "熔炉",
    "tile.glass.name": "玻璃",
    "tile.golden_rail.name": "动力铁轨",
    "tile.grass.name": "草方块"
}
```

### 使用jsdelivr加速

```
[GET] https://fastly.jsdelivr.net/gh/NilBridge/nilbridge-item-json@gh-pages/{version}/{id}/{你要访问的内容...}
```

使用id缓存就是为了跳过jsdelivr的缓存