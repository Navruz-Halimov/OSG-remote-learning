<template>
  <span ref="calendarRef" @click="toggleCalendar">
    <!-- <d-button class="blue" rounded>
      <d-icon icon="calendar" class="white size-2" />
    </d-button> -->
  </span>
</template>

<script>
export default {
  components: {
    // "d-icon": () => import("@/components/icons/iconWrapper"),
    // "d-button": () => import("@/components/buttons/loaderButton"),
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      seen: false,
      date: new Date(),
      calendar: null,
    };
  },
  methods: {
    toggleCalendar() {
      if (this.calendar.isOpen()) {
        this.calendar.hide();
        return;
      }
      this.calendar.show();
    },
  },
  mounted() {
    this.calendar = this.$bulmaCalendar.attach(this.$refs.calendarRef, {
      ...this.options,
        startDate: new Date()
    })[0];
    this.calendar.on("date:selected", (e) => (this.date = e.start || null));

    // console.log("123", this.$refs.calendarRef);
  },
};
</script>

<style>
.datetimepicker-wrapper {
  position: absolute;
  margin-top: 20px;
  z-index: 999;
}

.datetimepicker .datepicker-body .datepicker-dates .datepicker-days .datepicker-date .date-item:hover {
    color: #3d6ab7;
}

.datetimepicker.is-primary .datepicker-nav {
  background-color: #3d6ab7;
}

.datetimepicker.is-primary
  .datepicker-body
  .datepicker-dates
  .datepicker-days
  .datepicker-date
  .date-item:hover {
  border-color: #3d6ab7;
}

.datetimepicker.is-primary
  .datepicker-body
  .datepicker-dates
  .datepicker-days
  .datepicker-date
  .date-item.is-today {
  border-color: #3d6ab7;
  color: #3d6ab7;
}

.datetimepicker.is-primary
  .datepicker-body
  .datepicker-dates
  .datepicker-days
  .datepicker-date
  .date-item.is-active {
  background: #3d6ab7;
  border-color: #3d6ab7;
  cursor: pointer;
}

.datetimepicker-dummy {
  width: 70px;
}

.datetimepicker-dummy-wrapper input {
    cursor: pointer;
}

.datetimepicker-dummy.is-primary::before,
.datetimepicker-dummy.is-primary:before {
  background-color: #fff;
  margin: 0 0 0 13px;
  width: 19px;
  cursor: pointer;
  mask: url("../../assets/icons/close.svg") !important;
  pointer-events: none
}

.datetimepicker-clear-button {
  display: none;
}

.datetimepicker-dummy .datetimepicker-dummy-wrapper {
  /* border: 0 none; */
  background-color: #3d6ab7;

  border-radius: 20px;
}
</style>
