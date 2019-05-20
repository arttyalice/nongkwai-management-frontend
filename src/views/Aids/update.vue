
<template>
    <span>
        <el-row>
            <el-col class="align-l" :span="12">
                <h2>แก้ไขข้อมูลผู้ป่วยโรคเอดส์ {{ `${person.person_firstname} ${person.person_lastname}` }}</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/aid">
                    <el-button plain>
                        กลับ
                    </el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-form ref="form" :model="person" :rules="rules" label-width="150px" class="form-style">
            <el-row style="margin-top: 20px;">
                <el-col :span="12">
                    <b>รหัสบัตรประชาชน</b>: {{ person.id_card }}
                </el-col>
                <el-col :span="12">
                    <b>ชื่อ</b>: {{ `${person.person_titlename} ${person.person_firstname}\t${person.person_lastname}` }}
                </el-col>
            </el-row>
            <!-- Habitant info -->
            <el-row>
                <h2>ที่พักอาศัย</h2>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="ผู้ครอบครอง: " prop="text" style="align: left;">
                        <el-radio-group v-model="aid.habitOwner">
                            <el-radio border label="เป็นของตนเอง" />
                            <el-radio border label="เป็นของผู้อื่น" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="aid.habitOwner === 'เป็นของตนเอง'">
                <el-col :span="24">
                    <el-form-item label="สภาพที่อยู่: " prop="text" style="align: left;">
                        <el-radio-group v-model="aid.habitDetail">
                            <el-radio label="ชำรุดทรุดโทรม" />
                            <el-radio label="ชำรุดทรุดโทรมบางส่วน" />
                            <el-radio label="มั่นคงถาวร" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="aid.habitOwner === 'เป็นของผู้อื่น'">
                <el-col :span="12">
                    <el-form-item label="รายละเอียด: " prop="text" style="align: left;">
                        <el-input v-model="aid.habitDetail" placeholder="ชื่อ - นามสกุล, ความสัมพันธ์ ผู้ครอบครอง"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="การพักอาศัย: " prop="text" style="align: left;">
                        <el-radio-group v-model="aid.living">
                            <el-radio border label="ลำพัง" />
                            <el-radio border label="กับผู้อื่น" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="รายละเอียด: " prop="text" style="align: left;">
                        <el-input v-model="aid.livingDetail" placeholder="รายละเอียดการพักอาศัย"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- Transport info -->
            <el-row>
                <h2>ความสะดวกในการเดินทาง</h2>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="สถานที่ใกล้ที่สุด: " prop="text" style="align: left;">
                        <el-radio-group v-model="aid.nearby">
                            <el-radio border label="เพื่อนบ้าน" />
                            <el-radio border label="ชุมชน" />
                            <el-radio border label="หน่วยงานรัฐ" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ระยะทาง: " prop="text" style="align: left;">
                        <el-input-number style="width: 100%;" class="left-number" :controls="false" v-model="aid.nearbyDistant" placeholder="ระยะทาง"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="สะดวกหรือไม่: " prop="text" style="align: left;">
                        <el-radio-group v-model="aid.nearbyCheck">
                            <el-radio border label="สะดวก" />
                            <el-radio border label="ไม่สะดวก" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="หมายเหตุ: " prop="text" style="align: left;">
                        <el-input v-model="aid.nearbyDetail"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- Symtom info -->
            <el-row>
                <h2>ข้อมูลการติดเชื้อ</h2>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="ระยะเวลาป่วย(ปี): " prop="text" style="align: left;">
                        <el-input-number v-mask="'####'" style="width: 100%;" class="left-number" :controls="false" v-model="aid.sick" placeholder="ระยะเวลาป่วย"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ลักษณะอาการป่วย: " prop="text" style="align: left;">
                        <el-input v-model="aid.sickDetail" placeholder="ลักษณะอาการป่วย"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label-width="200px" label="การช่วยเหลือจากหน่วยงาน: " prop="text" style="align: left;">
                        <el-input style="width: 100%;" v-model="aid.assist" placeholder="การช่วยเหลือของหน่วยงานอื่นๆ"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="รายได้(เดือน): " prop="text" style="align: left;">
                        <el-input type="number" style="width: 100%;" v-model="aid.income" placeholder="รายได้"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="แหล่งที่มา: " prop="text" style="align: left;">
                        <el-input v-model="aid.incomeDetail" placeholder="รับจ้าง, ค้าขาย"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="รายจ่าย(เดือน): " prop="text" style="align: left;">
                        <el-input type="number" style="width: 100%;" v-model="aid.expense" placeholder="รายจ่าย"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="สาเหตุ: " prop="text" style="align: left;">
                        <el-input v-model="aid.expenseDetail" placeholder="ค่าอาหาร, เดินทาง, รักษา"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="ประสงค์รับเบี้ยโดย: " prop="text">
                        <el-row>
                            <el-radio-group v-model="aid.get_money">
                                <el-col :span="12">
                                    <el-radio :value="1" label="รับเงินสดด้วยตนเอง" />
                                </el-col>
                                <el-col :span="12">
                                    <el-radio :value="2" label="รับเงินสดโดยบุคคลที่ได้รับมอบอำนาจจากผู้มีสิทธิ/ผู้ดูแล" />
                                </el-col>
                                <el-col :span="12">
                                    <el-radio :value="3" label="โอนเข้าบัญชีเงินฝากธนาคารในนามผู้มีสิทธิ" />
                                </el-col>
                                <el-col :span="12">
                                    <el-radio :value="4" label="โอนเข้าบัญชีเงินฝากธนาคารในนามบุคคลที่ได้รับมอบอำนาจจากผู้มีสิทธิ/ผู้ดูแล" />
                                </el-col>
                            </el-radio-group>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset">ล้างข้อมูล</el-button>
            <el-button type="primary" @click="saveAidPerson">บันทึก</el-button>
        </span>
    </span>
</template>


<script>
    import moment from 'moment'
    import aidService from '@/services/aid'
    export default {
        data() {
            return {
                rules: {
                    text: [
                        // { required: true, message: 'กรุณากรอกข้อมูลให้ครบถ้วน', trigger: 'blur', },
                    ]
                },
                aid: {
                    habitOwner: "",
                    habitDetail: "",
                    habitOwnerRelation: "",
                    nearby: "",
                    nearbyDistant: null,
                    nearbyCheck: "",
                    nearbyDetail: "",
                    living: "",
                    livingDetail: "",
                    sick: null,
                    sickDetail: "",
                    assist: "",
                    income: null,
                    incomeDetail: "",
                    expense: null,
                    expenseDetail: "",
                    get_money: null
                },
                person: {},
            };
        },
        async created () {
            try {
                const res = await aidService.getPersonbyID(this.$router.currentRoute.params.pID)
                this.person = res
                this.aid = {
                    habitOwner: res.patient_habitatchoice,
                    habitDetail: res.patient_habitatdetail,
                    nearby: res.patient_distance,
                    nearbyDistant: res.patient_distancedetail,
                    nearbyCheck: res.patient_distancecheck,
                    nearbyDetail: res.patient_distancebecouse,
                    living: res.patient_residancechoice,
                    livingDetail: res.patient_residancedetail,
                    sick: res.patient_sickyear,
                    sickDetail: res.patient_sysmptom,
                    assist: res.patient_assistance,
                    income: res.patient_incomeSum,
                    incomeDetail: res.patient_incomeDetail,
                    expense: res.patient_expensesSum,
                    expenseDetail: res.patient_expensesDetail,
                    get_money: res.getmoney_id
                }
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                });
                this.$router.push('/aid');
            }
        },
        methods: {
            reset() {
                this.aid = {
                    habitOwner: "",
                    habitDetail: "",
                    habitOwnerRelation: "",
                    nearby: "",
                    nearbyDistant: null,
                    nearbyCheck: "",
                    nearbyDetail: "",
                    living: "",
                    livingDetail: "",
                    sick: null,
                    sickDetail: "",
                    assist: "",
                    income: null,
                    incomeDetail: "",
                    expense: null,
                    expenseDetail: "",
                    get_money: null
                };
            },
            moneyChange (e) {
                console.log(e)
            },
            async saveAidPerson() {
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
                const req = new FormData();
                req.append('id_card', this.person.id_card);
                req.append('patient_habitatchoice', this.aid.habitOwner);
                req.append('patient_habitatdetail', this.aid.habitDetail);
                req.append('patient_distance', this.aid.nearby);
                req.append('patient_distancedetail', this.aid.nearbyDistant);
                req.append('patient_distancecheck', this.aid.nearbyCheck);
                req.append('patient_distancebecouse', this.aid.nearbyDetail);
                req.append('patient_residancechoice', this.aid.living);
                req.append('patient_residancedetail', this.aid.livingDetail);
                req.append('patient_sickyear', this.aid.sick);
                req.append('patient_sysmptom', this.aid.sickDetail);
                req.append('patient_assistance', this.aid.assist);
                req.append('patient_incomeSum', this.aid.income.replace(',', ''));
                req.append('patient_incomeDetail', this.aid.incomeDetail);
                req.append('patient_expensesSum', this.aid.expense.replace(',', ''));
                req.append('patient_expensesDetail', this.aid.expenseDetail);
                req.append('getmoney_id', this.aid.get_money);
                req.append('user_id', localStorage.getItem('admin_user_data'));
                try {
                    let res = await aidService.updatePerson(req, this.person.id_card);
                    this.$alert(`บันทึกข้อมูลเรียบร้อยแล้ว`, 'สำเร็จ!', {
                        type: 'success',
                        confirmButtonText: 'ตกลง',
                    });
                    this.reset();
                    this.$router.push('/aid');
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
        }
    };
</script>

<style lang="scss">
    .form-style {
        .el-form-item__content {
            text-align: left;
        }
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
</style>
