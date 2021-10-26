<template>
    <div class="columns">
        <div class="column is-one-quarter">
            <div class="card count-card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left count-icon">
                            <d-icon icon="teacher-group" />
                        </div>
                        <div class="media-content ">
                            <p class="title">44</p>
                        </div>
                    </div>

                    <div class="custom-content">
                        Общее количество модулей
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-one-quarter">
            <div class="card count-card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left count-icon">
                            <d-icon icon="notes"/>
                        </div>
                        <div class="media-content ">
                            <p class="title">14</p>
                        </div>
                    </div>

                    <div class="custom-content">
                        Общее количество модулей
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-one-quarter">
            <div class="card count-card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left count-icon">
                            <d-icon icon="time"/>
                        </div>
                        <div class="media-content ">
                            <p class="title">520 часов</p>
                        </div>
                    </div>

                    <div class="custom-content">
                        Общее время обучения
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-one-quarter">
            <div class="card count-card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left count-icon">
                            <d-icon icon="close"/>
                        </div>
                        <div class="media-content ">
                            <p class="title text-green">82/100</p>
                        </div>
                    </div>

                    <div class="custom-content">
                        Итоговый бал за курс
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import iconWrapper from "../components/icons/iconWrapper";
    export default {
        components: {
            'd-icon': iconWrapper,
        }
    }
</script>

<style lang="scss">

</style>