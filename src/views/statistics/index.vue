<template>
  <div class="statistics">
    <div class="statistics__blocks">
      <div class="statistics-block">
        <h3 class="statistics-block__title">
          Количество сотрудников
        </h3>
        <div class="statistics-block__countpeople" v-if="countEmployees">
          {{ countEmployees.count }}
        </div>
        <div class="statistics-block__genders" v-if="countEmployees">
          <div class="statistics-block__genders__gender">
            <span class="statistics-block__genders__title">
              <d-icon icon="male" class="statistics-block__genders__icon" />
              мужчины
            </span>
            <span class="statistics-block__genders__countdoc">
              <span>
                {{ countEmployees.men_count }}
              </span>
              <span>({{ countEmployees.percentage.men_count }}%)</span>
            </span>
          </div>
          <div class="statistics-block__genders__gender">
            <span class="statistics-block__genders__title">
              <d-icon
                icon="femenine"
                class="statistics-block__genders__icon statistics-block__genders__icon_female"
              />
              женщины
            </span>
            <span class="statistics-block__genders__countdoc">
              <span>
                {{ countEmployees.women_count }}
              </span>
              <span> ({{ countEmployees.percentage.women_count }}%)</span>
            </span>
          </div>
        </div>
      </div>
      <div class="statistics-block">
        <h3 class="statistics-block__title">
          Категории
        </h3>
        <div
          class="statistics-block__scroll"
          v-if="countCategory"
          :style="{
            'justify-content: space-around': countCategory.length === 2
          }"
        >
          <div
            class="statistics-block__category"
            v-for="(item, index) in countCategory"
            :key="index"
          >
            <div class="statistics-block__category__progressbar">
              <div class="statistics-block__category__countcategory">
                <span>{{ item.count }}</span>
                <span>({{ item.percent }}%)</span>
              </div>
              <span
                class="statistics-block__category__linecategory"
                :style="'width:' + item.percent + '%'"
              ></span>
            </div>
            <span class="statistics-block__category__title">
              {{ item.name[$i18n.locale] }}
            </span>
          </div>
        </div>
      </div>
      <div class="statistics-block">
        <h3 class="statistics-block__title">
          Возраст
        </h3>
        <apexchart
          v-if="countAge"
          class="statistics-block__age"
          type="bar"
          height="100%"
          :options="chartOptionsAge"
          :series="seriesAge"
        ></apexchart>
      </div>
    </div>
    <div class="statistics__blocks">
      <div class="statistics-block statistics-block_fullwidth">
        <h3 class="statistics-block__title">Специальности</h3>
        <div class="statistics-block__speciality">
          <apexchart
            v-if="countPosition"
            type="donut"
            height="100%"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <div class="statistics-block">
        <h3 class="statistics-block__title">
          Новые кадры
        </h3>
        <div class="statistics-block__date" v-if="countNewEmp">
          <div class="statistics-block__date__day">
            <span>
              Сегодня
            </span>
            <span>
              {{ countNewEmp.employee_today.all }}
            </span>
          </div>
          <div class="statistics-block__date__chart">
            <apexchart
              type="area"
              height="120"
              :options="chartOptionsDay"
              :series="seriesDay"
            ></apexchart>
          </div>
        </div>
        <hr class="line" />
        <div
          class="statistics-block__date statistics-block__date_lred"
          v-if="countNewEmp"
        >
          <div class="statistics-block__date__day">
            <span>
              За месяц
            </span>
            <span>
              {{ countNewEmp.employee_month.all }}
            </span>
          </div>
          <div class="statistics-block__date__chart">
            <apexchart
              type="area"
              height="120"
              :options="chartOptionsMonth"
              :series="seriesMonth"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import iconWrapper from "@/components/icons/iconWrapper";
import { mapActions } from "vuex";

export default {
  components: {
    "d-icon": iconWrapper
  },
  data() {
    return {
      countEmployees: null,
      countCategory: null,
      countAge: null,
      countAgeComputed: false,
      countPosition: null,
      countNewEmp: null,
      series: [],
      chartOptions: {
        chart: {
          type: "donut",
          height: "100%"
        },
        labels: [],
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10,
            donut: {
              size: "50%"
            }
          }
        },
        grid: {
          padding: {
            bottom: -280
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      seriesAge: [
        {
          name: "Средний процент",
          data: [50, 50, 50, 100, 50]
        }
      ],
      chartOptionsAge: {
        chart: {
          height: "100%",
          type: "bar",
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom
            }
          }
        },
        grid: {
          padding: {
            bottom: 10
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },

        xaxis: {
          categories: ["20-30 л", "30-40 л", "40-50 л", "50-60 л", "60-70 л"],
          position: "top",
          axisBorder: {
            show: false
          },
          labels: {
            offsetY: -5
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function(val) {
              return val + "%";
            }
          }
        },
        title: {
          text: "Monthly Inflation in Argentina, 2002",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444"
          }
        }
      },
      seriesDay: [
        {
          name: "Количество",
          data: []
        }
      ],
      chartOptionsDay: {
        chart: {
          height: 120,
          type: "area",
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:00:00.000Z",
            "2018-09-19T02:00:00.000Z",
            "2018-09-19T03:00:00.000Z",
            "2018-09-19T04:00:00.000Z",
            "2018-09-19T05:00:00.000Z",
            "2018-09-19T06:00:00.000Z",
            "2018-09-19T07:00:00.000Z",
            "2018-09-19T08:00:00.000Z",
            "2018-09-19T09:00:00.000Z",
            "2018-09-19T10:00:00.000Z",
            "2018-09-19T11:00:00.000Z",
            "2018-09-19T12:00:00.000Z",
            "2018-09-19T13:00:00.000Z",
            "2018-09-19T14:00:00.000Z",
            "2018-09-19T15:00:00.000Z",
            "2018-09-19T16:00:00.000Z",
            "2018-09-19T17:00:00.000Z",
            "2018-09-19T18:00:00.000Z",
            "2018-09-19T19:00:00.000Z",
            "2018-09-19T20:00:00.000Z",
            "2018-09-19T21:00:00.000Z",
            "2018-09-19T22:00:00.000Z",
            "2018-09-19T23:00:00.000Z"
          ]
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      seriesMonth: [
        {
          name: "Количество",
          data: []
        }
      ],
      chartOptionsMonth: {
        chart: {
          height: 120,
          type: "area",
          toolbar: {
            show: false
          },
          background: "#fff"
        },
        colors: ["#ff7285"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-1",
            "2018-09-2",
            "2018-09-3",
            "2018-09-4",
            "2018-09-5",
            "2018-09-6",
            "2018-09-7",
            "2018-09-8",
            "2018-09-9",
            "2018-09-10",
            "2018-09-11",
            "2018-09-12",
            "2018-09-13",
            "2018-09-14",
            "2018-09-15",
            "2018-09-16",
            "2018-09-17",
            "2018-09-18",
            "2018-09-19",
            "2018-09-20",
            "2018-09-21",
            "2018-09-22",
            "2018-09-23",
            "2018-09-24",
            "2018-09-25",
            "2018-09-26",
            "2018-09-27",
            "2018-09-29",
            "2018-09-29"
          ]
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      }
    };
  },
  methods: {
    ...mapActions("statistic", [
      "getCountEmployees",
      "getCountCategory",
      "getCountAge",
      "getCountPosition",
      "getCountNewEmp"
    ]),
    setDataToChart(dataArray, charOption, typeDate) {
      console.log("hello");
      let dates = [];
      let now = Date.now();
      console.log(this.$moment(now).second());
      Object.keys(dataArray).forEach(key => {
        if (key !== "all") {
          charOption.push(dataArray[key]);
          if (typeDate === "month") {
            now = now - 24 * 60 * 60 * 1000;
            dates.push(this.$moment(now).format("YYYY-MM-DD"));
          } else if (typeDate === "day") {
            now = now - (3600000 + this.$moment(now).minute() * 60 * 1000);
            dates.push(this.$moment(now).format());
          }
        }
      });
      if (typeDate === "month") {
        this.chartOptionsMonth.xaxis.categories = dates.reverse();
      } else {
        this.chartOptionsDay.xaxis.categories = dates.reverse();
      }
      console.log(dates);
    }
  },
  mounted() {
    this.getCountEmployees()
      .then(res => {
        if (res && res.data) {
          this.countEmployees = res.data;
          this.countEmployees.percentage = {};
          Object.keys(this.countEmployees).forEach(key => {
            if (
              this.countEmployees.count &&
              key !== "count" &&
              key !== "percentage"
            ) {
              this.countEmployees.percentage[key] = (
                (this.countEmployees[key] / this.countEmployees.count) *
                100
              ).toFixed(1);
            }
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
    this.getCountCategory().then(res => {
      if (res && res.data) {
        this.countCategory = res.data.category;
        let allCount = 0;
        this.countCategory.forEach(item => {
          allCount += item.count;
        });
        this.countCategory.forEach(item => {
          item.percent = ((item.count / allCount) * 100).toFixed(1);
        });
      }
    });
    this.getCountAge().then(res => {
      if (res && res.data) {
        this.countAge = res.data;
        let allCount = 0;
        let array = [];
        Object.keys(this.countAge).forEach(key => {
          allCount += this.countAge[key];
        });
        Object.keys(this.countAge).forEach(key => {
          this.countAge[key] = ((this.countAge[key] / allCount) * 100).toFixed(
            1
          );
          array.push(+this.countAge[key]);
        });
        this.seriesAge[0].data = array;
        this.countAgeComputed = true;
      }
    });
    this.getCountPosition().then(res => {
      if (res && res.data) {
        this.countPosition = res.data.position;
        this.countPosition.forEach(item => {
          this.series.push(item.count);
          this.chartOptions.labels.push(item.name[this.$i18n.locale]);
        });
      }
    });
    this.getCountNewEmp().then(res => {
      if (res && res.data) {
        this.countNewEmp = res.data;

        this.setDataToChart(
          this.countNewEmp.employee_month,
          this.seriesMonth[0].data,
          "month"
        );
        this.setDataToChart(
          this.countNewEmp.employee_today,
          this.seriesDay[0].data,
          "day"
        );
        console.log(this.seriesDay[0].data);
        console.log(this.countNewEmp);
      }
    });
  }
};
</script>
