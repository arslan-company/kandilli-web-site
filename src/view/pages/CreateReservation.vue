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
                    <b-form-group
                      label="Telefon Numarası"
                      label-for="phoneNumber"
                    >
                      <b-form-input
                        id="phoneNumber"
                        v-model="user.phoneNumber"
                        type="text"
                        placeholder="Örnek: 05555555555"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group label="Müşteri Adı" label-for="firstName">
                      <b-form-input
                        id="firstName"
                        v-model="user.firstName"
                        type="text"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group label="Müşteri Soyadı" label-for="lastName">
                      <b-form-input
                        id="lastName"
                        v-model="user.lastName"
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
                    <label for="date">Tarih</label>
                    <b-form-datepicker
                      id="date"
                      v-model="reservation.date"
                      class="mb-8"
                      :min="min"
                      placeholder=""
                      @input="onChangeDate"
                    ></b-form-datepicker>
                  </b-col>
                  <b-col>
                    <b-form-group label="Gün Bölümü" label-for="dayPart">
                      <b-form-select
                        id="dayPart"
                        v-model="reservation.dayPart"
                        :options="dayPartList"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <vue-cal
                  :selected-date="reservation.date"
                  :time-from="9 * 60"
                  :time-to="20 * 60"
                  :time-step="90"
                  :disable-views="['years', 'year', 'month', 'week']"
                  :events="events"
                  :split-days="splitDays"
                  :hidden="!showCalendar"
                  @event-focus="Clicklendin($event)"
                  @view-change="ViewClicked($event)"
                  today-button
                  sticky-split-labels
                  hide-view-selector
                  active-view="day"
                  style="margin-bottom:3%;"
                  locale="tr"
                >
                </vue-cal>
                <b-row>
                  <b-col>
                    <b-form-group label="Kişi Sayısı" label-for="customerCount">
                      <b-form-input
                        id="customerCount"
                        v-model="reservation.customerCount"
                        type="number"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group label="Müşteri Email" label-for="email">
                      <b-form-input
                        id="email"
                        v-model="user.email"
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
                    İsim Soyisim: {{ user.firstName + " " + user.lastName }}
                    <br />
                    Telefon Numarası: {{ user.phoneNumber }} <br />
                    Email: {{ user.email }}
                  </div>
                </div>
                <div class="border-bottom mb-5 pb-5">
                  <div class="font-weight-bold text-dark mb-3">
                    Rezervasyon Bilgileri
                  </div>
                  <div class="line-height-md">
                    Tarih: {{ reservation.date }} <br />
                    Gün Bölümü: {{ reservation.dayPart }} <br />
                    Session: {{ reservation.session }} <br />
                    Kişi Sayısı: {{ reservation.customerCount }}
                  </div>
                </div>
                <div class="mb-5">
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Müşteri Notu"
                        label-for="customerNote"
                      >
                        <b-form-textarea
                          id="customerNote"
                          v-model="reservation.customerNote"
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

export default {
  name: "CreateReservation",
  components: { VueCal },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
      showCalendar: false,
      reservation: {
        date: "",
        dayPart: "",
        session: "",
        customerCount: "",
        customerNote: ""
      },
      user: {
        phoneNumber: "",
        firstName: "",
        lastName: "",
        email: ""
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
      splitDays: [
        { id: 1, class: "salon1", label: "Salon 1" },
        { id: 2, class: "salon2", label: "Salon 2" },
        { id: 3, class: "salon3", label: "Salon 3" },
        { id: 4, class: "salon4", label: "Salon 4" },
        { id: 5, class: "bahce5", label: "Bahçe 5" },
        { id: 6, class: "bahce7", label: "Bahçe 7" },
        { id: 7, class: "bahce8", label: "Bahçe 8" },
        { id: 8, class: "bahce10", label: "Bahçe 10" }
      ],
      events: [
        {
          start: "2020-11-03 10:30",
          end: "2020-11-03 12:00",
          title: "Doctor appointment",
          class: "health",
          split: 1,
          sessionId: 1
        },
        {
          start: "2020-11-03 12:00",
          end: "2020-11-03 12:15",
          title: "ARA",
          class: "lunch",
          background: true,
          split: 1
        }
      ]
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
  },
  methods: {
    submit: function(e) {
      e.preventDefault();
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      });
    },
    Clicklendin(event) {
      console.log(event);
      debugger;
    },
    ViewClicked(event) {
      console.log(event);
      debugger;
    },
    onChangeDate() {
      this.showCalendar = true;
    }
  }
};
</script>

<style>
.vuecal__cell-split.salon1,
.vuecal__cell-split.bahce5 {
  background-color: rgba(221, 238, 255, 0.5);
}
.vuecal__cell-split.salon2,
.vuecal__cell-split.bahce7 {
  background-color: rgba(255, 232, 251, 0.5);
}
.vuecal__cell-split.salon3,
.vuecal__cell-split.bahce8 {
  background-color: rgba(221, 255, 239, 0.5);
}
.vuecal__cell-split.salon4,
.vuecal__cell-split.bahce10 {
  background-color: rgba(255, 250, 196, 0.5);
}
.vuecal__cell-split .split-label {
  color: rgba(0, 0, 0, 0.1);
  font-size: 26px;
}

/* Different color for different event types. */
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.health {
  background-color: rgba(164, 230, 210, 0.9);
  border: 1px solid rgb(144, 210, 190);
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
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
}
.vuecal__event.lunch .vuecal__event-time {
  display: none;
  align-items: center;
}
</style>
