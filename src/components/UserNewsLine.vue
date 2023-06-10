<template>
    <link rel="stylesheet" href="https://unpkg.com/primeicons/primeicons.css" />
    <div class="top"> 
        <h2>用户兴趣变化统计查询</h2>   
        <div class="contain">
            <div class="card flex flex-wrap justify-content-center gap-3">
                <div class="flex align-items-center">
                    <Checkbox v-model="option.news" inputId="news" name="option" value="news" />
                    <label for="news" class="ml-1"> news </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.sports" inputId="sports" name="option" value="sports" />
                    <label for="sports" class="ml-2"> sports </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.FD" inputId="F&&D" name="option" value="F&&D" />
                    <label for="FD" class="ml-3"> F&&D </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.finance" inputId="finance" name="option" value="finance" />
                    <label for="finance" class="ml-4"> finance </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.music" inputId="music" name="option" value="music" />
                    <label for="music" class="ml-5"> music </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.lifestyle" inputId="lifestyle" name="option" value="lifestyle" />
                    <label for="lifestyle" class="ml-6"> lifestyle </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.weather" inputId="weather" name="option" value="weather" />
                    <label for="weather" class="ml-7"> weather </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.health" inputId="health" name="option" value="health" />
                    <label for="health" class="ml-8"> health </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.video" inputId="video" name="option" value="video" />
                    <label for="video" class="ml-9"> video </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.movies" inputId="movies" name="option" value="movies" />
                    <label for="movies" class="ml-10"> movies </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.tv" inputId="tv" name="option" value="tv" />
                    <label for="tv" class="ml-11"> tv </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.autos" inputId="autos" name="option" value="autos" />
                    <label for="autos" class="ml-12"> autos </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.travel" inputId="travel" name="option" value="travel" />
                    <label for="travel" class="ml-13"> travel </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.joy" inputId="joy" name="option" value="joy" />
                    <label for="joy" class="ml-14"> joy </label>
                </div>
                <div class="flex align-items-center">
                    <Checkbox v-model="option.kids" inputId="kids" name="option" value="kids" />
                    <label for="kids" class="ml-15"> kids </label>
                </div>
            </div>  
            <div class="charts">
                <div id="chartUL">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {inject , onMounted, reactive,watch,ref,onBeforeUnmount} from "vue"
    import {categoryClickUserDay,getUserCategoryClick} from '@/request/api/home.js'
    import Checkbox from 'primevue/checkbox';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default {
        components :{
            Checkbox,
        },
        props:{
            UserID:{
                type:String,
                require:true,
                default:'U201361'
            }
        },
        setup(props){
            let $echarts = inject("echarts")
            //let $http = inject("axios")

            let data_=reactive({})
            let arr=reactive([])
            let chartData = reactive({});
            let interval=null//定时器
            let myChartUL=null
            //const option = ref()
            const option=reactive({
                news: false,
                sports: false,
                FD: false,
                finance: false,
                music: false,
                lifestyle: false,
                weather: false,
                health: false,
                video: false,
                autos: false,
                movies: false,
                tv: false,
                joy: false,
                travel: false,
                kids: false,
                });
            console.log(option)
            
            const arr1=[ {
        "news": {
            amount: "1",
            time: "2019-06-13 17:00:00"
        }
    },
                {
                    "sports": {
                        amount: "2",
                        "time": "2019-06-13 17:00:00"
                    }
                },
                {
                    "FD": {
                        amount: "3",
                        "time": "2019-06-14 17:00:00"
                    }
                },
                {
                    "finance": {
                        amount: "3",
                        "time": "2019-06-14 17:00:00"
                    }
                },
                {
                    "lifestyle": {
                        amount: "6",
                        "time": "2019-06-14 17:00:00"
                    }
                },
                {
                    "lifestyle": {
                        amount: "2",
                        "time": "2019-06-14 17:00:00"
                    }
                },
                {
                    "weather": {
                        amount: "3",
                        "time": "2019-06-18 17:00:00"
                    }
                },
                {
                    "health": {
                        amount: "3",
                        "time": "2019-06-17 17:00:00"
                    }
                },
                {
                    "video": {
                        amount: "1",
                        "time": "2019-06-17 17:00:00"
                    }
                },
                {
                    "movies": {
                        amount: "2",
                        "time": "2019-06-14 17:00:00"
                    }
                },
                {
                    "tv": {
                        amount: "4",
                        "time": "2019-06-13 17:00:00"
                    }
                },
                {
                    "autos": {
                        amount: "3",
                        "time": "2019-06-13 17:00:00"
                    }
                },
                {
                    "kids": {
                        amount: "7",
                        "time": "2019-06-16 17:00:00"
                    }
                },
                {
                    "kids": {
                        amount: "3",
                        "time": "2019-06-15 17:00:00"
                    }
                },
                {
                    "kids": {
                        amount: "3",
                        "time": "2019-06-14 17:00:00"
                    }
                },
            ]

            // 将时间字符串转换为日期对象
            function parseDate(str) {
                const [year, month, day] = str.split('-');
                return new Date(year, month - 1, day);
            }
            
               // 按照时间排序
               function processData(){
                    chartData.y=reactive([])
                    const sortedData = arr.sort((a, b) => {
                    const timeA = parseDate(a[Object.keys(a)[0]].time);
                    const timeB = parseDate(b[Object.keys(b)[0]].time);
                    return timeA - timeB;
                });
                // 统计每种新闻类型在每个日期的点击量
                const dataByTypeAndDate = {};
                //console.log(sortedData)
                sortedData.forEach(item => {
                const type = Object.keys(item)[0];
                const timeStr = item[type].time.substring(0, 10); // 截取年月日部分
                const date = parseDate(timeStr);
                if (!dataByTypeAndDate[type]) {
                    dataByTypeAndDate[type] = {};
                }
                if (!dataByTypeAndDate[type][timeStr]) {
                    dataByTypeAndDate[type][timeStr] = 0;
                }
                dataByTypeAndDate[type][timeStr] += parseInt(item[type].amount);
            });

            console.log(dataByTypeAndDate);

            const types=Object.keys(dataByTypeAndDate)//类型数组
            console.log(types)
            const dateSet=new Set()//时间节点
            types.forEach((type)=>{
                const typeData=dataByTypeAndDate[type]
                if(typeData){
                    Object.keys(typeData).forEach((date)=>{
                        dateSet.add(date)
                    })
                }
            })
            const sortedDates=Array.from(dateSet).sort()
            console.log(sortedDates)
            chartData.x=sortedDates
            chartData.y=types
                .filter(type => option[type])
                .map(type => {
                const typeDATA = dataByTypeAndDate[type];
                let clicks = [];
                if (typeDATA) {
                    sortedDates.forEach(date => {
                    clicks.push(typeDATA[date] || 0);
                    });
                } 
                else {
                    clicks = Array(sortedDates.length).fill(0);
                }
                return {
                    name: type,
                    type: "line",
                    data: clicks,
                    smooth: false,
                    symbol: "none"
                };
                });
                console.log(chartData.y)
               }

            async function getState(){
                data_=await getUserCategoryClick(props.UserID)

                arr=data_.data
                console.log(arr)
                processData()
                console.log(chartData)
                showChart()
            }

            function showChart(){
                let option1={
                    tooltip: {
                        trigger: "axis", // 鼠标移动到折线上显示数值
                        axisPointer: {
                        type: "cross",
                        },
                    },
                    xAxis:{
                        type:'category',
                        data:chartData.x
                    },
                    yAxis:{
                        type:'value'
                    },
                    series:chartData.y.map((item)=>({
                        ...item,
                        showSymbol:true,
                        symbolSize:8
                    }))
                }
                myChartUL=$echarts.init(document.getElementById("chartUL"))
                myChartUL.setOption(option1)
            }

            watch(()=>props.UserID,(newValue,oldValue)=>{
                console.log(newValue,oldValue)
                //counts=[]
                getState()
            })

            watch(
                () => arr,
                () => {
                    getState();
                }
            );
            watch(() => option,
                () => {
                    getState();
                },
                {deep:true}
            );

            function Timer(){
            interval=setInterval(()=>{
                getState();
            },1000*30)//每隔30s请求一次数据
        }

            onMounted(()=>{
                getState() 
                setTimeout(() => {
                    if(myChartUL){
                    myChartUL.resize();
                }
                }, 1000); 
                Timer()
            })

            onBeforeUnmount(()=>{
            clearInterval(interval)
            })

            return{
                getState,data_,option,chartData
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
        padding-top: .3125rem
    }
    .contain{
        width: 100%;
        display: flex;

    .flex{
        padding-bottom: 2px;
        padding-left: 3px;
    .ml-1,.ml-2,.ml-3,.ml-4,.ml-5,.ml-6,.ml-7,.ml-8,.ml-9,.ml-10,.ml-11,.ml-12,.ml-13,.ml-14,.ml-15{
            font-size: 17px;
            font-weight: 200;
            padding-top: 1.725rem;
        }
    }
      
     #chartUL{
        position: absolute;
        right: 40px;
        width: 42.5rem;
        height: 23rem;
        } 
    }  

    }
</style>