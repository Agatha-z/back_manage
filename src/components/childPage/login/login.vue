<template>
    <div class="login">
        <div class="inputBox">
            <p class="title">系统登陆</p>
            <div class="input_s">
                <div>
                    <div class="top">
                        <img src="@/assets/png/user_s.png" alt="">
                    </div>
                </div>
                <div class="input_txt">
                    <input class="text_input" type="text" @keyup.enter="textEnter" v-model="userName" placeholder="请输入用户名">
                </div>
            </div>
            <div class="input_s">
                <div>
                    <div class="top">
                        <img src="@/assets/png/lock.png" alt="">
                    </div>
                </div>
                <div class="input_txt">
                    <input class="password_input" :type="show?'text':'password'" v-model="password" @keyup.enter="submits" placeholder="请输入账户密码">
                </div>
                <div class="eyes" @mousedown="show=true" @mouseup="show=false">
                    <img v-if="!show" src="@/assets/png/eyes1.png" alt="">
                    <img v-else src="@/assets/png/eyes2.png" alt="">
                </div>
            </div>
            <div style="margin-top:20px;">
                <el-button type="primary" size='medium' style="width:100%" @click="submits">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                show:false,//是否查看密码
                userName:'',//用户名
                password:'',//用户密码
                texts:false,//输入框是否获取焦点
            }
        },
        created(){
            if(!(localStorage.userName==undefined)){
                this.userName=localStorage.userName
            }
            if(!(localStorage.userPassword==undefined)){
                this.password=localStorage.userPassword
            }
        },
        mounted(){
            //默认输入框获取聚焦
            $('.text_input').focus()
        },
        methods:{
            //登录
            submits(){
                // 设置密码输入失去焦点
                $('.password_input').blur()
                if(this.userName==''){
                    this.$message({
                        message: '请输入用户名',
                        type: 'warning'
                    });
                    $('.text_input').focus()
                    return
                }else if(this.password==''){
                    this.$message({
                        message: '请输入账户密码',
                        type: 'warning'
                    });
                    $('.password_input').focus()
                    return
                }

                // 请求登陆接口
                // this.$axios({
                //     url:'/base/login',
                //     method:'post',
                //     params:{
                //         username:'admin',
                //         password:'123456',
                //     }
                // }).then((rel)=>{
                //     console.log(rel.data)
                //     // this.$router.push('/HomePage/postPermissions')
                // })

                // this.$axios.post('/base/login', {
                //     username:'admin',
                //     password:'123456',
                // })
                // .then(function (response) {
                //     console.log(response);
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });

                // $.ajax({
                //     url:'http://192.168.2.177:8888/base/login',
                //     // contentType:'application/json;charset=UTF-8',
                //     // jsonp:true,
                //     dataType:'jsonp',
                //     type:'POST',
                //     data:{
                //         username:'admin',
                //         password:'123456', 
                //     },
                //     success:function(rel){
                //         console.log(rel)
                //     },
                //     error:function(rel){
                //         console.log(rel)
                //     }
                // })

                // $.ajax({  
                //     type : "get",  
                //     async:false,  
                //     url : "http://192.168.2.177:8888/base/login",  
                //     dataType : "jsonp",//数据类型为jsonp  
                //     jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数  
                //     success : function(data){  
                //         console.log(data)
                //     },  
                //     error:function(data){  
                //         console.log(data);  
                //     }  
                // });  
                if(this.userName=='admin'&&this.password=='admin'){
                    this.$message({
                        message: '登录成功！',
                        type: 'success'
                    });
                    localStorage.userName=this.userName
                    localStorage.userPassword=this.password
                    // 跳转页面
                    this.$router.push('/HomePage/index')
                }else{
                    this.$message.error('账号或密码错误！');
                }
            },
            // 用户名回车事件 跳到密码输入框
            textEnter(){
                $('.password_input').focus()
            }
        }
    }
</script>

<style scoped>
    .login{
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #2d3a4b;
        color:#fff;
    }
    .inputBox{
        position: absolute;
        left: 0;
        right: 0;
        width: 420px;
        max-width: 100%;
        padding: 35px 35px 15px;
        margin: 120px auto;
    }
    .title{
        font-size:28px;
        text-align: center;
        font-weight: 600;
    }
    .input_s{
        height:50px;
        border-radius: 5px;
        border:1px solid hsla(0,0%,100%,.1);;
        margin-top:20px;
        background:#283443;
    }
    .input_s>div{
        display: inline-block;
    }
    .input_s .top{
        height:30px;
        padding:10px 20px 0 13px;
    }
    .input_s .top img{
        height:30px;
    }
    .input_s input{
        background:#283443;
        border:none;
        outline: none;
        color:#fff;
        font-size:16px;
        width:300px;
    }
    .input_txt{
        box-sizing: border-box;
        padding-top:3px;
        height:100%;
        vertical-align: top;
        line-height: 50px;
    }
    .eyes{
        vertical-align: top;
        margin-top:16px;
        margin-left:10px;
    }
    .eyes img{
        height:20px;
    }
    input::-webkit-input-placeholder {color:#889aa4;}
    input:-moz-placeholder {color:#889aa4}
    input:-ms-input-placeholder {color:#889aa4}
</style>