<template>
    <div class="commonHeader_style">
        <table class="table_order" style="width:100%;text-align:center">
            <tr>
                <td v-for="(v,k) in data_list" :key="k" :style="'width:'+(100/data_list.length)+'%'">
                    <div class="title_top">{{v.name}}</div>
                    <div class="title_bot">{{v.value}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props:{
            data_list:{
                default(){
                    return [
                        {name:'赠送数量',value:100},
                        {name:'金额',value:100},
                        {name:'退菜',value:100},
                        {name:'增菜',value:100},
                    ]
                }
            }    
        }
    }   
</script>

<style scoped>
    .commonHeader_style{
        padding:10px;
    }
    .title_bot,.title_top{
        color:#666;
    }
    .title_top{
        font-size:14px;
        padding-bottom:10px;
    }
    .title_bot{
        font-size:20px;
    }
    .table_order tr td{
        box-sizing: border-box;
        border-right:1px solid #dcdfe6;
    }
    .table_order tr td:last-child{
        border:none;
    }
</style>