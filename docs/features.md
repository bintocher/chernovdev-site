---
id: features
sidebar_position: 999999
unlisted: true
---

# 🚑 Примеры для документации

## Таблицы

|описание|ссылка|
|---|---|
|пример|https://docusaurus.io/docs/markdown-features/tables|

## Вкладки (таб)

https://docusaurus.io/docs/markdown-features/tabs


### Использование

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>

### Синхронное переключение

<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">Use Ctrl + C to copy.</TabItem>
  <TabItem value="mac" label="macOS">Use Command + C to copy.</TabItem>
</Tabs>

<Tabs groupId="operating-systems">
  <TabItem value="win" label="Windows">Use Ctrl + V to paste.</TabItem>
  <TabItem value="mac" label="macOS">Use Command + V to paste.</TabItem>
</Tabs>

## Код

https://docusaurus.io/docs/markdown-features/code-blocks

```jsx {1,4-6,11} title='filename.qvs' showLineNumbers
import React from 'react';

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```

<pre>
  <b>Input: </b>1 2 3 4{'\n'}
  <b>Output: </b>"366300745"{'\n'}
</pre>


## Заметки

:::note[Примечание]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip[Подсказка]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info[Информация]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::warning[Предупреждение]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger[Опасно]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::



:::note[Your Title **with** some _Markdown_ `syntax`!]

Some **content** with some _Markdown_ `syntax`.

:::

## Изображения и файлы

https://docusaurus.io/docs/markdown-features/assets


![Example banner](/img/docusaurus.png)
[Download this docx using Markdown](../static/img/docusaurus.png)
