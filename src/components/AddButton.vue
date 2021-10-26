<template>
  <div class="flex-row flex-nowrap mb-2" @click="$emit('click', $event)">
    <d-icon class="add-btn icon-btn" icon="add-btn" />

    <span class="primary-btn-color"> Добавить </span>
  </div>
</template>

<script>
export default {
  components: {
    "d-icon": () => import("@/components/icons/iconWrapper"),
  },
};
</script>
