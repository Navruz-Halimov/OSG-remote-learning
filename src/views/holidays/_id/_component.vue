<template>
  <div class="trip-create section__list">
    <div class="columns padding-sm-x">
      <div class="column">
        <h4 class="title">Отпуск</h4>
        <Loading-progress pinned :active="pending" />
      </div>
    </div>

    <div class="columns padding-sm-x">
      <div class="column is-6">
        <div class="secondary-title">Подразделение</div>
        <d-select
          class="grey-2 rounded"
          placeholder="Введите текст"
          :options="departmentList"
          label="name"
          ml
          v-model="filterProps.deparment_id"
          :reduce="(item) => item.id"
          @change="handleSelectChange('deparment', arguments[0])"
        />
      </div>
      <div class="column is-6">
        <div class="secondary-title">Начало отпуска</div>
        <d-date-selector
          class="modal-variant-1 grey rounded"
          grey
          v-model="form.date_from"
        />
      </div>
    </div>
    <div class="columns padding-sm-x">
      <div class="column is-6">
        <div class="secondary-title">Должность</div>
        <d-select
          class="grey-2 rounded"
          placeholder="Выберите"
          :options="workplaceList"
          label="name"
          ml
          v-model="filterProps.workplace_id"
          :reduce="(item) => item.id"
          @change="handleSelectChange('workplace', arguments[0])"
        />
      </div>
      <div class="column is-6">
        <div class="secondary-title">Конец отпуска</div>
        <d-date-selector
          class="modal-variant-1 grey rounded"
          grey
          v-model="form.date_to"
        />
      </div>
    </div>
    <div class="columns padding-sm-x">
      <div class="column is-6">
        <div class="secondary-title">Ф.И.О сотрудника</div>
        <d-select
          class="grey-2 rounded"
          placeholder="Введите текст"
          :options="employeeList"
          label="name"
          ml
          v-model="form.employee"
          :reduce="(item) => item.id"
        />
      </div>

      <div class="column is-6">
        <div class="secondary-title">Область</div>
        <d-select
          class="grey-2 rounded"
          placeholder="Введите текст"
          :options="cityList"
          label="name"
          ml
          v-model="form.place"
          :reduce="(item) => item.id"
          @change="handleSelectChange('city', arguments[0])"
        />
      </div>
    </div>

    <div class="mt-1 padding-sm-x" v-show="errors">
      <div class="has-text-danger" v-for="(item, i) in errors" :key="i">
        <em class="is-size-4">*</em>
        {{ item }}
      </div>
    </div>

    <!-- <pre>{{ form }}</pre> -->

    <div class="columns mt-auto padding-sm-x">
      <div class="column is-6">
        <d-button
          text="Отменить"
          @click="toBack"
          rounded
          color="is-grey"
          :disabled="pending"
        ></d-button>
      </div>
      <div class="column is-6 right">
        <d-button
          text="Сохранить"
          @click="submitVacation"
          rounded
          color="blue"
          :disabled="pending"
          :loading="pending"
        ></d-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/views/holidays/_id/mixin";

export default {
  mixins: [mixin],
};
</script>

<style lang="scss">
.trip-create {
  display: flex;
  flex-direction: column;

  &.section__list {
    flex: none;
    width: 60%;
    margin: 0 auto;
    padding: 30px;
  }

  .secondary-title {
    margin-bottom: 5px;
    color: $text-color;
  }

  .mt-auto {
    margin-top: auto;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    button:last-child {
      margin-left: 20px;
    }
  }
}
</style>