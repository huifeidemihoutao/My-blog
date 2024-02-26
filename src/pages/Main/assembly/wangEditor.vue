<template>
  <div style="border: 1px solid #ccc">
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-select
        v-model="articleType"
        class="m-2"
        placeholder="Select"
        style="width: 100%"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        style="margin-top: 10px"
        v-model="title"
        placeholder="请输入文章标题"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelHancle">取消</el-button>
          <el-button type="primary" @click="sureHancle">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 600px; overflow-y: hidden"
      v-model="articleHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
    <div class="releaseArticle" @click="releaseArticle">发表文章</div>
  </div>
</template>

<script lang='ts' setup>


import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { fa } from "element-plus/lib/locale";
import { publishArticle } from "@/http/api/login";
import { IEditorConfig } from '@wangeditor/editor'
const editorRef = shallowRef();


// 内容 HTML
const articleHtml = ref("<p>hello</p>");
var dialogVisible = ref(false);
var articleType = ref("");
var title = ref("");
const toolbarConfig = {};
const editorConfig :any = { placeholder: "请输入内容...",MENU_CONF: {} };
editorConfig.MENU_CONF['uploadImage'] = {
    server: import.meta.env.VITE_BASE_URL as string+'/uploadEditorImg',
    fieldName: 'custom-field-name',
}
const options = [
  { label: "旅行",value:'travel' },
  { label: "日常",value:'daily' },
  { label: "vue",value:'vue' },
  { label: "有趣的插件",value:'interestingPlug' },
  { label: "go",value:'go' },
  { label: "踩坑日记",value:'mistakeRecord' },
];

const releaseArticle = () => {
  dialogVisible.value = true;
};
const cancelHancle = () => {
  dialogVisible.value = false;
  let form = {
    articleType: articleType.value,
    articleHtml: articleHtml.value,
  };
  articleType.value = "";
  title.value = "";
};
const sureHancle = () => {
  dialogVisible.value = false;
  let form = {
    title: title.value,
    articleType: articleType.value,
    articleHtml: articleHtml.value,
  };
  publishArticle(form).then((res) => {});
  articleType.value = "";
  title.value = "";
};
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style lang="less" scoped>
.releaseArticle {
  padding: 5px 10px;
  border: solid 1px black;
  position: absolute;
  right: 20px;
  cursor: pointer;
}
</style>