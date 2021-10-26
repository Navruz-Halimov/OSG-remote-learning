<template>
  <div class="columns is-multiline">
    <div class="column is-full is-multiline">
      <DTable
        :tableHeader="tableHeader"
        :tableBody="tableBody"
        yourCustomClass="tbill"
        :additionalClasses="tableClasses"
      ></DTable>
    </div>
  </div>
</template>
<script>
import DTable from "@/components/tables/Table";
export default {
  components: {
    DTable,
  },
  data() {
    return {
      tableClasses: ["table", "is-bordered", "is-hoverable"],
      tableHeader: [
        {
          title: "",
          width: "30%",
          colspan: 1,
          rowspan: 2,
        },

        {
          title: "<div class='tbill__header__thinner'>Текущий бал</div>",
          width: "calc(70% / 3)",
          colspan: 2,
          rowspan: 1,
        },
        {
          title: "<div class='tbill__header__thinner'>Промежуточный бал</div>",
          width: "calc(70% / 3)",
          colspan: 2,
          rowspan: 1,
        },
        {
          title: "<div class='tbill__header__thinner'>Итоговый бал</div>",
          width: "calc(70% / 3)",
          colspan: 2,
          rowspan: 1,
        },
      ],
      tableBody: [
        {
          id: 0,
          info: [
            {
              // colspan: 1,
              // rowspan: 1,
              text: "<div class='tbill__body__tdinner theader__balls__text'>Баллы</div>",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "<div class='tbill__body__tdinner theader__balls__text'>Баллы</div>",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "<div class='tbill__body__tdinner theader__balls__text'>Баллы</div>",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "",
            },
          ],
        },
        {
          id: 1,
          info: [
            {
              // colspan: 1,
              // rowspan: 1,
              text: "Мавлянов Джурабек Комолович",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "<span class='tbill__body__marknumb'>98/100</span>",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "Отлично",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "<span class='tbill__body__marknumb'>98/100</span>",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "Отлично",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "<span class='tbill__body__marknumb'>98/100</span>",
            },
            {
              // colspan: 1,
              // rowspan: 1,
              text: "Отлично",
            },
          ],
        },
        {
          id: 2,
          info: [
            {
              colspan: 1,
              rowspan: 1,
              text: "Мавлянов Джурабек Комолович",
            },
            {
              colspan: 1,
              rowspan: 1,
              text:
                "<span class='tbill__body__marknumb tbill__body__marknumb_orange'>98/100</span>",
            },
            {
              colspan: 1,
              rowspan: 1,
              text: "Отлично",
            },
            {
              colspan: 1,
              rowspan: 1,
              text:
                "<span class='tbill__body__marknumb tbill__body__marknumb_orange'>98/100</span>",
            },
            {
              colspan: 1,
              rowspan: 1,
              text: "Отлично",
            },
            {
              colspan: 1,
              rowspan: 1,
              text:
                "<span class='tbill__body__marknumb tbill__body__marknumb_red'>98/100</span>",
            },
            {
              colspan: 1,
              rowspan: 1,
              text: "Отлично",
            },
          ],
        },
        {
          id: 3,
          info: [
            {
              colspan: 1,
              rowspan: 1,
              text: "Мавлянов Джурабек Комолович",
            },
            {
              colspan: 1,
              rowspan: 1,
              text:
                "<span class='tbill__body__marknumb tbill__body__marknumb_orange'>98/100</span>",
            },
            {
              colspan: 1,
              rowspan: 1,
              text: "Отлично",
            },
            {
              colspan: 1,
              rowspan: 1,
              text:
                "<span class='tbill__body__marknumb tbill__body__marknumb_orange'>98/100</span>",
            },
            {
              colspan: 1,
              rowspan: 1,
              text: "Отлично",
            },
            {
              colspan: 1,
              rowspan: 1,
              text:
                "<span class='tbill__body__marknumb tbill__body__marknumb_red'>98/100</span>",
            },
            {
              colspan: 1,
              rowspan: 1,
              text: "Отлично",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.theader__balls__text {
  color: #9AA6BB;
}
</style>