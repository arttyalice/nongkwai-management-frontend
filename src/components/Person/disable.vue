<template>
    <span style="text-align: left; padding: 20px 0px;">
        <el-row class="align-l mg-t-md" style="margin-bottom: 10px;">
            <h2>ข้อมูลประชากร</h2>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>รหัสบัตรประชาชน:</b> {{ disableInfo.id_card }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>วันเกิด:</b> {{ dateConvert(disableInfo.person_birthday) }}
            </el-col>
            <el-col :span="12">
                <b>อายุ:</b> {{ (calculateAge(disableInfo.person_birthday)) }}
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <b>ชื่อ:</b> {{ `${disableInfo.person_titlename} ${disableInfo.person_firstname}\t${disableInfo.person_lastname}` }}
            </el-col>
            <el-col :span="12">
                <b>เบอร์โทรศัพท์:</b> {{ disableInfo.person_phone }}
            </el-col>
        </el-row>
        <el-row class="align-l mg-t-md" style="margin-bottom: 10px;">
            <h2>ข้อมูลผู้พิการ</h2>
        </el-row>
        <el-row>
                <b>ประเภทความพิการ:</b>
                <span v-for="(row, index) in disableInfo.disability_type" :key="index">
                    {{ row }}<span v-if="index !== disableInfo.disability_type.length - 1">, </span>
                </span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <b>การรับเบี้ยยังชีพ:</b> {{ `${disableInfo.disability_info}` }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <b>รายละเอียด:</b> {{ `${disableInfo.disability_detail}` }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <b>วิธีการรับเบี้ยยังชีพ:</b> {{ `${disableInfo.getmoney_name}` }}
            </el-col>
        </el-row>
        <el-row v-loading.fullscreen.lock="isLoading" ></el-row>
    </span>
</template>

<script>
    import moment from 'moment'
    import disabilityService from '@/services/disabled';

    export default {
        props: ['id_card'],
        data () {
            return {
                isLoading: true,
                tabSelect: 0,
                disableInfo: {}
            }
        },
        async created () {
            this.disableInfo = await disabilityService.getPersonbyID(this.id_card)
            this.disableInfo.disability_type = JSON.parse(this.disableInfo.disability_type)
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

