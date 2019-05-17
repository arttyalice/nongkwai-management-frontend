<template>
    <span>
        <el-row>
            <el-col :span="12">
                <b>รหัสบัตรประชาชน:</b> {{ person.id_card }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>วันเกิด:</b> {{ dateConvert(person.person_birthday) }}
            </el-col>
            <el-col :span="12">
                <b>อายุ:</b> {{ (calculateAge(person.person_birthday)) }}
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <b>ชื่อ:</b> {{ `${person.person_titlename} ${person.person_firstname}\t${person.person_lastname}` }}
            </el-col>
            <el-col :span="12">
                <b>เบอร์โทรศัพท์:</b> {{ person.person_phone }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>สัญชาติ:</b> {{ person.person_nationality }}
            </el-col>
            <el-col :span="12">
                <b>สถานะ:</b> {{ person.person_status }}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <b>ที่อยู่:</b> {{ `บ้านเลขที่ ${person.person_addNum} ม.${person.person_addMoo} ซ.${person.person_addSoi} ถ.${person.person_addRoad} หมู่บ้าน.${person.person_addVillage} ต.${person.SDTname_th} อ.${person.Dname_th} จ.${person.Pname_th} ${person.SDTzipcode}` }}
            </el-col>
        </el-row>
        <el-row>
            <GmapMap
                    :center="{ lat: Number(person.person_lat), lng: Number(person.person_lng) }"
                    :zoom="13"
                    :options="{
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        disableDefaultUi: false
                    }"
                    style="width: 100%; height: 500px"
                >
                    <GmapMarker
                        :position="{lat: Number(person.person_lat), lng: Number(person.person_lng) }"  
                    />
                </GmapMap>
        </el-row>
    </span>
</template>

<script>
    import moment from 'moment'
    import personService from '@/services/person';
    export default {
        props: ['person'],
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

