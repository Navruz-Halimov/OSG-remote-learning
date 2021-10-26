<template>
  <div class="content-main">
    <div>
      Календарь
      <d-calendar-widget />
    </div>

    <button class="button is-primary">Button</button>
    <h2>{{ users.username }}</h2>
    <!-- <SearchInput /> -->
    <Cards />

    <weekThemesAccordion
      :accordions="accordions"
      :accordionOptions="accordionOptions"
    />
    <d-table />
  </div>
</template>

<script>
import weekThemesAccordion from "@/components/accordion/weekThemesAccordion";
import Calendar2 from "@/components/calendar/calendar2";
export default {
  components: {
    weekThemesAccordion,
    "d-calendar-widget": Calendar2,
  },

  data() {
    return {
      modalSeen: false,
      users: {
        username: "asasdasd",
      },
      //Опции аккордеона
      accordionOptions: {
        //нужно передавать своего глобального родителя стилей
        yourCustomClass: "accordion",
        accordionMultiple: false,
      },
      accordions: [
        {
          id: 1,
          title: "Первая неделя",
          tasks: [
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Промежуточный контроль",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Промежуточный контроль",
              count: 11,
            },
          ],
        },
        {
          id: 2,
          title: "Вторая неделя",
          tasks: [
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Задача и принципы Финансовое право",
              count: 11,
            },
            {
              text: "Промежуточный контроль",
              count: 11,
            },
          ],
        },
      ],
    }
  }
};
</script>

<style lang="scss" scoped>
</style>