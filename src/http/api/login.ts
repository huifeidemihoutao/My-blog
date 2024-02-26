import http from "@/http/Http";
import { log } from "console";

export async function login(data: { userName: string, userPassword: string }) {
    return http.get(`/login`, data)
}

export async function register(parmas:{userName:string,userPassword:string,userId:string}) { //注册
    return http.get(`/registration`, parmas)
}

export async function addLeavelMsg(parmas:{leaveMsg:string}) { //增加留言
    return http.get(`/addLeavelMsg`, parmas)
}

export async function getLeaveMsg() { //获取留言
    return http.get(`/getLeaveMsg`)
}
export async function addUserLikes(parmas:{UserName:string,LeaveMsgId:number,UserId:string}) { //点赞
    return http.get(`/addUserLikes`,parmas)
}
export async function deleteUserLikes(parmas:{leaveMsgId:number}) { //取消点赞
    return http.delete(`/deleteUserLikes`,parmas)
}
export async function publishArticle(parmas:{articleType :string,articleHtml:string,title:string}) { //发布帖子接口
    return http.post(`/publishArticle`,parmas)
}
export async function getArticle() { //发布帖子接口
    return http.get(`/getArticleList`)
}
export async function getUserInfo() { //获取用户信息
    return http.get(`/getUserInfo`)
}
export async function addVisitor() { //获取用户信息
    return http.get(`/addVisitor`)
}
export async function getVisitor() { //获取用户信息
    return http.get(`/getVisitor`)
}
export async function getArticleHtml(parmas:{articleId:any}) { //获取用户信息
    return http.get(`/getArticleHtml`,parmas)
}
export async function addArticleLikes(parmas:{ArticleId:any,UserName:string,UserId:string}) { //给帖子点赞
    return http.get(`/addArticleLikes`,parmas)
}
export async function deleteArticleLikes(parmas:{articleId:number}) { //取消帖子点赞
    return http.get(`/deleteArticleLikes`,parmas)
}






