<template>
    <div class="footComponents" onselectstart="return false;">
        <!-- 驱动视图更新 -->
        <div v-show="false">{{index}}</div>
        <div class="lefts">
            <div class="titles_top">选择菜品库</div>
            <div class="scrollBox_checked">
                <div class="btn_radios" v-for="(v,k) in checkBoxData" :key="k" :class="{selectOn:selectIndex==k}" @click="selectIndex=k,index++">
                    {{v.name}}
                </div>
            </div>
        </div>
        <div class="rights">
            <div class="titles_top">包含的菜品</div>
            <div class="scrollBox_checked">
                <div v-for="(v,k) in checkBoxData[selectIndex].children" :key="k">
                    <div>
                    <p>
                        <el-checkbox @change="headerChange($event,k)" :indeterminate="v.indeterminate" v-model="v.check">{{v.name}}</el-checkbox>
                    </p>
                    <hr class="DottedLine">
                    </div>
                    <div>
                    <el-checkbox @change="childChange($event,x.id)" style="margin:5px 10px 0 0px" v-model="x.check" v-for="(x,j) in v.children" :key="j">{{x.name}}</el-checkbox>
                    </div> 
                    <div style="height:30px;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            selectData:{
                default(){
                    return [
                        {   name:'安少爷米线万达茂菜品',
                            children:[
                                {   name:'米线',
                                    children:[
                                        {name:'鸡丁米线',id:'1-1'},
                                        {name:'牛肉米线',id:'1-2'},
                                        {name:'牛肚米线',id:'1-3'},
                                        {name:'鸭血米线',id:'1-4'},
                                        {name:'酸菜米线',id:'1-5'},
                                        {name:'骨汤米线',id:'1-6'},
                                        {name:'花甲米线',id:'1-7'},
                                        {name:'剁椒鱼头米线',id:'1-8'},
                                    ]
                                },
                                {   name:'员工商品',
                                    children:[
                                        {name:'员工米线',id:'2-1'},
                                        {name:'员工酸辣粉',id:'2-2'},
                                        {name:'员工肉夹馍',id:'2-3'},
                                        {name:'员工骨汤米线',id:'2-4'},
                                        {name:'员工牛肉酸辣粉',id:'2-5'},
                                        {name:'员工鸡丁米线',id:'2-6'},
                                        {name:'员工花甲米线',id:'2-7'},
                                        {name:'员工剁椒鱼头米线',id:'2-8'},
                                    ]
                                },
                                {   name:'饮品类',
                                    children:[
                                        {name:'芬达',id:'3-1'},
                                        {name:'可口可乐',id:'3-2'},
                                        {name:'雪碧',id:'3-3'},
                                        {name:'农夫山泉',id:'3-4'},
                                        {name:'香芋奶茶',id:'3-5'},
                                        {name:'原味奶茶',id:'3-6'},
                                        {name:'珍珠奶茶',id:'3-7'},
                                        {name:'酸奶',id:'3-8'},
                                    ]
                                }
                            ]
                        },
                        {   name:'加盟店菜谱(2018改价后)',
                            children:[
                                {name:'米线',
                                    children:[
                                        {name:'加盟鸡丁米线',id:'4-1'},
                                        {name:'加盟牛肉米线',id:'4-2'},
                                        {name:'加盟牛肚米线',id:'4-3'},
                                        {name:'加盟鸭血米线',id:'4-4'},
                                        {name:'加盟酸菜米线',id:'4-5'},
                                        {name:'加盟骨汤米线',id:'4-6'},
                                        {name:'加盟花甲米线',id:'4-7'},
                                        {name:'加盟剁椒鱼头米线',id:'4-8'},
                                    ]
                                },
                                {   name:'员工商品',
                                    children:[
                                        {name:'加盟员工米线',id:'5-1'},
                                        {name:'加盟员工酸辣粉',id:'5-2'},
                                        {name:'加盟员工肉夹馍',id:'5-3'},
                                        {name:'加盟员工骨汤米线',id:'5-4'},
                                        {name:'加盟员工牛肉酸辣粉',id:'5-5'},
                                        {name:'加盟员工鸡丁米线',id:'5-6'},
                                        {name:'加盟员工花甲米线',id:'5-7'},
                                        {name:'加盟员工剁椒鱼头米线',id:'5-8'},
                                    ]
                                },
                                {   name:'饮品类',
                                    children:[
                                        {name:'加盟芬达',id:'6-1'},
                                        {name:'加盟可口可乐',id:'6-2'},
                                        {name:'加盟雪碧',id:'6-3'},
                                        {name:'加盟农夫山泉',id:'6-4'},
                                        {name:'加盟香芋奶茶',id:'6-5'},
                                        {name:'加盟原味奶茶',id:'6-6'},
                                        {name:'加盟珍珠奶茶',id:'6-7'},
                                        {name:'加盟酸奶',id:'6-8'},
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            HasChosen:{
                default(){
                    return ['1-1','1-2','1-3','1-4','1-5','1-6','1-7','1-8','2-1','3-1','4-1','5-1','6-1']
                }
            },
        },
        data(){
            return {
                index:0,//驱动视图更新
                checkBoxData:[],//真实渲染数据
                selectIndex:0,//左侧选中index
                SelectChosen:[],//已经选中状态
            }
        },
        created(){
            //  获取传递过来的已选中数据
            this.SelectChosen=JSON.parse(JSON.stringify(this.HasChosen));
            // 处理渲染数据
            var array=[];
            var data=JSON.parse(JSON.stringify(this.selectData))
            for(var i=0,len=data.length;i<len;i++){
                // 处理子集  
                var child=[];
                // 子集数据
                for(var x=0,len1=data[i].children.length;x<len1;x++){
                    var child_child=[];
                    // 子集的子集数据
                    for(var j=0,len2=data[i].children[x].children.length;j<len2;j++){
                        child_child.push({
                            name:data[i].children[x].children[j].name,
                            check:false,
                            id:data[i].children[x].children[j].id,
                        })
                    }
                    child.push({
                        name:data[i].children[x].name,
                        check:false,
                        indeterminate:false,
                        children:child_child
                    })
                }
                array.push({
                    name:data[i].name,
                    children:child,
                })
            }
            // 设置渲染数据
            this.checkBoxData=array;
            // 处理选中状态
            this.selectOnCommon()
        },
        methods:{
            // 公共提交给父组件事件
            commonSubmit(){
                this.$emit('changeCheck',this.SelectChosen)
            },
            // 子集复选框事件
            childChange(e,v){
                if(e){
                    // 选中
                    if(this.SelectChosen.indexOf(v)<0){
                        this.SelectChosen.push(v)
                    }
                }else{
                    // 取消选择
                    if(this.SelectChosen.indexOf(v)>=0){
                        this.SelectChosen.splice(this.SelectChosen.indexOf(v),1)
                    }
                }
                // 处理顶部选中状态
                this.selectOnCommon()
                // 传递数据
                this.commonSubmit()
            },
            // 顶部全选取消全选状态
            headerChange(e,k){
                var data_s=this.checkBoxData[this.selectIndex].children[k].children;
                for(var i=0,len=data_s.length;i<len;i++){
                    this.checkBoxData[this.selectIndex].children[k].indeterminate=false;
                    // 保存id
                    var ids=this.checkBoxData[this.selectIndex].children[k].children[i].id;
                    if(e){
                        // 全选
                        this.checkBoxData[this.selectIndex].children[k].children[i].check=true;
                        // 添加到已经选中状态数组中 如果没有则添加  反之不进行操作
                        if(this.SelectChosen.indexOf(ids)<0){
                            this.SelectChosen.push(ids)
                        }
                    }else{
                        // 取消全选
                        this.checkBoxData[this.selectIndex].children[k].children[i].check=false;
                        // 如果有此id 删除此id
                        if(this.SelectChosen.indexOf(ids)>=0){
                            this.SelectChosen.splice(this.SelectChosen.indexOf(ids),1)
                        }
                    }
                }
                // 驱动视图更新
                this.index++;
                // 传递数据
                this.commonSubmit()
            },
            // 公共处理全选非全选状态函数
            selectOnCommon(){
                // 已选中
                var selOn=this.SelectChosen;
                // 渲染数据
                var data_s=this.checkBoxData;
                for(var i=0,len=data_s.length;i<len;i++){
                    // 内层数据  模块
                    var classData=data_s[i].children;
                    // 内层分类
                    for(var j=0,len_1=classData.length;j<len_1;j++){
                        // 每个分类数据
                        var child_data=classData[j].children;
                        var sel_s=0;
                        for(var x=0,len_2=child_data.length;x<len_2;x++){
                            // 每个子集项目
                            for(var y=0,len_3=selOn.length;y<len_3;y++){
                                // console.log(selOn[y]==child_data[x].id)
                                if(selOn[y]==child_data[x].id){
                                    this.checkBoxData[i].children[j].children[x].check=true;
                                    sel_s++
                                }
                            }
                        }
                        if(sel_s>0&&sel_s<child_data.length){
                            // 如果部分选择
                            this.checkBoxData[i].children[j].indeterminate=true;
                            this.checkBoxData[i].children[j].check=false;
                        }else if(sel_s==child_data.length){
                            // 如果全选
                            this.checkBoxData[i].children[j].indeterminate=false;
                            this.checkBoxData[i].children[j].check=true;
                        }else if(sel_s==0){
                            // 如果一个没选中
                            this.checkBoxData[i].children[j].indeterminate=false;
                            this.checkBoxData[i].children[j].check=false;
                        }
                    }
                }
                // 驱动视图更新
                this.index++;
            }
        }
    }
</script>

<style scoped>
    .footComponents{
        width:100%;
        max-height:250px;
    }
    .footComponents .lefts,.footComponents .rights{
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        height: 100%;
        overflow: auto;
    }
    .footComponents .lefts{
        width:20%;
        text-align: right;
        border-right:1px solid #eee;
        padding-right:10px;
    }
    .footComponents .rights{
        width:79%;
        padding-left:10px;
    }
    .footComponents .titles_top{
        font-size:16px;
        line-height: 36px;
        color:#999;
    }
    .btn_radios{
        height:35px;
        background:#eee;
        border-radius: 5px;
        padding: 5px;
        margin-bottom:5px;
        cursor: pointer;
    }
    .footComponents .selectOn{
        background:#409eff;
        color:#fff;
    }
    .DottedLine{
        border:none;
        border-top:1px dashed #999;
        height:1px;
    }
    .scrollBox_checked{
        max-height: 214px;
        box-sizing: border-box;
        overflow:auto;
    }
</style>