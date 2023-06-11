<template>
    <div>
        <div class="top">
            <h2>单个新闻生命周期内点击量</h2>
        <div id="chartOne" class="chart">

            </div>
        </div>
    </div>
</template>

<script>    
import {inject , onMounted,ref, reactive,watch,onBeforeUnmount} from "vue"
import {getLifeTime,newsClickDay} from "@/request/api/home.js"

    export default{
        props:{
            newsID:
            {
                type:String,
                require:true,
                default:'N27499'
            }
        },
        setup(props){
            let $echarts = inject("echarts")
            //let $http = inject("axios")

            let data=reactive({})
            let start=reactive({})
            let end=reactive({})
            let counts=ref([])
            let myChart=null
            let interval=null//定时器
            let isLoading=false

            async function getState(){
                if(isLoading) return;
                isLoading=true
                try{
                    data=await getLifeTime(props.newsID)
                    //console.log(global_msg.newsID)
                    let startTime=new Date(data.data.start)
                    let endTime=new Date(data.data.end)
                    start=`${startTime.getFullYear()}-${startTime.getMonth() + 1}-${startTime.getDate()}`
                    end=`${endTime.getFullYear()}-${endTime.getMonth() + 1}-${endTime.getDate()}`;
                    console.log(data)
                    console.log(start)
                    await getCount()
                }
                finally{
                    isLoading=false
                }
            }

            async function getCount(){
                let currDate = new Date(start)
                let endDate = new Date(end)
                let DATA={
                newId:"N27499",
                year:2019,
                month:6,
                day:15
                }

                counts.value=[]
                while (currDate <= endDate) {
                    let dateStr = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`
                    DATA.newId=props.newsID
                    DATA.year=currDate.getFullYear()
                    DATA.month=currDate.getMonth() + 1
                    DATA.day=currDate.getDate()

                    console.log(DATA.newId)

                    let countData = await newsClickDay(DATA)
                    console.log(countData)
                    counts.value.push({
                        date: dateStr,
                        count: countData.data
                    })
                    counts.value.sort((a, b) => a.date.localeCompare(b.date));
                currDate.setDate(currDate.getDate() + 1)
                }
                console.log(counts)
                showChart()
            }
            
            function showChart(){
                if (!myChart) {
                    myChart = $echarts.init(document.getElementById("chartOne"));
                }
                
                let xData = counts.value.map(item => item.date)
                let yData = counts.value.map(item => item.count)
                myChart = $echarts.init(document.getElementById("chartOne"))
                myChart.setOption({
                    xAxis: {
                    type: "category",
                    data: xData,
                    axisLine: {
                        lineStyle: {
                        color: '#3d3e41' // x轴颜色
                        }
                    },
                    axisTick: {
                        show: false // 隐藏刻度线
                    },
                    axisLabel: {
                        color: "#666", // 刻度标签颜色
                        },
                        splitLine: {
                        show: false, // 显示网格线
                        }
                    },
                    yAxis: {
                    type: "value",
                    axisTick: {
                        show: false // 隐藏刻度线
                        },
                        axisLabel: {
                        color: "#666", // 刻度标签颜色
                        },
                        splitLine: {
                        show: true, // 显示网格线
                        lineStyle: {
                            color: "#eee" // 网格线颜色
                        }
                        }
                    },
                    series: [{
                    type: "line",
                    data: yData,
                    label: {
                        show: true
                    },
                    lineStyle: {
                        color: '#61a0a8'
                    },
                    itemStyle:{
                        grid:{
                                top:"30%",
                                left:"1%",
                                containLabel:true
                            },
                        color:"#005eaa"
                    }
                    }],
                })
            }

            watch(()=>props.newsID,(newValue,oldValue)=>{
                console.log(newValue,oldValue)
                counts=[]
                getState()
            })

            function Timer(){
            interval=setInterval(()=>{
                getState();
            },1000*5)//每隔30s请求一次数据
        }

            onMounted(()=>{
                getState()
                setTimeout(() => {
                    if(myChart){
                    myChart.resize();
                }
                }, 1000); 
                Timer()
            })

            onBeforeUnmount(()=>{
            clearInterval(interval)
            })

            return{
                getState,data
            }
        }
    }
</script>

<style lang="less">
    .top{
        width: 100%;
    h2{
        font-size: 20px;
        font-weight: 530;
        color: rgb(90, 87, 87);
        padding-top: .3125rem;
        position: absolute;
        top: 15px;
    }
      
     #chartOne{
        position: absolute;
        left: 20px;
        right: 20px;
        width: 42.5rem;
        height: 23rem;
        } 
    }  
</style>