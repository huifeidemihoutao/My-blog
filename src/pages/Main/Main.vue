<template>
  <div class="main" @scroll="windowScr">
    <div
      class="backBox"
      :style="scrollSty ? 'backdrop-filter: blur(7px);' : ''"
    >
      <div class="title">春风若有怜花意 可否许我再少年</div>
      <header class="header">
        <el-dropdown>
          <el-avatar :icon="UserFilled" style="margin-right: 10px">
            <arrow-down />
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="login"
                v-if="store.userInfo.userName == '游客'"
                >登录\注册</el-dropdown-item
              >
              <el-dropdown-item @click="outLogin" v-else
                >退出登录</el-dropdown-item
              >
              <el-dropdown-item
                @click="jumpWangEdit"
                v-if="store.userInfo.level == 'admin'"
                >发布</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="user_name">{{ store.userInfo.userName }}</span>
      </header>
      <div class="body">
        <div class="QR_code_box">
          <transition name="wechat">
            <img
              src="../../assets/weiChatImg.jpg"
              v-show="QRShow == 'wechat'"
              class="wechat_QR"
            />
          </transition>
          <transition name="QQ">
            <img
              src="../../assets/QQQR.jpg"
              v-show="QRShow == 'QQ'"
              class="QQ_QR"
            />
          </transition>
        </div>
        <div class="contact_bar">
          <span @click="goGithub">github</span
          ><span @mouseout="showWechat('out')" @mouseover="showWechat('in')"
            >微信</span
          ><span @mouseout="showQQ('out')" @mouseover="showQQ('in')">QQ</span>
        </div>
      </div>
      <div class="bodyTwo">
        <div class="left_box">
          <div class="navigation_bar">
            <div
              v-for="(item, index) in navigationBar"
              :class="navIndex == index ? 'checkin' : ''"
              :key="item.label"
              @click="checkNavigation(index)"
            >
              {{ item.label }}
            </div>
          </div>
          <div class="user_bar">
            <div class="user_head">
              <img src="../../assets/mihoutao.jpg" />
            </div>
            <div class="website_info">
              <div>总访问量:{{ visitorObj.value.visitorAll }}</div>
              <div>今日访问量:{{ visitorObj.value.visitorDay }}</div>
              <div>留言数:{{ store.leaveMessageNumber }}</div>
            </div>
          </div>
        </div>

        <div class="content">
          <travel-box
            v-bind:travelBoxList="travelBoxList"
            v-show="navIndex == 0"
          ></travel-box>
          <daily-box
            v-bind:dailyBoxList="dailyBoxList"
            v-show="navIndex == 1"
          ></daily-box>
          <friendly-box
            v-bind:friendlyBoxList="friendlyBoxList"
            v-show="navIndex == 2"
          ></friendly-box>
          <technology-box
            v-bind:vueList="vueList"
            v-bind:goList="goList"
            v-bind:interestingPlugList="interestingPlugList"
            v-bind:mistakeRecordList="mistakeRecordList"
            v-show="navIndex == 3"
          ></technology-box>
          <leavemessage-box
            v-bind:leavemessageBoxList="leavemessageBoxList"
            v-show="navIndex == 4"
          ></leavemessage-box>
        </div>
      </div>
      <div class="web_info">
            <span >浙ICP备2024064096</span><a style="text-decoration: none;color:white" href="https://icp.gov.moe/?keyword=20244234" target="_blank">萌ICP备20244234号</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserFilled } from "@element-plus/icons-vue";
import { useStore } from "@/store/store";
import travelBox from "./assembly/travelBox.vue";
import dailyBox from "./assembly/dailyBox.vue";
import friendlyBox from "./assembly/friendlyBox.vue";
import leavemessageBox from "./assembly/leavemessageBox.vue";
import technologyBox from "./assembly/technologyBox.vue";
import { rejects } from "assert";
import { el } from "node_modules/element-plus/es/locale";
import { onMounted, ref, reactive } from "vue";
import router from "@/router/router";
import { getArticle, addVisitor, getVisitor } from "@/http/api/login";

//滑动背景模糊的样式开关
var scrollSty = ref(false);
//导航栏的字段
var navigationBar = [
  { label: "旅行" },
  { label: "日常" },
  { label: "友链" },
  { label: "技术" },
  { label: "留言" },
];
var QRShow = ref(""); //当前二维码展示的图片
var navIndex = ref(0); //当前选中的是哪一个按钮
var dailyBoxList = ref<Array<Object>>([]); //日常模块的list
var friendlyBoxList = ref<Array<Object>>([]); //友链模块的list
var leavemessageBoxList = ref([]); //留言模块的list
var vueList = ref<Array<Object>>([]); //技术模块vue的list
var interestingPlugList = ref<Array<Object>>([]); //技术模块插件的list
var goList = ref<Array<Object>>([]); //技术模块go的list
var mistakeRecordList = ref<Array<Object>>([]); //技术模块踩坑日记的list
var travelBoxList = ref<Array<Object>>([]); //旅行模块的list
var visitorObj = reactive({ value: { visitorDay: 0, visitorAll: 0 } });
const store = useStore(); //获取全局变量

const jumpWangEdit = () => {
  //跳转到富文本编辑器
  router.push({ path: "wangEditor" });
};
const checkNavigation = (index: number) => {
  navIndex.value = index;
  console.log(navIndex);
};
const goGithub = () => {
  window.open("https://github.com/huifeidemihoutao");
};
onMounted(() => {
  getArticleFunc();
  visitor();
});
//获取帖子的列表
var getArticleFunc = () => {
  dailyBoxList.value = []; //日常模块的list
  vueList.value = []; //技术模块的list
  goList.value = [];
  interestingPlugList.value = []; //技术模块插件的list
  mistakeRecordList.value = []; //技术模块踩坑日记的list
  travelBoxList.value = []; //旅行模块的list

  getArticle().then((res) => {
    console.log(res);
    (res.data as Array<any>).forEach((item) => {
      switch (item.articleType) {
        case "travel":
          travelBoxList.value.push(item);
          break;
        case "daily":
          dailyBoxList.value.push(item);
          break;
        case "vue":
          vueList.value.push(item);
          break;
        case "go":
          goList.value.push(item);
          break;
        case "interestingPlug":
          interestingPlugList.value.push(item);
          break;
        case "mistakeRecord":
          mistakeRecordList.value.push(item);
          break;
      }
    });
  });
};
//访客信息
var visitor = () => {
  addVisitor().then((res) => {
    getVisitor().then((res) => {
      visitorObj.value.visitorAll = (res.data as any).visitorAll;
      visitorObj.value.visitorDay = (res.data as any).visitorDay;
    });
  });
};
//登录按钮跳转
var login = () => {
  console.log(router.push({ name: "Login", query: { type: "登录" } }));
};
//退出登录
var outLogin = () => {
  store.userInfo = { userName: "游客", userId: "", level: "user", token: "" };
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
};
//展示微信名片的函数
const showWechat = (value: string) => {
  if (value == "in") {
    QRShow.value = "wechat";
  } else {
    QRShow.value = "";
  }
};
//展示微信名片的函数
const showQQ = (value: string) => {
  if (value == "in") {
    QRShow.value = "QQ";
  } else {
    QRShow.value = "";
  }
};

const windowScr = (e: any) => {
  if (e.srcElement.scrollTop > 200) {
    scrollSty.value = true;
  } else {
    scrollSty.value = false;
  }
};
</script>

<style lang='less' scoped>
.main {
  height: 100vh;
  width: 100%;
  position: relative;
  background: url("../../assets/sun.png") center center no-repeat fixed;
  background-size: 100% 100%;
  overflow: auto;
  .backBox {
    position: relative;
    width: 100%;
    .title {
      position: absolute;
      width: 100%;
      top: 43vh;
      height: 5vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ac1d1d;
      font-size: 30px;
      font-weight: 700;
      font-family: fangsong;
      animation-name: fontAppear;
      animation-duration: 4s;
    }
    .header {
      position: sticky;
      top: 0px;
      height: 8vh;
      width: 100%;
      background: rgba(110, 42, 42, 0.4);
      backdrop-filter: blur(8px);
      flex-direction: row-reverse;
      display: flex;
      align-items: center;
      .user_name {
        color: white;
        margin-right: 5px;
      }
    }
    .body {
      height: 92vh;
      width: 100%;
      .contact_bar {
        display: flex;
        width: 15%;
        height: 6vh;
        background: rgba(255, 255, 255, 0.1);
        position: absolute;
        top: 80vh;
        left: 42.5%;
        align-items: center;
        justify-content: space-around;
        backdrop-filter: blur(20px);
        box-shadow: 0px 10px 5px;
        border-radius: 10px;
        span {
          cursor: pointer;
        }
      }
      .QR_code_box {
        width: 20%;
        height: 25vh;
        position: absolute;
        top: 55vh;
        left: 40%;
        display: flex;
        justify-content: space-around;
        overflow: hidden;
        .wechat_QR {
        }
        .QQ_QR {
        }
      }
    }
    .bodyTwo {
      min-height: 70vh;
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      .left_box {
        position: sticky;
        top: 10vh;
        width: 15%;
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .navigation_bar {
          border-radius: 20px;
          height: 50vh;
          background: rgb(255 255 255 / 70%);
          overflow: hidden;
          div {
            height: 20%;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          div:hover {
            background: rgb(132 228 156 / 32%);
          }
        }
        .user_bar {
          border-radius: 20px;
          height: 36vh;
          width: 100%;
          background: rgb(255 255 255 / 70%);
          overflow: hidden;
          .user_head {
            height: 70%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: 15s infinite linear rotate;
            img {
              height: 75%;
              border-radius: 50%;
              transition: all 0.3s;
            }
            img:hover {
              box-shadow: 0px 10px 10px rgb(177, 137, 137);
              margin-top: -10px;
            }
          }
          .website_info {
            height: 30%;
            width: 100%;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: repeat(
              2,
              50%
            ); //这句话等于 50% 50%。重复2个50%的意思
          }
        }
        .checkin {
          background: rgb(132 228 156 / 32%);
        }
      }
      .content {
        border-radius: 10px;
        backdrop-filter: blur(20px);
        box-shadow: 0px -5px 10px 0px;
        width: 70%;
        min-height: 90vh;
        background: rgb(230 230 230 / 80%);
      }
    }
    .web_info{
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      color: white;
    }
  }
}
@keyframes fontAppear {
  0% {
    top: 37vh;
    opacity: 0;
  }
  100% {
    top: 43vh;
    opacity: 1;
  }
}
.wechat-enter-active {
  animation: wechatIn 0.5s; /* 入场动画 */
}
.wechat-leave-active {
  animation: wechatOut 0.3s; /* 退场动画 */
}
@keyframes wechatIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes wechatOut {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
}
.QQ-enter-active {
  animation: QQIn 0.5s; /* 入场动画 */
}
.QQ-leave-active {
  animation: QQOut 0.3s; /* 退场动画 */
}
@keyframes QQIn {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes QQOut {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #013b8e;
}

/* 滚动槽 */

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(255, 255, 255);

  border-radius: 10px;

  background: #021b49;
}

/* 滚动条滑块 */

::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background: #d6c879;

  -webkit-box-shadow: inset 0 0 6px rgba(10, 150, 96, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: #25b64c;
}

/* 边角 即两个滚动条的交汇处 */

::-webkit-scrollbar-corner {
  background: #021b49;

  border-radius: 10px;
}
</style>
