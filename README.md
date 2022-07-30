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
    "amethyst_shard": {
        "textures": "textures/items/amethyst_shard"
    },
    "apple": {
        "textures": "textures/items/apple"
    },
    "apple_golden": {
        "textures": "textures/items/apple_golden"
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

`{language}`需要替换成语言名称



### 使用jsdelivr加速

