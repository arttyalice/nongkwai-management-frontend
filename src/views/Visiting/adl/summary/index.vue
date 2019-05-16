
<template>
    <span>
        <el-row>
            <el-col class="align-l" :span="12">
                <h2>ผลการประเมิน ADL</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/visiting">
                    <el-button plain>
                        กลับหน้าหลัก
                    </el-button>
                </router-link>
            </el-col>
        </el-row>

        <el-row>
            <el-col><h2>{{ ` ผลการประเมิน ADL ของ ${summary.title} ${summary.fname} ${summary.lname}` }}</h2></el-col>
        </el-row>
        <el-row style="font-size: 24px;">
            <el-col>{{ `ผลการประเมิณของวันที่ ${thaidatetime(summary.created_date)} ได้ทั้งหมด` }} <b>{{summary.score}}</b> {{ `คะแนน` }}</el-col>
        </el-row>
        <el-row>
            <el-col><h3>{{ `ถูกจัดอยู่ในกลุ่ม` }}</h3></el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-tag v-if="summary.score <= 2" class="tag-adl-summary" type="info">
                    ภาวะพึ่งพาโดยสมบูรณ์ (0 - 2 คะแนน)
                </el-tag>
                <el-tag v-else-if="summary.score <= 5" class="tag-adl-summary" type="danger">
                    ภาวะพึ่งพารุนแรง (3 - 5 คะแนน)
                </el-tag>
                <el-tag v-else-if="summary.score <= 8" class="tag-adl-summary" type="warning">
                    ภาวะพึ่งพาปานกลาง (6 - 8 คะแนน)
                </el-tag>
                <el-tag v-else class="tag-adl-summary" type="success">
                    ไม่เป็นภาระพึ่งพา (9+ คะแนน)
                </el-tag>
            </el-col>
        </el-row>
    </span>
</template>


<script>
    import moment from 'moment'
    import visitingService from '@/services/visiting';
    export default {
        data() {
            return {
                summary: {
                    adlID: null,
                    title: "",
                    fname: "",
                    lname: "",
                    created_date: "",
                    score: 0,
                }
            };
        },
        async created() {
            try {
                const res = await visitingService.getAdlSummary(this.$router.currentRoute.params.adlID);
                this.summary.adlID = this.$router.currentRoute.params.adlID
                this.summary.score = res.adl_summary
                this.summary.created_date = res.visiting_date
                this.summary.title = res.person_titlename
                this.summary.fname = res.person_firstname
                this.summary.lname = res.person_lastname
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                });
                this.$router.push('/visiting');
            }
        },
        methods: {
            thaidatetime (date) {
                return moment(date).add(543, 'year').format('DD/MM/YYYY')
            }
        }
    };
</script>

<style>
    .tag-adl-summary {
        font-size: 24px!important;
        margin-top: 20px;
        padding: 20px 15px!important;
        height: 67px!important;
    }
</style>
