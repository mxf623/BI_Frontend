<template>
    <div class="recommend">
        <h2>实时推送</h2>
        <!-- <div v-for="item in res" :key="item.newsId" class="newsTitle">
            {{item.headline}}
            {{item.newsId}}
            {{item.topic}}
            {{item.newsBody}}
        </div> -->
        <el-table :data="res" stripe style="width: 100%">
        <el-table-column prop="newsId" label="新闻id">
        </el-table-column>
        <el-table-column prop="category" label="新闻类型"> </el-table-column>
        <el-table-column prop="topic" label="新闻主题">
        </el-table-column>
        <el-table-column prop="headline" label="新闻标题">
        </el-table-column>
        <el-table-column prop="newsBody" label="新闻内容" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import {onMounted,reactive,ref,onBeforeUnmount} from "vue"
import {getNewsCA,recommendCategory} from "@/request/api/home.js"

export default{
    setup(){
        let interval=null//定时器
        let data=reactive({})
        let category=reactive({})
        let res=ref([])

        async function getState(){
            data=await recommendCategory()
            category=data.data
            console.log(category)

            let needs={
                category:"news",
                amount:13
            }

            needs.category=category
            console.log(needs)
            let result=await getNewsCA(needs)
            res.value=result.data
            console.log(res)
        }

        function Timer(){
            interval=setInterval(()=>{
                getState();
            },1000*30)//每隔30s请求一次数据
        }

        onMounted(()=>{
            getState()
            Timer()
        })

        onBeforeUnmount(()=>{
            clearInterval(interval)
        })

        return{
            getState,category,res
        }
    }
}
</script>

<style lang="less">
    .recommend{
        width: 100%;
        .newsTitle{
            width: 37.5rem;
            padding: 3px;
            font-size: 15px;
            font-weight: 200;
            color: blue;
            position: relative;
            left: 30px;
            top: 10px;
            overflow: hidden;
 	        text-overflow: ellipsis;
             white-space: nowrap;
        }

    h2{
        font-size: 20px;
        font-weight: 530;
        color: rgb(90, 87, 87);
        display: flex;
        justify-content: center;
        padding-top: .3125rem;
        position: absolute;
        top: 15px;
    }
    }
</style>
