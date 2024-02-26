<template>
  <div class="leavemessage_box">
    <div class="leavemessage">
      <div class="to_leavemessage">
        <el-button

          class="levavemessage_button"
          size="large"
          @click="leavemessageBtnHandle"
          :dark="true"
          >我也要去留言</el-button
        >
      </div>
      <div
        class="leavemessage_Item"
        v-for="item in leavemessageList"
        :key="item"
      >
        <div class="leavemessage_Item_userN">{{ item.userName }}:</div>
        <div class="leavemessage_Item_text">{{ item.msgContent }}</div>
        <div class="date_and_star">
          <div>{{ item.createTime }}</div>
          <span @click="thumbsHandle(item,$event)" style="cursor: pointer"
            >{{ item.likeNumber }}<img v-if="item.isLike" src="../../../assets/svg/thumbsFill.svg" alt="SVG Image"> <img v-else src="../../../assets/svg/thumbs.svg" alt="SVG Image"></span>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="留言板" append-to-body>
      <el-input
        v-model="leaveMsgText"
        type="textarea"
        placeholder="字数请保持在2-60之间"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="msgBtnCancel">取消</el-button>
          <el-button type="primary" @click="msgBtnSure"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "@/store/store";
import { ElMessage } from "element-plus";
import {
  addLeavelMsg,
  getLeaveMsg,
  addUserLikes,
  deleteUserLikes,
} from "@/http/api/login";
import { pa } from "element-plus/es/locale";
defineProps<{leavemessageBoxList:object}>()
interface MsgListArr {
  createTime: string;
  isLike: boolean;
  leaveMsgId: number;
  likeNumber: number;
  msgContent: string;
  userName: string;
}
const store = useStore(); //获取全局变量
var dialogFormVisible = ref(false);
var leaveMsgText = ref("");
var leavemessageList = ref<Array<MsgListArr>>([]);

onMounted(() => {
  getLeaveMsgFunc();
});
const thumbsHandle = (item: MsgListArr,event:Event) => {
  console.log(event);
  if (store.userInfo.userId) {
    if (item.isLike) {
      //点赞和取消点赞
      let params = { leaveMsgId: item.leaveMsgId };
      deleteUserLikes(params).then((res) => {
        console.log(res);
        item.isLike = false;
        item.likeNumber -= 1;
      });
    } else {
      let params = {
        UserName: store.userInfo.userName,
        LeaveMsgId: item.leaveMsgId,
        UserId: store.userInfo.userId,
      };
      console.log(typeof item.leaveMsgId);
      addUserLikes(params)
        .then((res) => {
          item.isLike = true;
          item.likeNumber += 1;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    ElMessage("您还没有登录哦！");
  }
};
const getLeaveMsgFunc = () => {
  //获取留言的函数
  getLeaveMsg().then((res) => {
    console.log(res);
    leavemessageList.value = res.data as Array<MsgListArr>;
    store.leaveMessageNumber= (res.data as Array<MsgListArr>).length;
  });
};
const msgBtnSure = () => {
  //留言的确定按钮触发的函数
  if (leaveMsgText.value.length < 2 || leaveMsgText.value.length > 60) {
    ElMessage("留言内容应当在2到60位之间");
    return;
  }
  let params = {
    leaveMsg: leaveMsgText.value,
    userName: store.userInfo.userName,
  };
  addLeavelMsg(params).then((res) => {
    console.log(res);
    getLeaveMsgFunc();
  });
  dialogFormVisible.value = false;
  leaveMsgText.value = "";
};
const msgBtnCancel = () => {
  leaveMsgText.value = "";
  dialogFormVisible.value = false;
};
const leavemessageBtnHandle = () => {
  //我要去留言按钮触发函数
  if (store.userInfo.userId) {
    dialogFormVisible.value = true;
  } else {
    alert("请先登录,才可以进行留言哦！");
  }
};
</script>

<style lang="less" scoped>
.leavemessage_box {
  min-height: 60vh;
  width: 100%;
  position: relative;
  .to_leavemessage {
    height: 40px;
    width: 100%;
    position: relative;
    .levavemessage_button {
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }
  .leavemessage {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .leavemessage_Item {
    margin-left: 15px;
    padding-left: 5px;
    box-shadow: 4px 4px 8px;
    height: 120px;
    max-width: 290px;
    border-radius: 20px;
    position: relative;
    margin-top: 10px;

    background: rgb(225 225 225);
    .leavemessage_Item_userN {
      height: 30px;
      font-size: 20px;
      color: rgb(71, 34, 34);
    }
    .date_and_star {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 97%;
    }
    .leavemessage_Item_text {
      padding: 0px 5px;
      font-size: 15px;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 60px;
      min-width: 170px;
    }
  }
}
</style>