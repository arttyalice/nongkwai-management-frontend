<template>
    <el-dialog
        title="ประวัติการเยี่ยมบ้าน"
        :visible.sync="centerDialogVisible"
        width="800px"
        center
    >
        <span>
            <el-form ref="form" :model="allowance" :rules="rules" label-width="130px" class="demo-form-inline">  
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="ผู้รับการรักษา :" prop="id_card">
                            <el-select filterable style="width: 100%" v-model="allowance.id_card">
                                <el-option v-for="item in personlist" :key="item.id_card" :label="item.name" :value="item.id_card"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ประเภทเบี้ยเลี้ยง :" prop="type">
                            <el-select filterable style="width: 100%" v-model="allowance.type">
                                <el-option label="ผู้สูงอายุ" :value="1"></el-option>
                                <el-option label="ผู้พิการ" :value="2"></el-option>
                                <el-option label="ผู้ป่วยโรคเอดส์" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="จำนวนเงิน :" prop="amount">
                            <el-input-number class="left-number" :max="9999" :controls="false" v-model="allowance.amount" placeholder="จำนวนเงิน"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ปีที่จ่ายเบี้ย :" prop="year">
                            <el-input-number class="left-number" :max="9999" :controls="false" v-model="allowance.year" placeholder="ปีของเบี้ยเลี้ยง"></el-input-number>
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
        props: ['id'],
        data() {
            return {
                centerDialogVisible: true,
                rules: {
                    id_card: [
                        { required: true, message: 'กรุณาเลือกประเภท', trigger: 'blur', },
                    ],
                    type: [
                        { required: true, message: 'กรุณาเลือกประเภท', trigger: 'blur', },
                    ],
                    amount: [
                        { required: true, message: 'กรุณาเลือกประเภท', trigger: 'blur', },
                    ],
                    year: [
                        { required: true, message: 'กรุณากรอกปี', trigger: 'blur', },
                    ]
                },
                personlist: [],
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
                const res = await allowanceService.getAllPersonWithTypeAndAllowancebyID(this.id)
                this.allowance = {
                    id_card: res.id_card,
                    amount: res.allowance_money,
                    type: parseInt(res.allowance_type),
                    year: res.allowance_year,
                }
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                })
                this.$router.push('/allowance')
            }
        },
        methods: {
            async submit () {
                let req = new FormData()
                req.append('id_card', this.allowance.id_card)
                req.append('amount', this.allowance.amount)
                req.append('type', this.allowance.type)
                req.append('year', this.allowance.year)
                try {
                    let res = await allowanceService.updateAllowance(req, this.id)
                    this.$emit("DoneUpdate")
                    this.$emit("closeDialog")
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

<style lang="scss">
    .left-number {
        .el-input__inner {  
            text-align: left;
        }
    }
</style>


