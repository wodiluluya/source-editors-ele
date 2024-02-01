## 表单源码编辑器

### 支持 ant-design-vue v4 less 全局汉化 内网环境等 必须全局引入 ant-design-vue

- main 文件中

```js
import Antd from 'element-plus'
import 'element-plus/dist/index.css'
app.use(Antd)
```

- 组件中使用编辑器

```vue
<script setup>
import { Cant, CantStore } from 'source-editors-ep'
import Monaco from 'source-editors-ep/monaco-editor'
const store = = new CantStore({})
// store可获取实例信息
// cant.value.getEditor() 获取编辑器  getData
// cant.value.state
</script>

<template>
  <Cant :editor="Monaco" :store="store" ref="cant" />
</template>
```

- 组件中渲染表单

```vue
<template>
<Preview ref="pdom" :code="code"></Preview>
</template>
<script setup>
import {Preview} from "source-editors-ep";

const test = async() => {
pdom.value?.getData()
const data = await pdom.value?.validate()
console.log(data)
pdom.value?.setData()
}
</script>

```
