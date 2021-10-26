<template>
    <div class="column px-0">
        <div class="card block-card">
            <div class="columns is-vcentered">
                <div class="column is-05 has-text-centered">{{item}}</div>
                <div class="column is-3 ">
                    <div class="subject-title">
                        <span class="text-16">Общая теория права</span>
                    </div>
                </div>
                <div class="column ">
                    <div class="block-card-results">
                        <p>Текущий контроль</p>
                        <p class="block-card-results__score has-text-green">89/100 (Отлично)</p>
                        <a href="#" class="">
                            <span>
                                Показать все &#10132;
                            </span>
                        </a>
                    </div>
                </div>
                <div class="column ">
                    <div class="block-card-results">
                        <p>Промежуточный контроль</p>
                        <p class="block-card-results__score has-text-orange">89/100 (Отлично)</p>
                        <span href="#" class="block-card-results__time">
                            <d-icon icon="time"/>
                            <span>
                                06.04.2020/09.04.2020
                            </span>
                        </span>
                    </div>
                </div>
                <div class="column ">
                    <div class="block-card-results">
                        <p>Итоговый контроль</p>
                        <p class="block-card-results__score has-text-green">89/100 (Отлично)</p>
                        <span href="#" class="block-card-results__time">
                            <d-icon icon="time"/>
                            <span>
                                06.08.2020
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import iconWrapper from "../components/icons/iconWrapper";
    export default {
        props: ['item'],
        components: {
            'd-icon': iconWrapper,
        }
    }
</script>