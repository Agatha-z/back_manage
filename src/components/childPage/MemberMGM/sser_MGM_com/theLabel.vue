<template>
    <div class="lable_box">
        <!-- 驱动视图更新 -->
        <div v-show="false">{{index}}</div>
        <div class="select_boxs">
            <div class="title_sts">
                <el-input placeholder="添加新标签" size="medium" v-model="seachValue">
                    <el-button slot="append" @click="addLable">添加</el-button>
                </el-input>
            </div>
            <!--  -->
            <div class="contents_body_scroll">
                <div v-for="(v,k) in checkData" :key="k" class="checkIteam">
                    <el-checkbox style="width:100%" @change="index++" v-model="v.check">{{v.name}}</el-checkbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            checkdData:{
                default(){
                    return [
                        {name:'标签1',id:'1111',check:false},
                        {name:'标签2',id:'2222',check:false},
                        {name:'标签3',id:'3333',check:false},
                    ]
                }
            }
        },
        data(){
            return {
                seachValue:'',//添加的标签名
                index:0,//驱动视图更新
                checkData:[],
            }
        },
        created(){
            // 设置真实渲染数据
            this.checkData=JSON.parse(JSON.stringify(this.checkdData));
        },
        methods:{
            addLable(){
                console.log(23)
            }
        }
    }
</script>

<style scoped>
    .lable_box{
        height:100%;
        box-sizing: border-box;
        padding:20px;
    }
    .select_boxs{
        height:100%;
        border:1px solid #eee;
        border-radius:5px;
    }
    .select_boxs .title_sts{
        padding:5px;
        border-bottom: 1px solid #eee;
    }
    .contents_body_scroll{
        height:calc(100% - 47px);
        overflow: auto;
    }
    .checkIteam{
        padding:10px;
    }
    .checkIteam:hover{
        background:#f2f2f2;
    }
</style>