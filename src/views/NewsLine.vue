<template>
    <link rel="stylesheet" href="https://unpkg.com/primeicons/primeicons.css" />
    <div>
        <header>
            <div class="search">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="state.value1" class="p-inputtext-sm" placeholder="Search" @keydown.enter="enterKey"/>
                </span>
            </div>
            <div class="card flex justify-content-center">
                <div class="flex flex-wrap gap-3">
                    <div class="flex align-items-center">
                        <RadioButton v-model="state.ingredient" inputId="ingredient1" name="choice" value="user" />
                        <label for="ingredient1" class="ml-2">按用户</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="state.ingredient" inputId="ingredient2" name="choice" value="news" />
                        <label for="ingredient2" class="ml-2">按新闻</label>
                    </div>
                </div>
            </div>
        </header>
        <div class="top">
            <h2>单个新闻生命周期内点击量</h2>
            <p>新闻生命周期从{{ start }}开始</p>

        <div id="chartOne" class="chart">

            </div>
        </div>
    </div>
</template>

<script>    
import {inject , onMounted,ref, reactive,watch,onBeforeUnmount} from "vue"
import {getLifeTime,newsClickByDay,newsDayClick} from "@/request/api/home.js"
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext';

    export default{
        components :{
            RadioButton,
            InputText
        },
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
            let start=ref({})
            let end=reactive({})
            let counts=ref([])
            let myChart=null
            let interval=null//定时器
            let isLoading=false

            const state=reactive({
            ingredient:'user',
            value1:'',
            u_id:'U201361',
            n_id:'N27499'
        });

            async function getState(){
                data=await newsDayClick(state.n_id)
                console.log(data)
                counts.value=data.data
                console.log(counts.value)
                showChart()
                showTimeRange()
            }
            function showTimeRange() {
                if (counts.value.length === 0) {
                    start.value = ''
                    end.value = ''
                    return
                }
                let min = counts.value[0].time
                let max = counts.value[0].time
                counts.value.forEach(item => {
                    if (item.time < min) {
                    min = item.time
                    }
                    if (item.time > max) {
                    max = item.time
                    }
                })
                start.value = min
                end.value = max
                }
            
            function showChart(){
                if (!myChart) {
                    myChart = $echarts.init(document.getElementById("chartOne"));
                }
                
                let xData = counts.value.map(item => item.time)
                let yData = counts.value.map(item => item.amount)
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
            },1000*3)//每隔30s请求一次数据
        }

        const enterKey=()=>{
            if(state.ingredient==='user'){
                state.u_id=state.value1
                console.log(state.u_id)
            }
            else if(state.ingredient==='news'){
                state.n_id=state.value1
                console.log(state.n_id)
            }
        };
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
                getState,data,enterKey,state,start
            }
        }
    }
</script>

<style lang="less">
    header{
    height: 3.75rem;
    width: 100%;
    .p-input-icon-left{
            position: absolute;
            right: 15rem;
            top: 10px;
        } 
    .card{
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        position: absolute;
        top: 1.125rem;
        right: 2.5rem;
        .ml-1,.ml-2{
            color: rgb(34, 33, 33);
            font-size: large;
            font-weight: 200;
        }
    }
    .flex {
        display: flex;
        align-items: center;
        gap: 8px;
    }
}
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
      p{
        font-size: 1px;
        font-weight: 530;
        color: rgb(147, 144, 144);
        padding-left: 150px;
      }
     #chartOne{
        position: absolute;
        left: 400px;
        width: 60rem;
        height: 33rem;
        } 
    }  
</style>