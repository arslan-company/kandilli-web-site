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
                <div class="fc fc-ltr fc-unthemed">
                  <div class="fc-view-container">
                    <div
                      class="fc-view fc-listWeek-view fc-list-view fc-widget-content"
                      :hidden="isShowMonth"
                      style="margin-bottom:3%;"
                    >
                      <div class="fc-scroller" style="overflow: hidden auto">
                        <table class="fc-list-table">
                          <tbody>
                            <tr class="fc-list-heading" data-date="2020-10-28">
                              <td class="fc-widget-header" colspan="3">
                                <a
                                  class="fc-list-heading-main"
                                  data-goto='{"date":"2020-10-28","type":"day"}'
                                  >Saturday</a
                                ><a
                                  class="fc-list-heading-alt"
                                  style="float: right"
                                  data-goto='{"date":"2020-10-28","type":"day"}'
                                  >October 31, 2020</a
                                >
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-primary">
                              <td class="fc-list-item-time fc-widget-content">
                                8.30 - 10.00
                              </td>
                              <td
                                class="fc-list-item fc-event-solid-info fc-event-light"
                              >
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Seans Süresi Geçti</a>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-primary">
                              <td class="fc-list-item-time fc-widget-content">
                                10.00 - 11.30
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>8 Randevu</a>
                                <div class="fc-description">
                                  2 masa uygun.
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-danger">
                              <td class="fc-list-item-time fc-widget-content">
                                11.30 - 13.00
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Boş masa kalmamıştır.</a>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-primary">
                              <td class="fc-list-item-time fc-widget-content">
                                13.00 - 14.30
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>3 Randevu</a>
                                <div class="fc-description">
                                  7 masa uygun.
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-primary">
                              <td class="fc-list-item-time fc-widget-content">
                                14.30 - 16.00
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>5 Randevu</a>
                                <div class="fc-description">
                                  5 masa uygun.
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-primary">
                              <td class="fc-list-item-time fc-widget-content">
                                16.00 - 17.30
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>1 Randevu</a>
                                <div class="fc-description">
                                  9 masa uygun.
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- <div
                      class="fc-view fc-listWeek-view fc-list-view fc-widget-content"
                    >
                      <div class="fc-scroller" style="overflow: hidden auto">
                        <table class="fc-list-table">
                          <tbody>
                            <tr class="fc-list-heading" data-date="2020-10-28">
                              <td class="fc-widget-header" colspan="3">
                                <a
                                  class="fc-list-heading-main"
                                  data-goto='{"date":"2020-10-28","type":"day"}'
                                  >Wednesday</a
                                ><a
                                  class="fc-list-heading-alt"
                                  style="float: right"
                                  data-goto='{"date":"2020-10-28","type":"day"}'
                                  >October 28, 2020</a
                                >
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-primary">
                              <td class="fc-list-item-time fc-widget-content">
                                all-day
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Conference</a>
                                <div class="fc-description">
                                  Lorem ipsum dolor eius mod tempor labore
                                </div>
                              </td>
                            </tr>
                            <tr
                              class="fc-list-item fc-event-solid-info fc-event-light fc-has-url"
                            >
                              <td class="fc-list-item-time fc-widget-content">
                                all-day
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a href="http://google.com/"
                                  >Click for Google</a
                                >
                                <div class="fc-description">
                                  Lorem ipsum dolor sit amet, labore
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-primary">
                              <td class="fc-list-item-time fc-widget-content">
                                all-day
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Conference</a>
                                <div class="fc-description">
                                  Lorem ipsum dolor eius mod tempor labore
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item">
                              <td class="fc-list-item-time fc-widget-content">
                                10:30am - 12:30pm
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Meeting</a>
                                <div class="fc-description">
                                  Lorem ipsum dolor eiu idunt ut labore
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-info">
                              <td class="fc-list-item-time fc-widget-content">
                                12:00pm
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Lunch</a>
                                <div class="fc-description">
                                  Lorem ipsum dolor sit amet, ut labore
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-warning">
                              <td class="fc-list-item-time fc-widget-content">
                                2:30pm
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Meeting</a>
                                <div class="fc-description">
                                  Lorem ipsum conse ctetur adipi scing
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-info">
                              <td class="fc-list-item-time fc-widget-content">
                                5:30pm
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Happy Hour</a>
                                <div class="fc-description">
                                  Lorem ipsum dolor sit amet, conse ctetur
                                </div>
                              </td>
                            </tr>
                            <tr
                              class="fc-list-item fc-event-solid-danger fc-event-light"
                            >
                              <td class="fc-list-item-time fc-widget-content">
                                5:00am
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Dinner</a>
                                <div class="fc-description">
                                  Lorem ipsum dolor sit ctetur adipi scing
                                </div>
                              </td>
                            </tr>
                            <tr class="fc-list-item fc-event-primary">
                              <td class="fc-list-item-time fc-widget-content">
                                7:00am
                              </td>
                              <td class="fc-list-item-marker fc-widget-content">
                                <span class="fc-event-dot"></span>
                              </td>
                              <td class="fc-list-item-title fc-widget-content">
                                <a>Birthday Party</a>
                                <div class="fc-description">
                                  Lorem ipsum dolor sit amet, scing
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div> -->
                  </div>
                </div>
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

export default {
  name: "CreateReservation",
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
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
      dayPartList: ["Sabah", "Öğle", "Akşam"],
      min: minDate
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
    }
  }
};
</script>
