<template>
    <div class="inlneBlock_all" :style="style_box">
        <input v-show="false" type="file" :id="bingdId_s" @change="updata">
        <label :for="bingdId_s" class="style_name_s" v-if="imgUrl==''">
            <i class="el-icon-plus"></i>
        </label>
        <div style="width:100%" class="showImgs" v-else>
            <img :src="imgUrl_s" alt="图片错误" title="上传的图片">
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            ajaxUrl:{ //上传链接地址
                default(){
                    return 'https://thyrsi.com/upload.php'
                }
            },
            imgUrl:{  //默认显示图片链接   如果有值  则显示图片 如果没有则不显示
                default(){
                    return ''
                }
            },
            style_box:{
                default(){
                    return 'width:100px;height:100px;'
                }
            },
            size:{  //文件最大限制 M单位 
                default(){
                    return 1
                }
            }
        },
        data(){
            return {
                MaxSize:0,//最大文件限制;
                bingdId_s:'',
                imgUrl_s:'',//图片链接
            }
        },
        created(){
            // 设置图片链接
            this.imgUrl_s=this.imgUrl;
            // 设置 最大文件限制  M  =>  b    
            this.MaxSize=this.size*1024*1024;//单位为b
            // 设置 24位 随机字符串    label 与  input   绑定     保证唯一    
            var text_ids='';
            var letter=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
            var character=['~','@','!','^','&','(',')','*','[',']','{','}','<','>','_','+','-','+','|','#']
            var index,index_s;
            for(var i=0,len=12;i<len;i++){
                index=parseInt(Math.random()*letter.length-1);
                index_s=parseInt(Math.random()*character.length-1);
                text_ids+=letter[index]+character[index_s];
            }
            this.bingdId_s=text_ids;
        },
        methods:{
            updata(event){  
                var fileObj=event.target.files[0];  // 文件对象  
                var fileSize=fileObj.size           // 文件大小 
                // 限制文件过大 
                if(fileSize>this.MaxSize){
                    this.$message.error('文件超过限制！请上传'+parseInt(this.size*1024)+'KB以内的文件');
                    // 清空 input 输入框 
                    event.target.value=null;
                    return;
                } 
                // 上传文件
                var parm=new FormData();
                parm.append('fileName',fileObj);
                // this.$axios({
                //     url:this.ajaxUrl,
                //     method:'post',
                //     data:parm
                // }).then((rel)=>{
                //     console.log(rel.data)
                // }).catch((rel)=>{
                //     console.log(rel)
                // })
            }
        }
    }
</script>

<style scoped>
    .style_name_s{
        border: 2px dashed #d9dadc;
        border-radius: 10px;
        display: block;
        width:100%;
        min-height: 100px;
        height:100%;
        color:#d9dadc;
        font-size:28px;
        position: relative;
        box-sizing: border-box;
    }
    .el-icon-plus{
        width:28px;
        height:28px;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom: 0;
        margin: auto;
    }
    .showImgs{
        height:100%;
    }
    .showImgs img{
        width:100%;
        height:100%;
    }
</style>