<template>
    <div>
        <div class="top">
            <h2>多条件组合查询新闻</h2>
            <Button label="Search" />
            </div>
        <div class="contain_NQ">
            <div v-for="item in res" :key="item.newsId" class="NewsTitle">
                {{item.headline}}
            </div>
        </div>
    </div>
</template>

<script>
    import {inject , onMounted, reactive,watch,ref,onBeforeUnmount} from "vue"
    import {multiQuery} from '@/request/api/home.js'
    import Button from 'primevue/button';

    export default{
        components :{
            Button,
        },
        setup(){
            let data=reactive({})
            let interval=null//定时器
            let res=ref([])
            let needs={
                    year:2019,
                    month_min:6,
                    day_min:13,
                    month_max:6,
                    day_max:14,
                    category:"news",
                    titleLength_min:1,
                    newsLength_min:0,
                    titleLength_max:200000,
                    newsLength_max:300000,
                    userId:"",
                    amount:5
                }

            async function getState(){
                console.log("111")
                data=await multiQuery(needs)
                console.log("needs")
                console.log(data)
                res.value=data.data
                console.log(res)
            }

            onMounted(()=>{
                getState()
            })

            return {
                getState,data
            }
        }
    }
</script>

<style lang="less">
    .top{
    h2{
        font-size: 20px;
        font-weight: 530;
        color: rgb(90, 87, 87);
        display: flex;
        justify-content: center;
        padding-top: .3125rem
    }
    Button{
        position: absolute;
        right: 3.5rem;
        top: 500px;
    }
    }
    .contain_NQ{
        width: 100%;
        .NewsTitle{
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
    }
</style>
