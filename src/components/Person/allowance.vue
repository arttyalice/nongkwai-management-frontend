<template>
    <span style="text-align: left; padding: 20px 0px;">
        <el-row class="align-l mg-t-md" style="margin-bottom: 10px;">
            <el-row>
                <el-col>
                    ยอดรวมที่เคยได้รับทั้งหมด: <strong>{{ summary }}</strong> บาท
                </el-col>
            </el-row>
            <el-row>
                <el-table
                    :data="allowance"
                    style="width: 100%"
                >
                    <el-table-column
                        label="ประเภทเบี้ยยังชีพ"
                    >
                        <template slot-scope="item">
                            <span v-if="Number(item.row.allowance_type) === 1">เบี้ยผู้สูงอายุ</span>
                            <span v-if="Number(item.row.allowance_type) === 2">เบี้ยผู้พิการ</span>
                            <span v-if="Number(item.row.allowance_type) === 3">เบี้ยผู้ป่วยโรคเอดส์</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="allowance_year"
                        label="ปีที่ได้รับเบี้ยยังชีพ"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allowance_money"
                        label="จำนวนเงิน"
                    >
                    </el-table-column>
                </el-table>
            </el-row>
        </el-row>
    </span>
</template>

<script>
    import moment from 'moment'
    import allowanceService from '@/services/allowance';

    export default {
        props: ['id_card'],
        data () {
            return {
                isLoading: true,
                allowance: [],
                summary: 0,
            }
        },
        async created () {
            this.allowance = await allowanceService.getAllowanceByPerson(this.id_card)
            console.log(this.allowance)
            this.allowance.forEach(e => {
                this.summary += parseFloat(e.allowance_money)
            })
            this.isLoading = false
        },
    }
</script>

