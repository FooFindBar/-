<template>
    <div>
        <el-button type="primary" @click="dialogFormVisible = true">发起邀约</el-button>
        <el-dialog title="发送邀约" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="受访人姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="受访人电话" :label-width="formLabelWidth">
                    <el-input v-model="form.userphone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="受邀人姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.gname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="受邀人电话" :label-width="formLabelWidth">
                    <el-input v-model="form.gphone" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 日期选择 -->
                <el-form-item label="日期" :label-width="formLabelWidth">
                    <el-date-picker value-format='yyyy-MM-dd' v-model="dd" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <!-- 时间选择 -->
                <el-form-item label="来访时间" :label-width="formLabelWidth">
                    <el-time-select v-model="form.starttime" :picker-options="{
                    start: '09:00',
                    end: '14:00'
                }" placeholder="选择开始时间">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="结束时间" :label-width="formLabelWidth">
                    <el-time-select v-model="form.endtime" :picker-options="{
                    start: '09:00',
                    end: '18:00'
                }" placeholder="选择结束时间">
                    </el-time-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="upinvite">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dd: [],
                form: {
                    username:'',
                    userphone: '',
                    gname: '',
                    gphone: '',
                    starttime: '',
                    endtime: '',
                },
                formLabelWidth: '120px',
                dialogTableVisible: false,
                dialogFormVisible: false,
            }
        },
        methods: {
            async upinvite() {
                this.dialogFormVisible = false
                this.form.starttime = this.dd[0] + ' ' + this.form.starttime + ':00'
                this.form.endtime = this.dd[1] + ' ' + this.form.endtime + ':00'
                console.log(this.form);
                var { data: res } = await this.$http.post('appointment/mtoguests', this.form, {
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                });
                this.form={};
                console.log(this.form);
                if (res.code != 200) return this.$message.error('错了哦，邀请失败');
                this.$message.success('恭喜你，邀请成功');

            }
        },
        components: {

        }
    }
</script>

<style scoped>
    .el-dialog{
        margin-top: 10vh !important;
    }
    .el-form-item__content {
        height: 60px !important;
    }

    .el-form {
        width: 600px !important;
    }

    .el-select {
        width: 100% !important;
    }
</style>