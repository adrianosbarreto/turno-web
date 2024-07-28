import { defineStore } from "pinia";

export const useLeftSideMenuStore = defineStore({
    id: "leftSideMenu",
    state: () => ({
        isCollapsed: false,
    }),
    actions: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
    },
});
