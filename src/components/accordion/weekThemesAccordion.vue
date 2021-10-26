<template>
   <badger-accordion
      :options="{ openMultiplePanels: accordionOptions.accordionMultiple }"
      :icons="false"
      class="accordion"
   >
      <badger-accordion-item
         v-for="(accordion, key) in accordions"
         :key="key"
         class="active"
      >
         <template slot="header">
            <div
               class="columns is-full is-gapless accordion__header"
               @click="activeAc = !activeAc"
            >
               <h3 class="accordion__header__title column is-11">
                  {{ accordion.title }}
               </h3>
               <div class="accordion__header__icon column is-1">
                  <iconWrapper class="icon" icon="arrow-accordion" />
               </div>
            </div>
         </template>
         <template slot="content">
            <div class="accordion__content">
               <div class="columns is-gapless accordion__content__title">
                  <div class="column is-1">
                     <span>№</span>
                  </div>
                  <div class="column is-7">
                     <span>Тема</span>
                  </div>
                  <div class="column is-2">
                     <span>Кол-во вопросов</span>
                  </div>
                  <div class="column is-2">
                     <button class="accordion__content__btn">
                        Добавить
                        <span>+</span>
                     </button>
                  </div>
               </div>
               <div
                  class="columns is-gapless accordion__content__list"
                  v-for="(task, key) in accordion.tasks"
                  :key="key"
               >
                  <div class="column is-1">
                     <span>{{ key + 1 }}</span>
                  </div>
                  <div class="column is-7">
                     <span>{{ task.text }}</span>
                  </div>
                  <div class="column is-2">
                     <span>{{ task.count }}</span>
                  </div>
                  <div class="column is-2">
                     <button>
                        <iconWrapper
                           class="accordion__content__icon"
                           icon="accordion_plus"
                        />
                     </button>
                  </div>
               </div>
            </div>
         </template>
      </badger-accordion-item>
      <!-- <iconWrapper></iconWrapper> -->

      <!--    <pre>{{ accordionOptions }}</pre>-->
   </badger-accordion>
</template>
<script>
import iconWrapper from "@/components/icons/iconWrapper";
import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";
export default {
   props: {
      accordions: {
         type: Array || {},
      },
      accordionOptions: Object || {},
      accordionMultiple: Boolean,
   },
   components: {
      iconWrapper,
      BadgerAccordion,
      BadgerAccordionItem,
   },
   data() {
      return {
         activeAc: false,
      };
   },
};
</script>

<style lang="scss">
.badger-accordion-toggle {
   padding: 0;
}
</style>
