<template>
  <div class="technology_box">
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="vue"  name="vue">
      <div class="technology_Item" v-for="item in vueList" :key="item" @click="jumpDetail(item)">
      <div class="technology_Item_title">{{ item.title }}</div>
      <div class="technology_Item_text">{{ item.content }}</div>
      <span class="technology_Item_star"
        >{{item.likeNumber}}<img
          v-if="item.isLike"
          @click.stop="delArticleLikes(item)"
          src="../../../assets/svg/thumbsFill.svg"
          alt="SVG Image" />
        <img
          v-else
          @click.stop="articleLikes(item)"
          src="../../../assets/svg/thumbs.svg"
          alt="SVG Image"
      />
         </span>
    </div>
    </el-tab-pane>
    <el-tab-pane label="有趣的插件" name="有趣的插件">
      <div class="technology_Item" v-for="item in interestingPlugList" @click="jumpDetail(item)" :key="item">
      <div class="technology_Item_title">{{ item.title }}</div>
      <div class="technology_Item_text">{{ item.content }}</div>
      <span class="technology_Item_star"
        >{{item.likeNumber}}<img
          v-if="item.isLike"
          @click.stop="delArticleLikes(item)"
          src="../../../assets/svg/thumbsFill.svg"
          alt="SVG Image" />
        <img
          v-else
          @click.stop="articleLikes(item)"
          src="../../../assets/svg/thumbs.svg"
          alt="SVG Image"
      /></span>
    </div>
    </el-tab-pane>
    <el-tab-pane label="go" name="go">
        <div class="technology_Item" v-for="item in goList" @click="jumpDetail(item)" :key="item">
      <div class="technology_Item_title">{{ item.title }}</div>
      <div class="technology_Item_text">{{ item.content }}</div>
      <span class="technology_Item_star"
        >{{item.likeNumber}}<img
          v-if="item.isLike"
          @click.stop="delArticleLikes(item)"
          src="../../../assets/svg/thumbsFill.svg"
          alt="SVG Image" />
        <img
          v-else
          @click.stop="articleLikes(item)"
          src="../../../assets/svg/thumbs.svg"
          alt="SVG Image"
      /></span>
    </div>
    </el-tab-pane>
    <el-tab-pane label="踩坑日记"  name="踩坑日记">
       <div class="technology_Item" v-for="item in mistakeRecordList" @click="jumpDetail(item)" :key="item">
      <div class="technology_Item_title">{{ item.title }}</div>
      <div class="technology_Item_text">{{ item.content }}</div>
      <span class="technology_Item_star"
        >{{item.likeNumber}}<img
          v-if="item.isLike"
          @click.stop="delArticleLikes(item)"
          src="../../../assets/svg/thumbsFill.svg"
          alt="SVG Image" />
        <img
          v-else
          @click.stop="articleLikes(item)"
          src="../../../assets/svg/thumbs.svg"
          alt="SVG Image"
      /></span>
    </div>
    </el-tab-pane>
  </el-tabs>
    
  </div>
</template>

<script lang='ts' setup>
import { ref } from "vue";
import router from "@/router/router";
import { addArticleLikes, deleteArticleLikes } from "@/http/api/login";
import { useStore } from "@/store/store";
const store = useStore(); //获取全局变量
defineProps<{vueList:object,interestingPlugList:object,goList:object,mistakeRecordList:object}>()
const articleLikes = (item: any) => {
  console.log(item);
  let params = {
    UserName: store.userInfo.userName,
    ArticleId: item.articleId,
    UserId: store.userInfo.userId,
  };
  addArticleLikes(params).then((res) => {
    console.log(res);
    item.likeNumber += 1;
    item.isLike = true;
  });
};
const delArticleLikes = (item: any) => {
  let params = {
    articleId: item.articleId,
  };
  deleteArticleLikes(params).then((res) => {
    item.likeNumber -= 1;
    item.isLike = false;
  });
};
var activeName=ref('vue')
const jumpDetail=(item:any)=>{
 console.log(item);
     router.push({path:"technologyDetailPage",query:{articleId:item.articleId}})
}
</script>

<style lang="less" scoped>
 .technology_box::v-deep .el-tabs__header{
   padding-left: 10px;
  }
.technology_box {
  min-height: 60vh;
  width: 100%;
  position: relative;
  .demo-tabs .el-tabs__content {
  padding: 32px;
  color: #000000;
  font-size: 32px;
  font-weight: 600;
}
  .technology_Item {
    height: 15vh;
    width: 100%;
    border-bottom: solid 1px black;
    position: relative;
    cursor: pointer;
    .technology_Item_title {
      font-size: 20px;
      margin-left: 10px;
      color: #a38a88;
    }
    .technology_Item_text {
    }
    .technology_Item_star {
      position: absolute;
      right: 5px;
      bottom: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
}
</style>