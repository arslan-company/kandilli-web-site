<template>
  <div class="card card-custom">
    <div class="card-body">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
// const axios = require("axios").default;
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import FullCalendar from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import trLocal from "@fullcalendar/core/locales/tr";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import resourceDayGridPlugin from "@fullcalendar/resource-daygrid";
import listPlugin from "@fullcalendar/list";

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          interactionPlugin,
          timeGridPlugin,
          bootstrapPlugin,
          resourceTimeGridPlugin,
          resourceDayGridPlugin,
          listPlugin
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,resourceDayGridDay,listDay"
        },
        initialView: "resourceDayGridDay",
        resources: [
          { id: "s1", title: "Salon - 1" },
          { id: "s2", title: "Salon - 2" },
          { id: "s3", title: "Salon - 3" },
          { id: "s4", title: "Salon - 4" },
          { id: "s5", title: "Salon - 5" }
        ],
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        themeSystem: "bootstrap",
        schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
        locale: trLocal,
        events: "https://fullcalendar.io/demo-events.json"
      },
      isShowMonth: true
    };
  },
  methods: {
    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Randevu Listeleme" }]);
  }
};
</script>
