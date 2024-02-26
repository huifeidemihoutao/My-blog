<!--
 * @Author: your name
 * @Date: 2022-04-11 12:54:50
 * @LastEditTime: 2022-04-17 23:31:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue/src/pages/Login/Login.vue
-->
<template>
  <div class="body">
    <div class="transparentBack"></div>
    <el-form
    class="form_box"
    label-width="70px"
    :model="form"
  >
    <el-form-item label-width="0px">
    <el-switch
    @change="changeSwitch"
     size="large"
    style="--el-switch-on-color: #409eff; --el-switch-off-color: #23d42f;transform: translateX(120px);"
    v-model="switchValue"
    class="mb-2"
    active-text="登录"
    inactive-text="注册"
  />
         </el-form-item>
    <el-form-item label="用户名" >
      <el-input v-model="form.userName" maxlength="8" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.passWord" type="password" show-password  maxlength="12"/>
    </el-form-item>
    <el-form-item label="重复密码" v-if="!switchValue">
      <el-input v-model="form.passWordRepeat"  type="password" show-password maxlength="12"/>
    </el-form-item>
     <el-form-item label-width="0px">
       <div class="buttonGroup">
      <el-button type="primary" style="width:100%;height:100%" v-if="switchValue"  @click="loginHandle">登录</el-button>
      <el-button type="success" style="width:100%;height:100%" v-if="!switchValue" @click="regiestHandle">注册</el-button>
       </div>
    </el-form-item>
    
  </el-form>
  </div>

</template>

<script lang="ts" setup>
import router from '@/router/router';
import {ref,onMounted, reactive} from "vue";
import {ElMessage} from "element-plus";
import {register,login} from "@/http/api/login"
import { useStore } from "@/store/store";
import axios from "axios";

var switchValue=ref(true)
var form =reactive({userName:'',passWord:'',passWordRepeat:''})
const store = useStore()//获取全局变量

const resetForm=()=>{
   form.userName='';
   form.passWord='',
   form.passWordRepeat='';
}
const loginHandle=()=>{
  if(form.userName&&form.passWord){
     let params ={userName:form.userName,userPassword:form.passWord}
    login(params).then(res=>{
      resetForm()
      store.userInfo=res.data as {userName:string,userId:string,level: string,token:string}
      router.push({name:'Main'})
      console.log(res);
      localStorage.setItem('userId',(res.data as any).userId);
      localStorage.setItem('token',(res.data as any).token);
    }).catch(err=>{ElMessage(err)})
  }else{
     ElMessage('请输入人完整信息')
  }
}
const getUUID =(length:number)=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
  let result = '';  
  const charactersLength = characters.length;  
  for (let i = 0; i < length; i++) {  
    result += characters.charAt(Math.floor(Math.random() * charactersLength));  
  }  
  return result;
}
const regiestHandle=()=>{
    let machineId = localStorage.getItem('MachineId');//获取机器id
    if (!machineId) {
        machineId = getUUID(32);
        localStorage.setItem('MachineId', machineId); //如果没有机器id就生成一个随机的uuid并且存在浏览器当中
    }
  if(form.userName&&form.passWord&&form.passWordRepeat){ //手动校验表单信息是否符合提交规范
      if(form.userName.length<2){
        ElMessage('用户名长度需要在2-8位之间')
        return
      }
      if(form.passWord.length<6){
         ElMessage('密码长度应在6-12位之间')
         return
      }
      if(form.passWord!=form.passWordRepeat){
         ElMessage('密码不一致,请重新填写')
         return
      }
       let parmas={userName:form.userName,userPassword:form.passWord,userId:machineId}
       register(parmas).then(res=>{
         console.log(res);
         resetForm()
         alert('创建成功')
         switchValue.value=true
         }).catch(err=>{console.log(err);})
  }else{
      ElMessage('请填写完整的信息')
  }
}
const changeSwitch=(value:boolean)=>{
   console.log(value);
   
}
onMounted(()=>{
 
})

</script>

<style lang='less' scoped>
.body {
 height: 100vh;
 width: 100%;
 background: url('../../assets/loginBack.png');
 background-size: 100% 100%;
 object-fit: cover;
 position: relative;
 .transparentBack{
   border-radius: 15px;
    box-shadow: 0px -5px 5px;
    top: 30vh;
  left:calc((100vw - 240px)/2);
   width: 240px;
   height: 220px;
  padding: 10px;
  position: absolute;
  background: url("../../assets/loginGif.gif") ;
    background-size: 100% 100%;
    opacity: 0.9;
 }
 .form_box{
   top: 30vh;
  left:calc((100vw - 240px)/2);
   width: 240px;
   height: 220px;
  padding: 10px;
  position: absolute;
  .buttonGroup{
    width: 100%;
    display: flex;
    justify-content: center;
    height: 30px;
  }
 }
 .form_box ::v-deep .el-form-item__label{
   color: black;
    font-weight: 700;
 }
}
</style>
