<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <el-row> 输入要查询的新闻信息： </el-row>
          <br />
          <el-row>
            <el-row :gutter="20">
              <el-col :span="6" :xs="24">
                <el-input
                  placeholder="请输入用户id"
                  prefix-icon="el-icon-search"
                  v-model="userId"
                ></el-input>
              </el-col>
              <el-col :span="6" :xs="24">
                <el-input
                  placeholder="请输入新闻标题最大长度"
                  prefix-icon="el-icon-search"
                  v-model="titleLength_max"
                ></el-input>
              </el-col>
              <el-col :span="6" :xs="24">
                <el-input
                  placeholder="请输入新闻最大长度"
                  prefix-icon="el-icon-search"
                  v-model="newsLength_max"
                ></el-input>
              </el-col>
              <el-col :span="6" :xs="24">
                <el-input
                  placeholder="请输入要查询新闻最大数量"
                  prefix-icon="el-icon-search"
                  v-model="amount"
                ></el-input>
              </el-col>
              <el-col :span="6" :xs="24">
                <el-select v-model="category" placeholder="请选择新闻种类">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6" :xs="24">
                <el-input
                  placeholder="请输入开始时间"
                  prefix-icon="el-icon-search"
                  v-model="start_time"
                ></el-input>
              </el-col>
              <el-col :span="6" :xs="24">
                <el-input
                  placeholder="请输入结束时间"
                  prefix-icon="el-icon-search"
                  v-model="end_time"
                ></el-input>
              </el-col>
            </el-row>
            <br />
              <el-col :span="24" :xs="24">
                <br />
                <el-button type="info" @click="search">开始搜索</el-button>
                <p>共计{{ count }}条查询结果</p>
              </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
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
    </el-row>
  </div>
</template>

<script>
import {multiQuery} from '@/request/api/home.js'
import Message from '../store/Message'
export default {
  data() {
    return {
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      options: [
        {
          value: "news",
          label: "news",
        },
        {
          value: "sports",
          label: "sports",
        },
        {
          value: "foodanddrink",
          label: "FD",
        },
        {
          value: "finance",
          label: "finance",
        },
        {
          value: "music",
          label: "music",
        },
        {
          value: "lifestyle",
          label: "lifestyle",
        },
        {
          value: "weather",
          label: "weather",
        },
        {
          value: "video",
          label: "video",
        },
        {
          value: "autos",
          label: "autos",
        },
        {
          value: "movies",
          label: "movies",
        },

        {
          value: "tv",
          label: "tv",
        },
        {
          value: "joy",
          label: "joy",
        },
        {
          value: "travel",
          label: "travel",
        },
        {
          value: "kids",
          label: "kids",
        },
        {
          value: "health",
          label: "health",
        },
      ],
      userId: "",
      amount: '',
      movietype: "",
      start_time: "",
      end_time: "",
      titleLength_max: '',
      newsLength_max: '',
      tableData: [],
      category:'',
      count:0
    };
  },
  created() {},
  methods: {
    search() {
      let vm = this;
      vm.tableData = undefined;
      vm.tableData = new Array(); //先清空再进行筛选
      //vm. titleLength_max!= "" && vm.newsLength_max != ""
      if (vm. titleLength_max!= "" && vm.newsLength_max != "" && vm.start_time !="" && vm.end_time != ""&&vm.amount!='') {
        let vim = this;
        console.log('addd')
        var needs={
          // start_time:vim.start_time,
          //   end_time:vim.end_time,
          //   category:vim.category,
          //   titleLength_max:vim.titleLength_max,
          //   newsLength_max:vim.newsLength_max,
          //   userId:vim.userId,
          //   amount:vim.amount
          start_time:'2019-6-10',
            end_time:'2019-6-25',
            category:'news',
            titleLength_max:'2000000',
            newsLength_max:'39000000',
            userId:'U201361',
            amount:'300'
                }
                multiQuery(needs)
        .then((data) => {
          for (let item of data.data) {
                vm.count = vm.count + 1;
                vm.tableData.push(item);
          }
          console.log(data); // 处理获取到的数据
        })
        .catch((error) => {
          console.log(error); // 处理错误
        });
            vm.count = 0;

        }
        else if(vm. titleLength_max== ""){
          Message({type:'error',text:'标题最大长度不能为空'})
        }else if(vm.newsLength_max == ""){
          Message({type:'error',text:'新闻最大长度不能为空'})
        }else if(vm.start_time == ""){
          Message({type:'error',text:'开始时间不能为空'})
        }else if(vm.end_time == ""){
          Message({type:'error',text:'结束时间不能为空'})
        }else if(vm.amount == ""){
          Message({type:'error',text:'请求数量不能为空'})
        }
    },
  }
};
</script>

<style scoped>
.stockcost_container {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.content {
  width: 20%;
  display: -webkit-box;/*作为弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
    overflow: hidden; /*超出的文本隐藏*/
    text-overflow: ellipsis; /* 溢出用省略号*/
    -webkit-box-orient: vertical;/*伸缩盒子的子元素排列：从上到下*/

}
</style>
