<template>
    <el-dialog
        title="ประวัติการเยี่ยมบ้าน"
        :visible.sync="centerDialogVisible"
        width="1000px"
        center
    >
        <span>
            <el-table
                :data="list"
                style="width: 100%"
            >
                <el-table-column
                    prop="visiting_date"
                    label="วันที่เยี่ยม"
                    width="160">
                </el-table-column>
                <el-table-column
                    label="ผู้เยี่ยม"
                    width="160"
                >
                    <template slot-scope="item">
                        {{ `${item.row.staff_fname} ${item.row.staff_lname}` }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="adl_summary"
                    label="ผลรวมคะแนน ADL"
                    align="center"
                    width="140">
                </el-table-column>
                <el-table-column
                    label="ผลรวมคะแนน ADL"
                    width="180"
                >
                    <template slot-scope="item">
                        <el-tag v-if="item.row.adl_summary <= 4" type="info">
                            ภาวะพึ่งพาโดยสมบูรณ์
                        </el-tag>
                        <el-tag v-else-if="item.row.adl_summary <= 8" type="danger">
                            ภาวะพึ่งพารุนแรง
                        </el-tag>
                        <el-tag v-else-if="item.row.adl_summary <= 11" type="warning">
                            ภาวะพึ่งพาปานกลาง
                        </el-tag>
                        <el-tag v-else type="success">
                            ไม่เป็นภาระพึ่งพา
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="visiting_detail"
                    label="รายละเอียด"
                    width="310"
                    >
                </el-table-column>
            </el-table>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">ยกเลิก</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import visitingService from '@/services/visiting';

    export default {
        props: ['userInfo'],
        data() {
            return {
                centerDialogVisible: true,
                list: []
            };
        },
        watch: {
            centerDialogVisible: function (newV, oldV) {
                if (newV === false) {
                    this.$emit('closeDialog')
                }
            }
        },
        async created () {
            try {
                this.list = await visitingService.getVisitingHistory(this.userInfo.id_card)
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                });
                this.$router.push('/visiting');
            }
        }
    };
</script>

