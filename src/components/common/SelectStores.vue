<template>
    <div class="SelectStores_components">
        <!-- 驱动视图更新 -->
        <div v-show="false">{{index}}</div>
        <!-- 头部 -->
        <div class="header_s">
            <div class="seachBox_s">
                <el-input placeholder="请输入关键字 (名称/地址)" v-model.trim="input4" 
                clearable @change="inputSeach(input4)" 
                @keyup.enter.native="seachKeywords(input4)" size="medium">
                    <el-button slot="append" icon="el-icon-search" @click="seachKeywords(input4)"></el-button>
                </el-input>
            </div>
            <div class="seachBox_s seachBox_num">
                共查询到 {{numData}} 条数据
            </div>
        </div>
        <!-- 内容部分 -->
        <div class="content_components">
            <!-- 标题 -->
            <div class="content_titles">
                <div class="inlneBlock_all firstChild" style="width:10%">
                    <el-checkbox v-model="checkedParent" :indeterminate="indeterminate" @change="parentCheck"></el-checkbox>
                </div>
                <div class="inlneBlock_all" style="width:44%">
                    门店名称
                </div>
                <div class="inlneBlock_all" style="width:44%">
                    门店地址
                </div>
            </div>
            <!-- 内容 -->
            <div class="content_Content_s">
                <div class="list_box_a" v-for="(v,k) in data_stores" :key="k" v-show="v.keyWords">
                    <div class="inlneBlock_all firstChild" style="width:10%">
                        <el-checkbox v-model="v.check" @change="commonSelected"></el-checkbox>
                    </div>
                    <div class="inlneBlock_all" style="width:44%">
                        {{v.name}}
                    </div>
                    <div class="inlneBlock_all" style="width:44%">
                        {{v.area}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            seletOnData:{  // 处理过的数据
                default(){
                    return []
                },
            },
            storeData:{ //默认门店数据
                default(){
                    return [
                        {name:'安少爷米线天鹅湖万达店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-1'},
                        {name:'安少爷米线三里庵店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-2'},
                        {name:'安少爷米线绿地瀛海店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-3'},
                        {name:'安少爷米线大润发店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-4'},
                        {name:'安少爷米线召唤师峡谷店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-5'},
                        {name:'安少爷米线刺激战场店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-6'},
                        {name:'安少爷米线天墨家机关道店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-7'},
                        {name:'安少爷米线天火焰山店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-8'},
                        {name:'安少爷米线天运输船店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-9'},
                        {name:'安少爷米线新年广场店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-10'},
                        {name:'安少爷米线天九华禁地店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-11'},
                        {name:'安少爷米线开凤凰城店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-12'},
                        {name:'安少爷米线积极比比店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-13'},
                        {name:'安少爷米线小猪店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-14'},
                        {name:'安少爷米线佩奇店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-15'},
                        {name:'安少爷米线雨润广场店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-16'},
                        {name:'安少爷米线财富广场店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-17'},
                        {name:'安少爷米线步行街店',area:'安徽省合肥市蜀山区政务区天鹅湖万达金街一楼5-132',id:'1-18'},
                    ]
                }
            }
        },
        data(){
            return {
                index:0,//驱动视图更新
                data_stores:[],//真实渲染数据
                indeterminate:false,//父级复选框是否有选中
                checkedParent:false,//父级复选框选中状态
                input4:'',//搜索框绑定数据
                numData:0,//总共查询到数据条数
            }
        },
        created(){
            console.log(this.seletOnData.length)
            if(this.seletOnData.length>0){
                this.data_stores=JSON.parse(JSON.stringify(this.seletOnData));
                // 清除搜关键词状态
                this.seachKeywords('');
            }else{
                this.numData=0; //总条数归零
                // 处理数据   分页   转换成二维数组
                var arrs=[];
                var datas=JSON.parse(JSON.stringify(this.storeData)); 
                for(var i=0,len=datas.length;i<len;i++){
                    this.numData++ 
                    arrs.push({
                        name:datas[i].name,
                        area:datas[i].area,
                        id:datas[i].id,
                        check:false,
                        keyWords:true,
                    })
                }
                this.data_stores=arrs;
            }
        },
        methods: {
            // 输入框 change
            inputSeach(e){
                if(e==''){
                   this.seachKeywords(e) 
                }
            },
            // 搜索框按钮事件
            seachKeywords(e){
                this.numData=0; //总条数归零
                // 处理数据   
                var datas=JSON.parse(JSON.stringify(this.data_stores)); 
                var txt='';//文本中 
                var indexofs=true;//是否含有关键词
                for(var i=0,len=datas.length;i<len;i++){ 
                    txt=datas[i].name+datas[i].area;
                    indexofs=txt.indexOf(e);//文本中是否含有 关键词 
                    indexofs=indexofs<0?false:true; //如果查询不到 则为false;
                    if(indexofs){
                        this.numData++
                    }
                    this.data_stores[i].keyWords=indexofs;
                } 
            },
            // 公共提交数据 给父组件
            commonSubmit(){
                this.$emit('change',this.data_stores)
            },
            // 父级选中  全选  取消全选
            parentCheck(e){
                // 处理子集
                var data=this.data_stores;
                for(var i=0,len=data.length;i<len;i++){ 
                    this.data_stores[i].check=e 
                }
                if(e){
                    // 全选状态
                    this.indeterminate=false;//父级复选框是否有选中
                    this.checkedParent=true;//父级复选框选中状态
                }else{
                    // 全未选状态
                    this.indeterminate=false;//父级复选框是否有选中
                    this.checkedParent=false;//父级复选框选中状态
                }
                // 驱动视图更新
                this.index++;
                // 提交数据 给父组件
                this.commonSubmit();
            },
            commonSelected(){
                var data=this.data_stores;
                var checkNum=0;
                for(var i=0,len=data.length;i<len;i++){
                    if(data[i].check){
                        checkNum++
                    }
                }
                // 处理父级选中  非选中  全选状态
                if(checkNum==this.storeData.length){
                    // 全选状态
                    this.indeterminate=false;//父级复选框是否有选中
                    this.checkedParent=true;//父级复选框选中状态
                }else if(checkNum<=0){
                    // 全未选状态
                    this.indeterminate=false;//父级复选框是否有选中
                    this.checkedParent=false;//父级复选框选中状态
                }else{
                    // 部分选中状态
                    this.indeterminate=true;//父级复选框是否有选中
                    this.checkedParent=false;//父级复选框选中状态
                }
                // 驱动视图更新
                this.index++;
                // 提交数据 给父组件
                this.commonSubmit();
            },
        },
    }
</script>

<style scoped>
    .SelectStores_components{
        height:100%;
        padding:10px;
        box-sizing: border-box;
    }
    .header_s{
        height:40px;
    }
    .seachBox_s{
        height:40px;
        display: inline-block;
        float: right;
    }
    .content_components{
        height:calc(100% - 40px);
        box-shadow: 0 0 1px 1px #eee;
        border-radius: 10px;
        overflow: hidden;
    }
    .content_titles{
        height:40px;
        line-height: 40px;
    }
    .firstChild{
        padding:0 10px;
        box-sizing: border-box;
    }
    .content_Content_s{
        height:calc(100% - 40px);
        overflow-y: auto;
    }
    .list_box_a{
        height: 40px;
        line-height: 40px;
    }
    .content_Content_s .list_box_a:nth-child(odd){
        background:#f2f2f6;
    }
    .seachBox_num{
        line-height: 40px;
        margin-right:10px;
        color:#409EFF;
    }
</style>