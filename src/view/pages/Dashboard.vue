<template>
  <div>
    <div class="row">
      <div class="col-xxl-4">
        <div
          class="card card-custom bg-radial-gradient-primary gutter-b card-stretch"
        >
          <div class="card-header border-0 py-5">
            <h3 class="card-title font-weight-bolder text-white">
              Haftalık Randevu Sayısı
            </h3>
          </div>
          <div class="card-body d-flex flex-column p-0">
            <apexchart
              class="card-rounded-bottom"
              :options="appointmentCountDayly.chartOptions"
              :series="appointmentCountDayly.series"
              type="bar"
            ></apexchart>
            <div class="card-spacer bg-white card-rounded flex-grow-1">
              <div class="row m-0">
                <div class="col px-8 py-6 mr-8">
                  <div class="font-size-sm text-muted font-weight-bold">
                    Haftalık Gelen Müşteri Sayısı
                  </div>
                  <div class="font-size-h4 font-weight-bolder">
                    {{ appointmentCountDayly.weeklyTotalPersonCount }}
                  </div>
                </div>
                <div class="col px-8 py-6">
                  <div class="font-size-sm text-muted font-weight-bold">
                    Haftalık Toplam Randevu Sayısı
                  </div>
                  <div class="font-size-h4 font-weight-bolder">
                    {{ appointmentCountDayly.weeklyTotalAppointmentCount }}
                  </div>
                </div>
              </div>
              <div class="row m-0">
                <div class="col px-8 py-6 mr-8">
                  <div class="font-size-sm text-muted font-weight-bold">
                    Haftalık Yeni Müşteri Sayısı
                  </div>
                  <div class="font-size-h4 font-weight-bolder">
                    {{ appointmentCountDayly.newCustomerCount }}
                  </div>
                </div>
                <div class="col px-8 py-6">
                  <div class="font-size-sm text-muted font-weight-bold">
                    Toplam Müşteri Sayısı
                  </div>
                  <div class="font-size-h4 font-weight-bolder">
                    {{ appointmentCountDayly.totalPersonCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xxl-8">
        <div class="card card-custom gutter-b">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-dark"
                >En Yeni Müşterilerimiz</span
              >
            </h3>
          </div>
          <div class="card-body pt-2 pb-0">
            <div class="table-responsive">
              <table class="table table-borderless table-vertical-center">
                <thead>
                  <tr>
                    <th class="p-0" style="width: 50px"></th>
                    <th class="p-0" style="min-width: 150px"></th>
                    <th class="p-0" style="min-width: 120px"></th>
                    <th class="p-0" style="min-width: 70px"></th>
                    <th class="p-0" style="min-width: 70px"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(item, i) in newestCustomers.list">
                    <tr v-bind:key="i">
                      <td class="pl-0">
                        <div class="symbol symbol-50 symbol-light mr-2 mt-2">
                          <span class="symbol-label">
                            <img :src="item.img" class="h-75 align-self-end" />
                          </span>
                        </div>
                      </td>
                      <td class="pl-0">
                        <a
                          href="#"
                          class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                          >{{ item.FullName }}</a
                        >
                        <span class="text-muted font-weight-bold d-block">
                          {{ item.Phone }}
                        </span>
                      </td>
                      <td></td>
                      <td class="text-right">
                        <span
                          class="text-muted font-weight-bold d-block font-size-sm"
                        >
                          Randevu Sayısı
                        </span>
                        <span
                          class="text-dark-75 font-weight-bolder d-block font-size-lg"
                          >{{ item.AppointmentCount }}
                        </span>
                      </td>
                      <td class="text-right">
                        <v-rating
                          length="5"
                          color="#12a293"
                          v-model="item.BlackListPoint"
                          readonly
                          size="15"
                        ></v-rating>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xxl-4">
        <div class="card card-custom gutter-b">
          <div class="card-body p-0">
            <div
              class="d-flex align-items-center justify-content-between card-spacer flex-grow-1"
            >
              <div class="d-flex flex-column">
                <span class="text-muted font-weight-bold mt-2">
                  Yıllık Toplam Randevu Sayısı:
                  <span class="text-dark-75 font-weight-bolder font-size-h3">
                    {{ appointmentCountMonthly.totalbilmemne }}
                  </span>
                </span>
              </div>
            </div>
            <apexchart
              class="card-rounded-bottom"
              :options="appointmentCountMonthly.chartOptions"
              :series="appointmentCountMonthly.series"
              type="area"
            ></apexchart>
          </div>
        </div>

        <div class="card card-custom gutter-b">
          <div class="card-body p-0">
            <div
              class="d-flex align-items-center justify-content-between card-spacer flex-grow-1"
            >
              <div class="d-flex flex-column">
                <span class="text-muted font-weight-bold mt-2">
                  Yıllık Toplam Müşteri Sayısı:
                  <span class="text-dark-75 font-weight-bolder font-size-h3">
                    {{ personCountMonthly.totalbilmemne }}
                  </span>
                </span>
              </div>
            </div>
            <apexchart
              class="card-rounded-bottom"
              :options="personCountMonthly.chartOptions"
              :series="personCountMonthly.series"
              type="area"
              width="100%"
            ></apexchart>
          </div>
        </div>
      </div>

      <div class="col-xxl-8">
        <div class="card card-custom gutter-b">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-dark"
                >En Çok Gelen Müşterilerimiz</span
              >
            </h3>
          </div>
          <div class="card-body pt-2 pb-0">
            <div class="table-responsive">
              <table class="table table-borderless table-vertical-center">
                <thead>
                  <tr>
                    <th class="p-0" style="width: 50px"></th>
                    <th class="p-0" style="min-width: 150px"></th>
                    <th class="p-0" style="min-width: 120px"></th>
                    <th class="p-0" style="min-width: 70px"></th>
                    <th class="p-0" style="min-width: 70px"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(item, i) in topCustomers.list">
                    <tr v-bind:key="i">
                      <td class="pl-0">
                        <div class="symbol symbol-50 symbol-light mr-2 mt-2">
                          <span class="symbol-label">
                            <img :src="item.img" class="h-75 align-self-end" />
                          </span>
                        </div>
                      </td>
                      <td class="pl-0">
                        <a
                          href="#"
                          class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                          >{{ item.FullName }}</a
                        >
                        <span class="text-muted font-weight-bold d-block">
                          {{ item.Phone }}
                        </span>
                      </td>
                      <td></td>
                      <td class="text-right">
                        <span
                          class="text-muted font-weight-bold d-block font-size-sm"
                        >
                          Randevu Sayısı
                        </span>
                        <span
                          class="text-dark-75 font-weight-bolder d-block font-size-lg"
                          >{{ item.AppointmentCount }}
                        </span>
                      </td>
                      <td class="text-right">
                        <v-rating
                          length="5"
                          color="#12a293"
                          v-model="item.BlackListPoint"
                          readonly
                          size="15"
                        ></v-rating>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
const axios = require("axios").default;
import { mapGetters } from "vuex";

export default {
  name: "dashboard",
  data() {
    return {
      overlay: false,
      appointmentCountDayly: {
        chartOptions: {},
        series: [
          {
            name: "Randevu Sayısı",
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ],
        weeklyTotalPersonCount: "",
        weeklyTotalAppointmentCount: "",
        newCustomerCount: "",
        totalPersonCount: ""
      },
      appointmentCountMonthly: {
        chartOptions: {},
        series: [
          {
            name: "Randevu Sayısı",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        totalbilmemne: ""
      },
      newestCustomers: {
        list: []
      },
      personCountMonthly: {
        chartOptions: {},
        series: [
          {
            name: "Müşteri Sayısı",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      topCustomers: {
        list: []
      }
    };
  },
  methods: {
    mountedForAppointmentCountDayly(result) {
      this.appointmentCountDayly.series[0].data[0] =
        result.AppointmentCountDayly.MondayCount;
      this.appointmentCountDayly.series[0].data[1] =
        result.AppointmentCountDayly.TuesdayCount;
      this.appointmentCountDayly.series[0].data[2] =
        result.AppointmentCountDayly.WednesdayCount;
      this.appointmentCountDayly.series[0].data[3] =
        result.AppointmentCountDayly.ThursdayCount;
      this.appointmentCountDayly.series[0].data[4] =
        result.AppointmentCountDayly.FridayCount;
      this.appointmentCountDayly.series[0].data[5] =
        result.AppointmentCountDayly.SaturdayCount;
      this.appointmentCountDayly.series[0].data[6] =
        result.AppointmentCountDayly.SundayCount;

      this.appointmentCountDayly.weeklyTotalPersonCount =
        result.WeeklyInfos.WeeklyTotalPersonCount;
      this.appointmentCountDayly.weeklyTotalAppointmentCount =
        result.WeeklyInfos.WeeklyTotalAppointmentCount;
      this.appointmentCountDayly.newCustomerCount =
        result.WeeklyInfos.NewCustomerCount;
      this.appointmentCountDayly.totalPersonCount =
        result.WeeklyInfos.TotalPersonCount;
      // reference; kt_mixed_widget_1_chart
      this.appointmentCountDayly.chartOptions = {
        chart: {
          type: "bar",
          height: 200,
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: ["15%"],
            endingShape: "rounded"
          }
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi",
            "Pazar"
          ]
        },
        yaxis: {
          min: 0,
          max: 48,
          labels: {
            style: {
              colors: this.layoutConfig("colors.gray.gray-500"),
              fontSize: "12px",
              fontFamily: this.layoutConfig("font-family")
            }
          }
        },
        fill: {
          opacity: 1
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0
            }
          },
          hover: {
            filter: {
              type: "none",
              value: 0
            }
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "none",
              value: 0
            }
          }
        },
        tooltip: {
          style: {
            fontSize: "14px",
            fontFamily: this.layoutConfig("font-family")
          },
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        colors: ["#ffffff"],
        grid: {
          borderColor: this.layoutConfig("colors.gray.gray-200"),
          strokeDashArray: 4,
          yaxis: {
            lines: {
              show: false
            }
          }
        }
      };
    },
    mountedForAppointmentCountMonthly(result) {
      this.appointmentCountMonthly.series[0].data[0] =
        result.AppointmentCountMonthly.JanuaryCount;
      this.appointmentCountMonthly.series[0].data[1] =
        result.AppointmentCountMonthly.FebruaryCount;
      this.appointmentCountMonthly.series[0].data[2] =
        result.AppointmentCountMonthly.MarchCount;
      this.appointmentCountMonthly.series[0].data[3] =
        result.AppointmentCountMonthly.AprilCount;
      this.appointmentCountMonthly.series[0].data[4] =
        result.AppointmentCountMonthly.MayCount;
      this.appointmentCountMonthly.series[0].data[5] =
        result.AppointmentCountMonthly.JuneCount;
      this.appointmentCountMonthly.series[0].data[6] =
        result.AppointmentCountMonthly.JulyCount;
      this.appointmentCountMonthly.series[0].data[7] =
        result.AppointmentCountMonthly.AugustCount;
      this.appointmentCountMonthly.series[0].data[8] =
        result.AppointmentCountMonthly.SeptemberCount;
      this.appointmentCountMonthly.series[0].data[9] =
        result.AppointmentCountMonthly.OctoberCount;
      this.appointmentCountMonthly.series[0].data[10] =
        result.AppointmentCountMonthly.NovemberCount;
      this.appointmentCountMonthly.series[0].data[11] =
        result.AppointmentCountMonthly.DecemberCount;

      this.appointmentCountMonthly.chartOptions = {
        chart: {
          type: "area",
          height: 150,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {},
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "solid",
          opacity: 1
        },
        stroke: {
          curve: "smooth",
          show: true,
          width: 3,
          colors: [this.layoutConfig("colors.theme.base.danger")]
        },
        xaxis: {
          categories: [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık"
          ],
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            style: {
              colors: this.layoutConfig("colors.gray.gray-500"),
              fontSize: "12px",
              fontFamily: this.layoutConfig("font-family")
            }
          },
          crosshairs: {
            show: false,
            position: "front",
            stroke: {
              color: this.layoutConfig("colors.gray.gray-300"),
              width: 1,
              dashArray: 3
            }
          },
          tooltip: {
            enabled: false,
            style: {
              fontSize: "12px",
              fontFamily: this.layoutConfig("font-family")
            }
          }
        },
        yaxis: {
          min: 0,
          max: 1450,
          show: false,
          labels: {
            show: false,
            style: {
              colors: this.layoutConfig("colors.gray.gray-500"),
              fontSize: "12px",
              fontFamily: this.layoutConfig("font-family")
            }
          }
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0
            }
          },
          hover: {
            filter: {
              type: "none",
              value: 0
            }
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "none",
              value: 0
            }
          }
        },
        tooltip: {
          style: {
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          },
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        colors: [this.layoutConfig("colors.theme.light.danger")],
        markers: {
          colors: [this.layoutConfig("colors.theme.light.danger")],
          strokeColor: [this.layoutConfig("colors.theme.base.danger")],
          strokeWidth: 3
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        }
      };
    },
    mountedForNewestCustomers(result) {
      result.NewestCustomers.forEach(el => {
        this.newestCustomers.list.push({
          FullName: el.FullName,
          Phone: el.Phone,
          AppointmentCount: el.AppointmentCount,
          BlackListPoint: el.BlackListPoint,
          img: "media/svg/avatars/043-boy-18.svg"
        });
      });
    },
    mountedForPersonCountMonthly(result) {
      this.personCountMonthly.series[0].data[0] =
        result.PersonCountMonthly.JanuaryCount;
      this.personCountMonthly.series[0].data[1] =
        result.PersonCountMonthly.FebruaryCount;
      this.personCountMonthly.series[0].data[2] =
        result.PersonCountMonthly.MarchCount;
      this.personCountMonthly.series[0].data[3] =
        result.PersonCountMonthly.AprilCount;
      this.personCountMonthly.series[0].data[4] =
        result.PersonCountMonthly.MayCount;
      this.personCountMonthly.series[0].data[5] =
        result.PersonCountMonthly.JuneCount;
      this.personCountMonthly.series[0].data[6] =
        result.PersonCountMonthly.JulyCount;
      this.personCountMonthly.series[0].data[7] =
        result.PersonCountMonthly.AugustCount;
      this.personCountMonthly.series[0].data[8] =
        result.PersonCountMonthly.SeptemberCount;
      this.personCountMonthly.series[0].data[9] =
        result.PersonCountMonthly.OctoberCount;
      this.personCountMonthly.series[0].data[10] =
        result.PersonCountMonthly.NovemberCount;
      this.personCountMonthly.series[0].data[11] =
        result.PersonCountMonthly.DecemberCount;

      this.personCountMonthly.chartOptions = {
        chart: {
          type: "area",
          height: 150,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {},
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "solid",
          opacity: 1
        },
        stroke: {
          curve: "smooth",
          show: true,
          width: 3,
          colors: [this.layoutConfig("colors.theme.base.info")]
        },
        xaxis: {
          categories: [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık"
          ],
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            style: {
              colors: this.layoutConfig("colors.gray.gray-500"),
              fontSize: "12px",
              fontFamily: this.layoutConfig("font-family")
            }
          },
          crosshairs: {
            show: false,
            position: "front",
            stroke: {
              color: this.layoutConfig("colors.gray.gray-300"),
              width: 1,
              dashArray: 3
            }
          },
          tooltip: {
            enabled: false,
            offsetY: 0,
            style: {
              fontSize: "12px",
              fontFamily: this.layoutConfig("font-family")
            }
          }
        },
        yaxis: {
          show: false,
          min: 0,
          max: 55,
          labels: {
            show: false,
            style: {
              colors: this.layoutConfig("colors.gray.gray-500"),
              fontSize: "12px",
              fontFamily: this.layoutConfig("font-family")
            }
          }
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0
            }
          },
          hover: {
            filter: {
              type: "none",
              value: 0
            }
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "none",
              value: 0
            }
          }
        },
        tooltip: {
          style: {
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          },
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        colors: [this.layoutConfig("colors.theme.light.info")],
        markers: {
          colors: [this.layoutConfig("colors.theme.light.info")],
          strokeColor: [this.layoutConfig("colors.theme.base.info")],
          strokeWidth: 3
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        }
      };
    },
    mountedForTopCustomers(result) {
      result.TopCustomers.forEach(el => {
        this.topCustomers.list.push({
          FullName: el.FullName,
          Phone: el.Phone,
          AppointmentCount: el.AppointmentCount,
          BlackListPoint: el.BlackListPoint,
          img: "media/svg/avatars/043-boy-18.svg"
        });
      });
    }
  },
  async mounted() {
    this.overlay = true;
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    await axios({
      method: "get",
      url: "/GetReport"
    }).then(result => {
      if (result.data.code === 1) {
        this.mountedForAppointmentCountDayly(result.data.data);
        this.mountedForAppointmentCountMonthly(result.data.data);
        this.mountedForNewestCustomers(result.data.data);
        this.mountedForPersonCountMonthly(result.data.data);
        this.mountedForTopCustomers(result.data.data);
      } else {
        this.$bvToast.toast("Sistemsel bir sorun oluşmuştur.", {
          title: "Hata",
          variant: "danger",
          toaster: "b-toaster-top-center",
          solid: true
        });
      }
      this.overlay = false;
    });
  },
  computed: {
    ...mapGetters(["layoutConfig"])
  }
};
</script>
