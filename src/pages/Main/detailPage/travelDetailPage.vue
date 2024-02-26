<template>
<div class="daily_detail">
  <div v-html="html"></div>
</div>
</template>

<script lang='ts' setup>
import { ref,onBeforeMount } from "vue";
import {useRoute} from "vue-router"
import {getArticleHtml} from"@/http/api/login"
import Prism from "prismjs"//导入代码高亮插件的core（里面提供了其他官方插件及代码高亮样式主题，你只需要引入即可）
import "prismjs/themes/prism-tomorrow.css"//引入代码高亮主题（这个去node_modules的安装prismjs中找到想使用的主题即可）
var html = ref('')
onBeforeMount(()=>{
    const route = useRoute();  
    getArticleHtml({articleId:route.query.articleId}).then(res=>{
        console.log(res);
        html.value=(res.data as {articleHtml:string}).articleHtml
        setTimeout(Prism.highlightAll,100)
    })
})
</script>

<style lang="less" scoped>
.daily_detail{
    height: 100%;
    width: 100%;
}
</style>