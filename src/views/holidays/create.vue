<template>
  <holidaysForms />
</template>

<script>
export default {
  components: {
    holidaysForms: () => import("@/views/holidays/_id/_component"),
  },
};
</script>