<template>
  <holidaysForms :form-id="$route.params.id" />
</template>

<script>
export default {
  components: {
    holidaysForms: () => import("@/views/holidays/_id/_component"),
  },
};
</script>