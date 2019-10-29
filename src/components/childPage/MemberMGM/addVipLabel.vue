<!-- 添加会员标签 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style" onselectstart="return false">
            <!--  -->
            <p style="font-size:17px;font-weight:550">新建自动标签</p>
            <br>
            <!--  -->
            <div class="topSelected">
                <!--  -->
                <div class="box_contents">
                    <!--  -->
                    <div class="left inlneBlock_all">
                        标签名称
                    </div>
                    <div class="right inlneBlock_all">
                        <el-input v-model="labelName" style="width:300px;" size="small" placeholder="请输入内容"></el-input> 
                    </div>
                    <!--  -->
                </div>
                <br>
                <!--  -->
                <div class="box_contents">
                    <!--  -->
                    <div class="left inlneBlock_all" style="vertical-align: top;">
                        筛选条件
                    </div>
                    <div class="right inlneBlock_all right_boxs">
                        <div class="selecteds_box">
                            <p>请选需要择筛选条件</p>
                            <br>
                            <!--  -->
                            <div>
                                <div class="inlneBlock_all content_box_childLeft">用户资料</div>
                                <div class="inlneBlock_all content_box_childRight">
                                    <div class="inlneBlock_all select_iteams" 
                                    @click="iteamsEvent(theSelected(v.id),v.id)" 
                                    :class="{defaultSelected:theSelected(v.id)}" 
                                    v-for="(v,k) in userData" 
                                    :key="k"
                                    >{{v.name}}</div>
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="inlneBlock_all content_box_childLeft">用户资产</div>
                                <div class="inlneBlock_all content_box_childRight">
                                    <div class="inlneBlock_all select_iteams" 
                                    @click="iteamsEvent(theSelected(v.id),v.id)" 
                                    :class="{defaultSelected:theSelected(v.id)}" 
                                    v-for="(v,k) in userAssets" 
                                    :key="k"
                                    >{{v.name}}</div>
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="inlneBlock_all content_box_childLeft">用户资产</div>
                                <div class="inlneBlock_all content_box_childRight">
                                    <div class="inlneBlock_all select_iteams" 
                                    @click="iteamsEvent(theSelected(v.id),v.id)" 
                                    :class="{defaultSelected:theSelected(v.id)}" 
                                    v-for="(v,k) in tradingData" 
                                    :key="k"
                                    >{{v.name}}</div>
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="inlneBlock_all content_box_childLeft">
                                    筛选满足以下
                                </div>
                                <div class="inlneBlock_all content_box_childRight">
                                    <div style="float:left">
                                        <el-select v-model="conditions" size="mini" style="width:90px;" placeholder="请选择">
                                            <el-option label="所有" :value="0"></el-option>
                                            <el-option label="任意" :value="1"></el-option>
                                        </el-select>
                                        条件
                                    </div>
                                    <!--  -->
                                    <div style="float:right">
                                        <!-- 清空按钮 -->
                                        <el-button type="info" size="small" @click="defaultSel=[]">
                                            <i class="el-icon-refresh"></i>
                                            清空
                                        </el-button>
                                    </div>
                                    <!-- 清除浮动 -->
                                    <div style="clear:both"></div>
                                </div>
                            </div>
                            <!--  -->
                        </div>
                    </div>
                    <!--  -->
                </div>
                <!--  -->
            </div>
        </div>
        <br>
        <!--  -->
        <div class="commonHeader_style theEditorBox" v-if="defaultSel.length>0" onselectstart="return false">
            <!-- 性别 -->
            <div v-if="theSelected('1-1')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        性别
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-checkbox-group v-model="gender">
                            <el-checkbox :label="0">男</el-checkbox>
                            <el-checkbox :label="1">女</el-checkbox>
                            <el-checkbox :label="2">未知</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-1')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 年龄 -->
            <div v-if="theSelected('1-2')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        年龄
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-input-number size="mini" v-model="agemin" :min="0" :max="200" label="描述文字"></el-input-number>
                        至
                        <el-input-number size="mini" v-model="agemax" :min="0" :max="200" label="描述文字"></el-input-number>
                        岁
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-2')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 生日 -->
            <div v-if="theSelected('1-3')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        生日
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-date-picker
                        format='MM-dd'
                        size="small"
                        v-model="datamin"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                        至
                        <el-date-picker
                        size="small"
                        format='MM-dd'
                        v-model="datamax"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-3')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 地域 -->
            <div v-if="theSelected('1-4')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="padding-top:8px;align-self:flex-start;">
                        地域
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <div>
                            <el-button size="mini" @click="bounced=true,hierarchy={index:1,title:'添加地域'}">
                                <i class="el-icon-plus addArea_s"></i> 添加地域
                            </el-button>
                        </div>
                        <!--  -->
                        <div>
                            <el-tag v-for="(v,k) in areaAddData" 
                            style="margin:10px 10px 0 0;"
                            :key="k" @close="areaAddData.splice(k,1)" 
                            closable type="warning"
                            >{{v.name}}</el-tag>
                        </div>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-4')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 手机号 -->
            <div v-if="theSelected('1-5')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        手机号
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s"> 
                        <el-radio-group v-model="phoneNumber">
                            <el-radio :label="0">有</el-radio>
                            <el-radio :label="1">没有</el-radio>
                        </el-radio-group>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-5')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 是否关注 -->
            <div v-if="theSelected('1-6')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        是否关注
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-radio-group v-model="FocusOn">
                            <el-radio :label="0">已关注</el-radio>
                            <el-radio :label="1">未关注</el-radio>
                        </el-radio-group>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-6')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 关注时间 -->
            <div v-if="theSelected('1-7')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        关注时间
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-date-picker
                        size="small"
                        v-model="dateAll"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-7')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 关注门店 -->
            <div v-if="theSelected('1-8')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="padding-top:7px;align-self:flex-start;">
                        关注门店
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-checkbox-group v-model="checkList" style="display: inline-block;padding:7px 0;">
                            <el-checkbox :label="0">总店</el-checkbox>
                            <el-checkbox :label="1">部分门店（不含总店）</el-checkbox>
                        </el-checkbox-group>
                        <!--  -->
                        <el-button v-show="checkList.indexOf(1)>=0" size="mini" @click="bounced=true,hierarchy={index:2,title:'选择通用门店'},seletOnData=receive">
                            <i class="el-icon-plus addArea_s"></i> 选择门店
                        </el-button>
                        <!--  -->
                        <div>
                            <el-tag v-for="(v,k) in addStoreData" 
                            style="margin:10px 10px 0 0;"
                            :key="k" @close="addStoreData.splice(k,1)" 
                            closable type="warning"
                            >{{v.name}}</el-tag>
                        </div>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-8')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 是否领卡 -->
            <div v-if="theSelected('1-9')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        是否领卡
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-radio-group v-model="receiveCard">
                            <el-radio :label="0">已领卡</el-radio>
                            <el-radio :label="1">未领卡</el-radio>
                        </el-radio-group>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-9')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 领卡时间 -->
            <div v-if="theSelected('1-10')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        领卡时间
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-date-picker
                        size="small"
                        v-model="receiveCardTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-10')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 领卡门店 -->
            <div v-if="theSelected('1-11')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="padding-top:7px;align-self:flex-start;">
                        领卡门店
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-checkbox-group v-model="storcheckList" style="display: inline-block;padding:7px 0;">
                            <el-checkbox :label="0">总店</el-checkbox>
                            <el-checkbox :label="1">部分门店（不含总店）</el-checkbox>
                        </el-checkbox-group>
                        <!--  -->
                        <el-button v-show="storcheckList.indexOf(1)>=0" size="mini" @click="bounced=true,hierarchy={index:3,title:'选择适用门店'},seletOnData2=receive2">
                            <i class="el-icon-plus addArea_s"></i> 选择门店
                        </el-button>
                        <!--  -->
                        <div>
                            <el-tag v-for="(v,k) in addStoreData2" 
                            style="margin:10px 10px 0 0;"
                            :key="k" @close="addStoreData2.splice(k,1)" 
                            closable type="warning"
                            >{{v.name}}</el-tag>
                        </div>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-11')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 领卡渠道 -->
            <div v-if="theSelected('1-12')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        领卡渠道
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-checkbox-group v-model="channel" style="display: inline-block;padding:7px 0;">
                            <el-checkbox :label="0">公众号</el-checkbox>
                            <el-checkbox :label="1">小程序</el-checkbox>
                            <el-checkbox :label="2">导入/新增</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('1-12')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 可用余额 -->
            <div v-if="theSelected('2-1')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        可用余额
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-input-number size="mini" v-model="Availablemin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="Availablemax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        元
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('2-1')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 可用积分 -->
            <div v-if="theSelected('2-2')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        可用积分
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-input-number size="mini" v-model="integralmin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="integralmax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        积分
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('2-2')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 消费次数 -->
            <div v-if="theSelected('3-1')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        可用积分
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-select size="mini" v-model="NumberDays" placeholder="请选择" style="width:100px;">
                            <el-option label="7" :value="7"> </el-option>
                            <el-option label="15" :value="15"> </el-option>
                            <el-option label="45" :value="45"> </el-option>
                            <el-option label="60" :value="60"> </el-option>
                            <el-option label="90" :value="90"> </el-option>
                            <el-option label="180" :value="180"> </el-option>
                            <el-option label="所有" :value="0"> </el-option>
                        </el-select>
                        &nbsp;天内累计消费&nbsp; 
                        <el-input-number size="mini" v-model="consumptionmin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="consumptionmax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        次
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-1')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 上次消费距今天数 -->
            <div v-if="theSelected('3-2')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        上次消费距今天数
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-input-number size="mini" v-model="consumptionmin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="consumptionmax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        天
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-2')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 累计消费金额 -->
            <div v-if="theSelected('3-3')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        累计消费金额
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-select size="mini" v-model="NumberDays2" placeholder="请选择" style="width:100px;">
                            <el-option label="7" :value="7"> </el-option>
                            <el-option label="15" :value="15"> </el-option>
                            <el-option label="45" :value="45"> </el-option>
                            <el-option label="60" :value="60"> </el-option>
                            <el-option label="90" :value="90"> </el-option>
                            <el-option label="180" :value="180"> </el-option>
                            <el-option label="所有" :value="0"> </el-option>
                        </el-select>
                        &nbsp;天内累计消费&nbsp; 
                        <el-input-number size="mini" v-model="cumulativemin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="cumulativemax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        元
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-3')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 平均消费金额 -->
            <div v-if="theSelected('3-4')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        平均消费金额
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-select size="mini" v-model="NumberDays3" placeholder="请选择" style="width:100px;">
                            <el-option label="7" :value="7"> </el-option>
                            <el-option label="15" :value="15"> </el-option>
                            <el-option label="45" :value="45"> </el-option>
                            <el-option label="60" :value="60"> </el-option>
                            <el-option label="90" :value="90"> </el-option>
                            <el-option label="180" :value="180"> </el-option>
                            <el-option label="所有" :value="0"> </el-option>
                        </el-select>
                        &nbsp;天内累计消费&nbsp; 
                        <el-input-number size="mini" v-model="averagemin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="averagemax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        元
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-4')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 充值次数 -->
            <div v-if="theSelected('3-5')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        充值次数
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-select size="mini" v-model="NumberDays4" placeholder="请选择" style="width:100px;">
                            <el-option label="7" :value="7"> </el-option>
                            <el-option label="15" :value="15"> </el-option>
                            <el-option label="45" :value="45"> </el-option>
                            <el-option label="60" :value="60"> </el-option>
                            <el-option label="90" :value="90"> </el-option>
                            <el-option label="180" :value="180"> </el-option>
                            <el-option label="所有" :value="0"> </el-option>
                        </el-select>
                        &nbsp;天内累计消费&nbsp; 
                        <el-input-number size="mini" v-model="chargemin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="chargemax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        次
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-5')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 上次充值距今天数 -->
            <div v-if="theSelected('3-6')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        上次充值距今天数
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-input-number size="mini" v-model="topUpDaymin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="topUpDaymax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        天
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-6')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 平均实充金额 -->
            <div v-if="theSelected('3-7')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        平均实充金额
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-select size="mini" v-model="NumberDays5" placeholder="请选择" style="width:100px;">
                            <el-option label="7" :value="7"> </el-option>
                            <el-option label="15" :value="15"> </el-option>
                            <el-option label="45" :value="45"> </el-option>
                            <el-option label="60" :value="60"> </el-option>
                            <el-option label="90" :value="90"> </el-option>
                            <el-option label="180" :value="180"> </el-option>
                            <el-option label="所有" :value="0"> </el-option>
                        </el-select>
                        &nbsp;天内累计消费&nbsp; 
                        <el-input-number size="mini" v-model="fillingmin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="fillingmax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        元
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-7')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 累计实充金额 -->
            <div v-if="theSelected('3-8')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        累计实充金额
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-select size="mini" v-model="NumberDays6" placeholder="请选择" style="width:100px;">
                            <el-option label="7" :value="7"> </el-option>
                            <el-option label="15" :value="15"> </el-option>
                            <el-option label="45" :value="45"> </el-option>
                            <el-option label="60" :value="60"> </el-option>
                            <el-option label="90" :value="90"> </el-option>
                            <el-option label="180" :value="180"> </el-option>
                            <el-option label="所有" :value="0"> </el-option>
                        </el-select>
                        &nbsp;天内累计消费&nbsp; 
                        <el-input-number size="mini" v-model="TheActualmin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="TheActualmax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        元
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-8')">删除</div>
                </div>
                <hr>
            </div>
            <!-- 累计获取积分 -->
            <div v-if="theSelected('3-9')">
                <div class="flex_centers">
                    <div class="inlneBlock_all content_box_childLeft" style="vertical-align: middle;padding-top:0">
                        累计获取积分
                    </div>
                    <div class="inlneBlock_all content_box_childRight content_box_childRight_s">
                        <el-select size="mini" v-model="NumberDays7" placeholder="请选择" style="width:100px;">
                            <el-option label="7" :value="7"> </el-option>
                            <el-option label="15" :value="15"> </el-option>
                            <el-option label="45" :value="45"> </el-option>
                            <el-option label="60" :value="60"> </el-option>
                            <el-option label="90" :value="90"> </el-option>
                            <el-option label="180" :value="180"> </el-option>
                            <el-option label="所有" :value="0"> </el-option>
                        </el-select>
                        &nbsp;天内累计消费&nbsp; 
                        <el-input-number size="mini" v-model="ToObtainmin" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;至&nbsp; 
                        <el-input-number size="mini" v-model="ToObtainmax" :min="-1" label="描述文字"></el-input-number>
                        &nbsp;
                        积分
                        &nbsp;
                        <span style="color:#999">
                            注：-1表示无限制
                        </span>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="delete_cancal" @click="deleteIteam('3-9')">删除</div>
                </div>
                <hr>
            </div>
            <!--  -->
        </div>
        <!--  -->
        <br v-if="defaultSel.length>0">
        <div class="commonHeader_style" style="text-align:center">
            <el-button type="success" size="medium" @click="save">
                <i class="el-icon-download"></i>
                保存
            </el-button>
            <el-button type="info" size="medium" @click="cancel">
                <i class="el-icon-circle-close-outline"></i>
                取消
            </el-button>
        </div>
        <!-- 模态框 -->
        <ModalDialog 
        :model="bounced" 
        @cancel="bounced=false" 
        :title="hierarchy.title" 
        @confirm="okMdal(hierarchy.index)" 
        style_name="height:642px;max-height:642px;">
            <!-- 添加地域 -->
            <div v-if="hierarchy.index==1">
                <br>
                <p style="text-align:center;color:red;">注：可只添加省份</p>
                <br>
                <div style="text-align:center">
                    <span>请选择:</span>
                    &nbsp;&nbsp;
                    <div class="inlneBlock_all">
                        <provincial @SelectChange="addAreaChange" :Level="2" :key="indexs"></provincial>
                    </div>
                </div>
            </div>
            <!-- 选择通用门店 -->
            <div v-if="hierarchy.index==2" style="height:100%">
                <SelectStores @change="storeData($event,1)" :seletOnData="seletOnData"></SelectStores>
            </div>
            <!-- 领卡适用门店 -->
            <div v-if="hierarchy.index==3" style="height:100%">
                <SelectStores @change="storeData($event,2)" :seletOnData="seletOnData2"></SelectStores>
            </div>
            <!--  -->
        </ModalDialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                NumberDays7:7,//天数内获取积分
                ToObtainmin:0,//获取积分
                ToObtainmax:0,//获取积分
                NumberDays6:7,//天数内实充金额
                TheActualmin:0,//实充金额
                TheActualmax:0,//实充金额
                NumberDays5:7,//天数内平均实充金额
                fillingmin:0,//平均实充金额
                fillingmax:0,//平均实充金额
                NumberDays4:7,//天内充值次数
                topUpDaymin:0,//上次充值距今天数
                topUpDaymax:0,//上次充值距今天数
                chargemin:0,//充值次数
                chargemax:0,//充值次数
                NumberDays3:7,//天内平均消费金额
                averagemin:0,//平均消费金额
                averagemax:0,//平均消费金额
                NumberDays2:7,//天内累计消费金额
                cumulativemin:0,//累计消费金额
                cumulativemax:0,//累计消费金额
                consumptionmin:0,//上次消费距今天数
                consumptionmax:0,//上次消费距今天数
                NumberDays:7,//天内消费次数
                consumptionmin:0,//消费次数
                consumptionmax:0,//消费次数
                integralmin:0,//可用积分
                integralmax:0,//可用积分
                Availablemin:0,//可用余额
                Availablemax:0,//可用余额
                channel:[],//领卡渠道 复选框
                receive2:[],// 选择领卡门店组件 保存 的数据
                addStoreData2:[],//添加添加领卡门店 数据
                seletOnData2:[],//选择领卡门店组件 返回 的数据
                storcheckList:[],//领卡门店单选框绑定值
                receiveCardTime:'',//领卡时间
                receiveCard:0,//是否领卡
                addStoreData:[],//添加添加门店 数据
                seletOnData:[],//选择门店组件 返回 的数据
                receive:[],// 选择门店组件 保存 的数据
                areaAddData:[],// 添加地域绑定数据
                checkList:[],//关注门店
                dateAll:'',//关注时间
                FocusOn:0,//是否关注
                phoneNumber:'',//是否有手机号
                datamin:'',//生日至
                datamax:'',//生日至
                agemin:0,//年龄至
                agemax:0,//年龄至
                gender:[],//性别
                conditions:0,//筛选满足条件
                defaultSel:[],//选中的项目
                labelName:'',//标签名称
                areaStaging:{},// 地区数据待添加
                userData:[ //用户资料
                    {name:'姓别',id:'1-1'},
                    {name:'年龄',id:'1-2'},
                    {name:'生日',id:'1-3'},
                    {name:'地域',id:'1-4'},
                    {name:'手机号',id:'1-5'},
                    {name:'是否关注',id:'1-6'},
                    {name:'关注时间',id:'1-7'},
                    {name:'关注门店',id:'1-8'},
                    {name:'是否领卡',id:'1-9'},
                    {name:'领卡时间',id:'1-10'},
                    {name:'领卡门店',id:'1-11'},
                    {name:'领卡渠道',id:'1-12'},
                ],
                userAssets:[ //用户资料
                    {name:'可用余额',id:'2-1'},
                    {name:'可用积分',id:'2-2'},
                ],
                tradingData:[ //用户资料
                    {name:'消费次数',id:'3-1'},
                    {name:'上次消费距今天数',id:'3-2'},
                    {name:'累计消费金额',id:'3-3'},
                    {name:'平均消费金额',id:'3-4'},
                    {name:'充值次数',id:'3-5'},
                    {name:'上次充值距今天数',id:'3-6'},
                    {name:'平均实充金额',id:'3-7'},
                    {name:'累计实充金额',id:'3-8'},
                    {name:'累计获取积分',id:'3-9'},

                ],
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                bounced:false,//模态框是否显示
                hierarchy:{index:-1,title:'模态框'},
                indexs:0,//刷新地区选择组件
            }
        },
        computed:{
            theSelected(){
                return (e)=>{
                    if(this.defaultSel.indexOf(e)<0){
                        return false
                    }else{
                        return true
                    }
                }
            }
        },
        created(){
           console.log('添加手动会员标签')
        },
        methods:{
            // 选择门店 返回数据
            storeData(data,e){
                console.log(data,e)
                // 此处设置保证 再次打开此组件时保证选中状态
                if(e==1){
                    this.receive=data;
                }else{
                    this.receive2=data;
                }
            },
            // 添加地域省市联动事件
            addAreaChange(data){
                // this.areaStaging   省市暂存
                var name_s=[],value_s=[]
                for(var i=0,len=data.length;i<len;i++){
                    name_s.push(data[i].name);
                    value_s.push(data[i].value);
                }
                // 处理数据  将数组拼接成字符串
                name_s=name_s.join('-');
                value_s=value_s.join('-');
                this.areaStaging={
                    name:name_s,
                    value:value_s
                }
            },
            // 模态框确定事件
            okMdal(e){
                // 添加区域确认事件
                if(e==1){
                    // 省市选中的值  this.areaStaging
                    // 地域标签数组
                    var area_data=this.areaAddData;
                    // 处理 数组中含有相同的地域则提示用户   不添加到地域标签数组中
                    for(var i=0,len=area_data.length;i<len;i++){
                        if(area_data[i].name===this.areaStaging.name){
                            this.$message({
                                message: '地域标签中已经含有此地域数据，请重新选择',
                                type: 'warning'
                            });
                            // 刷新地区选择组件
                            this.indexs++;
                            // 阻断 此次循环  处理结束
                            return;
                        }
                    }
                    // 添加到地域标签中
                    this.areaAddData.push(this.areaStaging)
                }else if(e==2){
                    var data=this.receive;
                    var array=[];//保存选中的 值
                    for(var i=0,len=data.length;i<len;i++){
                        if(data[i].check){
                            array.push(data[i])
                        }
                    }
                    this.addStoreData=JSON.parse(JSON.stringify(array))
                }else if(e==3){
                    var data=this.receive2;
                    var array=[];//保存选中的 值
                    for(var i=0,len=data.length;i<len;i++){
                        if(data[i].check){
                            array.push(data[i])
                        }
                    }
                    this.addStoreData2=JSON.parse(JSON.stringify(array))
                }

                // 关闭模态框
                this.bounced=false;
            },
            // 删除子集
            deleteIteam(e){
                this.defaultSel.splice(this.defaultSel.indexOf(e),1)
            },
            // 子集点击事件
            iteamsEvent(e,id){
                if(!e){
                    this.defaultSel.push(id)
                }else{
                    this.defaultSel.splice(this.defaultSel.indexOf(id),1)
                }
            },
            // 保存
            save(){
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
                this.$router.push('/HomePage/vipLabel')
            },
            // 取消按钮
            cancel(){
                this.$confirm('取消后,您本次操作所做的修改将不会保存,确定要取消么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/HomePage/vipLabel')
                })
            }
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .topSelected{
        padding-left:110px;
    }
    .box_contents .left{
        width:120px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 10px;
    }
    .box_contents .right_boxs{
        width:calc(100% - 125px);
    }
    .selecteds_box{
        padding:20px;
        background:#f2f2f6;
        border-radius: 5px;
    }
    .content_box_childLeft{
        width:100px;
        text-align: right;
        vertical-align: top;
        padding-top:17px;
    }
    .content_box_childRight{
        padding:10px;
        width: calc(100% - 130px);
    }
    .content_box_childRight_s{
        padding:0 10px;
        width: calc(100% - 165px);
    }
    .select_iteams{
        padding:7px 20px;
        text-align: center;
        border-radius:5px;
        border:1px solid #e2e2e2;
        color:#666;
        margin-right:10px;
        margin-bottom: 10px;
        cursor: pointer;
        background:#fff;
    }
    .defaultSelected{
        border:1px solid #409EFF;
        color:#409EFF;
    }
    .theEditorBox{
        padding-left:273px;
    }
    .flex_centers{
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
    hr{
        color:#eee;
        height:1px;
        border:0px;
        border-top:1px solid #eee;
        margin:10px 0;
        padding:0px;
        overflow:hidden;
    }
    .delete_cancal{
        float:right;
        color:#409EFF;
        cursor: pointer;
    }
    .addArea_s{
        font-weight: 600;
        font-size:14px;
        color:#2589ff;
    }
</style>