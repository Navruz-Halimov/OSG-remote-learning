<template>
  <div>
    <FullCalendar class="demo-app-calendar" :options="calendarOptions">
      <template v-slot:eventContent="arg">
        <!-- <b>{{ arg.timeText }}</b> -->
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import adaptivePlugin from "@fullcalendar/adaptive";
import interactionPlugin from "@fullcalendar/interaction";

import { createEventId } from "@/plugins/utils/event-utils";

export default {
  props: {},
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          adaptivePlugin,
        ],
        headerToolbar: {
          left: "prev,title,next",
          center: "dayGridMonth,timeGridWeek",
          right: "",
        },
        columnHeaderFormat: {
          day: "long",
        },
        titleFormat: {
          month: "long",
        },
        initialView: "dayGridMonth",
        buttonIcons: {
          // prev: "left-single-arrow",
          // next: "right-single-arrow",
          // prevYear: "left-double-arrow",
          // nextYear: "right-double-arrow",
        },
        initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
        fixedWeekCount: false,
        contentHeight: 750,
        editable: true,
        locale: "ru",
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        expandRows: true,
        navLinks: false,

        //Week
        weekNumbers: false,
        weekNumberFormat: {
          week: "numeric",
        },
        allDaySlot: false,
        slotDuration: "00:30:00",
        slotLabelFormat: {
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: true,
          meridiem: "long",
        },

        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect(selectInfo) {
      // let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;

      this.$emit("openmodal", this.$event);

      // this.modalSeen = true;
      calendarApi.unselect(); // clear date selection
      if (/* title */ calendarApi) {
        calendarApi.addEvent({
          id: createEventId(),
          title: 'что-то',
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          display: "background",
        });
      }
    },
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
    },
  },
};
</script>

<style>
.fc-license-message {
  display: none !important;
}

table.fc-scrollgrid-sync-table td {
  border-width: 0.5px;
}

table {
  border-width: 0;
}

table.fc-scrollgrid-sync-table a {
  color: #000 !important;
  font-weight: 200;
}

.fc-scrollgrid-sync-inner {
  text-align: center;
}

.fc-dayGridMonth-view .fc-scroller,
.fc-dayGridMonth-view .fc-scroller-liquid-absolute {
  overflow: hidden !important;
}

.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 0.5em;
}

.fc-timegrid-col {
  border: 2px solid #dbe1ea !important;
}

.fc-timegrid-cols .fc-timegrid-col:nth-child(1),
.fc-timegrid-cols .fc-timegrid-col:nth-child(2) {
  border: 0 none !important;
}

.fc-timegrid-cols .fc-timegrid-col:nth-child(2) {
  border-left: 2px solid #dbe1ea !important;
  border-bottom: 2px solid #dbe1ea !important;
  border-top: 2px solid #dbe1ea !important;
}

/* .fc-prev-button {
  content: '';
  background-image: url('../../assets/icons/arow-down.svg');
  width: 10px;
  height: 10px;
} */

.fc-toolbar-chunk h2 {
  display: inline-block;
  font-size: 18px !important;
  text-transform: capitalize;
  margin: 5px;
  width: 100px;
  text-align: center;
}

.fc .fc-scroller-harness-liquid {
  border-bottom: 0.5px solid #dbdbdb;
}

.content table td,
.content table th {
  padding: 0 !important;
}

.fc .fc-bg-event {
  background-color: #e1faed;
  color: #28c76f;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.fc-scrollgrid-sync-inner a {
  color: #3d6ab7;
  font-weight: 500;
  text-transform: capitalize;
}

.fc .fc-scrollgrid-section-body table,
.fc .fc-scrollgrid-section-footer table {
  border-style: none;
}

.fc-day-future {
  background-color: #fff;
}

.fc-day-other {
  background-color: #f9fafc !important;
}

.fc-day-past {
  background-color: #fff;
}

.fc-dayGridMonth-view tbody:last-child {
  border-bottom: 1px solid #dbdbdb !important;
}

.fc .fc-scrollgrid table {
  border-style: none;
}

.fc .fc-scrollgrid {
  border: 0 none;
}

.fc-header-toolbar .fc-toolbar-chunk:nth-child(2) {
  position: relative;
  left: -50px;
}

.fc-header-toolbar .fc-toolbar-chunk:nth-child(2) button {
  border: 0 none;
}

/* .left-single-arrow {
  background-image: url('../../assets/icons/arow-left.svg');
  height: 15px;
  width: 15px;
} */

.fc-header-toolbar .fc-toolbar-chunk:nth-child(2) button.fc-button-primary {
  background-color: #fff !important;
  color: #a5afc2 !important;
  text-transform: capitalize;
  border: 1px solid #a5afc2 !important;
}

.fc-header-toolbar .fc-toolbar-chunk:nth-child(2) button.fc-button-active {
  background-color: #3d6ab7 !important;
  color: #fff !important;
  border: 0 none;
}

.fc-header-toolbar .fc-toolbar-chunk:nth-child(1) button.fc-button-primary {
  border: 0 none !important;
  border-radius: 50% !important;
  background-color: #f4f6fa !important;
  color: #bdc7d8 !important;
  padding: 0 !important;
  margin: 5px;
}

.fc-header-toolbar
  .fc-toolbar-chunk:nth-child(1)
  button.fc-button-primary:hover {
  background-color: #a5afc2 !important;
}

/* week */
.fc-col-header tbody th.fc-col-header-cell {
  background: transparent;
}

.fc-timeGridWeek-view div.fc-bg-event {
  margin: 3px !important;
  border-left: 3px solid #28c76f !important;
}

.fc-timeGridWeek-view .fc-scroller,
.fc-timeGridWeek-view .fc-scroller-liquid-absolute {
  overflow-y: scroll !important;
}

.fc .fc-scroller-harness-liquid {
  border: 0 none !important;
}

.fc-timeGridWeek-view .fc .fc-timegrid-col-bg .fc-bg-event {
  margin: 3px !important;
}

.fc-timeGridWeek-view .fc .fc-event,
.fc .fc-scrollgrid table tr {
  height: 70px !important;
}

.fc-timeGridWeek-view .fc .fc-timegrid-bg-harness {
  height: 70px !important;
  margin: 2px !important;
}

.fc-timeGridWeek-view .fc-day-past a,
.fc-timeGridWeek-view .fc-day-future a {
  color: #b3bccc;
}

.fc-timeGridWeek-view .fc-day-today a {
  color: #4c75bc;
}

.fc-timeGridWeek-view .fc .fc-event,
.fc .fc-scrollgrid table tr {
  height: 50px !important;
}

.fc-timeGridWeek-view .fc .fc-timegrid-axis-cushion,
.fc .fc-timegrid-slot-label-cushion {
  color: #b3bccc;
  width: 50px;
  text-align: left !important;
}

.fc-timegrid-divider .fc-cell-shaded {
  display: none !important;
}
</style>
