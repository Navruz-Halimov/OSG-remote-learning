<template>
    <radial-progress-bar 
        :diameter="diameter"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        :inner-stroke-color="innerStrokeColor"
        :start-color="color"
        :stop-color="color"
        :stroke-width="strokeWidth"
        :inner-stroke-width="innerStrokeWidth"
    >
        <p class="progress-bar__percent" :style="{'color': color}">{{ item.percent }}%</p>
    </radial-progress-bar>
</template>

<script>
    import RadialProgressBar from 'vue-radial-progress'
    import variables from '../assets/scss/base/_variables.scss'
    export default {
        props:['item'],
        data () {
            return {
                diameter: 68,
                completedSteps: this.item && this.item.percent || 30,
                totalSteps: 100,
                strokeWidth: 7,
                innerStrokeWidth: 7,
                color: '#1761aa',
                innerStrokeColor: '#f0f3f8'
            }
        },

        mounted() {
            if(this.item) {
                if (this.item.percent > 30 ) {

                    this.color = variables.green
                }
                else if (this.item.percent > 10) {
                    this.color = variables.blue
                }
                else {
                    this.color = variables.red
                }
            }
        },

        components: {
            RadialProgressBar,
        }
    }
</script>

<style lang="scss">
.progress-bar__percent {
    font-size: 18px;
    font-weight: 600;
}
</style>