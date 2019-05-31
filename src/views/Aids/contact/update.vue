
<template>
    <span>
        <el-row>
            <el-col class="align-l" :span="12">
                <h2>แก้ไชข้อมูลผู้ติดต่อ</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/aid">
                    <el-button plain>
                        กลับ
                    </el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-form ref="form" :model="person" :rules="rules" label-width="120px" class="demo-form-inline">
            <!-- Person info -->
            <el-row>
                <h3>ข้อมูลส่วนตัว</h3>
            </el-row><br>
            <el-row>
                <el-col :span="8">
                    <!-- <el-form-item label="คำนำหน้า :" prop="titlename">
                        <el-input placeholder="นาย, นาง, นางสาว" v-model="person.titlename"></el-input>
                    </el-form-item> -->
                    <el-form-item label="คำนำหน้า :" prop="titlename">
                        <el-select v-model="person.titlename" placeholder="คำนำหน้า" label="คำนำหน้า" style="width: 100%">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="ชื่อจริง :" prop="fname">
                        <el-input placeholder="ชื่อจริง" v-model="person.fname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="นามสกุล :" prop="lname">
                        <el-input placeholder="นามสกุล" v-model="person.lname"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="เบอร์โทร :" prop="phone">
                        <el-input v-mask="'###-#######'" v-model="person.phone" placeholder="081-2345678"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ความสัมพันธ์ :" prop="phone">
                        <el-input v-model="person.relation" placeholder="ความสัมพันธ์"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- Address -->
            <el-row>
                <h3>ที่อยู่</h3>
            </el-row><br>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="บ้านเลขที่ :" prop="address.num">
                        <el-input placeholder="10/10" v-model="person.address.num"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="หมู่ :" prop="address.moo">
                        <el-input placeholder="1" v-model="person.address.moo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="ซอย :" prop="address.soi">
                        <el-input placeholder="ชื่อซอย 1" v-model="person.address.soi"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="ถนน :" prop="address.road">
                        <el-input placeholder="ชื่อถนน" v-model="person.address.road"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="หมู่บ้าน :" prop="address.village">
                        <el-input placeholder="ชื่อหมู่บ้าน" v-model="person.address.village"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="จังหวัด :" prop="address.Pid">
                        <el-select filterable style="width: 100%;" @change="onProvinceChange" v-model="person.address.Pid">
                            <el-option v-for="item in provinceList" :key="item.Pid" :label="item.Pname_th" :value="item.Pid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="อำเภอ :" prop="address.Did">
                        <el-select filterable style="width: 100%;" @change="onDistrictChange" v-model="person.address.Did">
                            <el-option v-for="item in districtList" :key="item.Did" :label="item.Dname_th" :value="item.Did"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="ตำบล :" prop="address.SDTid">
                        <el-select filterable style="width: 100%;" v-model="person.address.SDTid">
                            <el-option v-for="item in subDistrictList" :key="item.SDTid" :label="item.SDTname_th" :value="item.SDTid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset">ล้างข้อมูล</el-button>
            <el-button type="primary" @click="saveNewPerson">บันทึก</el-button>
        </span>
    </span>
</template>


<script>
    import moment from 'moment'
    import contactService from '@/services/contact'
    import addressService from '@/services/address_prefence'
    export default {
        data() {
            return {
                provinceList: [],
                districtList: [],
                subDistrictList: [],
                center: { lat:18.796143, lng:98.979263 },
                options: [
                    {
                        value: 'นาย',
                        label: 'นาย'
                    },
                    {
                        value: 'นาง',
                        label: 'นาง'
                    },
                    {
                        value: 'นางสาว',
                        label: 'นางสาว'
                    },
                    {
                        value: 'เด็กชาย',
                        label: 'เด็กชาย'
                    },
                    {
                        value: 'เด็กหญิง',
                        label: 'เด็กหญิง'
                    }
                ],
                rules: {
                    titlename: [
                        { required: true, message: 'กรุณากรอกคำนำหน้าชื่อ', trigger: 'blur', },
                    ],
                    fname: [
                        { required: true, message: 'กรุณากรอกชื่อจริง', trigger: 'blur', },
                    ],
                    lname: [
                        { required: true, message: 'กรุณากรอกนามสกุล', trigger: 'blur', },
                    ],
                    phone: [
                        { required: true, message: 'กรุณากรอกเบอร์โทร', trigger: 'blur', },
                        { min: 10, max: 11, message: 'เบอร์โทรต้องยาว 9 - 10 หลัก', trigger: 'change' },
                    ],
                    relation: [
                        { required: true, message: 'กรุณากเลือกประเภท', trigger: 'change', },
                    ],
                    address: {
                        num: [
                            { required: true, message: 'กรุณากรอกเลขที่บ้าน', trigger: 'blur', },
                        ],
                        moo: [
                            { required: true, message: 'กรุณากรอกเลขที่หมู่', trigger: 'blur', },
                        ],
                        soi: [
                            { required: true, message: 'กรุณากรอกซอย', trigger: 'blur', },
                        ],
                        road: [
                            { required: true, message: 'กรุณากรอกชื่อถนน', trigger: 'blur', },
                        ],
                        village: [
                            { required: true, message: 'กรุณากรอกชื่อหมู่บ้าน', trigger: 'blur', },
                        ],
                        Pid: [
                            { required: true, message: 'กรุณาเลือกจังหวัด', trigger: 'change', },
                        ],
                        Did: [
                            { required: true, message: 'กรุณาเลือกอำเภอ', trigger: 'change', },
                        ],
                        SDTid: [
                            { required: true, message: 'กรุณาเลือกตำบล', trigger: 'change', },
                        ],
                    },
                },
                person: {
                    ptID: null,
                    titlename: '',
                    fname: '',
                    lname: '',
                    phone: undefined,
                    relation: '',
                    address: {
                        num: '',
                        moo: '',
                        soi: '',
                        road: '',
                        village: '',
                        Pid: null,
                        Did: null,
                        SDTid: null
                    },
                },
            };
        },
        async created() {
            try {
                this.provinceList = await addressService.getAllProvice();
                const res = await contactService.getContactbyContactID(this.$router.currentRoute.params.ctID)
                // {"contact_id":"30","contact_titlename":"นายสาว","contact_firstname":"เอก","contact_lastname":"เอก","contact_addNum":"1",
                // "contact_addMoo":"1","contact_addSoi":"1","contact_addRoad":"1","contact_addVillage":"1","SDTid":"100304","Did":"3",
                // "Pid":"1","contact_phone":"0899999999","contact_relation":"อิอิอิ","patient_id":"9"}
                this.person = {
                    ptID: res.patient_id,
                    titlename: res.contact_titlename,
                    fname: res.contact_firstname,
                    lname: res.contact_lastname,
                    phone: res.contact_phone,
                    relation: res.contact_relation,
                    address: {
                        num: res.contact_addMoo,
                        moo: res.contact_addSoi,
                        soi: res.contact_addSoi,
                        road: res.contact_addRoad,
                        village: res.contact_addVillage,
                        Pid: res.Pid,
                        Did: null,
                        SDTid: null
                    }
                }
                this.onProvinceChange()
                this.person.address.Did = res.Did
                this.onDistrictChange()
                this.person.address.SDTid = res.SDTid
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                });
                this.$router.push('/person');
            }
        },
        methods: {
            reset() {
                this.person = {
                    ptID: null,
                    titlename: '',
                    fname: '',
                    lname: '',
                    phone: undefined,
                    relation: '',
                    address: {
                        num: '',
                        moo: '',
                        soi: '',
                        road: '',
                        village: '',
                        Pid: null,
                        Did: null,
                        SDTid: null
                    },
                };
            },
            onMapChange (ev) {
                this.person.address.geo.lat = ev.latLng.lat();
                this.person.address.geo.lng = ev.latLng.lng();
            },
            findCurrentLocation () {
                navigator.geolocation.getCurrentPosition(pos => {
                    this.person.address.geo.lat = pos.coords.latitude;
                    this.person.address.geo.lng = pos.coords.longitude;
                    this.center = {
                        lat: this.person.address.geo.lat,
                        lng: this.person.address.geo.lng
                    }
                })
            },
            async onProvinceChange () {
                try {
                    this.person.address.Did = null;
                    this.person.address.SDTid = null;
                    this.districtList = await addressService.getDistricByProvinceID(this.person.address.Pid);
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
            async onDistrictChange () {
                try {
                    this.person.address.SDTid = null;
                    this.subDistrictList = await addressService.getSubdistrictByDistrictID(this.person.address.Did);
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
            async saveNewPerson() {
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
                const newPerson = new FormData();
                newPerson.append('patient_id', this.person.ptID);
                newPerson.append('contact_titlename', this.person.titlename);
                newPerson.append('contact_firstname', this.person.fname);
                newPerson.append('contact_lastname', this.person.lname);
                newPerson.append('contact_addNum', this.person.address.num);
                newPerson.append('contact_addMoo', this.person.address.moo);
                newPerson.append('contact_addSoi', this.person.address.soi);
                newPerson.append('contact_addRoad', this.person.address.road);
                newPerson.append('contact_addVillage', this.person.address.village);
                newPerson.append('SDTid', this.person.address.SDTid);
                newPerson.append('Did', this.person.address.Did);
                newPerson.append('Pid', this.person.address.Pid);
                newPerson.append('contact_phone', this.person.phone.replace(/-/g,""));
                newPerson.append('contact_relation', this.person.relation);
                try {
                    let res = await contactService.updateContact(this.$router.currentRoute.params.ctID, newPerson);
                    this.$alert(`บันทึกข้อมูลเรียบร้อยแล้ว`, 'สำเร็จ!', {
                        type: 'success',
                        confirmButtonText: 'ตกลง',
                    });
                    this.reset();
                    this.$router.push('/person');
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
        }
    };
</script>