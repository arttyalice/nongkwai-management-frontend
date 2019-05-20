<template>
    <span>
        <el-row>
            <el-col class="align-l" :span="12">
                <h2>เพิ่มข้อมูลการรักษา</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/treatment">
                    <el-button plain>
                        กลับ
                    </el-button>
                </router-link>
            </el-col>
        </el-row>

        <el-form ref="form" :model="treatment" :rules="rules" label-width="200px" class="demo-form-inline">  
            <el-row>
                <el-col :span="12">
                    <el-form-item label="ผู้รับการรักษา :" prop="id_card">
                        <el-select filterable style="width: 100%" v-model="treatment.id_card">
                            <el-option v-for="item in personlist" :key="item.id_card" :label="item.name" :value="item.id_card"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="โรคประจำตัว :" prop="disease">
                        <el-input v-model="treatment.disease" placeholder="แพ้ฝุ่น, หอบหืด"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="สถานพยาบาลที่เข้ารับบริการ :" prop="hospital">
                        <el-input v-model="treatment.hospital" placeholder=" สถานพยาบาลที่เข้ารับบริการ"></el-input>                        
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="น้ำหนัก :" prop="height">
                        <el-input v-mask="'####'" v-model="treatment.height" placeholder="น้ำหนัก(กิโลกรัม)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ส่วนสูง :" prop="weigth">
                        <el-input v-mask="'####'" v-model="treatment.weigth" placeholder="ส่วนสูง(เซนติเมตร)"></el-input>                        
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label-width="200px" label="ความดันของเลือดสูงสุด(SBP) :" prop="SBP">
                        <el-input type="number" v-model="treatment.SBP" placeholder="ความดันของเลือดสูงสุด(SBP)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label-width="200px" label="ความดันเลือดที่ต่ำสุด(DBP) :" prop="DBP">
                        <el-input type="number" v-model="treatment.DBP" placeholder="ความดันเลือดที่ต่ำสุด(DBP)"></el-input>                        
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="text-align: left" :span="12">
                    <el-form-item label-width="200px" label="รายละเอียด :" prop="SBP">
                        <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="รายละเอียดการรักษา"
                            v-model="treatment.detail"
                        >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col style="text-align: left" :span="12">
                    <el-form-item label-width="200px" label="เอกสารการรักษา(ใหม่) :" prop="SBP">
                        <el-upload
                            multiple
                            action=""
                            :on-remove="handleRemove"
                            :on-change="handlerImageChange"
                            :file-list="fileList"
                        >
                            <el-button size="small" type="primary">Click to upload</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label-width="200px" label="เอกสารการรักษา(เก่า) :" prop="SBP">
                        <a v-for="item in treatment.files" :key="item.file_id" :href="item.file_path" target="blank">
                            <el-button>{{ item.file_name }}</el-button>
                        </a>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset">ล้างข้อมูล</el-button>
            <el-button type="primary" @click="submit">บันทึก</el-button>
        </span>
    </span>
</template>

<script>
    import personService from '@/services/person'
    import treatmentService from '@/services/treatment'
    export default {
        data () {
            return {
                personlist: [],
                rules: {},
                fileList: [],
                treatment: {
                    tmID : null,
                    id_card: '',
                    detail: '',
                    disease: '',
                    hospital: '',
                    height: null,
                    weigth: null,
                    SBP: null,
                    DBP: null,
                    files: [],
                    isNewFile: false,
                    newFiles: []
                }
            }
        },
        async created () {
            try {
                this.treatment.tmID = this.$router.currentRoute.params.tmID
                this.personlist = await personService.getPersonList()
                const res = await treatmentService.gettreatmentbyID(this.treatment.tmID)
                this.treatment = {
                    ...this.treatment,
                    id_card: res.treatment.id_card,
                    detail: res.treatment.treatment_detail,
                    disease: res.treatment.disease,
                    hospital: res.treatment.hospital,
                    height: res.treatment.height,
                    weigth: res.treatment.weigth,
                    SBP: res.treatment.SBP,
                    DBP: res.treatment.DBP,
                    files: res.files
                }
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                })
                this.$router.push('/treatment')
            }
        },
        methods: {
            reset () {
                this.treatment = {
                    ...this.treatment,
                    id_card: '',
                    detail: '',
                    disease: '',
                    hospital: '',
                    height: null,
                    weigth: null,
                    SBP: null,
                    DBP: null,
                    files: [],
                    isNewFile: false,
                    newFiles: []
                }
            },
            handlerImageChange (e) {
                this.treatment.isNewFile = true
                this.treatment.newFiles.push(e.raw)
                this.fileList.push({name: e.name})
            },
            handleRemove (e) {

            },
            submit () {
                alert(this.treatment.isNewFile)
                let req = new FormData()
                req.append("user_id", localStorage.getItem('admin_user_data'))
                req.append("treatment_detail", this.treatment.detail)
                req.append("id_card", this.treatment.id_card)
                req.append("disease", this.treatment.disease)
                req.append("hospital", this.treatment.hospital)
                req.append("height", this.treatment.height)
                req.append("weigth", this.treatment.weigth)
                req.append("SBP", this.treatment.SBP)
                req.append("DBP", this.treatment.DBP)
                req.append("isNewFile", this.treatment.isNewFile)
                this.treatment.files.forEach(e => {
                    req.append("files[]", e)
                })
                this.treatment.newFiles.forEach(e => {
                    req.append("newFile[]", e)
                })

                try {
                    treatmentService.updatetreatment(req, this.treatment.tmID)
                    this.$alert(`บันทึกข้อมูลการรักษาเรียบร้อยแล้ว`, 'สำเร็จ!', {
                        type: 'success',
                        confirmButtonText: 'ตกลง',
                    })
                    this.reset()
                    this.$router.push('/treatment')
                } catch (error) {
                    console.log(error)
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    })
                }
            }
        }
    }
</script>

