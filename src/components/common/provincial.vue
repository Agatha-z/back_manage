<template>
    <div>
        <!-- 省份 -->
        <el-select style="width:120px" v-if="Level>=1" size="medium" v-model="P_provinces" placeholder="请选择省份" @change="provincesChange">
            <el-option :label="v" :value="k" v-for="(v,k,index) in provinces_Json" :key="index"></el-option>
        </el-select>
        <!-- 城市 -->
        <el-select v-if="Level>=2" style="width:120px"  size="medium" v-model="P_city" placeholder="请选择城市" @change="cityChange">
            <el-option :label="v" :value="k" v-for="(v,k,index) in city_Json[P_provinces]" :key="index"></el-option>
        </el-select>
        <!-- 地区 -->
        <el-select v-if="Level>=3" style="width:120px"  size="medium" v-model="P_areas" placeholder="请选择地区" @change="areaChange">
            <el-option :label="v" :value="k" v-for="(v,k,index) in area_Json[P_city]" :key="index"></el-option>
        </el-select>
    </div>
</template>

<script>
    import {city1, city2, city3} from '@/js/city.js'
    export default {
        props:['provinces_n','city_n','area_n','Level'],
        data(){
            return {
                P_provinces:'',
                P_city:'',
                P_areas:'',
                provinces_Json:{},
                city_Json:{},
                area_Json:{},
            }
        },
        created(){
            this.provinces_Json=city1
            this.city_Json=city2
            this.area_Json=city3
            if(!(this.provinces_n=='')){
                this.P_provinces=this.provinces_n
            }
            if(!(this.city_n=='')){
                this.P_city=this.city_n
            }
            if(!(this.area_n=='')){
                this.P_areas=this.area_n
            }
        },
        methods:{
            coomom(){
                var arr=[];
                arr.push({
                    name:city1[this.P_provinces],
                    value:this.P_provinces
                })
                // 
                if(!(this.P_city=='')){
                    arr.push({
                        name:city2[this.P_provinces][this.P_city],
                        value:this.P_city
                    })
                }
                // 
                if(!(this.P_areas=='')){
                    arr.push({
                        name:city3[this.P_city][this.P_areas],
                        value:this.P_areas
                    })
                }
                this.$emit('SelectChange',arr)
            },
            // 省份变化事件
            provincesChange(data){
                this.P_city='';
                this.P_areas='';
                
                this.coomom()
            },
            // 城市变化事件
            cityChange(data){
                this.P_areas='';
                
                this.coomom()
            },
            // 地区变化事件
            areaChange(data){
                this.coomom()
            }
        }
    }
</script>

<style scoped>

</style>