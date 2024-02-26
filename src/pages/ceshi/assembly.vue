<template>
  <div>{{name}}===={{data.remake}}===={{list.remake}}</div>
  <button @click="changeFather">改变值</button>
</template>

<script setup lang="ts">
import bus from "../../bus/bus"
import {onMounted, reactive} from"vue"


const emit= defineEmits(['emitChange'])

const list=reactive<any>({remake:"我是一条备注信息ssssss"})
const changeList=function():void{
    list.remake="我直接改变"
}
let changeFather=():void=>{
  // emit('emitChange',list)
  
  bus.emit("logA","sssg","asfasfasf","asas","sas")
  console.log(this);
  
}
defineProps<{
  name:string,
  data:object
}>()

defineExpose(
  {list,changeList}
)
</script>

<style>

</style>