<template>
    <div :class="['ghost-loader', {'active': active}]">
        <slot/>
    </div>
</template>

<script>
    export default {
        props: {
            active: Boolean 
        }
    }
</script>

<style lang="scss">
.ghost-loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    opacity: 0;
    z-index: 1;
    pointer-events: none;
    transition: opacity 0.4s;

    &.active {
        opacity: .8;
        pointer-events: all;
    }
}
</style>