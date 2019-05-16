
<template>
    <span>
        <el-row style="margin-bottom: 20px;">
            <el-col class="align-l" :span="12">
                <h2>แก้ไขข้อมูลผู้สูงอายุ {{ `${person.person_firstname} ${person.person_lastname}` }}</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/elder">
                    <el-button plain>
                        กลับ
                    </el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-form ref="form" :model="person" :rules="rules" label-width="140px" class="form-style">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="การรับสวัสดิการ: " prop="titlename">
                        <el-row>
                            <el-col :span="12">
                                <el-radio-group v-model="elder.info">
                                    <el-radio label="ยังไม่เคยได้รับเบี้ยยังชีพ" />
                                    <el-radio label="เคยได้รับ (เข้ามาอยู่ใหม่)" />
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col v-if="elder.info === 'เคยได้รับ (เข้ามาอยู่ใหม่)'" :span="12">
                    <el-form-item label="หมายเหตุ: " prop="titlename">
                        <el-input v-model="elder.detail" placeholder="เลือกวันเกิด"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="ประสงค์รับเบี้ยโดย: " prop="titlename">
                        <el-row>
                            <el-radio-group v-model="elder.getmoney_method">
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
    import elderService from '@/services/elder';
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
                elder: {
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
                const res = await elderService.getPersonbyID(this.$router.currentRoute.params.pID);
                this.person = res
                this.elder = {
                    id: res.elders_id,
                    info: res.elders_info,
                    detail: res.elders_detail,
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
                console.log(this.elder)
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
                FormPerson.append('elders_info', this.elder.info);
                FormPerson.append('elders_detail', this.elder.detail);
                FormPerson.append('elder_type', this.elder.type);
                FormPerson.append('getmoney_id', this.elder.getmoney_method);
                FormPerson.append('user_id', localStorage.getItem('admin_user_data'));
                try {
                    const res = await elderService.updatePerson(FormPerson, this.elder.id);
                    this.$alert(
                        `บันทึกข้อมูลเรียบร้อยแล้ว`,
                        'สำเร็จ!',
                        {
                            type: 'success',
                            confirmButtonText: 'ตกลง',
                        },
                    );
                    this.reset();
                    this.$router.push('/elder');
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