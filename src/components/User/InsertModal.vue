
<template>
    <span class="align-l">
        <el-button type="primary" plain @click="dialogVisible = true">
          เพิ่มผู้ใช้
        </el-button>

        <el-dialog
            title="เพิ่มผู้ใช้"
            :visible.sync="dialogVisible"
            width="30%"
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
                        <el-input v-mask="'###-#######'" type="age" v-model="user.phone"></el-input>
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
                <el-button type="primary" @click="saveNewUser">Confirm</el-button>
            </span>
        </el-dialog>
    </span>
</template>


<script>
    import userService from '@/services/user'
    export default {
        props: ['userPosition', 'userStatus'],
        data() {
        return {
            dialogVisible: false,
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
                fname: '',
                lname: '',
                phone: undefined,
                username: '',
                password: '',
                position: null,
                status: null,
            },
        };
        },
        methods: {
            reset() {
                this.user = {
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
                    this.dialogVisible = false;
                }
                } catch (error) {}
                
            },
            async saveNewUser() {
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
                    let res = await userService.addNewUser(newUser);
                    if (res.data.success) {
                        this.$alert(`บันทึกข้อมูลผู้ใช้ของ ${this.user.fname} ${this.user.lname} เรียบร้อยแล้ว`, 'สำเร็จ!', {
                            type: 'success',
                            confirmButtonText: 'ตกลง',
                        });
                        this.reset();
                        this.$emit('addUserSuccess');
                        this.dialogVisible = false;
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