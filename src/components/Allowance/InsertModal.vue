<template>
    <el-dialog
        title="ข้อมูลการรับเบี้ยยังชีพ"
        :visible.sync="centerDialogVisible"
        width="800px"
        center
    >
        <span>
            <el-form ref="form" :model="allowance" :rules="rules" label-width="130px" class="demo-form-inline">  
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="ผู้รับเบี้ยยังชีพ :" prop="id_card">
                            <el-select filterable style="width: 100%" v-model="allowance.id_card" @change="onPersonChange">
                                <el-option v-for="item in personlist" :key="item.id_card" :label="item.name" :value="item.id_card"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ประเภทเบี้ยยังชีพ :" prop="type">
                            <el-select filterable style="width: 100%" v-model="allowance.type">
                                <el-option v-if="selPerson.elders_id" label="ผู้สูงอายุ" :value="1"></el-option>
                                <el-option v-if="selPerson.disability_id" label="ผู้พิการ" :value="2"></el-option>
                                <el-option v-if="selPerson.patient_id" label="ผู้ป่วยโรคเอดส์" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="จำนวนเงิน :" prop="amount">
                            <el-input type="number" v-model="allowance.amount" placeholder="จำนวนเงิน"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ปีที่จ่ายเบี้ยยังชีพ :" prop="year">
                            <el-input v-mask="'####'" v-model="allowance.year" placeholder="ปีของเบี้ยเลี้ยง"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">ยกเลิก</el-button>
            <el-button type="primary" @click="submit">บันทึก</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import allowanceService from '@/services/allowance';
    import personService from '@/services/person'

    export default {
        data() {
            return {
                centerDialogVisible: true,
                rules: {
                    id_card: [
                        { required: true, message: 'กรุณาเลือกผู้รับ', trigger: 'change', },
                    ],
                    type: [
                        { required: true, message: 'กรุณาเลือกประเภท', trigger: 'change', },
                    ],
                    amount: [
                        { required: true, message: 'กรุณากรอกจำนวนเงิน', trigger: 'blur', },
                    ],
                    year: [
                        { required: true, message: 'กรุณากรอกปี', trigger: 'blur', },
                    ]
                },
                personlist: [],
                selPerson: {},
                allowance: {
                    id_card: '',
                    amount: null,
                    type: null,
                    year: null,
                }
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
                this.personlist = await personService.getPersonList()
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                })
                this.$router.push('/allowance')
            }
        },
        methods: {
            onPersonChange () {
                this.personlist.forEach(e => {
                    if (e.id_card === this.allowance.id_card) {
                        this.selPerson = e
                    }
                })
            },
            async submit () {
                let req = new FormData()
                req.append('id_card', this.allowance.id_card)
                req.append('amount', this.allowance.amount)
                req.append('type', this.allowance.type)
                req.append('year', this.allowance.year)
                try {
                    let res = await allowanceService.addNewAllowance(req)
                    this.$alert(`บันทึกข้อมูลเรียบร้อยแล้ว`, 'สำเร็จ!', {
                        type: 'success',
                        confirmButtonText: 'ตกลง',
                    }).then(_ => {
                        this.$emit("closeDialog")
                    })
                    this.$emit("DoneInsert")
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    })
                }
            }
        }
    };
</script>


