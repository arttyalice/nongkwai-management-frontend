<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        <h3><b>จัดการข้อมูลเบี้ยยังชีพ</b></h3>
      </el-col>
      <el-col :span="12" class="align-r">
        <el-button type="primary" plain @click="insertModalVisible = true">
            เพิ่มข้อมูลเบี้ยยังชีพ
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="personList"
        style="width: 100%"
      >
        <el-table-column
          prop="id_card"
          label="เลขบัตรประชาชน"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="ชื่อ-นามสกุล"
          width="180"
        >
          <template slot-scope="item">
            {{ `${item.row.person_titlename} ${item.row.person_firstname} ${item.row.person_lastname}` }}
          </template>
        </el-table-column>
        <el-table-column
          label="ประเภท"
          width="200"
        >
          <template slot-scope="item">
            <el-tag style="margin:0 3px;" type="info" v-if="item.row.disability_id">พิการ</el-tag>
            <el-tag style="margin:0 3px;" type="success" v-if="item.row.elders_id">สูงอายุ</el-tag>
            <el-tag style="margin:0 3px;" type="warning" v-if="item.row.patient_id">เอดส์</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="ประเภทเบี้ยยังชีพ"
          width="160"
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
          width="150"
        >
          <template slot-scope="item">
            {{ dateConvert(item.row.allowance_date) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="allowance_money"
          label="จำนวนเงิน"
          width="130"
        >
        </el-table-column>
        <el-table-column>
        </el-table-column>
        <el-table-column
          label="ตัวเลือก"
          align="center"
          width="150"
        >
          <template slot-scope="item">
            <el-row>
              <el-col :span="24">
                <el-button @click="openUpdateModal(item.row.allowance_id)" type="success" plain icon="el-icon-edit">
                    แก้ไข
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 15px;">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="dataLength"
            @current-change="onPageChange"    
        >
        </el-pagination>
    </el-row>
	<InsertModal v-if="insertModalVisible" @closeDialog="insertModalVisible = false" @DoneInsert="fetchChange" />
	<UpdateModal v-if="updateModalVisible" @closeDialog="updateModalVisible = false" @DoneUpdate="fetchChange" :id="allowanceID" />
  </div>
</template>

<script>
    import moment from 'moment';
    import allowanceService from '@/services/allowance';
    import InsertModal from '@/components/Allowance/InsertModal';
    import UpdateModal from '@/components/Allowance/UpdateModal';

    export default {
        components: {
            InsertModal,
            UpdateModal
        },
        data() {
            return {
                    currentPage: 0,
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
            };
        },
        async created() {
            try {
                this.personList = await allowanceService.getAllPersonWithTypeAndAllowance(this.currentPage, 10, '');
                this.dataLength = Number((await allowanceService.getLength())['length'])
            } catch (error) {
                console.log(error)
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                })
            }
        },
        methods: {
            onPageChange(page) {
                this.currentPage = page - 1;
                this.fetchChange();
            },
            async fetchChange() {
                this.personList = await allowanceService.getAllPersonWithTypeAndAllowance(this.currentPage, 10, '');
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
            }
        },
    };
</script>

