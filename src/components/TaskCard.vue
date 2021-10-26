<template>
    <div class="column is-one-quarter custm-column">
        <div :class="['card task-card', {'blocked' : item.uploading}]">
            <header class="card-header task-card-header">
                <!-- etot title bar dlya 'materiali' tab -->
                <p class="card-header-title task-card-title has-text-link mb-0" v-if="item.questions_count">
                    Тема №{{ item.id }}
                </p>
                <!-- eto v obucheniya tab dlya task i task-score  -->
                <p :class="['card-header-title task-card-title mb-0', TitleColor ]" v-else>
                    {{ !item.uploading ? item.title : 'Задание в стадии загрузки'}}
                </p>
                <button class="info-icon-div is-borderless" v-if="!item.questions_count">
                    <d-icon icon="information" />
                </button>
            </header>
            <div class="card-content">
                <div class="custom-content">
                    <!-- eto title dlya ekzamenov -->
                    <div class="term-exam" v-if="item.is_exam">
                        <p>Промежуточный контроль</p>
                    </div>
                    <!-- eto v materiali vkladka dlya otobrojenie voprosov -->
                    <div class="task-type" v-if="item.questions_count">
                        <p>{{ item.title }}</p>
                        <div class="task-dates">
                            <p>Вопросы: {{ item.questions_count }}</p>
                            <p>Материал: {{ item.material_count }}</p>
                        </div>
                    </div>
                    <!-- eto v obucheniya vkladki -->
                    <div class="task-type" v-else>
                        <p :class="{ 'has-text-link': item.score }">Тип задания: {{ item.task_type }}</p>
                        <div class="task-dates">
                            <p>Добавлено: {{ item.added }}</p>
                            <p>{{ 
                                item.score ?
                                'Выполнено: ' + item.finished :
                                'Дедлайн: ' + item.deadline 
                                }}
                            </p>
                        </div>
                    </div>
                    
                    <slot></slot>     
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import iconWrapper from "../components/icons/iconWrapper";
    export default {
        props: ['item'],
        data() {
            return {
                data: ''
            }
        },
        components: {
            'd-icon': iconWrapper,
        },
        computed: {
            TitleColor() {
                return this.item.uploading ? 'has-text-danger' : (this.item.score ? '' : 'has-text-link')
            }
        },
    }
</script>
<style lang="scss" >

</style>