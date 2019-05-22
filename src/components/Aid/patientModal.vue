<template>
    <span>
        <el-dialog
            :visible="true"
            title="ข้อมูลของผู้ป่วย"
            width="800px"
            :before-close="handleClose"
        >
            <span class="align-l">
                <el-row>
                    <el-col :span="12">
                        รหัสบัตรประชาชน: {{ patientInfo.id_card }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        วันเกิด: {{ dateConvert(patientInfo.person_birthday) }}
                    </el-col>
                    <el-col :span="12">
                        อายุ: {{ (calculateAge(patientInfo.person_birthday)) }}
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        ชื่อ: {{ `${patientInfo.person_titlename} ${patientInfo.person_firstname}\t${patientInfo.person_lastname}` }}
                    </el-col>
                    <el-col :span="12">
                        เบอร์โทรศัพท์: {{ patientInfo.person_phone }}
                    </el-col>
                </el-row>

                <el-row class="align-c mg-t-md">
                    <h2>ที่พักอาศัย</h2>
                </el-row>
                 <el-row>
                    <el-col :span="12">
                        ผู้ร่วมอาศัย: {{ patientInfo.patient_residancechoice }}
                    </el-col>
                    <el-col :span="12">
                        รายละเอียดผู้ร่วมอาศัย: {{ patientInfo.patient_residancedetail }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        ที่พักอาศัย: {{ patientInfo.patient_habitatchoice }}
                    </el-col>
                    <el-col :span="12">
                        รายละเอียดที่พัก: {{ patientInfo.patient_habitatdetail }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        ข้อมูลระยะห่าง: {{ patientInfo.patient_distance }}
                    </el-col>
                    <el-col :span="12">
                        ระยะห่างที่พัก(กม.) : {{ patientInfo.patient_distancedetail }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        การเดินทาง: {{ patientInfo.patient_distancecheck }}
                    </el-col>
                    <el-col :span="12">
                        เดินทางโดย : {{ patientInfo.patient_distancebecouse }}
                    </el-col>
                </el-row>

                <el-row class="align-c mg-t-md">
                    <h2>รายละเอียดการป่วย</h2>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        ระยะเวลาที่ติดเชื้อ: {{ patientInfo.patient_sickyear }} ปี
                    </el-col>
                    <el-col :span="12">
                        ลักษณะอาการ : {{ patientInfo.patient_sysmptom }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        การช่วยเหลือจากหน่วยงาน: {{ patientInfo.patient_assistance }}
                    </el-col>
                </el-row>

                <el-row class="align-c mg-t-md">
                    <h2>รายได้ - รายจ่าย</h2>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        รายได้รวม: {{ patientInfo.patient_incomeSum }} บาท
                    </el-col>
                    <el-col :span="12">
                        รายละเอียดรายได้ : {{ patientInfo.patient_incomeDetail }}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        รายจ่ายรวม: {{ patientInfo.patient_expensesSum }} บาท
                    </el-col>
                    <el-col :span="12">
                        รายละเอียดรายจ่าย : {{ patientInfo.patient_expensesDetail }}
                    </el-col>
                </el-row>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">ยกเลิก</el-button>
            </span>
        </el-dialog>
    </span>
</template>


<script>
    import moment from 'moment'
    import userService from '@/services/user'

    moment.locale('Asia/Bangkok')

    export default {
        props: ['patientInfo'],
        data() {
            return {};
        },
        created () {
            console.log(this.patientInfo)
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
                    this.reset();
                    this.$emit('closeModal');
                } catch (error) {}
                
            },
            dateConvert (date) {
                return date !== '0000-00-00' ? moment(date).format('DD/MM/YYYY') : 'ไม่ได้กรอกวันเกิด'
            },
            calculateAge (date) {
                const now = moment(date)
                return moment([now.year() - 543, now.month(), now.date()]).lang('th').fromNow(true)
            }
        }
    };
</script>