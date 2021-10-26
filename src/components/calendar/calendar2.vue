<template>
  <div><input type="date" data-display-mode="default" /></div>
</template>

<script>
export default {
  mounted() {
    // Initialize all input of date type.
    const calendars = this.$bulmaCalendar.attach('[type="date"]', {
      startDate: new Date(),
      showHeader: false,
      showFooter: false,
    });

    // Loop on each calendar initialized
    calendars.forEach((calendar) => {
      // Add listener to date:selected event
      calendar.on("date:selected", (date) => {
        console.log(date);
      });
    });
  },
};
</script>

<style>
.datetimepicker-dummy .datetimepicker-clear-button {
  display: none;
}
.datetimepicker-dummy::before,
.datetimepicker-dummy:before {
  background-color: #2e5998 !important;
  /* transform: scale(0.8) !important; */
  mask: url(../../assets/icons/calendar.svg) !important;
  mask-repeat: no-repeat !important;
  mask-position: center !important;
  top: 0.57rem !important;
}

.datetimepicker-dummy
  .datetimepicker-dummy-wrapper
  .datetimepicker-dummy-input {
  max-width: 70% !important;
}

.datetimepicker-dummy .datetimepicker-dummy-wrapper {
  border-color: #dae0e9 !important;
  border-radius: 4px;
  height: 36px !important;
}

.datetimepicker.is-primary .datepicker-nav {
  background-color: #114980 !important;
}

.datetimepicker .datepicker-body .datepicker-months .datepicker-month.is-active,
.datetimepicker .datepicker-body .datepicker-months .datepicker-year.is-active,
.datetimepicker .datepicker-body .datepicker-years .datepicker-month.is-active,
.datetimepicker .datepicker-body .datepicker-years .datepicker-year.is-active {
  background-color: #114980 !important;
  color: #fff !important;
  border-color: transparent !important;
}

.datetimepicker .datepicker-body .datepicker-months .datepicker-month:hover,
.datetimepicker .datepicker-body .datepicker-months .datepicker-year:hover,
.datetimepicker .datepicker-body .datepicker-years .datepicker-month:hover,
.datetimepicker .datepicker-body .datepicker-years .datepicker-year:hover {
  border-color: transparent !important;
}

.datetimepicker.is-primary
  .datepicker-body
  .datepicker-dates
  .datepicker-days
  .datepicker-date
  .date-item.is-active {
  background-color: #114980 !important;
  color: #fff !important;
  border-color: transparent !important;
}

.datetimepicker
  .datepicker-body
  .datepicker-dates
  .datepicker-days
  .datepicker-date
  .date-item.is-today,
.datetimepicker.is-primary
  .datepicker-body
  .datepicker-dates
  .datepicker-days
  .datepicker-date
  .date-item:hover {
  color: #114980 !important;
  border-color: #114980 !important;
}

.datetimepicker
  .datepicker-body
  .datepicker-dates
  .datepicker-days
  .datepicker-date
  .date-item.is-active {
  border-radius: 4px !important;
}
</style>
