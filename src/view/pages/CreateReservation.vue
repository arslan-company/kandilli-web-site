<template>
  <div class="card card-custom">
    <div class="card-body p-0">
      <!--begin: Wizard-->
      <div
        class="wizard wizard-1"
        id="kt_wizard_v1"
        data-wizard-state="step-first"
        data-wizard-clickable="true"
      >
        <!--begin: Wizard Nav-->
        <div class="wizard-nav border-bottom">
          <div class="wizard-steps p-8 p-lg-10">
            <div
              class="wizard-step"
              data-wizard-type="step"
              data-wizard-state="current"
            >
              <div class="wizard-label">
                <i class="wizard-icon far fa-address-card"></i>
                <h3 class="wizard-title" style="margin-top: 30px">
                  1. Müşteri Bilgileri
                </h3>
              </div>
              <i class="wizard-arrow flaticon2-next"></i>
            </div>
            <div class="wizard-step" data-wizard-type="step">
              <div class="wizard-label">
                <i class="wizard-icon flaticon-list"></i>
                <h3 class="wizard-title">2. Rezervasyon Bilgileri</h3>
              </div>
              <i class="wizard-arrow flaticon2-next"></i>
            </div>
            <div class="wizard-step" data-wizard-type="step">
              <div class="wizard-label">
                <i class="wizard-icon flaticon-globe"></i>
                <h3 class="wizard-title">3. Revize ve Onay</h3>
              </div>
              <i class="wizard-arrow last flaticon2-next"></i>
            </div>
          </div>
        </div>
        <!--end: Wizard Nav-->

        <!--begin: Wizard Body-->
        <div class="row justify-content-center my-10 px-8 my-lg-15 px-lg-10">
          <div class="col-xl-12 col-xxl-10">
            <!--begin: Wizard Form-->
            <form class="form" id="kt_form">
              <!--begin: Wizard Step 1-->
              <div
                class="pb-5"
                data-wizard-type="step-content"
                data-wizard-state="current"
              >
                <h3 class="mb-10 font-weight-bold text-dark">
                  Müşteri Bilgilerini Girin
                </h3>
                <b-row>
                  <b-col>
                    <b-form-group label="Telefon Numarası" label-for="Phone">
                      <b-form-input
                        id="Phone"
                        v-model="Customer.Phone"
                        type="text"
                        placeholder="Örnek: 05555555555"
                        @change="onChangePhone"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group label="Müşteri Adı" label-for="FirstName">
                      <b-form-input
                        id="FirstName"
                        v-model="Customer.FirstName"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group label="Müşteri Soyadı" label-for="LastName">
                      <b-form-input
                        id="LastName"
                        v-model="Customer.LastName"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-alert variant="danger" :show="isBlackListDanger">
                  Müşteri kara listededir.
                </b-alert>
                <div
                  class="row justify-content-center bg-primary py-8 px-8 py-md-10 px-md-0 mx-0"
                  :hidden="customerInfoDetail"
                >
                  <div class="col-md-10">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th class="font-weight-bold text-white">
                              Toplam Randevu Sayısı
                            </th>
                            <th class="font-weight-bold text-white">
                              Tamamlanan Randevu Sayısı
                            </th>
                            <th class="font-weight-bold text-white">
                              İptal Edilen Randevu Sayısı
                            </th>
                            <th class="font-weight-bold text-white text-center">
                              Kara Liste Puanı
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="font-weight-bolder text-white">
                            <td
                              class="text--white font-size-h4 font-weight-boldest text-center"
                            >
                              {{ Customer.TotalAppointmentCount }}
                            </td>
                            <td
                              class="text--white font-size-h4 font-weight-boldest text-center"
                            >
                              {{ Customer.DoneAppointmentCount }}
                            </td>
                            <td
                              class="text--white font-size-h4 font-weight-boldest text-center"
                            >
                              {{ Customer.CancelAppointmentCount }}
                            </td>
                            <td
                              class="text--white font-size-h4 font-weight-boldest text-center"
                            >
                              <v-rating
                                length="5"
                                color="warning"
                                :value="Customer.BlackListPoint"
                                readonly
                              ></v-rating>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!--end: Wizard Step 1-->

              <!--begin: Wizard Step 2-->
              <div class="pb-5" data-wizard-type="step-content">
                <h4 class="mb-10 font-weight-bold text-dark">
                  Rezervasyon Bilgilerini Girin
                </h4>
                <b-row>
                  <b-col>
                    <label for="Day">Tarih</label>
                    <b-form-datepicker
                      id="Day"
                      v-model="Appointment.Day"
                      class="mb-8"
                      :min="min"
                      placeholder=""
                      @input="onSelectedDayPart"
                    ></b-form-datepicker>
                  </b-col>
                  <b-col>
                    <b-form-group label="Gün Bölümü" label-for="dayPart">
                      <b-form-select
                        id="dayPart"
                        v-model="dayPart"
                        :options="dayPartList"
                        @change="onSelectedDayPart"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group label="Kişi Sayısı" label-for="PersonCount">
                      <b-form-input
                        id="PersonCount"
                        v-model="Appointment.PersonCount"
                        type="number"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Müşteri Email" label-for="Mail">
                      <b-form-input
                        id="Mail"
                        v-model="Customer.Mail"
                        type="email"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <vue-cal
                  :selected-date="Appointment.Day"
                  :time-from="calendarTimeStart"
                  :time-to="calendarTimeEnd"
                  :time-step="105"
                  :disable-views="['years', 'year', 'month', 'week']"
                  :events="events"
                  :split-days="splitDays"
                  :hidden="!showCalendar"
                  :timeCellHeight="timeCellHeight"
                  @event-focus="onSelected($event)"
                  @view-change="ViewClicked($event)"
                  sticky-split-labels
                  today-button
                  hide-view-selector
                  active-view="day"
                  style="margin-bottom: 3%"
                  locale="tr"
                >
                </vue-cal>
              </div>
              <!--end: Wizard Step 2-->

              <!--begin: Wizard Step 3-->
              <div class="pb-5" data-wizard-type="step-content">
                <!--                <h4 class="mb-10 font-weight-bold text-dark">-->
                <!--                  Girdiğiniz Bilgileri Revize Edin-->
                <!--                </h4>-->
                <div class="position-absolute opacity-30">
                  <span class="svg-icon svg-icon-10x svg-logo-white">
                    <!--begin::Svg Icon | path:/metronic/theme/html/demo3/dist/assets/media/svg/shapes/abstract-8.svg-->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="176"
                      height="165"
                      viewBox="0 0 176 165"
                      fill="none"
                    >
                      <g clip-path="url(#clip0)">
                        <path
                          d="M-10.001 135.168C-10.001 151.643 3.87924 165.001 20.9985 165.001C38.1196 165.001 51.998 151.643 51.998 135.168C51.998 118.691 38.1196 105.335 20.9985 105.335C3.87924 105.335 -10.001 118.691 -10.001 135.168Z"
                          fill="#AD84FF"
                        ></path>
                        <path
                          d="M28.749 64.3117C28.749 78.7296 40.8927 90.4163 55.8745 90.4163C70.8563 90.4163 83 78.7296 83 64.3117C83 49.8954 70.8563 38.207 55.8745 38.207C40.8927 38.207 28.749 49.8954 28.749 64.3117Z"
                          fill="#AD84FF"
                        ></path>
                        <path
                          d="M82.9996 120.249C82.9996 144.964 103.819 165 129.501 165C155.181 165 176 144.964 176 120.249C176 95.5342 155.181 75.5 129.501 75.5C103.819 75.5 82.9996 95.5342 82.9996 120.249Z"
                          fill="#AD84FF"
                        ></path>
                        <path
                          d="M98.4976 23.2928C98.4976 43.8887 115.848 60.5856 137.249 60.5856C158.65 60.5856 176 43.8887 176 23.2928C176 2.69692 158.65 -14 137.249 -14C115.848 -14 98.4976 2.69692 98.4976 23.2928Z"
                          fill="#AD84FF"
                        ></path>
                        <path
                          d="M-10.0011 8.37466C-10.0011 20.7322 0.409554 30.7493 13.2503 30.7493C26.0911 30.7493 36.5 20.7322 36.5 8.37466C36.5 -3.98287 26.0911 -14 13.2503 -14C0.409554 -14 -10.0011 -3.98287 -10.0011 8.37466Z"
                          fill="#AD84FF"
                        ></path>
                        <path
                          d="M-2.24881 82.9565C-2.24881 87.0757 1.22081 90.4147 5.50108 90.4147C9.78135 90.4147 13.251 87.0757 13.251 82.9565C13.251 78.839 9.78135 75.5 5.50108 75.5C1.22081 75.5 -2.24881 78.839 -2.24881 82.9565Z"
                          fill="#AD84FF"
                        ></path>
                        <path
                          d="M55.8744 12.1044C55.8744 18.2841 61.0788 23.2926 67.5001 23.2926C73.9196 23.2926 79.124 18.2841 79.124 12.1044C79.124 5.92653 73.9196 0.917969 67.5001 0.917969C61.0788 0.917969 55.8744 5.92653 55.8744 12.1044Z"
                          fill="#AD84FF"
                        ></path>
                      </g>
                    </svg>
                    <!--end::Svg Icon-->
                  </span>
                </div>
                <div
                  class="row justify-content-center py-8 px-8 py-md-36 px-md-0 bg-primary m-0"
                >
                  <div class="col-md-9">
                    <div
                      class="d-flex justify-content-between align-items-md-center flex-column flex-md-row"
                    >
                      <div class="d-flex flex-column px-0 order-2 order-md-1">
                        <!--begin::Logo-->
                        <!--                        <a href="#" class="mb-5 max-w-115px">-->
                        <!--														<span class="svg-icon svg-icon-full svg-logo-white">-->
                        <!--															&lt;!&ndash;begin::Svg Icon | path:/metronic/theme/html/demo3/dist/assets/media/svg/logos/duolingo.svg&ndash;&gt;-->
                        <!--															<svg xmlns="http://www.w3.org/2000/svg" width="113" height="31" viewBox="0 0 113 31" fill="none">-->

                        <!--															</svg>-->
                        <!--                              &lt;!&ndash;end::Svg Icon&ndash;&gt;-->
                        <!--														</span>-->
                        <!--                        </a>-->
                        <!--end::Logo-->
                        <span
                          class="d-flex flex-column font-size-h4 font-weight-bold text-white"
                        >
                          <!--                          <span>-->
                          <!--                            <strong>{{ Appointment.Day }}</strong> Tarihine</span>-->
                          <!--														<span><strong>{{ seansTime }}</strong> Seansına Randevu Özeti</span>-->
                        </span>
                      </div>
                      <h1
                        class="display-3 font-weight-boldest text-white order-1 order-md-2"
                      >
                        Randevu Özeti
                      </h1>
                    </div>
                  </div>
                </div>
                <div
                  class="row justify-content-center bg-primary py-8 px-8 py-md-10 px-md-0 mx-0"
                >
                  <div class="col-md-10">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th class="font-weight-bold text-white">
                              Müşteri İsmi
                            </th>
                            <th class="font-weight-bold text-white">
                              Telefonu
                            </th>
                            <th class="font-weight-bold text-white">Mail</th>
                            <th class="font-weight-bold text-white">
                              Kişi Sayısı
                            </th>
                            <th class="font-weight-bold text-white text-right">
                              Randevu Günü ve Saati
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="font-weight-bolder text-white">
                            <td>
                              {{ Customer.FirstName + " " + Customer.LastName }}
                            </td>
                            <td>{{ Customer.Phone }}</td>
                            <td>{{ Customer.Mail }}</td>
                            <td>{{ Appointment.PersonCount }}</td>
                            <td
                              class="text--white font-size-h4 font-weight-boldest text-right"
                            >
                              <span>{{ Appointment.Day }} </span>
                              <span class="font-size-h6">{{ seansTime }}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="mb-5 mt-8">
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Müşteri Notu"
                        label-for="Description"
                        class="font-weight-bold font-size-h6"
                      >
                        <b-form-textarea
                          id="Description"
                          v-model="Appointment.Description"
                          type="text"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <!--end: Wizard Step 3-->

              <!--begin: Wizard Actions -->
              <div class="d-flex justify-content-between border-top pt-10">
                <div class="mr-2">
                  <button
                    class="btn btn-light-primary font-weight-bold text-uppercase px-9 py-4"
                    data-wizard-type="action-prev"
                  >
                    Geri
                  </button>
                </div>
                <div>
                  <button
                    v-on:click="submit"
                    class="btn btn-success font-weight-bold text-uppercase px-9 py-4"
                    data-wizard-type="action-submit"
                  >
                    Gönder
                  </button>
                  <button
                    class="btn btn-primary font-weight-bold text-uppercase px-9 py-4"
                    data-wizard-type="action-next"
                  >
                    İleri
                  </button>
                </div>
              </div>
              <!--end: Wizard Actions -->
            </form>
            <!--end: Wizard Form-->
          </div>
        </div>
        <!--end: Wizard Body-->
      </div>
    </div>
    <!--end: Wizard-->
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/tr.js";

const axios = require("axios").default;
import moment from "moment";

export default {
  name: "CreateReservation",
  components: { VueCal },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
      customerInfoDetail: true,
      currentTimeForMinute: "",
      isBlackListDanger: false,
      timeCellHeight: 90,
      showCalendar: false,
      calendarTimeStart: 0,
      calendarTimeEnd: 0,
      dayPart: "",
      seansTime: "",
      Customer: {
        FirstName: "",
        LastName: "",
        Phone: "",
        Mail: ""
      },
      Appointment: {
        SessionId: 0,
        TablesId: 0,
        Day: "",
        PersonCount: 0,
        Description: "",
        IsBackup: 0
      },
      dayPartList: [
        {
          text: "Kahvaltı",
          value: 1
        },
        {
          text: "Pattiserie",
          value: 2
        },
        {
          text: "Pastane",
          value: 3
        }
      ],
      min: minDate,
      splitDays: [],
      events: []
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Randevu Oluşturma" }]);
    const now = new Date();
    let hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    let minute =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    this.currentTimeForMinute = parseInt(hour) * 60 + parseInt(minute);

    const wizard = new KTWizard("kt_wizard_v1", {
      startStep: 1,
      clickableSteps: false
    });

    // Change event
    wizard.on("change", function(/*wizardObj*/) {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });

    axios({
      method: "get",
      url: "https://kandilliservices.herokuapp.com/GetTableList"
    }).then(result => {
      if (result.data.data.length > 0) {
        result.data.data.forEach(el => {
          this.splitDays.push({
            id: el.TablesId,
            label: `${el.TableLocation} - ${el.TableNumber} (${el.ChairCount} KİŞİ)`
          });
        });
      }
    });
  },
  methods: {
    submit: function() {
      axios({
        method: "post",
        url: "https://kandilliservices.herokuapp.com/AddAppointment",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          data: {
            Customer: this.Customer,
            Appointment: this.Appointment
          }
        }
      }).then(() => {
        Swal.fire({
          title: "",
          text: "The application has been successfully submitted!",
          icon: "success"
        });
        this.$router.push({
          name: "ReservationList"
        });
      });
    },
    onSelected(event) {
      if (event.class !== "past" && event.class !== "lunch") {
        if (this.Appointment.SessionId !== 0) {
          const prevSelected = this.events.find(
            event =>
              event.sessionId === this.Appointment.SessionId &&
              event.split === this.Appointment.TablesId
          );

          if (prevSelected.class !== "full") {
            prevSelected.class = "available";
            prevSelected.title = "";
            prevSelected.content = "";
          }
        }

        this.Appointment.SessionId = event.sessionId;
        this.Appointment.TablesId = event.split;
        this.seansTime = event.startTime + " - " + event.endTime;

        if (event.class === "full") {
          this.showModal(event.backupCount);
        }
        const selected = this.events.find(
          event =>
            event.sessionId === this.Appointment.SessionId &&
            event.split === this.Appointment.TablesId
        );
        selected.class = "selected";
        selected.title = this.Customer.FirstName + " " + this.Customer.LastName;
        selected.content = `Tel: ${this.Customer.Phone} <br> Kişi Sayısı: ${this.Appointment.PersonCount}`;
      }
    },
    async showModal(backupCount) {
      const value = await this.$bvModal.msgBoxConfirm(
        "Seçilen seans aralığında " +
          backupCount +
          " kişi yedek listesindedir. İşlemi onaylıyor musunuz?",
        {
          title: "Seans dolu olduğu için yedek listeye kayıt edilecektir.",
          okTitle: "Onay",
          cancelTitle: "İptal",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        }
      );
      if (value) {
        this.Appointment.IsBackup = 1;
      }
    },
    ViewClicked(event) {
      this.Appointment.Day = moment(event.startDate).format("YYYY-MM-DD");
      this.onSelectedDayPart();
    },
    onSelectedDayPart() {
      if (this.Appointment.Day !== "" && this.dayPart !== "") {
        axios({
          method: "post",
          url:
            "https://kandilliservices.herokuapp.com/GetAppointmentFixtureByDate",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            data: {
              Day: this.Appointment.Day,
              DayPartId: this.dayPart
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

              if (
                el.FullName !== "" &&
                el.Phone !== 0 &&
                el.PersonCount !== null
              ) {
                title = el.FullName;
                content = `Tel: ${el.Phone} <br> Kişi Sayısı: ${el.PersonCount}`;
              }
              if (
                el.IsBreakTime === 1 ||
                (moment(this.Appointment.Day).isSameOrBefore(
                  moment(this.min).format("YYYY-MM-DD")
                ) &&
                  this.currentTimeForMinute > sessionTotalMinute)
              ) {
                sessionClass = "lunch";
              } else if (el.CustomerId !== null) {
                sessionClass = "full";
              }
              this.events.push({
                start: el.Day + " " + el.SessionStart,
                end: el.Day + " " + el.SessionEnd,
                title: title,
                split: el.TablesId,
                sessionId: el.SessionId,
                class: sessionClass,
                startTime: el.SessionStart,
                endTime: el.SessionEnd,
                backupCount: el.BackupCount,
                content: content
              });
            });
            this.showCalendar = true;
          }
        });
      }
    },
    onChangePhone() {
      if (this.Customer.Phone.length === 11) {
        axios({
          method: "post",
          url: "https://kandilliservices.herokuapp.com/CheckCustomer",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            data: {
              Phone: this.Customer.Phone
            }
          }
        }).then(res => {
          this.customerInfoDetail = true;
          if (res.data.data !== null) {
            this.Customer = res.data.data.customer;
            this.customerInfoDetail = false;
            if (this.Customer.BlackListPoint < 3) {
              this.isBlackListDanger = true;
            }
          }
        });
      }
    }
  }
};
</script>

<style>
.step-1 {
  margin: 0 auto;
}

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
  background-color: rgba(8, 208, 147, 0.9);
  border: 1px solid rgb(144, 210, 190);
  border-right: 2px solid #ebedf3;
  cursor: pointer;
}

.vuecal__event.selected {
  background-color: rgba(174, 139, 61, 0.78);
  border: 1px solid rgba(174, 139, 61, 0.78);
  border-right: 2px solid #ebedf3;
  cursor: pointer;
  color: white;
}
.vuecal__event.past {
  background-color: rgb(131, 131, 131);
  border: 1px solid rgb(131, 131, 131);
  border-right: 2px solid #ebedf3;
  color: #fff;
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
  border-right: 2px solid #ebedf3;
}

.vuecal__event.lunch .vuecal__event-time,
.vuecal__event-time {
  display: none;
  align-items: center;
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

.wizard-container {
  padding: 0 2.5em;
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
</style>
