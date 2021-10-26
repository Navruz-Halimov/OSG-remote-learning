<template>
  <div>
    <d-badge />
    <d-badge type="circle" red/>
    
    <h3>Списки (lists)</h3>
    <div class="card custom-card">

      <d-lists blue-header>
        <!-- Header types
          1) default grey header
          2) props "blue-header" -> blue header
         -->

        <template #header>
          <div class="columns">
            <div class="column is-4"><span>Курсы</span></div>
            <div class="column is-2"><span>Пргресс</span></div>
            <div class="column is-3"><span>Дата начала</span></div>
            <div class="column is-2"><span>Дата окончания</span></div>
            <div class="column"></div>
          </div>
        </template>

        <template #content>
          <div class="columns" v-for="item in 6" :key="item+32">
            <div class="column is-4">Специалисты повышение квалификации </div>
            <div class="column is-2">38%</div>
            <div class="column is-3">31.07.2020</div>
            <div class="column is-2">25.01.2021</div>
          </div>
        </template>
      </d-lists>
    </div>

    <h3>Dropdowns</h3>
    <d-dropdown up>
      <!-- dropdown types
      1) default -> dropdown
      2) props "up" -> dropup
       -->
      <template #body>
        <d-icon icon="more" style="width: 30px" class="custom-dropdown__trigger" @click="open = !open"/>
      </template>
      <template #dropdown-menu>
        <li>
            <a href="#">
                <d-icon icon="student-dashbord"></d-icon>
                Classic mail
            </a>
        </li>
        <li>
            <a href="#">
                <d-icon icon="student-dashbord"></d-icon>
                UPS Delivery
            </a>
        </li>
        <li>
            <a href="#">
                <d-icon icon="student-dashbord"></d-icon>
                Private jet
            </a>
        </li>
      </template>
    </d-dropdown>
    

    <h3>Pagination</h3>
    <d-pagination v-model="pagination.page" :total="pagination.total" />

    <h3>Galery Cards</h3>
    <div class="columns is-multiline">
      <d-galery-card v-for="item in 6" :key="item + 16" :galery-item="galeryItem"></d-galery-card>
    </div>


    <h3>Tabs</h3>
    <d-analytics></d-analytics>

    <h3>Tabs</h3>
    <d-tabs :tab-list="tabList"></d-tabs>

    <h3>Breadcrumbs</h3>
    <d-breadcrumbs :menu-list="breadcrumbList"></d-breadcrumbs>

    <h3>Панель поисковика</h3>
    <d-search-panel options label placeholder></d-search-panel>

    <h3>Week Tabs</h3>
    <d-week-tabs multiple read-only></d-week-tabs>

    <h3>Round Progress Bar</h3>
    <d-progress
      v-for="item in progressBarItems"
      :key="item.percent"
      :item="item"
    ></d-progress>

    <h3>Avatars</h3>
    <d-avatar
      v-for="(item, index) in imageList"
      :key="index"
      :item="item"
      cover
      border
      rectangle
    ></d-avatar>

    <h3>Notify blocks (Блоки с аватарками и многоточие)</h3>
      <div class="columns">
        <d-notify-block v-for="item in 4" :key="item+4" :item="item"></d-notify-block>
      </div>

    <h3>Blocks</h3>
    <d-block v-for="item in 4" :key="item + 12" :item="item"></d-block>

    <h3>Count cards</h3>
    <d-count-card></d-count-card>
    <h3>Task cards</h3>

    <div class="columns is-multiline">
      <d-task-card v-for="(item, index) of taskList" :key="index" :item="item">
        <template>
          <a
            class="button is-link is-rounded custom-button "
            :to="item.url"
            :disabled="item.uploading"
            >Начать</a
          >
        </template>
      </d-task-card>

      <d-task-card
        v-for="(item, index) in scoreList"
        :key="index + 4"
        :item="item"
      >
        <template>
          <div
            :class="[
              'task-score',
              {
                'custom-btn-success': item.score >= 50,
                'custom-btn-danger': item.score < 50,
              },
            ]"
          >
            {{ item.score + "/100" }}
          </div>
        </template>
      </d-task-card>

      <d-task-card
        v-for="(item, index) in materialList"
        :key="index + 8"
        :item="item"
      >
        <template>
          <a class="button is-rounded custom-btn-grey btn-more" :to="item.url">
            <span>
              Подробнее
            </span>
            <span class="icon">
              <d-icon icon="angle-right" />
            </span>
          </a>
        </template>
      </d-task-card>
    </div>
  </div>
</template>

<script>
import iconWrapper from "../components/icons/iconWrapper";
import EducationTask from '../components/TaskCard'
import CountCard from '../components/CountCard'
import NotifyBlock from '../components/NotifyBlocks'
import Block from '../components/SubjectBlock'
import Avatar from '../components/Avatar'
import Dropdown from '../components/Dropdown'
import ProgressBar from '../components/RoundProgressBar'
import WeekTabs from '../components/WeekTab'
import Breadcrumbs from '../components/Breadcrumbs'
import SearchPanel from '../components/SearchPanel'
import Tabs from '../components/Tabs'
import Analytics from '../components/Analytics'
import Pagination from '../components/Pagination'
import GaleryBlock from '../components/GaleryBlock'
import Badge from '../components/Badge'

import Lists from '../components/Lists'
  export default {
    components: {
      'd-task-card': EducationTask,
      'd-icon': iconWrapper,
      'd-count-card': CountCard,
      'd-notify-block': NotifyBlock,
      'd-block': Block,
      'd-avatar': Avatar,
      'd-progress': ProgressBar,
      'd-week-tabs': WeekTabs,
      'd-breadcrumbs': Breadcrumbs,
      'd-search-panel': SearchPanel,
      'd-tabs': Tabs,
      'd-analytics': Analytics,
      'd-pagination': Pagination,
      'd-galery-card': GaleryBlock,
      'd-badge': Badge,
      'd-dropdown': Dropdown,
      'd-lists': Lists
    },
    data() {
      return {
        open: false,
        galeryItem: {
          shareLink: '#',
          playLink: '#',
          title: 'Хозяйственное процессуальное право лекция 1, введение',
          picture: require('@/assets/images/HiA9GLT.jpg')
        },
        tabList: [
          {
            title: 'asdasfasf',
            tab: 1
          },
          {
            title: 'asdasfasfaslgkha;kldhajdhf;kaljsh',
            tab: 2
          },
          {
            title: 'asdasfasf',
            tab: 3
          },
        ],
        breadcrumbList: [
          {
            title: 'Дипломатическое и консульское право ',
            link: '#'
          },
          {
            title: 'Группа №555  специалисты (повышение квалификации)',
            link: '#'
          },
          {
            title: 'Дипломатическое'
          },
        ], 
        progressBarItems: [
          {
            percent: 54,
          },
          {
            percent: 24,
          },
          {
            percent: 10,
          },
        ],
        imageList: [
          {
            src: require('@/assets/images/IMG_26561.png'),
            width: 49,
            height: 49,
          },
          {
            src: require('@/assets/images/HiA9GLT.jpg'),
            width: 74,
            height: 80,
          },
          {
            src: require('@/assets/images/unnamed.jpg'),
            width: 74,
            height: 80,
          }
        ],
        taskList: [
          {
            added: '22.06.2020г',
            deadline: '27.06.2020г',
            task_type: 'ekcec',
            title: 'Трудовое право',
            is_exam: '',
            uploading: false,
            url: ''
          },
          {
            added: '22.06.2020г',
            deadline: '27.06.2020г',
            task_type: 'ekcec',
            title: 'Трудовое право',
            is_exam: '',
            uploading: true,
            url: ''
          },
          {
            added: '22.06.2020г',
            deadline: '27.06.2020г',
            task_type: 'ekcec',
            title: 'Трудовое право',
            is_exam: 'Промежуточный контроль',
            uploading: false,
            url: ''
          },
          {
            added: '22.06.2020г',
            deadline: '27.06.2020г',
            task_type: 'ekcec',
            title: 'Трудовое право',
            is_exam: '',
            uploading: false,
            url: ''
          },
        ],
        scoreList: [
          {
            added: '27.06.2020г',
            finished: '27.06.2020г',
            task_type: 'ekcec',
            title: 'Трудовое право',
            score: 40
          },
          {
            added: '27.06.2020г',
            finished: '27.06.2020г',
            task_type: 'ekcec',
            title: 'Трудовое право',
            score: 50
          },
          {
            added: '27.06.2020г',
            finished: '27.06.2020г',
            task_type: 'ekcec',
            title: 'Трудовое право',
            score: 70
          },
          {
            added: '27.06.2020г',
            finished: '27.06.2020г',
            task_type: 'ekcec',
            title: 'Трудовое право',
            score: 90
          },
        ],
        materialList: [
          {
            id: 1,
            title: 'Задачи и принципы Уголовного кодекса',
            questions_count: 20,
            material_count: 6,
            url: ''
          },
          {
            id: 2,
            title: 'Задачи и принципы Уголовного кодекса',
            questions_count: 20,
            material_count: 6,
            url: ''
          },
          {
            id: 3,
            title: 'Задачи и принципы Уголовного кодекса',
            questions_count: 20,
            material_count: 6,
            url: ''
          },
          
        ],

      pagination: {
        page: 1,
        total: 123,
      },
    };
  },
};
</script>

<style lang="scss">
  .custom-card {
    border-radius: 8px;
  }
</style>