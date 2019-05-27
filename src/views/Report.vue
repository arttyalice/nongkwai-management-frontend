<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        จัดการข้อมูลเบี้ยยังชีพ
      </el-col>
      <el-col :span="12" class="align-r">
        <el-button type="primary" plain @click="allowanceReport">
            ออกรายงาน
        </el-button>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:10px;">
        <el-col :span="2" style="line-height: 38px;">
            {{ 'ประเภทประชากร: ' }}
        </el-col>
        <el-col :span="5">
          <el-select style="width: 100%;" v-model="person.type" multiple placeholder="เลือกประเภท">
            <el-option label="ผู้ป่วยโรคเอดส์" :value="1"></el-option>
            <el-option label="ผู้พิการ" :value="2"></el-option>
            <el-option label="ผู้สูงอายุ" :value="3"></el-option>
          </el-select>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="2" style="line-height: 38px;">
            {{ 'รับเมื่อ' }}
        </el-col>
        <el-col :span="5">
            <el-date-picker
                style="width: 100%;"
                v-model="fromDate"
                :default-value="(() => {
                    let d = new Date()
                    let year = d.getFullYear() + 543
                    return new Date(`${year}-01-01`)
                })()"
                type="date"
                placeholder="เลือกวันเกิด">
            </el-date-picker>
        </el-col>
        <el-col :span="1" style="line-height: 38px;">
        {{ 'ถึง' }}
        </el-col>
        <el-col :span="5">
            <el-date-picker
                style="width: 100%;"
                v-model="toDate"
                :default-value="(() => {
                    let d = new Date()
                    let year = d.getFullYear() + 543
                    return new Date(`${year}-01-01`)
                })()"
                type="date"
                placeholder="เลือกวันเกิด">
            </el-date-picker>
        </el-col>
        <el-col :span="2">
            <el-button @click="fetchChange" style="margin-left: 5px;" type="primary" icon="el-icon-search">ค้นหา</el-button>
        </el-col>
    </el-row>
    <el-row id="PrintTable"> 
      <el-table
        :data="personList"
        style="width: 100%"
      >
        <el-table-column
          prop="id_card"
          label="เลขบัตรประชาชน"
        >
        </el-table-column>
        <el-table-column
          label="ชื่อ-นามสกุล"
        >
          <template slot-scope="item">
            {{ `${item.row.person_titlename} ${item.row.person_firstname} ${item.row.person_lastname}` }}
          </template>
        </el-table-column>
        <el-table-column
          label="ประเภท"
        >
          <template slot-scope="item">
            <el-tag style="margin:0 3px;" type="info" v-if="item.row.disability_id">พิการ</el-tag>
            <el-tag style="margin:0 3px;" type="success" v-if="item.row.elders_id">สูงอายุ</el-tag>
            <el-tag style="margin:0 3px;" type="warning" v-if="item.row.patient_id">เอดส์</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="ประเภทเบี้ยยังชีพ"
        >
          <template slot-scope="item">
            <span v-if="Number(item.row.allowance_type) === 1">เบี้ยผู้สูงอายุ</span>
            <span v-if="Number(item.row.allowance_type) === 2">เบี้ยผู้พิการ</span>
            <span v-if="Number(item.row.allowance_type) === 3">เบี้ยผู้ป่วยโรคเอดส์</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="allowance_date"
          label="วันที่ได้รับเบี้ยยังชีพ"
        >
          <template slot-scope="item">
            {{ dateConvert(item.row.allowance_date) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="allowance_money"
          label="จำนวนเงิน"
        >
        </el-table-column>
      </el-table>
      <el-row>
          <el-col class="align-l" style="margin-top: 15px;">
              รวมค่าเบี้ยยังชีพทั้งหมด <strong>{{ summary }}</strong> บาท
          </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
    import moment from 'moment';
    import allowanceService from '@/services/allowance';

    export default {
        data() {
            return {
                fromDate: '',
                toDate: '',
                summary: 0,
                insertModalVisible: false,
                updateModalVisible: false,
                allowanceID: null,
                dataLength: 0,
                personList: [],
                userPosition: [],
                userStatus: [
                    { id: 0, name: 'ผู้ดูแลระบบ' },
                    { id: 1, name: 'ผู้ใช้งานระบบ' },
                ],
                person: {
                  type: []
                }
            };
        },
        async created() {
            try {
                this.personList = await allowanceService.getAllPersonWithTypeAndAllowanceReport(this.fromDate, this.toDate, JSON.stringify([]));
                this.dataLength = Number((await allowanceService.getLength())['length'])
                this.summary = 0
                this.personList.forEach(e => {
                    this.summary += Number(e.allowance_money)
                })
            } catch (error) {
                console.log(error)
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                })
            }
        },
        methods: {
            async fetchChange() {
                const from = this.fromDate ? moment(this.fromDate).add(-543, 'years').format('YYYY-MM-DD 00:00:00') : ''
                const to = this.toDate ? moment(this.toDate).add(-543, 'years').format('YYYY-MM-DD 23:59;59') : ''
                this.personList = await allowanceService.getAllPersonWithTypeAndAllowanceReport(from, to, JSON.stringify(this.person.type));
                this.summary = 0
                this.personList.forEach(e => {
                    this.summary += Number(e.allowance_money)
                })
            },
            openUpdateModal (alID) {
                this.allowanceID = alID
                this.updateModalVisible = true
            },
            momentDate(date) {
                return date !== '0000-00-00' ? moment(date).format('DD/MM/YYYY') : 'ไม่ได้บันทึกวันเกิด';
            },
            dateConvert (date) {
              return moment(date).add(543, 'years').format('DD/MM/YYYY')
            },
            allowanceReport () {
                // window.print()
                const printcontent = document.getElementById('PrintTable')
                const new_window = window.open()
                new_window.document.write(printcontent.outerHTML)
                new_window.print()
                new_window.close()
            }
        },
    };
</script>

