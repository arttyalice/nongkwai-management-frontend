<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        เยี่ยมบ้านและ ประเมิณ ADL
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
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="ชื่อ-นามสกุล"
          width="200"
        >
          <template slot-scope="item">
            {{ `${item.row.person_titlename} ${item.row.person_firstname} ${item.row.person_lastname}` }}
          </template>
        </el-table-column>
        <el-table-column
          prop="person_phone"
          label="เบอร์โทรศัพท์"
          width="130"
        >
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
            label="ข้อมูล"
            align="center"
            width="250"
        >
            <template slot-scope="item">
                <el-row>
                    <el-col :span="12">
                        <el-button @click="popToGmap(item.row.person_lat, item.row.person_lng)" type="primary" plain>
                            เส้นทาง
                        </el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button @click="visit_history_modal(item.row.id_card)" type="success" plain>
                        ประวัติ
                      </el-button>
                    </el-col>
                </el-row>

            </template>
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
                <router-link :to="`/visiting/insert/${item.row.id_card}`">
                  <el-button type="success" plain icon="el-icon-edit">
                    เยี่ยมบ้าน
                  </el-button>
                </router-link>
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
            :total="personList.length"
            @current-change="onPageChange"    
        >
        </el-pagination>
    </el-row>
	<HistoryModal v-if="historyModalVisible" @closeDialog="historyModalVisible = false" :userInfo="userInfo" />
  </div>
</template>

<script>
    import moment from 'moment';
    import visitingService from '@/services/visiting';
    import HistoryModal from '@/components/Visiting/History';

    export default {
        components: {
			HistoryModal,
        },
        data() {
            return {
                    currentPage: 0,
					historyModalVisible: false,
                    userInfo: {},
                    personList: [],
                    userPosition: [],
                    userStatus: [
                    { id: 0, name: 'ผู้ดูแลระบบ' },
                    { id: 1, name: 'ผู้ใช้งานระบบ' },
                ],
            };
        },
        async created() {
            this.personList = await visitingService.getAllPerson(this.currentPage, 10, '');
        },
        methods: {
            popToGmap (lat, lng) {
                navigator.geolocation.getCurrentPosition(pos => {
                    window.open(`https://www.google.com/maps/dir/${pos.coords.latitude},${pos.coords.longitude}/${lat},${lng}/@${lat},${lng}z?`)
                })
            },
            onPageChange(page) {
                this.currentPage = page - 1;
                this.fetchChange();
            },
            async fetchChange() {
                this.personList = await visitingService.getAllPerson(this.currentPage, 10, '');
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

