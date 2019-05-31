
<template>
    <span>
        <el-row>
            <el-col class="align-l" :span="12">
                <h2>แก้ไขข้อมูลของ {{ `${person.fname} ${person.lname}` }}</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/person">
                    <el-button plain>
                        กลับ
                    </el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-form ref="form" :model="person" :rules="rules" label-width="120px" class="demo-form-inline">
            <!-- Person info -->
            <el-row>
                <h2>ข้อมูลส่วนตัว</h2>
            </el-row>
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
                    <el-form-item label="บัตรประชาชน :" prop="idCard">
                        <el-input v-mask="'#-####-#####-##-#'" placeholder="1-2399-00123-00-3" v-model="person.idCard"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="สถานะ :" prop="person_status">
                        <el-select filterable style="width: 100%;" v-model="person.person_status">
                            <el-option label="มีชีวิตอยู่" value="มีชีวิตอยู่"></el-option>
                            <el-option label="ถึงแก่กรรม" value="ถึงแก่กรรม"></el-option>
                            <el-option label="ย้ายที่อยู่" value="ย้ายที่อยู่"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="วันเกิด :" prop="birthDate">
                        <el-date-picker
                            style="width: 100%;"
                            :default-time="(() => {
                                let d = new Date()
                                let year = d.getFullYear() + 543
                                return `${year}-01-01` 
                            })()"
                            v-model="person.birthDate"
                            type="date"
                            placeholder="เลือกวันเกิด">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="สัญชาติ :" prop="nationality">
                        <el-input placeholder="ไทย, ฝรั่งเศษ" v-model="person.nationality"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="เบอร์โทร :" prop="phone">
                        <el-input v-mask="'###-#######'" placeholder="081-2345678" v-model="person.phone"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                    <el-form-item label="ประเภท :" prop="type">
                        <el-select style="width: 100%;" v-model="person.type" multiple placeholder="เลือกประเภท">
                            <el-option label="ผู้ป่วยโรคเอดส์" :value="1"></el-option>
                            <el-option label="ผู้พิการ" :value="2"></el-option>
                            <el-option label="ผู้สูงอายุ" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> -->
            </el-row>

            <!-- Address -->
            <el-row>
                <h2>ที่อยู่</h2>
            </el-row>
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

            <el-row>
                <el-col :span="24">
                    <el-form-item style="text-align: left;" label="ตำแหน่ง :">
                        <span style="position: relative;">
                            <el-button
                                type="warning"
                                icon="el-icon-location"
                                style="position: absolute; top: 10px; left: 10px; z-index: 2;"
                                @click="findCurrentLocation"
                            >
                                Get current location
                            </el-button>
                            <GmapMap
                                :center="center"
                                :zoom="13"
                                :options="{
                                    zoomControl: true,
                                    mapTypeControl: false,
                                    scaleControl: false,
                                    streetViewControl: false,
                                    rotateControl: false,
                                    fullscreenControl: false,
                                    disableDefaultUi: false
                                }"
                                @click="onMapChange"
                                style="width: 100%; height: 500px"
                            >
                                <GmapMarker
                                    v-if="person.address.geo.lat !== null"
                                    :position="{lat: person.address.geo.lat, lng: person.address.geo.lng}"
                                    :clickable="true"
                                    :draggable="true"
                                    @dragend="onMapChange"
                                />
                            </GmapMap>
                        </span>
                    </el-form-item>
                    
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset">ล้างข้อมูล</el-button>
            <el-button type="primary" @click="saveUpdatePerson">บันทึก</el-button>
        </span>
    </span>
</template>


<script>
    import moment from 'moment';
    import personService from '@/services/person';
    import addressService from '@/services/address_prefence';
    export default {
        data() {
            return {
                provinceList: [],
                districtList: [],
                subDistrictList: [],
                center: { lat: 18.796143, lng: 98.979263 },
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
                    fname: [
                        { required: true, message: 'กรุณากรอกชื่อจริง', trigger: 'change', },
                    ],
                    lname: [
                        { required: true, message: 'กรุณากรอกนามสกุล', trigger: 'change', },
                    ],
                    phone: [
                        { required: true, message: 'กรุณากรอกเบอร์โทร', trigger: 'change', },
                        { min: 10, max: 11, message: 'เบอร์โทรต้องยาว 9 - 10 หลัก', trigger: 'change' },
                    ],
                    type: [
                        { required: true, message: 'กรุราเลือกประเภท', trigger: 'change', },
                    ],
                    birthDate: [
                        { required: true, message: 'กรุณากรอกวันเกิด', trigger: 'change', },
                    ],
                    nationality: [
                        { required: true, message: 'กรุณากรอกสัญชาติ', trigger: 'change', },
                    ],
                    idCard: [
                        { required: true, message: 'กรุณากรอกรหัสบัตรประชาชน', trigger: 'change', },
                        { min: 17, max: 17, message: 'รหัสบัตรประชาชนต้องยาว 13 หลัก', trigger: 'change' },
                    ],
                    titlename: [
                        { required: true, message: 'กรุณากรอกคำนำหน้าชื่อ', trigger: 'change', },
                    ],
                    person_status: [
                        { required: true, message: 'กรุณากรอกสถานะความเป็นอยู่', trigger: 'change', },
                    ],
                    type: [
                        { required: true, message: 'กรุณากเลือกประเภท', trigger: 'change', },
                    ],
                    address: {
                        num: [
                            { required: true, message: 'กรุณากรอกเลขที่บ้าน', trigger: 'change', },
                        ],
                        moo: [
                            { required: true, message: 'กรุณากรอกเลขที่หมู่', trigger: 'change', },
                        ],
                        soi: [
                            { required: true, message: 'กรุณากรอกซอย', trigger: 'change', },
                        ],
                        road: [
                            { required: true, message: 'กรุณากรอกชื่อถนน', trigger: 'change', },
                        ],
                        village: [
                            { required: true, message: 'กรุณากรอกชื่อหมู่บ้าน', trigger: 'change', },
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
                    idCard: '',
                    titlename: '',
                    fname: '',
                    lname: '',
                    phone: '',
                    type: [],
                    old_type: [],
                    birthDate: '',
                    nationality: '',
                    person_status: '',
                    address: {
                        num: '',
                        moo: '',
                        soi: '',
                        road: '',
                        village: '',
                        Pid: null,
                        Did: null,
                        SDTid: null,
                        geo: {
                            lat: null,
                            lng: null,
                        },
                    },
                },
            };
        },
        async created() {
            try {
                this.provinceList = await addressService.getAllProvice();
                const res = await personService.getPersonbyID(this.$router.currentRoute.params.pID);
                this.center = { lat: parseFloat(res.person_lat), lng: parseFloat(res.person_lng) }
                this.person = {
                    idCard: res.id_card,
                    titlename: res.person_titlename,
                    fname: res.person_firstname,
                    lname: res.person_lastname,
                    phone: res.person_phone,
                    type: res.person_type,
                    old_type: res.person_type,
                    birthDate: res.person_birthday,
                    nationality: res.person_nationality,
                    person_status: res.person_status,
                    address: {
                        num: res.person_addNum,
                        moo: res.person_addMoo,
                        soi: res.person_addSoi,
                        road: res.person_addRoad,
                        village: res.person_addVillage,
                        Pid: res.Pid,
                        Did: res.Did,
                        SDTid: res.STDid,
                        geo: {
                            lat: parseFloat(res.person_lat),
                            lng: parseFloat(res.person_lng),
                        },
                    },
                };
                this.districtList = await addressService.getDistricByProvinceID(this.person.address.Pid);
                this.subDistrictList = await addressService.getSubdistrictByDistrictID(this.person.address.Did);
            } catch (error) {
                console.log(error)
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
                    idCard: '',
                    titlename: '',
                    fname: '',
                    lname: '',
                    phone: '',
                    type: [],
                    old_type: [],
                    birthDate: '',
                    nationality: '',
                    person_status: '',
                    address: {
                        num: '',
                        moo: '',
                        soi: '',
                        road: '',
                        village: '',
                        Pid: null,
                        Did: null,
                        SDTid: null,
                        geo: {
                            lat: null,
                            lng: null,
                        },
                    },
                };
            },
            onMapChange(ev) {
                this.person.address.geo.lat = ev.latLng.lat();
                this.person.address.geo.lng = ev.latLng.lng();
            },
            findCurrentLocation() {
                navigator.geolocation.getCurrentPosition((pos) => {
                    this.person.address.geo.lat = pos.coords.latitude;
                    this.person.address.geo.lng = pos.coords.longitude;
                    this.center = {
                        lat: this.person.address.geo.lat,
                        lng: this.person.address.geo.lng,
                    };
                });
            },
            async onProvinceChange() {
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
            async onDistrictChange() {
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
            async saveUpdatePerson() {
                let valid = null;
                await this.$refs.form.validate((val) => {
                    valid = val;
                });
                if (valid === false) {
                    this.$alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึกข้อมูล', 'ข้อมูลไม่ครบถ้วน!', {
                        type: 'warning',
                        confirmButtonText: 'ตกลง',
                    });
                    return;
                } else {
                    if (this.validateLatLng()) {
                        this.$alert('กรุณาเลือกตำแหน่งที่อยู่บนแผนที่ก่อนบันทึก', 'ข้อมูลไม่ครบถ้วน!', {
                            type: 'warning',
                            confirmButtonText: 'ตกลง',
                        });
                        return;
                    }
                }
                const FormPerson = new FormData();
                FormPerson.append('person_titlename', this.person.titlename);
                FormPerson.append('person_firstname', this.person.fname);
                FormPerson.append('person_lastname', this.person.lname);
                FormPerson.append('person_birthday', moment(this.person.birthDate).format('YYYY-MM-DD').toString());
                FormPerson.append('person_nationality', this.person.nationality);
                FormPerson.append('person_addNum', this.person.address.num);
                FormPerson.append('person_addMoo', this.person.address.moo);
                FormPerson.append('person_addSoi', this.person.address.soi);
                FormPerson.append('person_addRoad', this.person.address.road);
                FormPerson.append('person_addVillage', this.person.address.village);
                FormPerson.append('STDid', this.person.address.SDTid);
                FormPerson.append('Did', this.person.address.Did);
                FormPerson.append('Pid', this.person.address.Pid);
                FormPerson.append('person_phone', this.person.phone.replace('-', ''));
                FormPerson.append('person_status', this.person.person_status);
                FormPerson.append('person_lat', this.person.address.geo.lat);
                FormPerson.append('person_lng', this.person.address.geo.lng);
                FormPerson.append('person_type', JSON.stringify(this.person.type));
                FormPerson.append('old_person_type', JSON.stringify(this.person.old_type));
                FormPerson.append('user_id', localStorage.getItem('admin_user_data'));
                try {
                    const res = await personService.updatePerson(FormPerson, this.$router.currentRoute.params.pID);
                    this.$alert(
                        `บันทึกข้อมูลผู้ใช้ของ ${this.person.fname} ${this.person.lname} เรียบร้อยแล้ว`,
                        'สำเร็จ!',
                        {
                            type: 'success',
                            confirmButtonText: 'ตกลง',
                        },
                    );
                    this.reset();
                    this.$router.push('/person');
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาดขณะบันทึกข้อมูล โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
            validateLatLng() {
                if (this.person.address.geo.lat === null || this.person.address.geo.lng === null) {
                    return true;
                }
                return false;
            },
        },
    };
</script>