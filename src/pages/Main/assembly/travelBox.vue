<template>
  <div class="travel_box">
    <div class="travel_Item" v-for="item in travelBoxList" :key="item" @click="jumpDetail(item)">
      <div class="travel_Item_title">{{ item.title }}</div>
      <div class="travel_Item_text">{{ item.content }}</div>
      <span class="travel_Item_star"
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
  </div>
</template>

<script lang='ts' setup>
import { ref } from "vue";
import router from "@/router/router";
import { addArticleLikes, deleteArticleLikes } from "@/http/api/login";
import { useStore } from "@/store/store";
const store = useStore(); //获取全局变量
defineProps<{travelBoxList:object}>()
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
const jumpDetail=(item:any)=>{
 console.log(item);
     router.push({path:"dailyDetailPage",query:{articleId:item.articleId}})
}
</script>

<style lang="less" scoped>
.travel_box {
  min-height: 60vh;
  width: 100%;
  position: relative;
  .travel_Item {
    height: 15vh;
    width: 100%;
    border-bottom: solid 1px black;
    position: relative;
    cursor: pointer;
    .travel_Item_title {
      font-size: 20px;
      margin-left: 10px;
      color: #a38a88;
    }
    .travel_Item_text {
    }
    .travel_Item_star {
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