
<template>
    <span>
        <el-row style="margin-bottom: 20px;">
            <el-col class="align-l" :span="12">
                <h2>แก้ไขข้อมูลผู้พิการ {{ `${person.person_firstname} ${person.person_lastname}` }}</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/disabled">
                    <el-button plain>
                        กลับ
                    </el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-form ref="form" :model="person" :rules="rules" label-width="140px" class="form-style">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="ประเภทความพิการ: " prop="titlename">
                        <el-row>
                            <el-radio-group v-model="disability.type">
                                <el-col :span="24">
                                    <el-radio label="ความพิการทางการเห็น" />
                                </el-col>
                                <el-col :span="24">
                                    <el-radio label="ความพิการทางสติปัญญา" />
                                </el-col>
                                <el-col :span="24">
                                    <el-radio label="ความพิการทางการได้ยินหรือสื่อความหมาย" />
                                </el-col>
                                <el-col :span="24">
                                    <el-radio label="ความพิการทางการเรียนรู้" />
                                </el-col>
                                <el-col :span="24">
                                    <el-radio label="ความพิการทางการเคลื่นไหวหรือร่างกาย" />
                                </el-col>
                                <el-col :span="24">
                                    <el-radio label="ความพิการทางออทิสติก" />
                                </el-col>
                                <el-col :span="24">
                                    <el-radio label="ความพิการทางจิตใจหรือพฤติกรรม" />
                                </el-col>
                            </el-radio-group>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="การรับสวัสดิการ: " prop="titlename">
                        <el-row>
                            <el-col :span="12">
                                <el-radio-group v-model="disability.info">
                                    <el-radio label="ยังไม่เคยได้รับเบี้ยยังชีพ" />
                                    <el-radio label="เคยได้รับ (เข้ามาอยู่ใหม่)" />
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col v-if="disability.info === 'เคยได้รับ (เข้ามาอยู่ใหม่)'" :span="12">
                    <el-form-item label="หมายเหตุ: " prop="titlename">
                        <el-input v-model="disability.detail" placeholder="เลือกวันเกิด"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="ประสงค์รับเบี้ยโดย: " prop="titlename">
                        <el-row>
                            <el-radio-group v-model="disability.getmoney_method">
                                <el-col :span="12">
                                    <el-radio :label="1">รับเงินสดด้วยตนเอง</el-radio>
                                </el-col>
                                <el-col :span="12">
                                    <el-radio :label="2">รับเงินสดโดยบุคคลที่ได้รับมอบอำนาจจากผู้มีสิทธิ/ผู้ดูแล</el-radio>
                                </el-col>
                                <el-col :span="12">
                                    <el-radio :label="3">โอนเข้าบัญชีเงินฝากธนาคารในนามผู้มีสิทธิ</el-radio>
                                </el-col>
                                <el-col :span="12">
                                    <el-radio :label="4">โอนเข้าบัญชีเงินฝากธนาคารในนามบุคคลที่ได้รับมอบอำนาจจากผู้มีสิทธิ/ผู้ดูแล</el-radio>
                                </el-col>
                            </el-radio-group>
                        </el-row>
                    </el-form-item>
                </el-col>
                
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset">ล้างข้อมูล</el-button>
            <el-button type="primary" @click="saveUpdatePerson">บันทึก</el-button>
        </span>
    </span>
</template>


<script>
    import moment from 'moment';
    import disableService from '@/services/disabled';
    import addressService from '@/services/address_prefence';
    export default {
        data() {
            return {
                provinceList: [],
                districtList: [],
                subDistrictList: [],
                center: { lat: 18.796143, lng: 98.979263 },
                rules: {
                    
                },
                disability: {
                    id: null,
                    type: '',
                    info: '',
                    detail: '',
                    getmoney_method: null
                },
                person: {},
            };
        },
        async created() {
            try {
                const res = await disableService.getPersonbyID(this.$router.currentRoute.params.pID);
                console.log(res)
                this.person = res
                this.disability = {
                    id: res.disability_id,
                    type: res.disability_type,
                    info: res.disability_info,
                    detail: res.disability_detail,
                    getmoney_method: parseInt(res.getmoney_id)
                }
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                });
                this.$router.push('/disabled');
            }
        },
        methods: {
            reset() {
                this.person = {
                    idCard: '',
                    titlename: '',
                    fname: '',
                    lname: '',
                    phone: '',
                    birthDate: '',
                    nationality: '',
                    person_status: '',
                    address: {
                        num: '',
                        moo: '',
                        soi: '',
                        road: '',
                        village: '',
                        Pid: null,
                        Did: null,
                        SDTid: null,
                        geo: {
                            lat: null,
                            lng: null,
                        },
                    },
                };
            },
            async saveUpdatePerson() {
                console.log(this.disability)
                let valid = null;
                await this.$refs.form.validate((val) => {
                    valid = val;
                });
                if (valid === false) {
                    this.$alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึกข้อมูล', 'ข้อมูลไม่ครบถ้วน!', {
                        type: 'warning',
                        confirmButtonText: 'ตกลง',
                    });
                    return;
                }
                const FormPerson = new FormData();
                FormPerson.append('id_card', this.$router.currentRoute.params.pID);
                FormPerson.append('disability_info', this.disability.info);
                FormPerson.append('disability_detail', this.disability.detail);
                FormPerson.append('disability_type', this.disability.type);
                FormPerson.append('getmoney_id', this.disability.getmoney_method);
                FormPerson.append('user_id', localStorage.getItem('admin_user_data'));
                try {
                    const res = await disableService.updatePerson(FormPerson, this.disability.id);
                    this.$alert(
                        `บันทึกข้อมูลเรียบร้อยแล้ว`,
                        'สำเร็จ!',
                        {
                            type: 'success',
                            confirmButtonText: 'ตกลง',
                        },
                    );
                    this.reset();
                    this.$router.push('/disabled');
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาดขณะบันทึกข้อมูล โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
        },
    };
</script>