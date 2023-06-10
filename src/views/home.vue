<template>
    <div>
        <header>
            <link rel="stylesheet" href="https://unpkg.com/primeicons/primeicons.css" />
            <h1>新闻数据可视化</h1>
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
                    &nbsp;
                    <div class="flex align-items-center">
                        <RadioButton v-model="state.ingredient" inputId="ingredient2" name="choice" value="news" />
                        <label for="ingredient2" class="ml-2">按新闻</label>
                    </div>
                </div>
            </div>
        </header>
        <!-- <p>输出  {{ state.ingredient }}{{ state.u_id }}{{ state.n_id }}</p> -->
        <section class="container">
            <section class="left">
                <Item>
                    <newsLine :newsID="state.n_id"></newsLine>
                </Item>
                
                <Item>
                    <recommend></recommend>
                </Item>
            </section>
            <section class="right">
                <Item>
                    <categoryLine></categoryLine>
                </Item>
                <Item>
                    <NewsQuery></NewsQuery>
                </Item>
                <Item>
                    <UserNewsLine :UserID="state.u_id"></UserNewsLine>
                </Item>
            </section>
        </section>
    </div>
</template>

<script>
import Item from "@/components/item.vue"
import newsLine from "@/components/newsLine.vue"
import categoryLine from "@/components/categoryLine.vue"
import UserNewsBar from "@/components/UserNewsBar.vue"
import UserNewsLine from "@/components/UserNewsLine.vue"
import recommend from "@/components/recommend.vue"
import NewsQuery from "@/components/NewsQuery.vue"
import {inject, reactive,onMounted} from "vue"
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
    //core
import "primevue/resources/primevue.min.css";
import { ref } from 'vue';
import RadioButton from 'primevue/radiobutton';
import global_msg from "../global.js"

const ingredient = ref('');

export default {
    components :{
        Item,
        newsLine,
        categoryLine,
        //UserNewsBar,
        recommend,
        NewsQuery,
        UserNewsLine,
        InputText,
        RadioButton
    },

    setup(){
        //接收
        let $echarts = inject("echarts")
        let $http = inject("axios")
        const state=reactive({
            ingredient:'user',
            value1:'',
            u_id:'U201361',
            n_id:'N27499'
        });

        const enterKey=()=>{
            if(state.ingredient==='user'){
                state.u_id=state.value1
                console.log("test")
                console.log(state.u_id)
            }
            else if(state.ingredient==='news'){
                state.n_id=state.value1
                console.log(state.n_id)
            }
        };
        
        onMounted(()=>{
            //console.log(global_msg.newsID)
        })
        return{
            state,enterKey
        }
    }
}

</script>

<style lang="less">
header{
    height: 3.75rem;
    width: 100%;
    background-color: #928f8f;
    h1{
        font-weight: 500;
        font-size: 1.7625rem;
        color:white;
        display: flex;
        justify-content: center;
        line-height: 3.75rem;
    }
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
            color: white;
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
.container{
    //设置最大最小宽度
    min-width: 1200px;
    max-width: 2048px;
    //height: 37.5rem;//后续可能会改
    margin: 0 auto;
    padding: 0.625rem 0.625rem 0;
    display: flex;
    .left{
        flex: 5;
    }
    .right{
        flex: 6;
    }
}
.bottom{
    //设置最大最小宽度
    width: 100%;
    margin: 0 auto;
    padding: 0.625rem 0.625rem 0;
}
.p-inputtext-sm{
    margin-top: 0.3rem;
}
 
</style>
