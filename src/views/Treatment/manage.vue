<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        ประวัติการรักษา
      </el-col>
      <el-col :span="12" class="align-r">
          <router-link to="/treatment/insert">
            <el-button type="primary" plain @click="dialogVisible = true">
                เพิ่มข้อมูลการรักษา
            </el-button>
          </router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="ค้นหาประวัติการรักษา" v-model="searchtext" />
      </el-col>
      <el-col class="align-l" :span="12">
        <el-button @click="serachingData" style="margin-left: 5px;" type="primary" icon="el-icon-search">ค้นหา</el-button>
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
          prop="person_phone"
          label="เบอร์โทรศัพท์"
          width="130"
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
          width="130"
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
            min-width="160"
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
        <!-- <el-table-column>
        </el-table-column> -->
        <el-table-column
          label="ตัวเลือก"
          align="center"
          width="250"
        >
          <template slot-scope="item">
            <el-row>
              <el-col :span="12">
                <router-link :to="`/treatment/update/${item.row.treatment_id}`">
                  <el-button type="success" plain icon="el-icon-edit">
                    แก้ไข
                  </el-button>
                </router-link>
              </el-col>
              <el-col :span="12">
                <el-button @click="deleteTreatment(item.row.treatment_id)" type="danger" plain icon="el-icon-edit">
                  ลบ
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
            :total="tableLength"
            @current-change="onPageChange"    
        >
        </el-pagination>
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
	<HistoryModal v-if="historyModalVisible" @closeDialog="historyModalVisible = false" :userInfo="userInfo" />
  </div>
</template>

<script>
    import moment from 'moment';
    import treatmentService from '@/services/treatment';
    import HistoryModal from '@/components/Visiting/History';

    export default {
        components: {
			HistoryModal,
        },
        data() {
            return {
              isShowDialog: false,
              searchtext: '',
              currentPage: 0,
              tableLength: 0,
					    historyModalVisible: false,
              userInfo: {},
              personList: [],
              userPosition: [],
              fileList: [],
              userStatus: [
                { id: 0, name: 'ผู้ดูแลระบบ' },
                { id: 1, name: 'ผู้ใช้งานระบบ' },
              ],
            };
        },
        async created() {
            this.personList = await treatmentService.getAllTreatment(this.currentPage, 10, this.searchtext);
            this.tableLength = Number((await treatmentService.getLength()).length)
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
          },
          async deleteTreatment (id) {
              this.$confirm(`โปรดตรวจสอบให้แน่ใจอีกครั้งข้อมูลจะไม่สามารถกูคืนได้`,
                'โปรดตรวจสอบ!', {
                type: 'warning',
                confirmButtonText: 'ตกลง',
              }).then(async () => {
                try {
                  const res = await treatmentService.removetreatment(id);
                  this.$alert(`ลบข้อมูลเรียบร้อยแล้ว`, 'ลบข้อมูลสำเร็จแล้ว', {
                    type: 'success',
                  });
                  this.fetchChange();
                } catch (error) {
                  this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                  });
                }
              });
          },
          onPageChange(page) {
              this.currentPage = page - 1;
              this.fetchChange();
          },
          serachingData() {
            this.currentPage = 0;
            this.fetchChange();
          },
          async fetchChange() {
              this.personList = await treatmentService.getAllTreatment(this.currentPage, 10, this.searchtext);
          },
          async visit_history_modal(id_card) {
            this.userInfo = {
              id_card: id_card
            }
            this.historyModalVisible = true
          },
          momentDate(date) {
              return date !== '0000-00-00' ? moment(date).format('DD/MM/YYYY') : 'ไม่ได้บันทึกวันเกิด';
          },
        },
    };
</script>

