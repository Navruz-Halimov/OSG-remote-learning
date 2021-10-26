<template>
  <div class="section__list">
    <div>test</div>
    <d-tabs-underline @change="callback">
      <d-tabs-underline-item name="1" tab="tab 1">tab content 1</d-tabs-underline-item>
      <d-tabs-underline-item name="2" tab="tab 2">tab content 2</d-tabs-underline-item>
      <d-tabs-underline-item name="3" tab="tab 3">tab content 3</d-tabs-underline-item>
    </d-tabs-underline>
  </div>
</template>

<script>
import DTabsUnderline from "@/components/TabsUnderline.vue";
import DTabsUnderlineItem from "@/components/TabsUnderlineItem.vue";
export default {
  components: {
    DTabsUnderline,
    DTabsUnderlineItem,
  },

  methods: {
    callback(arg) {
      console.log("arg", arg);
    },
  },
};
</script>