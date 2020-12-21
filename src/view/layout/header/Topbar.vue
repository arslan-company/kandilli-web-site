<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar">
    <button class="btn btn-light-primary btn-bold" @click="onLogout">
      Oturumu Kapat
    </button>
  </div>
  <!-- end:: Header Topbar -->
</template>

<style lang="scss">
.topbar {
  .dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  .dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }
}
</style>

<script>
import i18nService from "@/core/services/i18n.service.js";
import { LOGOUT } from "@/core/services/store/auth.module";

export default {
  name: "KTTopbar",
  data() {
    return {
      languageFlag: "",
      languages: i18nService.languages
    };
  },
  methods: {
    onLanguageChanged() {
      this.languageFlag = this.languages.find(val => {
        return val.lang === i18nService.getActiveLanguage();
      }).flag;
    },
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    }
  },
  computed: {
    getLanguageFlag() {
      return this.onLanguageChanged();
    }
  }
};
</script>
