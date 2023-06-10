<template>
    <div>
        <h2>用户兴趣变化统计查询</h2>     
        <div class="charts">
            <div id="chartUB">
                
            </div>
        </div>
    </div>
</template>

<script>
    import {inject , onMounted, reactive,watch} from "vue"
    import {categoryClickUserDay,getUserCategoryClick} from '@/request/api/home.js'

    export default{
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

            let data=reactive({})
            let arr=reactive([])
            let res=reactive([])
            let xdata=reactive({})
            let ydata=reactive({})
            let interval=null//定时器
            let myChartUB=null

            async function getState(){
                data=await getUserCategoryClick(props.UserID)
                console.log(data)
                arr=data.data
                console.log(arr)
                let n=0
                while(n<arr.length){
                    n++
                    //arr的
                }
            }

            function setData(data){
                let data_=data.data;
                ydata=Object.keys(data_)
                xdata=ydata.map(key=>data_[key])
                console.log(data_)
                console.log(ydata)
                console.log(xdata)
            }

            watch(()=>props.UserID,(newValue,oldValue)=>{
                console.log(newValue,oldValue)
                //counts=[]
                getState()
            })

            onMounted(()=>{
                let myChart=$echarts.init(document.getElementById("chartUB"))
                
                getState().then(()=>{
                    myChart.setOption({
                    xAxis:{
                        type:"value"
                    },
                    yAxis:{
                        type:"category",
                        data:ydata,
                        // inverse:true,
                        // animationDuration:300,
                        // animationDurationUpdate:300,
                        // max:15
                    },
                    series:[{
                        data:xdata,
                        type:"bar",
                        itemStyle:{
                            grid:{
                                top:"3%",
                                left:"10%",
                                containLabel:true
                            },
                            BorderRadius:[0,20,20,0],
                            color:new $echarts.graphic.LinearGradient(0,0,1,0,
                                [
                                {
                                    offset:0,
                                    color:"#005eaa",
                                },
                                {
                                    offset:0.5,
                                    color:"#339ca8"
                                },
                                {
                                    offset:1,
                                    color:"#cda819"
                                }
                                ]
                                )
                        }
                    }]
                })
                })
                setTimeout(() => {
                    myChart.resize();
                }, 1000); 
            })
                 // 开启定时器
//   interval = setInterval(() => {
//     getState().then(() => {
//       myChart.setOption({
//         yAxis: {
//           data: ydata,
//         },
//         series: [
//           {
//             data: xdata,
//           },
//         ],
//       });
//     });
//     setTimeout(() => {
//       myChart.resize();
//     }, 1000);
//   }, 2000); // 每隔 2 秒更新一次数据
// });

// 在组件销毁前停止定时器
// onBeforeUnmount(() => {
//   clearInterval(interval);
// });
            return{
                getState,data,xdata,ydata
            }
        }
    }
</script>

<style lang="less">
    h2{
        font-size: 20px;
        font-weight: 530;
        color: rgb(90, 87, 87);
        display: flex;
        justify-content: center;
        padding-top: .625rem
    }
    
    #chartUB{
        position: absolute;
        left: 20px;
        right: 20px;
        width: 42.5rem;
        height: 23rem;
        } 
</style>