<script setup lang="ts">
import { FolderChecked } from "@element-plus/icons-vue";

import Preview from "./Preview.vue";
import { ref } from "vue";

const previewRef = ref<InstanceType<typeof Preview>>();
const getData = () => {
  return previewRef.value?.getData();
};
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};
const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
defineExpose({
  getData,
});
</script>

<template>
  <div class="output-container">
    <el-icon class="opt" @click="showModal"><FolderChecked /></el-icon>
    <Preview ref="previewRef" />
    <el-dialog v-model="open" title="表单预览" width="1000px" >
      <Preview ref="previewRef" />
    </el-dialog>
  </div>
</template>

<style scoped>
:deep(.el-dialog__body){
  padding-top: 0!important
}

.opt {
  position: absolute;
  right: 14px;
  top: 2px;
  font-size: 18px;
  cursor: pointer;
}
.output-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
