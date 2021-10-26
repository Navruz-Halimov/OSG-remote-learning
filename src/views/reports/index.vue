<template>
  <div class="section__list reports">
    <div class="reports__left">
      <div class="reports__forms">
        <h5>Период:</h5>
        <div class="mt-2">
          <div>Начало</div>
          <div class="mt-1">
            <d-date />
          </div>
        </div>
        <div class="mt-2">
          <div>Конец</div>
          <div class="mt-1">
            <d-date />
          </div>
        </div>
        <div class="mt-5">
          <d-select
            class="whitout_close grey-border height-md"
            :options="options1"
            label="title"
            v-model="id"
            :reduce="(item) => item.id"
          />
        </div>
        <div class="mt-5">
          <d-select
            class="whitout_close grey-border height-md"
            label="title"
            :options="options2"
            v-model="id"
            :reduce="(item) => item.id"
          />
        </div>
        <div class="mt-5">
          <h5>В разрезе</h5>
          <div class="mt-1 reports-checkbox">
            <div>
              <d-checkbox
                size="small"
                text="Областей"
                class="mr-1 black-text"
              />
            </div>
            <div class="mt-1">
              <d-checkbox size="small" text="Районов" class="mr-1 black-text" />
            </div>
            <div class="mt-1">
              <d-checkbox
                size="small"
                text="Сотрудников"
                class="mr-1 black-text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="reports__right">
      <div class="report-download__tabs">
        <div class="report-download__tabs--item mr-3">Word</div>
        <div class="report-download__tabs--item mr-3">PDF</div>
        <div class="report-download__tabs--item mr-4">Exel</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "d-select": () => import("@/components/inputs/select"),
    "d-checkbox": () => import("@/components/inputs/checkbox"),
    "d-date": () => import("@/components/calendar/calendar2"),
  },
  data() {
    return {
      id: 1,
      options1: [{ id: 1, title: "Область" }],
      options2: [{ id: 1, title: "Райнон" }],
      date: new Date(),
    };
  },
};
</script>

<style lang="scss">
div.reports {
  padding-left: 30px;
  display: flex;
  &__left {
    flex: 1;
    .reports__forms {
      width: 250px;
    }
  }
  &__right {
    flex: 1;
    .report-download__tabs {
      display: flex;
      justify-content: flex-end;
      &--item {
        background-color: #275395;
        color: #fff;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px 18px;
        font-weight: 200;
        cursor: pointer;
      }
    }
  }
}
</style>
