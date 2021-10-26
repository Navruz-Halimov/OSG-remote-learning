<template>
  <div class="columns date-selector">
    <div class="column">
      <div :class="['custom-select', { greyish: grey }, { 'greyish-2': grey2 }]">
        <select :class="{'selected': day}" v-model="day" @change="daysByMonthYear()">
          <option :value="null" disabled selected>День</option>
          <option :value="item" v-for="item in days" :key="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <div class="column">
      <div :class="['custom-select', { greyish: grey }, { 'greyish-2': grey2 }]">
        <select :class="{'selected': month}" v-model="month" @change="daysByMonthYear()">
          <option :value="null" disabled selected>Месяц</option>
          <option
            :value="index + 1"
            v-for="(item, index) in months"
            :key="index + 32"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <div class="column">
      <div :class="['custom-select', { greyish: grey }, { 'greyish-2': grey2 }]">
        <select :class="{'selected': year}" v-model="year" @change="daysByMonthYear()">
          <option :value="null" disabled selected>Год</option>
          <option :value="item" v-for="item in years" :key="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    grey: {
      type: Boolean,
    },
    grey2: {
      type: Boolean,
    },
  },
  data() {
    return {
      day: null,
      month: null,
      year: null,
      months: [
        {
          title: "Jan",
          id: 1,
        },
      ],
      days: null,
      years: [],
      defaultMonth: null,
      defaultYear: null,
    };
  },
  watch: {
    day: {
      handler() {
        this.daysByMonthYear()
      }
    },
    month: {
      handler() {
        this.daysByMonthYear()
      }
    },
    year: {
      handler() {
        this.daysByMonthYear()
      }
    },
    "$attrs.value": {
      handler() {
        if(this.$attrs["value"]) {
          console.log("Date selctor value");
          if(!this.day && !this.month && !this.year) {
            this.year = Number(this.$attrs["value"].slice(0, 4))
            this.month = Number(this.$attrs["value"].slice(5, 7))
            this.day = Number(this.$attrs["value"].slice(8))
          }
        }
      }
    }
  },
  mounted() {
    let year, month;
    this.defaultMonth = this.$moment().month();
    this.defaultYear = this.$moment().year();
    this.defaultMonth++;

    if (!this.month) month = this.defaultMonth;
    else month = this.month;
    if (!this.year) year = this.defaultYear;
    else month = this.year;

    this.$moment().locale("ru");

    this.months = Array.apply(0, Array(12)).map((_, i) => {
      return this.$moment().month(i).format("MMM");
    });
    this.days = this.$moment(
      `${year}-${month < 10 ? "0" + month : month}`,
      "YYYY-MM"
    ).daysInMonth();

    for (let index = 0; index < 150; index++) {
      this.years.push(year - index);
    }
  },
  methods: {
    daysByMonthYear() {      
      let year = this.year || this.defaultYear;
      let month = this.month || this.defaultMonth;

      // console.log(this.$data);
      // console.log("onchange", year, month, this.$moment(`${year}-${month < 10 ? '0' + month : month}`, "YYYY-MM").daysInMonth(), );
      this.days = this.$moment(
        `${year}-${month < 10 ? "0" + month : month}`,
        "YYYY-MM"
      ).daysInMonth();

      if (this.day > this.days) this.day = null;

      //   console.log("before emit", `${this.day}-${this.month}-${this.year}`);

      if (this.day && this.month && this.year) {
        this.$emit(
          "change",
          `${this.year || 2020}-${
            (this.month < 10 ? +"0" : "") + "" + this.month || 1
          }-${(this.day < 10 ? +"0" : "") + "" + this.day || 1}`
        );
      } else this.$emit("change", "");
    },
  },
};
</script>

<style lang="scss">
// .card.analytics-card .analytics-card-body .custom-select::before,
// .card.analytics-card .analytics-card-body .custom-select::after {
//   pointer-events: none;
// }

.modal-variant-1 {
  v-select {
    width: 90%;
  }

  .custom-select {
    height: 100%;
    width: 100%;
    position: relative;

    &::after {
      content: "";
      background-image: url("~@/assets/icons/arow-down.svg?external");
      background-repeat: no-repeat;
      background-size: 8px;
      background-position: 4px;
      display: inline-block;
      vertical-align: top;
      width: 20px;
      height: 20px;
      right: 5px;
      position: absolute;
      top: 8px;
      z-index: 2;
    }

    &::before {
      width: 40px;
      content: "";
      display: inline-block;
      width: 20px;
      background: #f4f5f8;
      border-radius: 50%;
      vertical-align: top;
      right: 2px;
      position: absolute;
      top: 3px;
      bottom: 3px;
      z-index: 1;
    }

    &.greyish {
      select {
        padding: 8px 10px;
        border: 0 none;
        border-radius: 30px;
        height: 38px;
        background-color: #f4f5f8;
        color: $grey;

        option:not(:first-child) {
          color: black;
        }

        &.selected {
          color: black;

          option:first-child {
            color: $grey;
          }
        }
      }
    }

    &.greyish-2 {
      select {
        padding: 8px 10px;
        border: 0 none;
        border-radius: 30px;
        height: 38px;
        background-color: #eff4fc;
        color: $grey;

        option:not(:first-child) {
          color: $text-color;
        }
      }
    }

    select {
      height: 100%;
      width: 100%;
      padding: 5px 0 0px 10px;
      font-size: 15px;
      font-weight: 300;
      border: 1px solid rgba(60, 60, 60, 0.26);
      border-radius: 4px;
      line-height: 1.4;
      background: none;
      // color: $text-color;

      // [disabled] {
      //   color: $grey;
      // }
      // option:not(:first-of-type) {
      //   color: $text-color;
      // }

      option {
        &:hover {
          box-shadow: 0 0 10px 100px $blue inset;
          outline-color: red;
        }
      }
    }
  }

  select:focus {
    outline: none;
  }

  button.arrow-down {
    width: 65px;
    float: right;

    svg {
      fill: white;
      stroke: white;
      height: 15px;
    }
  }
}
</style>
