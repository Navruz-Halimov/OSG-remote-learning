<template>
  <div class="answer-list">
    <p class="answer-list__title">{{ title }}</p>
    <div class="answer-list__items">
      <div class="answer-list__item" v-for="item in list" :key="item.id">
        <div>
          <strong>ID:</strong>
          {{ item.id }}
        </div>
        <d-icon v-if="item.completed" icon="close" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    list: {
      type: Array,
    },
  },
  components: {
    "d-icon": () => import("@/components/icons/iconWrapper"),
  },
};
</script>

<style>
.answer-list__title {
  font-weight: normal;
  font-size: 18px;
  text-align: left;
  color: #275395;
}

.answer-list__item {
  display: flex;
}

.answer-list__item div {
  flex: 1;
  font-weight: 300;
  font-size: 17px;
  text-align: left;
  color: #9aa6bb;
}

.answer-list__item div strong {
  font-weight: normal;
  font-size: 17px;
  text-align: left;
  color: #9aa6bb;
}

.answer-list__item div:nth-child(2) {
  display: flex;
  justify-content: flex-end;
}

.answer-list__item div:nth-child(2) svg {
  width: 15px;
  height: 15px;
  background: #27ae60;
}
</style>
