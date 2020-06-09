<template>
    <div>
        <!-- 搜索 -->
        <el-col :span='5'>
            <el-input @input='namechange' placeholder="请输入姓名" v-model="queryInfo.gname">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </el-col>
        <el-col :span='4'>
            <el-select v-model="ismtog" placeholder="请选择邀请类型" @change='mtogchange'>
                <el-option v-for="item in mtogs" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span='5'>
            <el-select v-model='isstatus' placeholder="请选择请选择邀请状态" @change='typechange'>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :offset='6' :span='2'>
            <!-- 发送邀请 -->
            <invite></invite>
        </el-col>
        <el-col :span='2'>
            <!-- 重置条件 -->
            <el-button @click='clearSelect' type="primary" plain>重置</el-button>
        </el-col>
        <!-- 数据展示 -->
        <el-table v-loading="loading" :row-style="{height:5+'px'}" :cell-style="{padding:5+'px'}" :data="appdata"
            style="width: 100%">
            <el-table-column label="被访人姓名" width="100">
                <template slot-scope="scope">
                    <el-tag type='info' size="medium">{{ scope.row.userName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="识别照片" width="100">
                <template slot-scope="scope">
                    <el-avatar shape="square" :src='imgpath(scope.row.imgPath)' :size="50"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="访客姓名" width="100">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.gname }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="访客电话" width="150">
                <template slot-scope="scope">
                    <i class="el-icon-phone-outline"></i>
                    <span style="margin-left: 10px">{{ scope.row.gphone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="访问有效期" width="350">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.startTime+'~'+scope.row.endTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="邀请/申请" width="100">
                <template slot-scope="scope">
                    <el-tag :type='scope.row.mtog==1?"warning":""' size="medium">{{ scope.row.mtog==1?"邀约":"申请"}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="预约状态" width="150">
                <template slot-scope="scope">
                    <el-tag :type='scope.row.status | statusFilter' size="medium">{{ scope.row.status | formatStata}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">`
                    <el-button :class='[scope.row.cardNum==null||scope.row.status!=0?"hidden":"show"]' type="primary" size="mini"
                        @click="handleEdit(scope.$index, scope.row);dialogFormVisible =true">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :total='total' @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-sizes="[5, 8, 10, 15]" :page-size="100" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 审批对话框 -->
        <el-dialog :visible.sync="dialogFormVisible" title="预约详情">
            <div style="display: flex;">
                <el-form label-width="100px" :model="form">
                    <el-form-item label='访客姓名'>
                        <el-input size='small' :value='form.gname' readonly></el-input>
                    </el-form-item>
                    <el-form-item label='访客电话'>
                        <el-input size='small' :value='form.gphone' readonly></el-input>
                    </el-form-item>
                    <el-form-item label='访客证件'>
                        <el-input size='small' :value='form.cardNum' readonly></el-input>
                    </el-form-item>
                    <el-form-item label='受访人姓名'>
                        <el-input size='small' :value='form.userName' readonly></el-input>
                    </el-form-item>
                    <el-form-item label='受访人电话'>
                        <el-input size='small' :value='form.userPhone' readonly></el-input>
                    </el-form-item>
                    <el-form-item label='邀请方式'>
                        <el-input size='small' :value='form.mtog==0?"申请":"邀请"' readonly></el-input>
                    </el-form-item>
                    <el-form-item label='访问有效期'>
                        <el-tag>{{form.startTime}}</el-tag> ~ <el-tag>{{form.endTime}}</el-tag>
                    </el-form-item>
                </el-form>
                <el-card header='识别头像' style="margin-left: 50px; width: 250px;" shadow="never">
                    <div>
                        <span style="font-size: 13px;">邀请方式：</span>
                        <el-tag>{{form.mtog==0?"申请":"邀请"}}</el-tag>
                    </div>
                    <el-avatar shape="square" :src="imgpath(form.imgPath)" :size="200"></el-avatar>
                </el-card>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-select class="dialog-footer-select" v-model="sh.groups" multiple placeholder="请选择组信息">
                    <el-option v-for="item in group" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="shclick">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import invite from '@/components/approve/invite.vue';

    export default {
        data() {
            return {
                appdata: [],
                group: [],
                mtogs: [{
                    value: '2',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '邀约'
                },
                {
                    value: '0',
                    label: '申请'
                }],
                options: [{
                    value: '9',
                    label: '全部'
                }, {
                    value: '0',
                    label: '等待审核'
                }, {
                    value: '1',
                    label: '通过审核'
                }, {
                    value: '2',
                    label: '审核未通过'
                }, {
                    value: '3',
                    label: '邀请过期'
                }],
                queryInfo: {
                    gname: '',
                    size: 5,
                    page: 1,
                    status: 0,
                    mtog: 2
                },
                total: 0,
                itemkey: '',
                ismtog: '',
                isstatus: '',
                loading: false,
                // 对话框用
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {imgPath:''},

                sh: {
                    groups: [],
                    gphone: '',
                    userphone: ''
                }
            }
        },
        filters: {
            // el-tag类型转换
            statusFilter(status) {
                const statusMap = {
                    0: '',
                    1: 'success',
                    2: 'danger',
                    3: 'info',
                }
                return statusMap[status]
            },
            // 状态显示转换
            formatStata(status) {
                const statusMap = {
                    0: '等待审核',
                    1: '通过审核',
                    2: '审核未通过',
                    3: '邀请过期'
                }
                return statusMap[status]
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getall();
            })
        },
        computed: {
            imgpath() {
                return function (image) {
                    if (image==null) return 'undefined'
                    let name=image.substring(image.lastIndexOf("/")+1);
                    console.log(name);
                    return 'http://140.143.151.98/'+name
                }
            }
        },
        methods: {
            //请求数据方法
            async getall() {
                this.loading = true
                //拿所有访客信息
                var { data: res } = await this.$http.get('appointment/findallguest01', { params: this.queryInfo });
                //拿所有访客组信息
                var { data: groupres } = await this.$http.get('/appointment/guestgroups');
                if (res.code != 200) return this.$message.error('数据请求失败');
                if (groupres.code != 200) return this.$message.error('组信息请求失败');
                this.group = groupres.data;
                this.appdata = res.data.data
                this.total = res.data.totalElements
                this.itemkey = Math.random()
                this.loading = false
                console.log(res);
            },
            //提交审核
            async shclick() {
                if (this.sh.groups == false) return this.$message.error('请选择分组');
                this.dialogFormVisible = false;
                console.log(this.sh);
                var res = await this.$http.post('/appointment/allowguest', this.sh);
                this.$data.sh.groups = []
                this.getall()
            },
            //清空下拉框
            clearSelect() {
                this.ismtog = '',
                    this.isstatus = '',
                    this.queryInfo = {
                        query: '',
                        size: 5,
                        page: 1,
                        status: 0,
                        mtog: 2
                    }
            },
            //查找条件改变
            namechange() {
                this.getall()
            },
            mtogchange() {
                this.queryInfo.mtog = this.ismtog
                this.getall()

            },
            typechange() {
                console.log(this.isstatus);
                this.queryInfo.status = this.isstatus
                console.log(this.queryInfo);
                this.getall()
            },
            //审核方法
            handleEdit(index, row) {
                console.log(index, row)
                this.form = row
                this.sh.gphone = row.gphone
                this.sh.userphone = row.userPhone
            },
            //分页每页条数变化
            handleSizeChange(val) {
                this.queryInfo.size = val
                this.getall()
            },
            //分页的页码变化
            handleCurrentChange(val) {
                this.queryInfo.page = val
                this.getall()
            }
        },
        components: {
            invite
        }
    }
</script>

<style scoped>
    .show{
        display:inline-block !important;
    }
    .hidden{
        display: none !important;
    }
    .el-form {
        width: 400px;
    }

    .el-card .el-avatar {
        display: block;
        margin: 30px auto;
    }

    .td-title {
        text-align: end;
        margin-left: 20px;
    }

    .dialog-footer-select {
        margin-right: 10px;
    }
    .el-avatar{
        display: block !important;
    }
    .el-avatar img{
        display: block !important;
        margin: 0px auto !important;
    }
</style>