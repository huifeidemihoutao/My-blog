/*
 * @Author: your name
 * @Date: 2022-04-11 12:54:50
 * @LastEditTime: 2022-04-17 23:35:27
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue/src/router/router.ts
 */
import {createRouter,createWebHashHistory,  RouteRecordRaw} from 'vue-router'
import { ElMessage } from "element-plus";
import {getUserInfo} from "../http/api/login"
import { useStore } from "@/store/store";
const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login/Login.vue'), // 注意这里要带上 文件后缀.vue
    },
    {
        path: '/',
        name: 'Main',
        component: () => import('@/pages/Main/Main.vue'),
        // children: [],//子组件
    },
    {
        path: '/wangEditor',
        name: 'wangEditor',
        component: () => import("../pages/Main/assembly/wangEditor.vue")
    },
    {
        path: '/dailyDetailPage',
        name: 'dailyDetailPage',
        component: () => import("../pages/Main/detailPage/dailyDetailPage.vue")
    },
    {
        path: '/technologyDetailPage',
        name: 'technologyDetailPage',
        component: () => import("../pages/Main/detailPage/technologyDetailPage.vue")
    },
    {
        path: '/travelDetailPage',
        name: 'travelDetailPage',
        component: () => import("../pages/Main/detailPage/travelDetailPage.vue")
    },
    // {
    //     path: '/ceshi',
    //     name: 'ceshi',
    //     component: () => import("../pages/ceshi.vue")
    // },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
//路由导航守卫
router.beforeEach((to, from, next) => {    
    // let isAuthenticated=false
    // if (to.name !== 'Main' && !isAuthenticated) next({name: 'Main'})
    // else next()
    // if (to.name == 'wangEditor' && store.userInfo.leavel=='admin')
    // {
    //     next()
    // } else{
    //     ElMessage("您的权限不足!");
    // }
     const store = useStore()//获取全局变量
     if(!(store.userInfo.userId)){
         let id =localStorage.getItem("userId")
         if(id){
            getUserInfo().then(res=>{
                store.userInfo=res.data as {userName:string,userId:string,level: string,token:string}
               })
         }
     }
    next()
})
export default router
