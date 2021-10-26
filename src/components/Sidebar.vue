<template>
  <div class="sidebar" ref="sidebarRef">
    <div class="sidebar-logo">
      <router-link :to="{ name: '/' }">
        <img
          class="sidebar-logo__image"
          src="@/assets/icons/logo.svg"
          alt="Logo"
        />
      </router-link>
      <span class="sidebar-logo__title"
        >Система кадров <br />Высшей школы судей</span
      >
    </div>
    <div class="sidebar-menu">
      <div class="sidebar-menu__group">
        <router-link
          class="sidebar-menu__item"
          active-class="active"
          expand
          v-for="route in sidebarRoutes"
          :to="{ name: route.path }"
          :key="route.path"
        >
          <d-icon
            class="sidebar-menu__item--icon"
            :icon="route.iconName"
          ></d-icon>
          <span>{{ route.name }}</span>
        </router-link>

        <a
          class="sidebar-menu__item"
          href="javascript:void(0)"
          @click="$router.push({ name: 'login' })"
        >
          <d-icon class="sidebar-menu__item--icon" icon="sidebar/exit" />
          <span>Выход</span>
        </a>
      </div>
    </div>
    <div class="designed-by">
      Разработка CRM
      <a href="https://osg.uz/ru/" target="_blank">Online Service Group</a>
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/icons/iconWrapper";
// function trimSvgWhitespace() {
//   // get all SVG objects in the DOM
//   let svgs = document.querySelectorAll(".sidebar-menu__item svg");

//   // go through each one and add a viewbox that ensures all children are visible
//   for (let i = 0, l = svgs.length; i < l; i++) {
//     let svg = svgs[i],
//       box = svg.getBBox(), // <- get the visual boundary required to view all children
//       viewBox = [box.x, box.y, box.width, box.height].join(" ");

//     // set viewable area based on value above
//     svg.setAttribute("viewBox", viewBox);
//     console.log('viewBox', viewBox);
//   }
// }

export default {
  data() {
    return {
      sidebarRoutes: [
        {
          name: "Сотрудники",
          iconName: "sidebar/employee",
          path: "employee",
        },

        {
          name: "Штатное расписание",
          iconName: "sidebar/location",
          path: "employeeSchedule",
        },

        {
          name: "Приказы",
          iconName: "sidebar/orders",
          path: "orders",
        },

        {
          name: "Аттестация",
          iconName: "sidebar/attestation",
          path: "attestation",
        },

        {
          name: "Командировки",
          iconName: "sidebar/business_trips",
          path: "businessTrips",
        },

        {
          name: "Отпуска",
          iconName: "sidebar/holidays",
          path: "holidays",
        },

        {
          name: "Общий поиск",
          iconName: "sidebar/search",
          path: "research",
        },

        {
          name: "Учет рабочего времени",
          iconName: "sidebar/time",
          path: "workTime",
        },

        {
          name: "Отчет",
          iconName: "sidebar/stats",
          path: "reports",
        },

        {
          name: "Справочник",
          iconName: "sidebar/directory",
          path: "catalog",
        },
        {
          name: "Статистика",
          iconName: "sidebar/stats",
          path: "statistics",
        },
        {
          name: "Операторы",
          iconName: "sidebar/employee",
          path: "operators",
        },

        {
          name: "Логирование",
          iconName: "sidebar/notes-pen",
          path: "logging",
        },

        // {
        //   name: "Выход",
        //   iconName: "",
        //   path: "exit",
        // },
      ],
    };
  },
  components: {
    DIcon,
  },

  mounted() {
    const sidebar = this.$refs.sidebarRef.offsetWidth;
    this.$setStyleProp("--sidebar-width", sidebar + "px");

    // this.$nextTick(() => {
    //   trimSvgWhitespace();
    // });
  },
};
</script>
