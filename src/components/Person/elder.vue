<template>
    <span style="text-align: left; padding: 20px 0px;">
        <el-row class="align-l mg-t-md" style="margin-bottom: 10px;">
            <h2>ข้อมูลประชากร</h2>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>รหัสบัตรประชาชน:</b> {{ elderInfo.id_card }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>วันเกิด:</b> {{ dateConvert(elderInfo.person_birthday) }}
            </el-col>
            <el-col :span="12">
                <b>อายุ:</b> {{ (calculateAge(elderInfo.person_birthday)) }}
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <b>ชื่อ:</b> {{ `${elderInfo.person_titlename} ${elderInfo.person_firstname}\t${elderInfo.person_lastname}` }}
            </el-col>
            <el-col :span="12">
                <b>เบอร์โทรศัพท์:</b> {{ elderInfo.person_phone }}
            </el-col>
        </el-row>
        <el-row class="align-l mg-t-md" style="margin-bottom: 10px;">
            <h2>ข้อมูลผู้สูงอายุ</h2>
        </el-row>
        <el-row>
            <el-col :span="24">
                <b>การรับเบี้ยยังชีพ:</b> {{ `${elderInfo.elders_info}` }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <b>รายละเอียด:</b> {{ `${elderInfo.elders_detail}` }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <b>วิธีการรับเบี้ยยังชีพ:</b> {{ `${elderInfo.getmoney_name}` }}
            </el-col>
        </el-row>
        <el-row v-loading.fullscreen.lock="isLoading" ></el-row>
    </span>
</template>

<script>
    import moment from 'moment'
    import elderService from '@/services/elder';

    export default {
        props: ['id_card'],
        data () {
            return {
                isLoading: true,
                tabSelect: 0,
                elderInfo: {}
            }
        },
        async created () {
            this.elderInfo = await elderService.getPersonbyID(this.id_card)
            console.log(this.elderInfo)
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

