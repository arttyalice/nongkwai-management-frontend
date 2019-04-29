
<template>
    <span>
        <el-dialog
            :visible="true"
            :title="`ข้อมูลผู้ติดต่อของคุณ ${patientInfo.person_firstname} ${patientInfo.person_lastname}`"
            width="800px"
            :before-close="handleClose"
        >
            <span class="align-l">
                <el-row>
                    <el-col class="align-r">
                        <el-button type="primary" plain>
                            เพิ่มข้อมูลผู้ติดต่อ
                        </el-button>
                    </el-col>
                </el-row>
                <el-table
                    :data="contacts"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="contact_id"
                        label="รหัส"
                        width="60"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="ชื่อ-สกุล"
                        width="150"
                    >
                        <template slot-scope="item">
                            {{ `${item.row.contact_titlename} ${item.row.contact_firstname} ${item.row.contact_lastname}` }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="contact_phone"
                        label="เบอร์โทร"
                        width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="ที่อยู่"
                    >
                        <template slot-scope="item">
                            {{(() => {
                                const data = item.row
                                return `${data.contact_addNum} ม.${data.contact_addMoo} ซ.${data.contact_addSoi}
                                        ถ.${data.contact_addRoad} ต.${data.SDTname_th} อ.${data.Dname_th} จ.${data.Pname_th} ${data.SDTzipcode}`
                            })()}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="ที่อยู่"
                        width="130"
                        align="center"
                    >
                        <template slot-scope="item">
                            <el-button @click="removeContact(item.row)" type="danger" plain icon="el-icon-delete">
                                ลบ
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">Cancel</el-button>
            </span>
        </el-dialog>
    </span>
</template>

<script>
    import moment from 'moment'
    import contactService from '@/services/contact'

    moment.locale('Asia/Bangkok')

    export default {
        props: ['patientInfo'],
        data() {
            return {
                contacts: []
            };
        },
        async created () {
            this.contacts = await contactService.getContactbyPatientID(this.patientInfo.patient_id);
        },
        methods: {
            async fetchChange() {
                this.contacts = await contactService.getContactbyPatientID(this.patientInfo.patient_id);
            },
            reset() {
                this.user = {
                    fname: '',
                    lname: '',
                    phone: '',
                    username: '',
                    password: '',
                    position: null,
                    status: null,
                };
            },
            async handleClose() {
                try {
                    this.reset();
                    this.$emit('closeModal');
                } catch (error) {}
                
            },
            async removeContact(row) {
                let res = {}
                this.$confirm(`โปรดตรวจสอบให้แน่ใจอีกครั้งการลบข้อมูลของ ${row.contact_firstname} ${row.contact_lastname} จะไม่สามารถกูคืนได้`,
                  'โปรดตรวจสอบ!', {
                  type: 'warning',
                  confirmButtonText: 'ตกลง',
                }).then(async () => {
                    try {
                        res = await contactService.deleteContactbyID(row.contact_id);
                        this.$alert(`ลบข้อมูลของ ${row.contact_firstname} ${row.contact_lastname} เรียบร้อยแล้ว`, 'ลบข้อมูลสำเร็จแล้ว', {
                          type: 'success',
                        });
                        this.fetchChange();
                    } catch (error) {
                        this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                          type: 'error',
                          confirmButtonText: 'ตกลง',
                        });
                    }
                })
            }
        }
    };
</script>