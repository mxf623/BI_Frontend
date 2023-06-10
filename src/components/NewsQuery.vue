<template>
    <div>
        <div class="top">
            <h2>多条件组合查询新闻</h2>
            <div class="card">
                <Button label="筛选" icon="pi pi-external-link" @click="visible=true" />
                <Dialog v-model:visible="visible" modal header="筛选信息" :style="{ width: '50vw' }">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <Button label="关闭弹窗" @click="visible = false" />
                </Dialog>
            </div>
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
import Button from 'primevue/button'
import Dialog from 'primevue/dialog';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

    export default{
        components :{
            Button,
            Dialog
        },
        setup(){
            const visible = reactive(false);
            console.log("111")
            console.log(visible)
            //样式部分
            const categoryOptions=[
                {label:'news',value:'news'},
                {label:'sports',value:'sports'},
                {label:'FD',value:'FD'},
                {label:'finance',value:'finance'},
                {label:'music',value:'music'},
                {label:'lifestyle',value:'lifestyle'},
                {label:'weather',value:'neweatherws'},
                {label:'health',value:'health'},
                {label:'video',value:'video'},
                {label:'autos',value:'autos'},
                {label:'movies',value:'movies'},
                {label:'tv',value:'tv'},
                {label:'joy',value:'joy'},
                {label:'travel',value:'travel'},
                {label:'kids',value:'kids'},
            ]
            const selectedCategories=reactive([])
            const titleLength = reactive({ min: 0, max: 200000 });
            const newsLength = reactive({ min: 0, max: 300000 });

            const users=reactive([''])
            const selectedDate=reactive(null)

            function addUser(){
                users.push('')
            }

            const items=reactive([
            {
                label: 'Time',
                items: [
                {
                    label: 'select time range',
                    items: [
                    {
                        label: 'start time',
                        icon: 'pi pi-calendar',
                        command: () => console.log('start time')
                    },
                    {
                        label: 'end time',
                        icon: 'pi pi-calendar',
                        command: () => console.log('end time')
                    },
                    ]
                },
                {
                    label: 'Category',
                    items: [
                    {
                        label: 'select category',
                        items: [
                        {
                            label: 'news',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'sports',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'FD',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'finance',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'music',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'lifestyle',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'weather',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'health',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'video',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'autos',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'movies',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'tv',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'joy',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'travel',
                            icon: 'pi pi-check',
                        },
                        {
                            label: 'kids',
                            icon: 'pi pi-check',
                        },
                        ]
                    }
                    ]
                },
                {
                    label: 'news title length',
                    items: [
                    {
                        label: 'select title length range',
                        items: [
                        {
                            label: 'min',
                            icon: 'pi pi-sliders-h',
                        },
                        {
                            label: 'max',
                            icon: 'pi pi-sliders-v',
                        }
                        ]
                    }
                    ]
                },
                {
                    label: 'news length',
                    items: [
                    {
                        label: 'select news length range',
                        items: [
                        {
                            label: 'min',
                            icon: 'pi pi-sliders-h',
                        },
                        {
                            label: 'max',
                            icon: 'pi pi-sliders-v',
                        }
                        ]
                    }
                    ]
                },
                {
                    label: 'Users',
                    items: [
                    {
                        label: 'Enter User IDs',
                        items: [
                        {
                            label: 'User ID',
                            icon: 'pi pi-user',
                            items: [
                            {
                                label: 'Add User',
                                icon: 'pi pi-plus',
                                command: addUser
                            }
                            ]
                        }
                        ]
                    }
                    ]
                }
                ]
            }
            ]);


            //数据部分
            let data=reactive({})
            let interval=null//定时器
            let res=ref([])

            let needs={
                    year:2019,
                    month_min:6,
                    day_min:13,
                    month_max:6,
                    day_max:14,
                    category:"",
                    titleLength_min:1,
                    newsLength_min:0,
                    titleLength_max:200000,
                    newsLength_max:300000,
                    userId:"",
                    amount:13
                }

            async function getState(){
                data=await multiQuery(needs)
                res.value=data.data
                console.log(res)
            }

            onMounted(()=>{
                getState()
            })

            return {
                getState,data,res,visible
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
