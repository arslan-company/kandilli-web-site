<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="login login-1 d-flex flex-column flex-lg-row flex-column-fluid bg-white"
      :class="{
        'login-signin-on': this.state == 'signin',
        'login-signup-on': this.state == 'signup',
        'login-forgot-on': this.state == 'forgot'
      }"
      id="kt_login"
    >
      <div
        class="login-aside d-flex flex-column flex-row-auto"
        style="background-color: #F2C98A;"
      >
        <div class="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <a href="#" class="text-center mb-10">
            <img src="media/kandilli-logo.png" class="max-h-120px" />
          </a>
          <h3
            class="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
            style="color: #986923;"
          >
            Kandilli Pastanesi <br />
            Randevu Uygulaması
          </h3>
        </div>
        <div
          class="aside-img d-flex flex-row-fluid bgi-size-contain bgi-position-x-center bgi-position-y-center"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div>
      </div>
      <div
        class="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto"
      >
        <div class="d-flex flex-column-fluid flex-center">
          <div class="login-form login-signin">
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_signin_form"
              @submit.stop.prevent="onSubmitLogin()"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  Hoş Geldiniz
                </h3>
              </div>
              <b-alert :show="isShowAlert" variant="danger">
                Geçersiz kullanıcı adı veya şifre
              </b-alert>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >Kullanıcı Adı</label
                >
                <div
                  id="example-input-group-1"
                  label=""
                  label-for="example-input-1"
                >
                  <input
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="text"
                    name="username"
                    ref="username"
                    v-model="form.Username"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="d-flex justify-content-between mt-n5">
                  <label class="font-size-h6 font-weight-bolder text-dark pt-5"
                    >Şifre</label
                  >
                </div>
                <div
                  id="example-input-group-2"
                  label=""
                  label-for="example-input-2"
                >
                  <input
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="password"
                    name="password"
                    ref="password"
                    v-model="form.Password"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="pb-lg-0 pb-5">
                <button
                  ref="kt_login_signin_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
                >
                  Giriş Yap
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
</style>

<script>
import formValidation from "@/assets/plugins/formvalidation/dist/es6/core/Core";

import Trigger from "@/assets/plugins/formvalidation/dist/es6/plugins/Trigger";
import Bootstrap from "@/assets/plugins/formvalidation/dist/es6/plugins/Bootstrap";
import SubmitButton from "@/assets/plugins/formvalidation/dist/es6/plugins/SubmitButton";

import KTUtil from "@/assets/js/components/util";
import { mapGetters, mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";
import Swal from "sweetalert2";

export default {
  name: "login",
  data() {
    return {
      state: "signin",
      form: {
        Username: "",
        Password: ""
      },
      isShowAlert: false
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["currentUser"]),

    backgroundImage() {
      return process.env.BASE_URL + "media/working.svg";
    }
  },
  mounted() {
    const signin_form = KTUtil.getById("kt_login_signin_form");
    const forgot_form = KTUtil.getById("kt_login_forgot_form");

    this.fv = formValidation(signin_form, {
      fields: {
        username: {
          validators: {
            notEmpty: {
              message: "Username is required"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "Password is required"
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });

    this.fv2 = formValidation(forgot_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: "Email is required"
            },
            emailAddress: {
              message: "The value is not a valid email address"
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });
  },
  methods: {
    showForm(form) {
      this.state = form;
      var form_name = "kt_login_" + form + "_form";
      KTUtil.animateClass(
        KTUtil.getById(form_name),
        "animate__animated animate__backInUp"
      );
    },

    onSubmitLogin() {
      this.fv.validate();

      this.fv.on("core.form.valid", () => {
        const Username = this.form.Username;
        const Password = this.form.Password;

        // clear existing errors
        this.$store.dispatch(LOGOUT);

        // set spinner to submit button
        const submitButton = this.$refs["kt_login_signin_submit"];
        submitButton.classList.add("spinner", "spinner-light", "spinner-right");

        // dummy delay
        setTimeout(() => {
          // send login request
          this.$store
            .dispatch(LOGIN, { Username, Password })
            // go to which page after successfully login
            .then(() => {
              if (this.$store.state.auth.errors === "Login başarısız.") {
                this.isShowAlert = true;
                return;
              } else {
                this.$router.push({ name: "ReservationList" });
              }
            });

          submitButton.classList.remove(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
        }, 2000);
      });

      this.fv.on("core.form.invalid", () => {
        Swal.fire({
          title: "",
          text: "Please, provide correct data!",
          icon: "error",
          confirmButtonClass: "btn btn-secondary",
          heightAuto: false
        });
      });
    }
  }
};
</script>
