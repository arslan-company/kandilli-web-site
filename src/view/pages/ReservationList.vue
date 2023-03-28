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
              locale="tr"
              :hide-header="true"
            ></b-form-datepicker>
          </b-col>
          <b-col></b-col>
        </b-row>
        <vue-cal
          :selected-date="choosenDay"
          :time-from="calendarTimeStart"
          :time-to="calendarTimeEnd"
          :time-step="105"
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
                class="table b-table table-striped table-bordered"
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
                      <div>Müşteri Notu</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="5">
                      <div>Randevu Kayıt Tarihi</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="6">
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
                    <td aria-colindex="4" role="cell">
                      {{ item.event.description }}
                    </td>
                    <td aria-colindex="5" role="cell">
                      {{ item.event.systemDate | formatDate }}
                    </td>
                    <td aria-colindex="6" role="cell">
                      <b-button
                        variant="outline-danger"
                        @click="onClickDelete(item)"
                        size="sm"
                        :disabled="isEditableCancelAppointment"
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
                class="table b-table table-striped table-bordered"
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
                      <div>Müşteri Notu</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="4">
                      <div>Randevu Kayıt Tarihi</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="5">
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
                      {{ item.FirstName + " " + item.LastName }}
                    </td>
                    <td aria-colindex="2" role="cell">
                      {{ item.Phone }}
                    </td>
                    <td aria-colindex="3" role="cell">
                      {{ item.PersonCount }}
                    </td>
                    <td aria-colindex="4" role="cell">
                      {{ item.Description }}
                    </td>
                    <td aria-colindex="5" role="cell">
                      {{ item.SystemDate }}
                    </td>
                    <td aria-colindex="6" role="cell">
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

        <b-modal v-model="isShowDeleteReservationModal" title="Müşteri Detayı">
          <b-container fluid>
            <b-row>
              <b-col>
                <b-form-group
                  label="Randevu İptali Sebebi"
                  label-for="cancelReservationReason"
                >
                  <b-form-select
                    id="cancelReservationReason"
                    v-model="cancelReservationReason"
                    :options="cancelReservationReasonList"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>

          <template v-slot:modal-footer>
            <div class="w-100">
              <b-button
                variant="primary"
                style="float:right;margin-left:5px;"
                @click="onCancelAppointment(deleteObject, 0)"
              >
                Onay
              </b-button>
              <b-button
                variant="secondary"
                style="float:right"
                @click="isShowDeleteReservationModal = false"
              >
                İptal
              </b-button>
            </div>
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
import Swal from "sweetalert2";
import JwtService from "@/core/services/jwt.service";
import decode from "jwt-decode";
import Vue from "vue";

export default {
  name: "ReservationList",
  components: { VueCal },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return {
      timeCellHeight: 90,
      today: moment(today).format("YYYY-MM-DD"),
      choosenDay: moment(today).format("YYYY-MM-DD"),
      splitDays: [],
      events: [],
      calendarTimeStart: 0,
      calendarTimeEnd: 0,
      showAppointmentModal: false,
      isShowDeleteReservationModal: false,
      modalTitle: "",
      appointmentInfo: [],
      backupList: [],
      backupActionsDisable: true,
      showBackupList: false,
      currentTimeForMinute: "",
      isEditableCancelAppointment: false,
      authToken: {},
      deleteObject: {},
      cancelReservationReason: 0,
      cancelReservationReasonList: [
        {
          value: 0,
          text: "Sebepsiz"
        },
        {
          value: 1,
          text: "Müşteri randevu iptali istedi"
        },
        {
          value: 2,
          text: "Randevuya geç geldi"
        },
        {
          value: 3,
          text: "Randevuya gelmedi"
        }
      ]
    };
  },
  methods: {
    async Clicklendin(event) {
      this.isEditableCancelAppointment = false;
      this.appointmentInfo = [];
      this.backupList = [];
      this.modalTitle =
        event.tableInfo + "/" + event.startTime + "-" + event.endTime;
      if (event.fullName !== null || event.backupList.length > 0) {
        this.appointmentInfo.push({
          event
        });
        this.showAppointmentModal = true;
        this.modalTitle = this.modalTitle + " Randevu Detay Bilgileri";
        if (event.backupList.length > 0) {
          this.backupList = event.backupList;
          this.showBackupList = true;
        } else {
          this.showBackupList = false;
        }
        if (
          !event.isClickable ||
          this.authToken.AuthorityList.indexOf("cancel_randevu") === -1
        ) {
          this.isEditableCancelAppointment = true;
        }
      } else {
        if (event.isClickable) {
          if (this.authToken.AuthorityList.indexOf("add_randevu") !== -1) {
            if (await this.directCreateReservation(this.modalTitle)) {
              this.$router.push({
                name: "CreateReservation",
                params: {
                  isSendFromReservationList: true,
                  event: event
                }
              });
            }
          } else {
            this.$bvToast.toast(
              "Randevu oluşturmaya yetkiniz bulunmamaktadır.",
              {
                title: "Uyarı",
                variant: "danger",
                toaster: "b-toaster-top-center",
                solid: true
              }
            );
          }
        } else {
          this.$bvToast.toast("Randevu oluşturmaya uygun değildir.", {
            title: "Bilgilendirme",
            variant: "warning",
            toaster: "b-toaster-top-center",
            solid: true
          });
        }
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
          Day: item.event.day,
          CancelReasonId: this.cancelReservationReason
        };
      }
      this.cancelReservationReason = 0;
      axios({
        method: "post",
        url: "https://kandilli.herokuapp.com/CancelAppointment",
        headers: {
          "Content-Type": "application/json"
        },
        data: body
      }).then(res => {
        if (res.data.code === 1) {
          Swal.fire({
            title: "",
            text: "Randevu iptali işlemi başarılı olmuştur.",
            icon: "success",
            timer: 3000
          });
          this.backupActionsDisable = false;
          if (IsBackup === 0 && item.event.backupList.length === 0) {
            this.showAppointmentModal = false;
          }
          if (res.data.data !== null && res.data.data.length > 0) {
            this.backupList = res.data.data;
          }
          this.getDayEvents();
        } else {
          this.$bvToast.toast("Randevu iptali işlemi başarısız olmuştur.", {
            title: "Hata",
            variant: "danger",
            toaster: "b-toaster-top-center",
            solid: true
          });
        }
        this.isShowDeleteReservationModal = false;
      });
    },
    async onAcceptAppointment(item) {
      if (await this.showModal("Randevu onayı gerçekleştirilecektir.")) {
        var tablesArray = [];
        tablesArray[0] = item.TablesId;
        axios({
          method: "post",
          url: "https://kandilli.herokuapp.com/AddAppointment",
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
                Tables: tablesArray,
                Day: moment(item.Day).format("YYYY-MM-DD"),
                PersonCount: item.PersonCount,
                Description: item.Description,
                SystemDate: item.SystemDate
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
    async directCreateReservation(message) {
      const h = this.$createElement;
      const titleVNode = h("div", {
        domProps: {
          innerHTML:
            "<b>" +
            message +
            "</b> seans bilgileri için Randevu Oluşturma ekranına yönlendirileceksiniz."
        }
      });
      const value = await this.$bvModal.msgBoxConfirm([titleVNode], {
        title: "İşlemi onaylıyor musunuz?",
        okTitle: "Onay",
        cancelTitle: "İptal",
        footerClass: "p-2",
        hideHeaderClose: false,
        centered: true
      });
      return value;
    },
    async deleteShowModal(message) {
      const h = this.$createElement;
      const titleVNode = h("div", {
        domProps: {
          innerHTML:
            "<b>" +
            message +
            "</b> seans bilgileri için Randevu Oluşturma ekranına yönlendirileceksiniz."
        }
      });
      const value = await this.$bvModal.msgBoxConfirm([titleVNode], {
        title: "İşlemi onaylıyor musunuz?",
        okTitle: "Onay",
        cancelTitle: "İptal",
        footerClass: "p-2",
        hideHeaderClose: false,
        centered: true
      });
      return value;
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
          "https://kandilli.herokuapp.com/GetAppointmentFixtureByDate",
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
            var sessionBegin = el.SessionStart;
            var sessionArray = sessionBegin.split(":");
            var hour = sessionArray[0];
            var minute = sessionArray[1];
            var sessionTotalMinute = parseInt(hour) * 60 + parseInt(minute);
            let sessionClass = "available";
            let title = "";
            let content = "";
            var isClickable = true;

            if (
              el.FullName !== "" &&
              el.Phone !== 0 &&
              el.PersonCount !== null
            ) {
              title = el.FullName;
              content = `Tel: ${el.Phone} <br> Kişi Sayısı: ${el.PersonCount}`;
            }
            if (el.IsBreakTime === 1) {
              sessionClass = "lunch";
            } else if (el.CustomerId !== null) {
              sessionClass = "full";
            }
            if (
              (moment(this.choosenDay).isSameOrBefore(this.today) &&
                this.currentTimeForMinute > sessionTotalMinute) ||
              sessionClass === "lunch"
            ) {
              isClickable = false;
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
              day: el.Day,
              content: content,
              dayPartId: el.DayPartId,
              isClickable: isClickable,
              description: el.Description,
              systemDate: el.SystemDate
            });
          });
        }
      });
    },
    onClickDelete(item) {
      this.isShowDeleteReservationModal = true;
      this.deleteObject = item;
    }
  },
  mounted() {
    if (this.$route.params.isSendFromCreateReservation) {
      this.choosenDay = this.$route.params.day;
    }
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Randevu Listeleme" }]);
    this.authToken = decode(JwtService.getToken());

    const now = new Date();
    let hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    let minute =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    this.currentTimeForMinute = parseInt(hour) * 60 + parseInt(minute);

    axios({
      method: "get",
      url: "https://kandilli.herokuapp.com/GetTableList"
    }).then(result => {
      if (result.data.data.length > 0) {
        result.data.data.forEach(el => {
          this.splitDays.push({
            id: el.TablesId,
            label: `${el.TableLocation} - ${el.TableNumber} (${el.ChairCount} KİŞİ)`
          });
        });
      }
      this.getDayEvents();
    });

    Vue.filter("formatDate", function(value) {
      return moment(value).format("DD.MM.yyyy");
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
  font-weight: bold;
  margin-bottom: 8px;
}

.vuecal__event-content {
  font-size: 10px;
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

.vuecal__title-bar {
  background-color: rgba(174, 139, 61, 0.78);
  min-height: 2.5em;
}

.vuecal__title,
.vuecal__arrow i.angle,
.vuecal__today-btn span.default {
  color: white;
}

.vuecal__time-column {
  width: 5em;
  padding-right: 0.8em;
}

.vuecal__flex .vuecal__split-days-headers {
  margin-left: 65px !important;
  height: 3em !important;
  font-size: 11px;
  font-weight: bold;
}

.vuecal__time-column .vuecal__time-cell {
  font-size: 1em;
}
</style>
