<template>
  <div>
    <p v-if="title">{{ title }}</p>
    <div :class="['text-block', type || null]">
      <p v-if="text">{{ text }}</p>
      <slot v-else />
    </div>

    <!-- using -->
    <!-- <d-text-block text="123" title="Вопрос" type="answer" />
         Lorem ipsum dolor</d-text-block> -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    type: {
      type: String,
    },
  },
};
</script>

<style>
.text-block {
  box-sizing: border-box;
  padding: 10px;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid #c7c7c7;
}

.question {
  border: 0 none;
  background-color: #ecf2fb;
}

.answer {
  border: 0 none;
  background-color: #fff0a5;
}
</style>
