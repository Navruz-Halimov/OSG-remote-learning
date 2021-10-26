<template>
  <button 
    class="button" 
    :class="[
    loading ? 'is-loading' : null, 
    rounded ? 'is-rounded' : null, 
    size || null,
    color || null
    ]" 
    :disabled="loading || disabled"
    @click="$emit('click', $event)"
  >
      <span v-if="text">{{text}}</span>
      <slot/>
      <!-- Using 
        <d-button :loading="false" text="Test" size rounded color="blue" @click="test" disabled/>
        123</d-button> -->
  </button>
</template>

<script>
export default {
    inheritAttrs: true,
    props: {
        loading: {
            type: Boolean
        },
        text: {
            type: String
        },
        color: {
            type: String 
        },
        rounded: {
            type: Boolean 
        },
        size: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    }
}
</script>

<style>
    .blue {
        background-color: #1761AA !important;
        color: #fff !important;
    }

    .blue:hover {
        color: #fff !important; 
    }

    .is-grey {
        color: white !important;
        background-color: #9CA8BC !important;
    }
</style>