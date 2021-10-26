<template>
  <table :class="[yourCustomClass, additionalClasses]">
    <tbody :class="yourCustomClass + '__tbody'">
      <tr :class="yourCustomClass + '__header'">
        <th
          v-for="(rowHeader, key) in tableHeader"
          :key="key"
          :colspan="rowHeader.colspan"
          :rowspan="rowHeader.rowspan"
          :style="{ width: rowHeader.width }"
          :class="yourCustomClass + '__header__th'"
          v-html="rowHeader.title"
        />
      </tr>
      <tr
        v-for="(rowBody, key) in tableBody"
        :key="key"
        :class="yourCustomClass + '__body'"
      >
        <td
          v-for="(info, key) in rowBody.info"
          :key="key"
          :colspan="info.colspan"
          :rowspan="info.rowspan"
          v-html="info.text"
          :class="yourCustomClass + '__body__td'"
        />
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    tableHeader: {
      type: Array,
    },
    tableBody: {
      type: Array,
    },
    yourCustomClass: String,
    additionalClasses: Array,
  },
  data() {
    return {
      some: "string",
    };
  },
  methods: {},
};
</script>
