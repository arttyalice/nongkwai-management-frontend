<template>
    <span style="text-align: left; padding: 20px 0px;">
        <el-row>
            <el-row>
                <el-col class="align-l" :span="12">
                    <h1>ข้อมูลของ {{ `${person.person_titlename} ${person.person_firstname}\t${person.person_lastname}` }}</h1>
                </el-col>
                <el-col class="align-r" :span="12">
                    <router-link to="/person">
                        <el-button plain>
                            กลับ
                        </el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-tabs v-model="tabSelect">
                <el-tab-pane label="ข้อมูลทั่วไป" name="0">
                    <personInfo :person="person" v-if="tabSelect === '0'" />
                </el-tab-pane>
                <el-tab-pane v-if="person.patient_id" label="โรคเอดส์" name="1">
                    <personAid @DoneLoading="isLoading = false" :id_card="person.id_card" v-if="tabSelect === '1'" />
                </el-tab-pane>
                <el-tab-pane v-if="person.elders_id" label="ผู้สูงอายุ" name="2">
                    <personElder @DoneLoading="isLoading = false" :id_card="person.id_card" v-if="tabSelect === '2'" />
                </el-tab-pane>
                <el-tab-pane v-if="person.disability_id" label="ผู้พิการ" name="3">
                    <personDisable @DoneLoading="isLoading = false" :id_card="person.id_card" v-if="tabSelect === '3'" />
                </el-tab-pane>
                <el-tab-pane label="การรักษา" name="4">
                    <personTreatment @DoneLoading="isLoading = false" :id_card="person.id_card" v-if="tabSelect === '4'" />
                </el-tab-pane>
                <el-tab-pane label="การประเมิณ" name="5">
                    <personVisit @DoneLoading="isLoading = false" :id_card="person.id_card" v-if="tabSelect === '5'" />
                </el-tab-pane>
                <el-tab-pane label="เบี้ยยังชีพ" name="6">
                    <personAllowance @DoneLoading="isLoading = false" :id_card="person.id_card" v-if="tabSelect === '6'" />
                </el-tab-pane>
            </el-tabs>
        </el-row>
        <el-row v-loading.fullscreen.lock="isLoading" ></el-row>
    </span>
</template>

<script>
    import moment from 'moment'
    import personService from '@/services/person';
    import personInfo from '@/components/Person/info';
    import personAid from '@/components/Person/aid';
    import personDisable from '@/components/Person/disable';
    import personElder from '@/components/Person/elder';
    import personTreatment from '@/components/Person/treatment';
    import personVisit from '@/components/Person/visiting';
    import personAllowance from '@/components/Person/allowance';

    export default {
        components: {
            personInfo,
            personAid,
            personDisable,
            personElder,
            personTreatment,
            personVisit,
            personAllowance
        },
        data () {
            return {
                isLoading: true,
                tabSelect: 0,
                person: {}
            }
        },
        async created () {
            const id = this.$router.currentRoute.params.pID
            this.person = await personService.getPersonbyID(id)
            this.isLoading = false
        },
        methods: {
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

