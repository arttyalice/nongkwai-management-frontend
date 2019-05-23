<template>
    <span style="text-align: left; padding: 20px 0px;">
        <el-row class="align-l mg-t-md" style="margin-bottom: 10px;">
            <el-row>
                <el-table
                    :data="treatment"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="disease"
                        label="อาการป่วย"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="hospital"
                        label="สถานที่เข้ารับการรักษา"
                        width="200"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="SBP"
                        label="ความดันของเลือดสูงสุด(SBP)"
                        width="130"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="DBP"
                        label="ความดันเลือดที่ต่ำสุด(DBP)"
                        width="110"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="height"
                        label="ส่วนสูง"
                        width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="weigth"
                        label="น้ำหนัก"
                        width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        label="ข้อมูล"
                        align="center"
                    >
                        <template slot-scope="item">
                            <el-row>
                                <el-col :span="24">
                                    <el-button @click="popToTreatmentFile(item.row.treatment_id)" type="primary" plain>
                                        เอกสารประกอบ
                                    </el-button>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
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
    import treatmentService from '@/services/treatment';

    export default {
        props: ['id_card'],
        data () {
            return {
                isLoading: true,
                tabSelect: 0,
                treatment: [],
                fileList: [],
                isShowDialog: false
            }
        },
        async created () {
            this.treatment = await treatmentService.getTreatmentbyPerson(this.id_card)
            console.log(this.treatment)
            this.isLoading = false
        },
        methods: {
            async popToTreatmentFile (id) {
                try {
                    this.isLoading = true
                    this.fileList = await treatmentService.getFileInTreatment(id)
                    console.log(this.fileList)
                    this.isShowDialog = true
                    this.isLoading = false
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    })
                    this.isShowDialog = true
                    this.isLoading = false
                }
            }
        }
    }
</script>

