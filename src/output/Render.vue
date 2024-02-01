<template>
  <Suspense @resolve="finish">
    <template #default>
      <previewComp ref="asyncCom"></previewComp>
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, shallowRef, ref,  nextTick } from 'vue'
import './report.js'
import * as Vue from 'vue'
import * as  ElementPlus from 'element-plus'
import './less.js'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as icons from '@element-plus/icons-vue'
// import * as type from 'ant-design-vue/es/form'
import dayjs from 'dayjs'
import dayLocale from 'dayjs/locale/zh-cn'

const asyncCom = ref()
const previewComp = shallowRef()
const props = defineProps({
  code: String,
})

const emits = defineEmits(['loadFinish'])

const init = () => {
  try {
    const options = {
      moduleCache: {
        vue: Vue,
        dayjs: dayjs,
        'element-plus': ElementPlus,
        'element-plus/dist/locale/zh-cn.mjs': zhCn,
        'dayjs/locale/zh-cn': dayLocale,
        //'ant-design-vue/es/form': type,
        '@element-plus/icons-vue': icons,
        less: window.less,
      },
      async getFile() {
        return props.code
      },
      addStyle(textContent: any) {
        let myStyle = document.getElementById('firstStyle')
        if (myStyle) {
          myStyle.textContent = textContent
        } else {
          const style = Object.assign(document.createElement('style'), {
            textContent,
          })
          style.id = 'firstStyle'
          const ref = document.head.getElementsByTagName('style')[0] || null

          document.head.insertBefore(style, ref)
        }
      },
    }
    const { loadModule } = window['vue3-sfc-loader']
    const comp = defineAsyncComponent(() =>
      loadModule('myComponent.vue', options)
    )

    previewComp.value = comp
  } catch (err) {
    console.error(err)
  }
}
init()
const finish = () => {
  nextTick(() => {
    // 组件加载完成
    emits('loadFinish')
  })
}
const setData = (obj: any) => {
  asyncCom.value.formData = Object.assign(asyncCom.value.formData, obj)
}
const getData = () => {
  return JSON.stringify(asyncCom.value.formData)
}
const validate = () => {
  return asyncCom.value.submitForm()
}
defineExpose({
  getData,
  setData,
  validate,
})
</script>
