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

### 获取lang文件

```
[GET] mc-item.nilbridge.site/{version}/{id}/texts/{language}.json
```

`{language}`需要替换成语言名称