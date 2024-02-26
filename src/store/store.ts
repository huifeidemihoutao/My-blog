import {defineStore} from 'pinia'
interface UserInfo {
    userName: string
    userId:string
    level:string
    token:string
  }

export const useStore = defineStore('storeId', {
    state: () => {
        return {
            counter: 0,
            name: 'Eduardo',
            isAdmin: true,
            userInfo:{userName:'游客',userId:'',level:'user'} as UserInfo,
            leaveMessageNumber:0,
        }
    },
    getters: {
        nameLength: (state) => state.name.length,
    },
    actions: {
        async insertPost(data:string){
            // 可以做异步
            // await doAjaxRequest(data);
            this.name = data;
        }

    },
})
