<template>
    <div class="card analytics-card">
        <div class="analytics-card-header">
            <div class="columns">
                <div class="column">
                    <div class="analytics-card-header__item">
                        Тип предмета
                    </div>
                </div>
                <div class="column">
                    <div class="analytics-card-header__item">
                    Дисциплина
                    </div>
                </div>
                <div class="column">
                    <div class="analytics-card-header__item">
                    Дата
                    </div>
                </div>
                <div class="column is-1">
                </div>
            </div>
        </div>
        <div class="analytics-card-body">
            <div class="columns">
                <div class="column">
                    <d-select 
                        class="" 
                        placeholder="Введите текст" 
                        :options="options"
                        label="title"
                        v-model="id"
                        :reduce="item => item.id"
                    ></d-select>
                </div>
                <div class="column">
                    <d-select 
                        class="" 
                        placeholder="Введите текст" 
                        :options="options" 
                        label="title"
                        v-model="id"
                        :reduce="item => item.id"
                    ></d-select>
                </div>
                <div class="column">
                    <d-date-selector></d-date-selector>
                </div>
                <div class="column is-1">
                    <d-button color="custom-btn-info is-link arrow-down" @click="clickArrow">
                        <d-icon icon="angle-down"></d-icon>
                    </d-button>
                </div>
            </div>
        </div>
        <div class="analytics-card-header">
            <div class="columns">
                <div class="column">
                    <div class="analytics-card-header__item">
                        Сложность
                    </div>
                </div>
                <div class="column">
                    <div class="analytics-card-header__item">
                        Тип вопроса
                    </div>
                </div>
                <div class="column">
                    <div class="analytics-card-header__item">
                        Статус
                    </div>
                </div>
                <div class="column is-1">
                </div>
            </div>
        </div>
        <div class="analytics-card-body">
            <div class="columns">
                <div class="column">
                    <d-radio text="Легкий" text-align="right" size="small"></d-radio>
                    <d-radio text="Средний" text-align="right" size="small"></d-radio>
                    <d-radio text="Сложный" text-align="right" size="small"></d-radio>
                </div>
                <div class="column">
                    <d-radio text="Вопрос" text-align="right" size="small"></d-radio>
                    <d-radio text="Казус" text-align="right" size="small"></d-radio>
                    <d-radio text="Интеракивный вопрос" text-align="right" size="small"></d-radio>
                </div>
                <div class="column">
                    <div class="columns">
                        <div class="column">
                            <d-radio text="Новый" text-align="right" size="small"></d-radio>
                            <d-radio text="Одобренный" text-align="right" size="small"></d-radio>
                            <d-radio text="Не одобренный" text-align="right" size="small"></d-radio>
                        </div>
                        <div class="column">
                            <d-radio text="Обновлен" text-align="right" size="small"></d-radio>
                            <d-radio text="Отклонен" text-align="right" size="small"></d-radio>
                        </div>
                    </div>
                </div>
                <div class="column is-1">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Select from './inputs/select'
    import Radio from './inputs/checkbox'
    import DateSelector from './inputs/date-selector'
    import loaderButton from './buttons/loaderButton'
    import iconWrapper from './icons/iconWrapper'
    export default {
        components: {
            'd-select': Select,
            'd-button': loaderButton,
            'd-icon': iconWrapper,
            'd-radio': Radio,
            'd-date-selector': DateSelector
        },
        data() {
            return {
                id: null,
                options: [
                    {
                        title: 'lyuboyasfasdgsdhgs',
                        id: 1,
                    },
                    {
                        title: 'big_master',
                        id: 2,
                    },
                    {
                        title: 'Zikoi5',
                        id: 3,
                    },
                    {
                        title: 'hhexio',
                        id: 4,
                    },
                ],
            }
        },
        methods: {
            clickArrow() {

            },

            clickSearch() {
                
            }
        },
    }
</script>

<style lang="scss">
    .card {
        &.analytics-card {
            padding: $paddingCards;
            border-radius: 4px;

            .analytics-card-header {
                &__item {
                    font-size: 18px;
                }
            }

            .analytics-card-body {

                .columns {
                    .columns {
                        margin-top: 0;
                        height: 100%;
                        .column {
                            padding: 0;
                        }
                    }
                }

                .v-select {
                    width: 90%;
                }

                .custom-select {
                    height: 100%;
                    width: 80%;
                    position: relative;

                    &::after {
                        content: "";
                        background-image: url('~@/assets/icons/angle-down.svg?external');
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 17px;
                        display: inline-block;
                        vertical-align: top;
                        width: 20px;
                        height: 20px;
                        right: 5px;
                        position: absolute;
                        top: 12px;
                        z-index: 2;
                    }
                    
                    &::before {
                        width: 40px;
                        content: '';
                        display: inline-block;
                        width: 20px;
                        background: white;
                        vertical-align: top;
                        right: 2px;
                        position: absolute;
                        top: 3px;
                        bottom: 3px;
                        z-index: 1;
                    }
                    &.greyish {
                        select {
                            color: $grey;
                            option:not([first-child]) {
                                color: black;
                            }
                        }
                    }

                    select {
                        height: 100%;
                        width: 100%;
                        padding: 5px 0 0px 10px;
                        font-size: 15px;
                        font-weight: 300;
                        border: 1px solid rgba(60, 60, 60, 0.26);
                        border-radius: 4px;
                        line-height: 1.4;
                        background: none;

                        option {
                            &:hover {
                                box-shadow: 0 0 10px 100px $blue inset;
                                outline-color: red
                            }
                        }
                    }
                }


                select:focus {
                    outline: none;
                }

                button.arrow-down {
                    width: 65px;
                    float: right;

                    svg {
                        fill: white;
                        stroke: white;
                        height: 15px;
                    }
                }
            }
        }
    }
</style>