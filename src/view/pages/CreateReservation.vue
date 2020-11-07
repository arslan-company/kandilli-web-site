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
          <div class="col-xl-12 col-xxl-9">
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
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
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
                <vue-cal
                  :selected-date="Appointment.Day"
                  :time-from="calendarTimeStart"
                  :time-to="calendarTimeEnd"
                  :time-step="90"
                  :disable-views="['years', 'year', 'month', 'week']"
                  :events="events"
                  :split-days="splitDays"
                  :hidden="!showCalendar"
                  :timeCellHeight="timeCellHeight"
                  @event-focus="Clicklendin($event)"
                  @view-change="ViewClicked($event)"
                  sticky-split-labels
                  today-button
                  hide-view-selector
                  active-view="day"
                  style="margin-bottom:3%;"
                  locale="tr"
                >
                </vue-cal>
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
              </div>
              <!--end: Wizard Step 2-->

              <!--begin: Wizard Step 3-->
              <div class="pb-5" data-wizard-type="step-content">
                <h4 class="mb-10 font-weight-bold text-dark">
                  Girdiğiniz Bilgileri Revize Edin
                </h4>
                <div class="border-bottom mb-5 pb-5">
                  <div class="font-weight-bold text-dark mb-3">
                    Müşteri Bilgileri:
                  </div>
                  <div class="line-height-md">
                    İsim Soyisim:
                    {{ Customer.FirstName + " " + Customer.LastName }}
                    <br />
                    Telefon Numarası: {{ Customer.Phone }} <br />
                    Email: {{ Customer.Mail }}
                  </div>
                </div>
                <div class="border-bottom mb-5 pb-5">
                  <div class="font-weight-bold text-dark mb-3">
                    Rezervasyon Bilgileri
                  </div>
                  <div class="line-height-md">
                    Tarih: {{ Appointment.Day }} <br />
                    Gün Bölümü: {{ dayPart }} <br />
                    Seans: {{ seansTime }} <br />
                    Kişi Sayısı: {{ Appointment.PersonCount }}
                  </div>
                </div>
                <div class="mb-5">
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Müşteri Notu"
                        label-for="Description"
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
      timeCellHeight: 60,
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

    // Initialize form wizard
    const wizard = new KTWizard("kt_wizard_v1", {
      startStep: 1, // initial active step number
      clickableSteps: true // allow step clicking
    });

    // Validation before going to next page
    wizard.on("beforeNext", function(/*wizardObj*/) {
      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
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
            label: el.TableLocation + " - " + el.TableNumber
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
      });
    },
    Clicklendin(event) {
      if (event.class === "available") {
        this.Appointment.SessionId = event.sessionId;
        this.Appointment.TablesId = event.split;
        this.seansTime = event.startTime + " - " + event.endTime;
      } else if (event.class === "full") {
        this.showModal(event.backupCount);
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
              console.log(el.SessionStart);
              console.log(this.min);
              debugger;
              this.events.push({
                start: el.Day + " " + el.SessionStart,
                end: el.Day + " " + el.SessionEnd,
                title: title,
                split: el.TablesId,
                sessionId: el.SessionId,
                class: sessionClass,
                startTime: el.SessionStart,
                endTime: el.SessionEnd,
                backupCount: el.BackupCount
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
          if (res.data.data !== null) {
            this.Customer = res.data.data.customer;
          }
        });
      }
    }
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
