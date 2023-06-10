import service from '..';
import { get ,post} from './data.js';

//获取新闻生命周期
export function getLifeTime(data){
    return service({
        method:"GET",
        url:`/getLifeTime?newsId=${data}`,
    })
}

//获取某个用户的新闻类型和点击量
export function getUserCategoryClick(data){
    return service({
        method:"GET",
        url:`/getUserCategoryClick?userId=${data}`,
    })
}

//获取新闻类型和点击量
export function getCategoryClick(){
    return service({
        method:"GET",
        url:"/getCategoryClick",
    })
}

//获取推荐的新闻类型
export function recommendCategory(){
    return service({
        method:"GET",
        url:`/recommendCategory`,
    })
}

//获取某天某新闻点击量
export function newsClickDay(data) {
    return service.post("/newsClickDay",data)
}

//获取某天某种类点击量
export function categoryClickDay(data) {
    return service.post("/categoryClickDay",data)
}

//获取某用户某天所有种类点击量
export function categoryClickUserDay(data) {
    return service.post("/categoryClickUserDay",data)
}

//根据类型获取新闻
export function getNewsCA(data) {
    return service.post("/getNewsCA",data)
}

//复合查询 multiQuery
export function multiQuery(data) {
    return service.post("/multiQuery",data)
}