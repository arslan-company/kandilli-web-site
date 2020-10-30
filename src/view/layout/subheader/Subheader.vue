<template>
  <div
    class="subheader py-2 py-lg-12 subheader-transparent"
    v-bind:class="subheaderClasses"
    id="kt_subheader"
  >
    <div
      class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="d-flex align-items-center flex-wrap mr-2">
        <!--begin::Heading-->
        <div class="d-flex flex-column">
          <!--begin::Title-->
          <h2 class="text-white font-weight-bold my-2 mr-5">
            {{ title }}
          </h2>
          <ul class="d-flex align-items-center font-weight-bold my-2">
            <router-link :to="'/'" class="opacity-75 hover-opacity-100">
              <i class="flaticon2-shelter text-white icon-1x"></i>
            </router-link>

            <template v-for="(breadcrumb, i) in breadcrumbs">
              <span
                class="label label-dot label-sm bg-white opacity-75 mx-3"
                :key="i"
              ></span>
              <router-link
                :key="`${i}-${breadcrumb.id}`"
                v-if="breadcrumb.route"
                :to="breadcrumb.route"
                class="text-white text-hover-white opacity-75 hover-opacity-100"
              >
                {{ breadcrumb.title }}
              </router-link>
              <span
                class="text-white text-hover-white opacity-75 hover-opacity-100"
                :key="`${i}-${breadcrumb.id}`"
                v-if="!breadcrumb.route"
              >
                {{ breadcrumb.title }}
              </span>
            </template>
          </ul>
        </div>
      </div>

      <!--begin::Toolbar-->
      <div class="d-flex align-items-center">
        <!--begin::Button-->
        <a
          href="#"
          class="btn btn-fh btn-white btn-hover-primary font-weight-bold px-2 px-lg-5 mr-2"
        >
          <span class="svg-icon svg-icon-primary svg-icon-lg">
            <!--begin::Svg-->
            <inline-svg src="media/svg/icons/Communication/Add-user.svg" />
            <!--end::Svg Icon-->
          </span>
          New Member
        </a>
        <!--end::Button-->
        <!--begin::Dropdown-->
        <b-dropdown
          toggle-class="btn btn-fh btn-white btn-hover-primary font-weight-bold px-2 px-lg-5 mr-2"
          no-caret
          right
          no-flip
          v-b-tooltip="'Quick actions'"
        >
          <template v-slot:button-content>
            <!--begin::Button-->
            <span class="svg-icon svg-icon-primary svg-icon-lg">
              <!--begin::Svg-->
              <inline-svg src="media/svg/icons/Files/File.svg" />
              <!--end::Svg Icon-->
            </span>
            New Report
            <!--end::Button-->
          </template>
          <!--begin::Navigation-->
          <div class="navi navi-hover min-w-md-250px">
            <b-dropdown-text tag="div" class="navi-header font-weight-bold">
              <span class="font-size-lg">
                Choose Label:
              </span>
              <i
                class="flaticon2-information icon-md text-muted"
                v-b-tooltip="'Click to learn more...'"
              ></i>
            </b-dropdown-text>
            <b-dropdown-text
              tag="div"
              class="navi-separator mb-3 opacity-70"
            ></b-dropdown-text>
            <b-dropdown-text tag="div" class="navi-item">
              <a href="#" class="navi-link">
                <span class="navi-text">
                  <span class="label label-xl label-inline label-light-primary">
                    Customer
                  </span>
                </span>
              </a>
            </b-dropdown-text>
            <b-dropdown-text tag="div" class="navi-item">
              <a href="#" class="navi-link">
                <span class="navi-text">
                  <span class="label label-xl label-inline label-light-danger">
                    Partner
                  </span>
                </span>
              </a>
            </b-dropdown-text>
            <b-dropdown-text tag="div" class="navi-item">
              <a href="#" class="navi-link">
                <span class="navi-text">
                  <span class="label label-xl label-inline label-light-warning">
                    Suplier
                  </span>
                </span>
              </a>
            </b-dropdown-text>
            <b-dropdown-text tag="div" class="navi-item">
              <a href="#" class="navi-link">
                <span class="navi-text">
                  <span class="label label-xl label-inline label-light-primary">
                    Member
                  </span>
                </span>
              </a>
            </b-dropdown-text>
            <b-dropdown-text tag="div" class="navi-item">
              <a href="#" class="navi-link">
                <span class="navi-text">
                  <span class="label label-xl label-inline label-light-dark">
                    Staff
                  </span>
                </span>
              </a>
            </b-dropdown-text>
            <b-dropdown-text
              tag="div"
              class="navi-separator mt-3 opacity-70"
            ></b-dropdown-text>
            <b-dropdown-text tag="div" class="navi-footer pt-5 pb-4">
              <a class="btn btn-clean font-weight-bold btn-sm" href="#">
                <i class="ki ki-plus icon-sm"></i>Add new</a
              >
            </b-dropdown-text>
          </div>
          <!--end::Navigation-->
        </b-dropdown>
        <!--end::Dropdown-->
      </div>
      <!--end::Toolbar-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTSubheader",
  props: {
    breadcrumbs: Array,
    title: String
  },
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if subheader width is fluid
     */
    widthFluid() {
      return this.layoutConfig("subheader.width") === "fluid";
    },

    subheaderClasses() {
      const classes = [];
      const style = this.layoutConfig("subheader.style");
      if (style) {
        classes.push(style);

        if (style === "solid") {
          classes.push("bg-white");
        }

        if (this.layoutConfig("subheader.fixed")) {
          classes.push("border-top");
        }

        if (this.layoutConfig("subheader.clear")) {
          classes.push("mb-0");
        }
      }
      return classes.join(" ");
    }
  }
};
</script>
