<template>
  <div :class="className">
    <center v-if="loading" >
        <d-loader/>
    </center>
      
    <div v-else-if="!loading && len == 0" class="is-empty">
      Пусто
    </div>

    <slot v-else />
    <!-- <d-loader-wrapper :loading="true" :len="4"/> -->
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    len: {
      type: Number,
    },
    className: String
  },
  components: {
    "d-loader": () => import("./spinner"),
  },
};
</script>

<style>
.is-empty {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 20px 0;
}
</style>
