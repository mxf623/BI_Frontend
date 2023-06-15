<template>
    <div class="recommend">
        <div style="display: flex;">
            <h2>实时推送</h2>
        <el-button @click="change" type="primary" style="position: absolute; top: 18px; right: 63rem;">换一批</el-button>
        </div>
        
        <!-- <div>新闻类型：{{category[0].type}}</div>
        <div>点击量：{{category[0].amount}}</div>
        <div>新闻类型：{{category[0].type}}</div> -->
       <div style="margin-bottom: 30px;">
        <div>
            新闻类型：
            <span id="type1"></span>
        </div>
        <div>
            点击量：
            <span id="click1"></span>
        </div>
        <div>
            观看总时长：
            <span id="time1"></span>
        </div>
        <el-table :data="res[0]" stripe style="width: 100%">
        <el-table-column prop="newsId" label="新闻id">
        </el-table-column>
        <el-table-column prop="topic" label="新闻主题">
        </el-table-column>
        <el-table-column prop="headline" label="新闻标题">
        </el-table-column>
        <el-table-column prop="newsBody" label="新闻内容" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
      
       </div>

      <div style="margin-bottom: 30px;">
        <div>
            新闻类型：
            <span id="type2"></span>
        </div>
        <div>
            点击量：
            <span id="click2"></span>
        </div>
        <div>
            观看总时长：
            <span id="time2"></span>
        </div>
        <el-table :data="res[1]" stripe style="width: 100%">
        <el-table-column prop="newsId" label="新闻id">
        </el-table-column>
        <el-table-column prop="topic" label="新闻主题">
        </el-table-column>
        <el-table-column prop="headline" label="新闻标题">
        </el-table-column>
        <el-table-column prop="newsBody" label="新闻内容" :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
      </div>

      <div style="margin-bottom: 30px;">
        <div>
            新闻类型：
            <span id="type3"></span>
        </div>
        <div>
            点击量：
            <span id="click3"></span>
        </div>
        <div>
            观看总时长：
            <span id="time3"></span>
        </div>
        <el-table :data="res[2]" stripe style="width: 100%">
        <el-table-column prop="newsId" label="新闻id">
        </el-table-column>
        <el-table-column prop="topic" label="新闻主题">
        </el-table-column>
        <el-table-column prop="headline" label="新闻标题">
        </el-table-column>
        <el-table-column prop="newsBody" label="新闻内容" :show-overflow-tooltip="true">
        </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import {onMounted,reactive,ref,onBeforeUnmount} from "vue"
import {getNewsCA,recommendCategory} from "@/request/api/home.js"

export default{
    setup(){
        let interval=null//定时器
        let data=reactive([])
        let category=reactive([])
        let res=ref([])
        let num=reactive({})
        let page=ref([0,0,0])
        let total=ref([])

        async function getState(){
            data=await recommendCategory()
            //category.value=data.data
            console.log(data.data)
            category=data.data
            num=category[0].amount
            console.log(num)
            document.getElementById('type1').innerHTML=category[0].type
            document.getElementById('click1').innerHTML=category[0].amount
            document.getElementById('time1').innerHTML=category[0].time

            for(var i=0;i<data.data.length;i++){
                let needs={
                    category:data.data[i].type,
                    amount:9
                }
                let result=await getNewsCA(needs)
                total.value.push(result.data)
                //res.value=result.data
                res.value.push([result.data[page.value[0]*3],result.data[page.value[0]*3+1],result.data[page.value[0]*3+2]])
                console.log(res.value)
                document.getElementById('type'+(i+1)).innerHTML=category[i].type
            document.getElementById('click'+(i+1)).innerHTML=category[i].amount
            document.getElementById('time'+(i+1)).innerHTML=category[i].time
            }

            
        }
        function change(){
            if(page.value[0]<2)
                page.value[0]++;
            else if(page.value[0]==2)
                page.value[0]=0

                if(page.value[1]<2)
                page.value[1]++;
            else if(page.value[1]==2)
                page.value[1]=0

                if(page.value[2]<2)
                page.value[2]++;
            else if(page.value[2]==2)
                page.value[2]=0
            console.log(page.value)
            res.value[0]=[total.value[0][page.value[0]*3],total.value[0][page.value[0]*3+1],total.value[0][page.value[0]*3+2]]
            res.value[1]=[total.value[1][page.value[1]*3],total.value[1][page.value[1]*3+1],total.value[1][page.value[1]*3+2]]
            res.value[2]=[total.value[2][page.value[2]*3],total.value[2][page.value[2]*3+1],total.value[2][page.value[2]*3+2]]
        
        }

        function Timer(){
            interval=setInterval(()=>{
                getState();
            },1000*1)//每隔30s请求一次数据
        }

        onMounted(()=>{
            getState()
            //Timer()
        })

        onBeforeUnmount(()=>{
            clearInterval(interval)
        })

        return{
            getState,category,res,change
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
