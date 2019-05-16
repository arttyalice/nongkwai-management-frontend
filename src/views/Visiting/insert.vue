
<template>
    <span>
        <el-row>
            <el-col class="align-l" :span="12">
                <h2>ประเมินการเยี่ยมบ้าน</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/visiting">
                    <el-button plain>
                        กลับ
                    </el-button>
                </router-link>
            </el-col>
        </el-row>
      
        <!-- Person info -->
        <el-row>
            <h2>ข้อมูลส่วนตัว</h2>
            <el-row>
                <el-col  :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                    <b>ชื่อ-สกุล</b>: {{ `${person.person_titlename} ${person.person_firstname} ${person.person_lastname}` }}
                </el-col>
                <el-col  :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                     <b>เลขบัตรประชาชน</b>: {{ `${person.id_card}` }}
                </el-col>
                <el-col  :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                     <b>ประเภท</b>: 
                    <el-tag style="margin:0 3px;" type="info" v-if="person.disability_id">พิการ</el-tag>
                    <el-tag style="margin:0 3px;" type="success" v-if="person.elders_id">สูงอายุ</el-tag>
                    <el-tag style="margin:0 3px;" type="warning" v-if="person.patient_id">เอดส์</el-tag>
                </el-col>
            </el-row>
        </el-row>

        <el-form ref="form" :model="visit" :rules="rules" label-width="" class="demo-form-inline">  
            <!-- Address -->
            <el-row>
                <h2>แบบประเมินการเยี่ยมบ้าน</h2>
            </el-row>

            <span style="text-align: left;">
                <el-row v-for="item in adlForm" :key="item.title">
                    <el-col :span="24">
                        <el-form-item :prop="item.name">
                            <el-row>
                                <h3>{{ item.title }}</h3>
                            </el-row>
                            <el-radio-group v-model="visit[item.name]">
                                <div
                                    v-for="ans in item.ans"
                                    :key="ans.label"
                                >
                                    <el-radio    
                                        :label="ans.score"
                                    >
                                        {{ ans.label }}
                                    </el-radio>
                                </div>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                 <el-row>
                    <el-col :span="24">
                        <el-form-item prop="detail">
                            <el-row>
                                <h3>รายละเอียดการเยี่ยม</h3>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 5}"
                                        placeholder="รายละเอียดอื่นๆ ในการเยี่ยม"
                                        v-model="visit.detail">
                                    </el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
            </span>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset">ล้างข้อมูล</el-button>
            <el-button type="primary" @click="saveNewVisiting">บันทึก</el-button>
        </span>
    </span>
</template>


<script>
    import moment from 'moment'
    import visitingService from '@/services/visiting';
    export default {
        data() {
            return {
                adlForm: [
                    {
                        name: "feeding",
                        title: "1. Feeding (รับประทานอาหารเมื่อเตรียมสำรับไว้ให้เรียบร้อยต่อหน้า)",
                        ans: [
                            { score: 0, label: "ไม่สามารถตักอาหารเข้าปากได้ ต้องมีคนป้อนให้" },
                            { score: 1, label: "ตักอาหารเองได้แต่ต้องมีคนช่วย เช่น ช่วยใช้ช้อนตักเตรียมไว้ให้หรือตัดเป็นเล็กๆไว้ล่วงหน้า" },
                            { score: 2, label: "ตักอาหารและช่วยตัวเองได้เป็นปกติ" }
                        ]
                    },
                    {
                        name: "grooming",
                        title: "2. Grooming (ล้างหน้า หวีผม แปรงฟัน โกนหนวด ในระยะเวลา 24 - 28 ชั่วโมงที่ผ่านมา)",
                        ans: [
                            { score: 0, label: "ต้องการความช่วยเหลือ" },
                            { score: 1, label: "ทำเองได้ (รวมทั้งที่ทำได้เองถ้าเตรียมอุปกรณ์ไว้ให้)" }
                        ]
                    },
                    {
                        name: "transfer",
                        title: "3. Transfer (ลุกนั่งจากที่นอน หรือจากเตียงไปยังเก้าอี้)",
                        ans: [
                            { score: 0, label: "ไม่สามารถนั่งได้ (นั่งแล้วจะล้มเสมอ) หรือต้องใช้คนสองคนช่วยกันยกขึ้น" },
                            { score: 1, label: "ต้องการความช่วยเหลืออย่างมากจึงจะนั่งได้ เช่น ต้องใช้คนที่แข็งแรงหรือมีทักษะ 1คน หรือใช้คนทั่วไป 2 คนพยุงหรือดันขึ้นมาจึงจะนั่งอยู่ได้" },
                            { score: 2, label: "ต้องการความช่วยเหลือบ้าง เช่นบอกให้ทำตาม หรือช่วยพยุงเล็กน้อย หรือต้องมีคนดูแลเพื่อความปลอดภัย" },
                            { score: 3, label: "ทำได้เอง" }
                        ]
                    },
                    {
                        name: "toilet",
                        title: "4. Toilet use (ใช้ห้องน้ำ)",
                        ans: [
                            { score: 0, label: "ช่วยตัวเองไม่ได้" },
                            { score: 1, label: "ทำเองได้บ้าง (อย่างน้อยทำความสะอาดตัวเองได้หลังจากเสร็จธุระ) แต่ต้องการความช่วยเหลือในบางสิ่ง" },
                            { score: 2, label: "ช่วยตัวเองได้ดี (ขึ้นนั่งและลงจากโถส้วมเองได้ ทำความสะอาดได้เรียบร้อยหลังจากเสร็จธุระ ถอดใส่เสื้อผ้าได้เรียบร้อย)" }
                        ]
                    },
                    {
                        name: "mobility",
                        title: "5. Mobility (การเคลื่อนที่ภายในห้องหรือบ้าน)",
                        ans: [
                            { score: 0, label: "เคลื่อนที่ไปไหนไม่ได้" },
                            { score: 1, label: "ต้องใช้รถเข็นช่วยตัวเองให้เคลื่อนที่ได้เอง (ไม่ต้องมีคนเข็นให้) และจะต้องเข้าออกมุมห้องหรือประตูได้" },
                            { score: 2, label: "เดินหรือเคลื่อนที่โดยมีคนช่วย เช่น พยุง หรือบอกให้ทำตาม หรือต้องให้ความสนใจดูแลเพื่อความปลอดภัย" },
                            { score: 3, label: "เดินหรือเคลื่อนที่ได้เอง" }
                        ]
                    },
                    {
                        name: "dressing",
                        title: "6. Dressing (การสวมใส่เสื้อผ้า)",
                        ans: [
                            { score: 0, label: "ต้องมีคนสวมใส่ให้ ช่วยตัวเองแทบไม่ได้หรือได้น้อย" },
                            { score: 1, label: "ช่วยตัวเองได้ประมาณร้อยละ ๕๐ ที่เหลือต้องมีคนช่วย" },
                            { score: 2, label: "ช่วยตัวเองได้ดี (รวมทั้งการติดกระดุม รูดซิบ หรือใช้เสื้อผ้าที่ดัดแปลงให้เหมาะสมก็ได้)" }
                        ]
                    },
                    {
                        name: "stairs",
                        title: "7. Stairs (การขึ้นลงบันได 1 ชั้น)",
                        ans: [
                            { score: 0, label: "ไม่สามารถทำได้" },
                            { score: 1, label: "ต้องการคนช่วย" },
                            { score: 2, label: "ขึ้นลงได้เอง (ถ้าต้องใช้เครื่องช่วยเดิน เช่น walker จะต้องเอาขึ้นลงได้ด้วย)" }
                        ]
                    },
                    {
                        name: "bathing",
                        title: "8. Bathing (การอาบน้ำ)",
                        ans: [
                            { score: 0, label: "ต้องมีคนช่วยหรือทำให้" },
                            { score: 1, label: "อาบน้ำเองได้" }
                        ]
                    },
                    {
                        name: "bowels",
                        title: "9. Bowels (การกลั้นการถ่ายอุจจาระในระยะ 1 สัปดาห์ที่ผ่านมา)",
                        ans: [
                            { score: 0, label: "กลั้นไม่ได้ หรือต้องการการสวนอุจจาระอยู่เสมอ" },
                            { score: 1, label: "กลั้นไม่ได้บางครั้ง (เป็นน้อยกว่า 1 ครั้งต่อสัปดาห์)" },
                            { score: 2, label: "กลั้นได้เป็นปกติ" }
                        ]
                    },
                    {
                        name: "bladder",
                        title: "10. Bladder (การกลั้นปัสสาวะในระยะ ๑ สัปดาห์ที่ผ่านมา)",
                        ans: [
                            { score: 0, label: "กลั้นไม่ได้ หรือใส่สายสวนปัสสาวะแต่ไม่สามารถดูแลเองได้" },
                            { score: 1, label: "กลั้นไม่ได้บางครั้ง (เป็นน้อยกว่าวันละ ๑ ครั้ง)" },
                            { score: 2, label: "กลั้นได้เป็นปกติ" }
                        ]
                    },
                ],
                rules: {
                    feeding: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    grooming: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    transfer: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    toilet: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    mobility: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    dressing: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    stairs: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    bathing: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    bowels: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                    bladder: [
                        { required: true, message: 'กรุณาเลือกคำตอบ', trigger: 'blur', },
                    ],
                },
                person: {
                    fname: '',
                    lname: ''
                },
                visit: {
                    feeding: null,
                    grooming: null,
                    transfer: null,
                    toilet: null,
                    mobility: null,
                    dressing: null,
                    stairs: null,
                    bathing: null,
                    bowels: null,
                    bladder: null,
                    detail: ""
                },
            };
        },
        async created() {
            try {
                this.person = await visitingService.getPersonbyID(this.$router.currentRoute.params.pID);
                console.log(this.person)
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                });
                this.$router.push('/visiting');
            }
        },
        methods: {
            reset() {
                this.visit = {
                    feeding: null,
                    grooming: null,
                    transfer: null,
                    toilet: null,
                    mobility: null,
                    dressing: null,
                    stairs: null,
                    bathing: null,
                    bowels: null,
                    bladder: null,
                    detail: ""
                };
            },
            async saveNewVisiting() {
                let valid = null
                await this.$refs.form.validate(val => {
                    valid = val;
                });
                if (valid === false) {
                    this.$alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึกข้อมูล', 'ข้อมูลไม่ครบถ้วน!', {
                        type: 'warning',
                        confirmButtonText: 'ตกลง',
                    });
                    return;
                }

                const newVisiting = new FormData();
                console.log(this.visit)
                newVisiting.append('user_id', localStorage.getItem('admin_user_data'));
                newVisiting.append('visiting_detail', this.visit.detail);
                newVisiting.append('feeding', this.visit.feeding);
                newVisiting.append('grooming', this.visit.grooming);
                newVisiting.append('transfer', this.visit.transfer);
                newVisiting.append('toilet', this.visit.toilet);
                newVisiting.append('mobility', this.visit.mobility);
                newVisiting.append('dressing', this.visit.dressing);
                newVisiting.append('stairs', this.visit.stairs);
                newVisiting.append('bathing', this.visit.bathing);
                newVisiting.append('bowels', this.visit.bowels);
                newVisiting.append('bladder', this.visit.bladder);

                try {
                    let res = await visitingService.addNewVisiting(this.$router.currentRoute.params.pID, newVisiting);
                    this.$alert(`บันทึกข้อมูลผู้ใช้ของ ${this.person.person_firstname} ${this.person.person_lastname} เรียบร้อยแล้ว`, 'สำเร็จ!', {
                        type: 'success',
                        confirmButtonText: 'ตกลง',
                    });
                    this.reset();
                    this.$router.push('/visiting/adl/summary/' + res.data.adlID);
                } catch (error) {
                    console.log(error.response)
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
        }
    };
</script>