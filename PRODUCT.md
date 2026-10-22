# 晋见山乡 · 山西乡村记忆计划

<!-- product schema 1 -->

## Platform

Static responsive website prototype.

## Users

山西乡村居民与返乡青年、对地方文化感兴趣的公众、在地文化整理者和竞赛评审。

## Product purpose

以真实地图为入口，把乡村故事、口述音频、文化空间、路线策划和村民共创连接起来，为山西乡村文化数字化保护与传播提供可体验、可继续采录的原型。

## Product structure

Eleven separate hash-routed views: home, provincial map, story archive and detail, generated-image atlas, timeline, voice archive, field routes, interactive 3D scene, contribution studio, saved collection, and fieldwork guide.

## Interaction

地图以 OpenStreetMap 底图覆盖山西全省，提供 11 个地级市中心定位；故事区包含 50 条主题线索，支持搜索、分类、分页、长篇详情、语音合成和收藏；图像图鉴展示 60 个原创生成场景；路线可跳转真实地图；3D 模型可旋转、缩放并点击节点；共创支持文字草稿、照片预览、本机录音试听和草稿导出。

## Operating context

No build step or package installation. Opening the static files locally displays the product. Network access is needed to load OpenStreetMap and optional web fonts. WebGL and browser speech synthesis depend on device support.

## Content truth and limits

11 个地级市名称与城市级坐标用于地图导航。村庄级点位、人物、事件、年代和故事尚未实地核实；50 条叙事文本为展陈情境样稿。路线是采录提案；3D 场景表达山西乡村空间意象，不是具体村庄的实测复刻。共创内容保存在当前浏览器，不会上传。

## Principles

- City-level map pins must not be presented as surveyed village locations.
- Oral history requires informed consent, attribution preferences and a correction / withdrawal path.
- Keep first-hand accounts, third-party recollection, official references and curatorial text distinguishable.
- Let local people correct place names, memories and spatial models before public release.
