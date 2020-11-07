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
              @input="getDayEvents"
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
          sticky-split-labels
          today-button
          hide-view-selector
          active-view="day"
          locale="tr"
        >
        </vue-cal>
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
    const time = today.getHours() + ":" + today.getMinutes();
    return {
      timeCellHeight: 60,
      choosenDay: moment(today).format("YYYY-MM-DD"),
      splitDays: [],
      events: [],
      calendarTimeStart: 0,
      calendarTimeEnd: 0,
      currentTime: time
    };
  },
  methods: {
    ViewClicked(event) {
      this.choosenDay = moment(event.startDate).format("YYYY-MM-DD");
      this.getDayEvents();
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
              backupCount: el.BackupCount
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
