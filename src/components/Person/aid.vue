<template>
    <span style="text-align: left; padding: 20px 0px;">
        <el-row class="align-l mg-t-md" style="margin-bottom: 10px;">
            <h2>ข้อมูลประชากร</h2>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>รหัสบัตรประชาชน:</b> {{ patientInfo.id_card }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>วันเกิด:</b> {{ dateConvert(patientInfo.person_birthday) }}
            </el-col>
            <el-col :span="12">
                <b>อายุ:</b> {{ (calculateAge(patientInfo.person_birthday)) }}
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <b>ชื่อ:</b> {{ `${patientInfo.person_titlename} ${patientInfo.person_firstname}\t${patientInfo.person_lastname}` }}
            </el-col>
            <el-col :span="12">
                <b>เบอร์โทรศัพท์:</b> {{ patientInfo.person_phone }}
            </el-col>
        </el-row>

        <el-row class="align-l mg-t-md" style="margin-top: 30px; margin-bottom: 10px;">
            <h2>ที่พักอาศัย</h2>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>ผู้ร่วมอาศัย:</b> {{ patientInfo.patient_residancechoice }}
            </el-col>
            <el-col :span="12">
                <b>รายละเอียดผู้ร่วมอาศัย:</b> {{ patientInfo.patient_residancedetail }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>ที่พักอาศัย:</b> {{ patientInfo.patient_habitatchoice }}
            </el-col>
            <el-col :span="12">
                <b>รายละเอียดที่พัก:</b> {{ patientInfo.patient_habitatdetail }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>ข้อมูลระยะห่าง:</b> {{ patientInfo.patient_distance }}
            </el-col>
            <el-col :span="12">
                <b>ระยะห่างที่พัก(กม.) :</b> {{ patientInfo.patient_distancedetail }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>การเดินทาง:</b> {{ patientInfo.patient_distancecheck }}
            </el-col>
            <el-col :span="12">
                <b>เดินทางโดย :</b> {{ patientInfo.patient_distancebecouse }}
            </el-col>
        </el-row>

        <el-row class="align-l mg-t-md" style="margin-top: 30px; margin-bottom: 10px;">
            <h2>รายละเอียดการป่วย</h2>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>ระยะเวลาที่ติดเชื้อ:</b> {{ patientInfo.patient_sickyear }} ปี
            </el-col>
            <el-col :span="12">
                <b>ลักษณะอาการ :</b> {{ patientInfo.patient_sysmptom }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>การช่วยเหลือจากหน่วยงาน:</b> {{ patientInfo.patient_assistance }}
            </el-col>
        </el-row>

        <el-row class="align-l mg-t-md" style="margin-top: 30px; margin-bottom: 10px;">
            <h2>รายได้ - รายจ่าย</h2>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>รายได้รวม:</b> {{ patientInfo.patient_incomeSum }} บาท
            </el-col>
            <el-col :span="12">
                <b>รายละเอียดรายได้ :</b> {{ patientInfo.patient_incomeDetail }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>รายจ่ายรวม :</b> {{ patientInfo.patient_expensesSum }} บาท
            </el-col>
            <el-col :span="12">
                <b>รายละเอียดรายจ่าย :</b> {{ patientInfo.patient_expensesDetail }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <b>วิธีการรับเบี้ยยังชีพ:</b> {{ `${patientInfo.getmoney_name}` }}
            </el-col>
        </el-row>
        <el-row v-loading.fullscreen.lock="isLoading" ></el-row>
    </span>
</template>

<script>
    import moment from 'moment'
    import aidService from '@/services/aid';

    export default {
        props: ['id_card'],
        data () {
            return {
                isLoading: true,
                tabSelect: 0,
                patientInfo: {}
            }
        },
        async created () {
            console.log(this.id_card)
            this.patientInfo = await aidService.getPersonbyID(this.id_card)
            this.isLoading = false
        },
        methods: {
            handleTab (e) {
                console.log(e)
            },
            dateConvert (date) {
                return date !== '0000-00-00' ? moment(date).format('DD/MM/YYYY') : 'ไม่ได้กรอกวันเกิด'
            },
            calculateAge (date) {
                const now = moment(date)
                return moment([now.year() - 543, now.month(), now.date()]).lang('th').fromNow(true)
            }
        }
    }
</script>

