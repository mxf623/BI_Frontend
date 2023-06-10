<template>
    <div class="top">
        <h2>某种新闻点击量变化</h2>
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
            <div class="chart">
                <div id="chartCL"></div>
            </div>
            </div>
    </div>
</template>

<script>
    import {inject , onMounted, reactive,watch,ref,onBeforeUnmount} from "vue"
    import {getCategoryClick} from '@/request/api/home.js'
    import Checkbox from 'primevue/checkbox';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default{
    components:{
        Checkbox
    },
    setup(){
        let $echarts = inject("echarts")
        let data_=reactive({})
        let arr=reactive([])
        let chartData = reactive({});
        let interval=null//定时器
        let myChartCL=null

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

            // 按照时间排序
            function processData(){
                    chartData.y=reactive([])
                    const sortedData =arr.map(obj=>{
                        const key=Object.keys(obj)[0]
                        const a1=obj[key].sort((a,b)=>{
                            const timeA=new Date(a.time)
                            const timeB=new Date(b.time)
                            return timeA - timeB
                        })
                        return {[key]:a1}
                    })
                    console.log(sortedData)
                // 统计每种新闻类型在每个日期的点击量
                const dataByTypeAndDate = {};
                sortedData.forEach(obj => {
                const type = Object.keys(obj)[0];
                obj[type].forEach(item=>{
                    const date=item.time.slice(0,10)
                    if (!dataByTypeAndDate[type]) {
                        dataByTypeAndDate[type] = {};
                    }
                    if (!dataByTypeAndDate[type][date]) {
                        dataByTypeAndDate[type][date] = 0;
                    }
                    dataByTypeAndDate[type][date] += parseInt(item.amount);
                })
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
                data_=await getCategoryClick()
                console.log(data_)
                arr=data_.data
                console.log(arr)
                processData()
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
                myChartCL=$echarts.init(document.getElementById("chartCL"))
                myChartCL.setOption(option1)
            }

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
            },1000*10)//每隔10s请求一次数据
        }

            onMounted(()=>{
                getState() 
                setTimeout(() => {
                    if(myChartCL){
                    myChartCL.resize();
                }
                showChart()
                }, 1000); 
                Timer()
            })

            onBeforeUnmount(()=>{
            clearInterval(interval)
            })

            return {
                option,getState,data_,chartData
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
      
    #chartCL{
        position: absolute;
        right: 40px;
        width: 42.5rem;
        height: 23rem;
        } 
    
    }  

    }
</style>