<template>
    <div class="members_box inlneBlock_all">
        <div class="padding_content">
            <p class="tit_members">{{detailData.title}}</p>
            <p class="cont_members">符合条件用户数&nbsp;: &nbsp;{{detailData.userNumber}}</p>
            <p v-if="showUpdateTime" class="cont_members">数据更新时间&nbsp;: &nbsp;{{detailData.updateTime}}</p>
            <p class="cont_members">标签创建时间&nbsp;: &nbsp;{{detailData.updateTime}}</p>
        </div>
        <div class="btn_enters_box">
            <div class="inlneBlock_all btn_enters" @click="pass(v.events,v.name)" :style="'width:'+(100/buttonData.length)+'%'" v-for="(v,k) in buttonData" :key="k">
                {{v.name}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            showUpdateTime:{    //是否显示 updateTime
                default(){
                    return true;
                }
            },
            detailData:{ //显示数据详情
                default(){
                    return {
                        title:'导入/手动新增的会员',
                        userNumber:1,
                        updateTime:'2019-01-02 05:00:42',
                        createTime:'2018-11-02 15:00:42',
                    }
                }
            },
            buttonData:{ //按钮默认数据
                default(){
                    return [
                        {name:'手动更新',events:'update'},
                        {name:'标签详情',events:'details'},
                        {name:'删除',events:'delete'},
                    ]
                }
            }
        },
        methods:{
            // 触发父组件的事件
            pass(e,name){
                this.$emit(e,name)
            }
        }
    }
</script>

<style scoped>
    .members_box{
        width:308px;
        box-sizing: border-box;
        border-radius: 5px;
        border:1px solid #eee;
        margin:10px 30px 10px 0;
        overflow-x: hidden;
    }
    .btn_enters{
        text-align: center;
        height:40px;
        line-height: 40px;
    }
    .btn_enters_box .btn_enters{
        border-top:1px solid #eee;
        border-right: 1px solid #eee;
        box-sizing: border-box;
        color:#409EFF;
        cursor: pointer;
    }
    .btn_enters_box .btn_enters:last-child{
        border-right: none;
    }
    .padding_content{
        padding:20px;
    }
    .tit_members{
        font-size:16px;
        font-weight: 600;
        padding-bottom:10px;
    }
    .cont_members{
        padding-bottom:10px;
        color:#666;
    }
    .padding_content .cont_members:last-child{
        padding-bottom: 0;
    }
</style>