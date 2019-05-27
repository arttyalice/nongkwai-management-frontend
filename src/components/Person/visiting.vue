<template>
    <span style="text-align: left; padding: 20px 0px;">
        <el-row class="align-l mg-t-md" style="margin-bottom: 10px;">
            <el-table
                :data="list"
                style="width: 100%"
            >
                <el-table-column
                    prop="visiting_date"
                    label="วันที่เยี่ยม"
                    width="150">
                </el-table-column>
                <el-table-column
                    label="ผู้เยี่ยม"
                    width="200"
                >
                    <template slot-scope="item">
                        {{ `${item.row.staff_fname} ${item.row.staff_lname}` }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="adl_summary"
                    label="ผลรวมคะแนน ADL"
                    align="center"
                    width="180">
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
                    label="รายละเอียด">
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog
            title="เอกสารประกอบการรักษา"
            :visible.sync="isShowDialog"
            width="500px"
            center
        >
            <span>
                <el-table
                    :data="fileList"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="file_name"
                        label="ชื่อไฟล์">
                    </el-table-column>
                    <el-table-column
                        label="เปิดไฟล์"
                        align="center"
                        width="180"
                    >
                         <template slot-scope="item">
                            <el-row>
                                <el-col :span="24">
                                    <a :href="item.row.file_path" target="_blank" rel="noopener noreferrer">
                                        <el-button plain>
                                            เปิดไฟล์
                                        </el-button>
                                    </a>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowDialog = false">ยกเลิก</el-button>
            </span>
        </el-dialog>
    </span>
</template>

<script>
    import moment from 'moment'
    import visitingService from '@/services/visiting';

    export default {
        props: ['id_card'],
        data () {
            return {
                isLoading: true,
                tabSelect: 0,
                list: [],
                fileList: [],
                isShowDialog: false
            }
        },
        async created () {
            this.list = await visitingService.getVisitingHistory(this.id_card)
            console.log(this.list)
            this.isLoading = false
        }
    }
</script>

