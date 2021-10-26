<template>
  <component v-if="component" :is="component" @click="$emit('click', $event)" />
  <!-- using -->
  <!-- <d-icon icon="cldr" class="red"/> -->
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },

    svgPath: {
      type: String,
    },
  },
  data() {
    return {
      component: null,
    };
  },
  computed: {
    loader() {
      if (!this.icon && !this.svgPath) {
        return null;
      }

      if (this.svgPath) {
        return () => import(`@/${this.svgPath}`);
      }

      return () => import(`@/assets/icons/${this.icon}.svg?inline`);
    },
  },
  mounted() {
    if (this.loader) {
      this.loader().then(() => {
        this.component = () => this.loader();
      });
    }
  },
};
</script>

<style>
svg.red {
  fill: red;
  /* height: 50px; */
}

svg.is-grey {
  fill: #9aa6bb;
}

svg.is-blue {
  fill: #295395;
}

svg.white {
  fill: #fff;
}

svg.size-1 {
  width: 15px;
  height: 15px;
}

svg.size-2 {
  width: 20px;
  height: 20px;
}

svg.size-3 {
  width: 25px;
  height: 25px;
}

svg.size-4 {
  width: 30px;
  height: 30px;
}
</style>