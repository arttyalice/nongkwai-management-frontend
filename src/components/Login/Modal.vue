<template>
    <div>
        <el-dialog
            title="เข้าสู่ระบบ"
            :visible.sync="centerDialogVisible"
            :close-on-click-modal="false"
            width="500px"
            center
        >
        <el-row :gutter="20">
            <el-col :span="8" :offset="8">
                <img src="@/static/logo.png" alt="" width="100%">
            </el-col>
        </el-row>
        <br>
        <span>
            <el-input placeholder="ชื่อผู้ใช้" v-model="userName" @keyup.enter.native="userLogin"></el-input>
            <el-input class="margin-t-md" type="password" placeholder="รหัสผ่าน" v-model="userPass" @keyup.enter.native="userLogin"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button style="width: 100%;" type="primary" @click="userLogin">Login</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    import userService from '@/services/user';
    export default {
        data() {
            return {
                centerDialogVisible: true,
                userName: '',
                userPass: '',
            };
        },
        methods: {
            async userLogin() {
                const data = new FormData();
                data.append('user_name', this.userName);
                data.append('user_pass', this.userPass);
                try {
                    const res = await userService.userLogin(data);
                    if (res.data.success === false) {
                       this.$alert('ชื่อผู้ใช้หรือ รหัสผ่านไม่ถูกต้องกรุณาตรวจสอบและเข้าสู่ระบบใหม่อีกครั้ง',
                       'ชื่อ/รหัสผ่าน ไม่ถูกต้อง!', {
                            type: 'error',
                            confirmButtonText: 'ตกลง',
                        });
                    } else {
                        localStorage.setItem('admin_user_data', JSON.stringify(res.data.user.user_id));
                        this.$router.push('/')
                        this.$emit('logInSuccess');
                    }
                } catch (error) {
                    throw(error);
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
        },
    };
</script>