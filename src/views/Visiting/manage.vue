<template>
  <div class="about">
    <el-row>
      <el-col :span="14" class="align-l">
        <h3><b>การเยี่ยมบ้านและประเมิณ Barthel Activity of Daily Living Scale (ADL)</b></h3>
      </el-col>
    </el-row>
    <el-row class="search-bar-margin">
      <el-col :span="12">
        <el-input placeholder="ค้นหาข้อมูลการประเมิณ ADL" v-model="searchtext" />
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
          width="230"
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
          width="210"
        >
          <template slot-scope="item">
            <el-tag style="margin:0 3px;" type="warning" v-if="item.row.disability_id">พิการ</el-tag>
            <el-tag style="margin:0 3px;" type="success" v-if="item.row.elders_id">สูงอายุ</el-tag>
            <el-tag style="margin:0 3px;" type="danger" v-if="item.row.patient_id">เอดส์</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="เส้นทาง / ประวัติการเยี่ยม"
            align="center"
            min-width="180"
        >
            <template slot-scope="item">
                <el-row>
                    <el-col :span="12">
                        <el-button @click="popToGmap(item.row.person_lat, item.row.person_lng)" type="primary" plain icon="el-icon-location-outline">
                          
                        </el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button @click="visit_history_modal(item.row.id_card)" type="success" plain icon="el-icon-document">
                        
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
          width="140"
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
              searchtext: '',
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
            this.personList = await visitingService.getAllPerson(this.currentPage, 10, this.searchtext);
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
            serachingData() {
              this.currentPage = 0;
              this.fetchChange();
            },
            async fetchChange() {
                this.personList = await visitingService.getAllPerson(this.currentPage, 10, this.searchtext);
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

