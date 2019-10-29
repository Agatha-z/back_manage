<template>
 <!-- 查看详情页面 -->	
     <div class="checkDetail">
            <div style=" overflow: hidden;height:420px;">
                <div class="tab_content" style="overflow-y:auto;height:100%;">
                    <table class="table_list" border="0" cellspacing="0" >
                        <tr>	
                            <th></th>
                            <th>门店名称</th>
                            <th>原材料类别</th>
                            <th>原材料名称</th>
                            <th>库存单价(元)</th>
                            <th>门店订货价格(元)</th>
                            <th>状态</th>
                            <th>提交人</th>
                            <th>审核人</th>
                            <th>生效时间</th>
                        </tr>
                        <tr v-for="(v,k) in check_list" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.s_name}}</td>
                            <td>{{v.brand}}</td>
                            <td>{{v.attribute}}</td>
                            <td>{{v.uniot}}</td>
                            <td>{{v.di}}</td>
                            <td>{{v.num}}</td>
                            <td>{{v.name}}</td>
                            <td>{{v.named2}}</td>
                            <td>{{v.product1}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <!--打印、取消-->
            <div style="margin-top:20px;">
                <el-button type="primary">打印</el-button>
                <el-button type="info" @click="toParent">取消</el-button>
            </div>
        </div>
</template>
<script>
export default {
    data(){
        return{
            check_list:[//查看详情页数据				
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',}, 
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',}, 
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',}, 
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',},
                {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',name:'吴燕燕',named2:'吴燕燕',product1:'2018-12-19  18:09:49',}, 
            ]
        }
    },
    methods:{
        // 点击取消
        toParent(){
            this.$emit('detailFade');
        }
    }
};
</script>
<style  scoped>
</style>

