
<template>
    <span class="align-l">
        <el-dialog
            :title="`แก้ไขผู้ใช้ ${user.username}`"
            :visible="true"
            width="420px"
            :before-close="handleClose"
        >
            <span>
                <el-form ref="form" :model="user" :rules="rules" label-width="120px" class="demo-form-inline">
                    <el-form-item label="ชื่อจริง :" prop="fname">
                        <el-input v-model="user.fname"></el-input>
                    </el-form-item>
                    <el-form-item label="นามสกุล :" prop="lname">
                        <el-input v-model="user.lname"></el-input>
                    </el-form-item>
                    <el-form-item label="เบอร์โทร :" prop="phone">
                        <el-input v-mask="'###-#######'" type="tel" v-model="user.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="ชื่อผู้ใช้ :" prop="username">
                        <el-input v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="รหัสผ่าน :" prop="password">
                        <el-input v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item label="ตำแหน่ง :" prop="position">
                        <el-select v-model="user.position" style="width: 100%;" placeholder="">
                            <el-option v-for="item in userPosition" :key="item.position_id" :value="Number(item.position_id)" :label="item.position_name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="สิทธ์ในระบบ :" prop="status">
                        <el-select v-model="user.status" style="width: 100%;" placeholder="">
                            <el-option v-for="item in userStatus" :key="item.id" :value="Number(item.id)" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">Cancel</el-button>
                <el-button type="primary" @click="saveUpdateUser">Confirm</el-button>
            </span>
        </el-dialog>
    </span>
</template>


<script>
    import userService from '@/services/user'
    export default {
        props: ['userPosition', 'userStatus', 'userInfo'],
        data() {
            return {
                rules: {
                    fname: [
                        { required: true, message: 'กรุณากรอกชื่อจริง', trigger: 'blur', },
                    ],
                    lname: [
                        { required: true, message: 'กรุณากรอกนามสกุล', trigger: 'blur', },
                    ],
                    phone: [
                        { required: true, message: 'กรุณากรอกเบอร์โทร', trigger: 'blur', },
                        { min: 10, max: 11, message: 'เบอร์โทรต้องยาว 9 - 10 หลัก', trigger: 'blur' },
                    ],
                    username: [
                        { required: true, message: 'กรุณากรอกชื่อผู้ใช้', trigger: 'blur', },
                    ],
                    password: [
                        { required: true, message: 'กรุณากรอกรหัสผ่าน', trigger: 'blur', },
                    ],
                    position: [
                        { required: true, message: 'กรุณาเลือกตำแหน่งผู้ใช้', trigger: 'blur', },
                    ],
                    status: [
                        { required: true, message: 'กรุณาเลือกสิทธ์ของผู้ใช้', trigger: 'blur', },
                    ],
                },
                user: {
                    id: null,
                    fname: '',
                    lname: '',
                    phone: '',
                    username: '',
                    password: '',
                    position: null,
                    status: null,
                },
            };
        },
        created() {
            this.user = {
                id: Number(this.userInfo.user_id),
                fname: this.userInfo.fistname,
                lname: this.userInfo.lastname,
                phone: this.userInfo.phone,
                username: this.userInfo.username,
                password: this.userInfo.password,
                position: Number(this.userInfo.position_id),
                status: Number(this.userInfo.user_status),
            };
        },
        methods: {
            reset() {
                this.user = {
                    id: null,
                    fname: '',
                    lname: '',
                    phone: '',
                    username: '',
                    password: '',
                    position: null,
                    status: null,
                };
            },
            async handleClose() {
                try {
                    const res = await this.$confirm('ข้อมูลจะที่กรอกจะหายไป ต้องการดำเนินการต่อหรือไม่?');
                if (res === 'confirm') {
                    this.reset();
                    this.$emit('closeDialog')
                }
                } catch (error) {}
                
            },
            async saveUpdateUser() {
                let valid = null
                await this.$refs.form.validate(val => {
                    valid = val;
                });
                if (valid === false) {
                    this.$alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึกข้อมูล', 'ข้อมูลไม่ครบถ้วน!', {
                        type: 'warning',
                        confirmButtonText: 'ตกลง',
                    });
                    return;
                }
                const newUser = new FormData();
                newUser.append('first_name', this.user.fname);
                newUser.append('last_name', this.user.lname);
                newUser.append('phone', this.user.phone.replace("-",""));
                newUser.append('user_name', this.user.username);
                newUser.append('user_pass', this.user.password);
                newUser.append('position_id', this.user.position);
                newUser.append('user_status', this.user.status);
                try {
                    let res = await userService.updateUser(newUser, this.user.id);
                    if (res.data.success) {
                        this.$alert(`แก้ไขผู้ใช้ของ ${this.user.fname} ${this.user.lname} เรียบร้อยแล้ว`, 'สำเร็จ!', {
                            type: 'success',
                            confirmButtonText: 'ตกลง',
                        });
                        this.reset();
                        this.$emit('addUserSuccess');
                        this.$emit('closeDialog')
                    }
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            }
        }
    };
</script>