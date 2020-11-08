<template>
  <div class="card card-custom">
    <div class="card-body">
      <div class="fc fc-ltr fc-unthemed">
        <b-row>
          <b-col>
            <label for="Day">Tarih</label>
            <b-form-datepicker
              id="Day"
              v-model="choosenDay"
              class="mb-8"
            ></b-form-datepicker>
          </b-col>
          <b-col></b-col>
        </b-row>
        <vue-cal
          :selected-date="choosenDay"
          :time-from="calendarTimeStart"
          :time-to="calendarTimeEnd"
          :time-step="90"
          :disable-views="['years', 'year', 'month', 'week']"
          :events="events"
          :split-days="splitDays"
          :timeCellHeight="timeCellHeight"
          @view-change="ViewClicked($event)"
          @event-focus="Clicklendin($event)"
          sticky-split-labels
          today-button
          hide-view-selector
          active-view="day"
          locale="tr"
        >
        </vue-cal>
        <b-modal v-model="showAppointmentModal" size="xl" :title="modalTitle">
          <b-container fluid>
            <div :hidden="!backupActionsDisable">
              <h4>Randevu Hak Sahibi</h4>
              <hr />
              <table
                role="table"
                aria-busy="false"
                aria-colcount="10"
                class="table b-table table-striped table-bordered b-table-fixed"
              >
                <thead role="rowgroup">
                  <tr role="row">
                    <th role="columnheader" scope="col" aria-colindex="1">
                      <div>İsim Soyisim</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="2">
                      <div>Telefon Numarası</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="3">
                      <div>Kişi Sayısı</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="4">
                      <div>İşlem</div>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  <tr
                    role="row"
                    v-for="(item, index) in appointmentInfo"
                    :key="index"
                  >
                    <td aria-colindex="1" role="cell">
                      {{ item.event.fullName }}
                    </td>
                    <td aria-colindex="2" role="cell">
                      {{ item.event.phone }}
                    </td>
                    <td aria-colindex="3" role="cell">
                      {{ item.event.personCount }}
                    </td>
                    <td aria-colindex="3" role="cell">
                      <b-button
                        variant="outline-danger"
                        @click="onCancelAppointment(item, 0)"
                        size="sm"
                      >
                        <i class="far fa-trash-alt"></i> Randevu İptali
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <b-alert variant="warning" :show="!backupActionsDisable">
              Randevu hak sahibini belirlemek için Yedek listesinden arama
              yapılarak onay alınmalıdır.
            </b-alert>
            <div :hidden="!showBackupList">
              <h4>Yedek Listesi</h4>
              <hr />
              <table
                role="table"
                aria-busy="false"
                aria-colcount="10"
                class="table b-table table-striped table-bordered b-table-fixed"
              >
                <thead role="rowgroup">
                  <tr role="row">
                    <th role="columnheader" scope="col" aria-colindex="1">
                      <div>İsim Soyisim</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="2">
                      <div>Telefon Numarası</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="3">
                      <div>Kişi Sayısı</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="4">
                      <div>Randevu İşlemi</div>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  <tr
                    role="row"
                    v-for="(item, index) in backupList"
                    :key="index"
                  >
                    <td aria-colindex="1" role="cell">
                      {{ item.FullName }}
                    </td>
                    <td aria-colindex="2" role="cell">
                      {{ item.Phone }}
                    </td>
                    <td aria-colindex="3" role="cell">
                      {{ item.PersonCount }}
                    </td>
                    <td aria-colindex="3" role="cell">
                      <b-button
                        variant="outline-success"
                        @click="onAcceptAppointment(item)"
                        :disabled="backupActionsDisable"
                      >
                        Onay
                      </b-button>
                      <b-button
                        variant="outline-danger"
                        @click="onCancelAppointment(item, 1)"
                        :disabled="backupActionsDisable"
                        style="margin-left:2%"
                      >
                        Red
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-container>

          <template v-slot:modal-footer>
            <div class="w-100"></div>
          </template>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
// const axios = require("axios").default;
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/tr.js";
const axios = require("axios").default;
import moment from "moment";

export default {
  name: "ReservationList",
  components: { VueCal },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return {
      timeCellHeight: 60,
      choosenDay: moment(today).format("YYYY-MM-DD"),
      splitDays: [],
      events: [],
      calendarTimeStart: 0,
      calendarTimeEnd: 0,
      showAppointmentModal: false,
      modalTitle: "",
      appointmentInfo: [],
      backupList: [],
      backupActionsDisable: true,
      showBackupList: false
    };
  },
  methods: {
    Clicklendin(event) {
      console.log(event);
      debugger;
      this.appointmentInfo = [];
      this.backupList = [];
      if (event.fullName !== null || event.backupList.length > 0) {
        this.appointmentInfo.push({
          event
        });
        this.showAppointmentModal = true;
        this.modalTitle =
          event.tableInfo +
          "/" +
          event.startTime +
          "-" +
          event.endTime +
          " Randevu Detay Bilgileri";
        if (event.backupList.length > 0) {
          this.backupList = event.backupList;
          this.showBackupList = true;
        }
      } else {
        this.$bvToast.toast(
          "Seçtiğiniz randevunun detay bilgisi bulunmamaktadır.",
          {
            title: "Bilgilendirme",
            variant: "info",
            toaster: "b-toaster-top-center",
            solid: true
          }
        );
      }
    },
    async onCancelAppointment(item, IsBackup) {
      let body = {};
      if (IsBackup === 1) {
        body = {
          IsBackup: IsBackup,
          CustomerId: item.CustomerId,
          SessionId: item.SessionId,
          TablesId: item.TablesId,
          Day: moment(item.Day).format("YYYY-MM-DD")
        };
      } else {
        body = {
          IsBackup: IsBackup,
          CustomerId: item.event.customerId,
          SessionId: item.event.sessionId,
          TablesId: item.event.tablesId,
          Day: item.event.day
        };
      }
      if (await this.showModal("Randevu iptali gerçekleştirilecektir.")) {
        axios({
          method: "post",
          url: "https://kandilliservices.herokuapp.com/CancelAppointment",
          headers: {
            "Content-Type": "application/json"
          },
          data: body
        }).then(res => {
          if (res.data.code === 1) {
            this.$bvToast.toast("Randevu iptali işlemi başarılı olmuştur.", {
              title: "Bilgilendirme",
              variant: "info",
              toaster: "b-toaster-top-center",
              solid: true
            });
            this.backupActionsDisable = false;
            if (res.data.data !== null && res.data.data.length > 0) {
              this.backupList = res.data.data;
            }
          } else {
            this.$bvToast.toast("Randevu iptali işlemi başarısız olmuştur.", {
              title: "Hata",
              variant: "danger",
              toaster: "b-toaster-top-center",
              solid: true
            });
          }
        });
      }
    },
    async onAcceptAppointment(item) {
      if (await this.showModal("Randevu onayı gerçekleştirilecektir.")) {
        axios({
          method: "post",
          url: "https://kandilliservices.herokuapp.com/AddAppointment",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            data: {
              Customer: {
                FirstName: item.FirstName,
                LastName: item.LastName,
                Phone: item.Phone,
                Mail: item.Mail
              },
              Appointment: {
                IsBackup: 0,
                SessionId: item.SessionId,
                TablesId: item.TablesId,
                Day: moment(item.Day).format("YYYY-MM-DD"),
                PersonCount: item.PersonCount,
                Description: item.Description
              }
            }
          }
        }).then(res => {
          if (res.data.code === 1) {
            this.$bvToast.toast("Randevu onayı işlemi başarılı olmuştur.", {
              title: "Bilgilendirme",
              variant: "info",
              toaster: "b-toaster-top-center",
              solid: true
            });
            this.showAppointmentModal = false;
            this.getDayEvents();
          } else {
            this.$bvToast.toast("Randevu onayı işlemi başarısız olmuştur.", {
              title: "Hata",
              variant: "danger",
              toaster: "b-toaster-top-center",
              solid: true
            });
          }
        });
      }
    },
    ViewClicked(event) {
      this.choosenDay = moment(event.startDate).format("YYYY-MM-DD");
      this.getDayEvents();
    },
    async showModal(message) {
      const value = await this.$bvModal.msgBoxConfirm(
        "İşlemi onaylıyor musunuz?",
        {
          title: message,
          okTitle: "Onay",
          cancelTitle: "İptal",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        }
      );
      return value;
    },
    getDayEvents() {
      axios({
        method: "post",
        url:
          "https://kandilliservices.herokuapp.com/GetAppointmentFixtureByDate",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          data: {
            Day: this.choosenDay,
            DayPartId: null
          }
        }
      }).then(res => {
        this.events = [];
        if (res.data.data.cellList.length > 0) {
          this.calendarTimeStart = res.data.data.timeFrom;
          this.calendarTimeEnd = res.data.data.timeTo;
          res.data.data.cellList.forEach(el => {
            let sessionClass = "available";
            let title = "";
            if (
              el.FullName !== "" &&
              el.Phone !== 0 &&
              el.PersonCount !== null
            ) {
              title =
                el.FullName + " " + el.Phone + " (" + el.PersonCount + ")";
            }
            if (el.IsBreakTime === 1) {
              sessionClass = "lunch";
            } else if (el.CustomerId !== null) {
              sessionClass = "full";
            }
            this.events.push({
              start:
                moment(el.Day).format("YYYY-MM-DD") + " " + el.SessionStart,
              end: moment(el.Day).format("YYYY-MM-DD") + " " + el.SessionEnd,
              title: title,
              split: el.TablesId,
              sessionId: el.SessionId,
              class: sessionClass,
              startTime: el.SessionStart,
              endTime: el.SessionEnd,
              backupCount: el.BackupCount,
              backupList: el.BackupList,
              personCount: el.PersonCount,
              tableInfo: el.TableLocation + " - " + el.TableNumber,
              fullName: el.FullName,
              phone: el.Phone,
              customerId: el.CustomerId,
              tablesId: el.TablesId,
              day: el.Day
            });
          });
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Randevu Listeleme" }]);

    axios({
      method: "get",
      url: "https://kandilliservices.herokuapp.com/GetTableList"
    }).then(result => {
      if (result.data.data.length > 0) {
        result.data.data.forEach(el => {
          this.splitDays.push({
            id: el.TablesId,
            label: el.TableLocation + " - " + el.TableNumber
          });
        });
      }
      this.getDayEvents();
    });
  }
};
</script>

<style>
.vuecal__cell-split .split-label {
  color: rgba(0, 0, 0, 0.1);
  font-size: 26px;
}
.vuecal__event-title {
  font-size: 12px;
}
.vuecal__event.full {
  background-color: rgba(255, 0, 0);
  border: 1px solid rgb(255, 0, 0);
  border-right: 2px solid black;
  color: #fff;
  cursor: pointer;
}
.vuecal__event.available {
  background-color: rgba(164, 230, 210, 0.9);
  border: 1px solid rgb(144, 210, 190);
  border-right: 2px solid black;
  cursor: pointer;
}
.vuecal__event.past {
  background-color: rgba(83, 83, 83);
  border: 1px solid rgb(83, 83, 83);
  border-right: 2px solid black;
  color: #fff;
  cursor: pointer;
}
.vuecal__event.lunch {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #d6d6d6 10px,
    #d6d6d6 20px
  );
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid black;
}
.vuecal__event.lunch .vuecal__event-time,
.vuecal__event-time {
  display: none;
  align-items: center;
}
</style>
