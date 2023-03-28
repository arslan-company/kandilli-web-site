<template>
  <div>
    <b-row>
      <b-col cols="10">
        <b-form-group>
          <b-input-group class="mt-3">
            <b-input-group-prepend>
              <div class="btn searchIcon">
                <i class="fas fa-search"></i>
              </div>
            </b-input-group-prepend>
            <b-form-input
              class="searchInput"
              id="searchForm"
              v-model="searchForm"
              type="text"
              placeholder="Müşteri İsim, Soyisim, Telefon Numarası, Email ..."
              @keypress.enter="searchUser"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="1">
        <b-input-group class="mt-3">
          <button
            class="btn font-weight-bold searchButton searchButtonDetail"
            @click="searchUser"
          >
            Ara
          </button>
        </b-input-group>
      </b-col>
      <b-col cols="1">
        <b-input-group class="mt-3">
          <button
            class="btn font-weight-bold searchButton"
            @click="getCustomerInfo"
          >
            Temizle
          </button>
        </b-input-group>
      </b-col>
    </b-row>
    <div class="card card-custom">
      <div class="card-body">
        <button
          class="btn font-weight-bold addCustomerButton"
          style="float:right"
          @click="createNewCustomer"
        >
          <i class="fas fa-user-plus addCustomerIcon"></i>
          Yeni Müşteri Ekle
        </button>
        <div
          class="datatable datatable-bordered datatable-head-custom datatable-default datatable-loaded"
        >
          <table
            class="datatable-table"
            style="display:block"
            :hidden="hiddenCustomerTable"
          >
            <thead class="datatable-head">
              <tr class="datatable-row" style="left: 0px">
                <th
                  data-field="CustomerInfo"
                  class="datatable-cell datatable-cell-sort text-center"
                >
                  <span style="width: 250px">Müşteri Bilgileri</span>
                </th>
                <th
                  data-field="PhoneNumber"
                  class="datatable-cell datatable-cell-sort text-center"
                >
                  <span style="width: 146px">Telefon Numarası</span>
                </th>
                <th
                  data-field="ReservationCount"
                  class="datatable-cell datatable-cell-sort text-center"
                >
                  <span style="width: 146px">Toplam Randevu Sayısı</span>
                </th>
                <th
                  data-field="ReservationCancelCount"
                  class="datatable-cell datatable-cell-sort text-center"
                >
                  <span style="width: 146px">Randevu İptal Sayısı</span>
                </th>
                <th
                  data-field="ReservationDoneCount"
                  class="datatable-cell datatable-cell-sort text-center"
                >
                  <span style="width: 146px">Tamamlanan Randevu Sayısı</span>
                </th>
                <th
                  data-field="BlackListStatus"
                  class="datatable-cell datatable-cell-sort text-center"
                >
                  <span style="width: 146px">Sadakat Yıldızı</span>
                </th>
                <th
                  data-field="Actions"
                  data-autohide-disabled="false"
                  class="datatable-cell datatable-cell-sort text-center"
                >
                  <span style="width: 120px">İşlemler</span>
                </th>
              </tr>
            </thead>
            <tbody class="datatable-body" style="">
              <tr
                data-row="0"
                class="datatable-row"
                style="left: 0px"
                v-for="(item, index) in pageCustomerList"
                :key="index"
              >
                <td
                  class="datatable-cell datatable-toggle-detail"
                  style="cursor:pointer;"
                  @click="onListLastTenAppointment(item)"
                >
                  <i class="fa fa-caret-right"></i>
                </td>
                <td data-field="CustomerInfo" class="datatable-cell">
                  <span style="width: 250px">
                    <div class="d-flex align-items-center">
                      <div
                        class="symbol symbol-40 flex-shrink-0"
                        :class="item.color"
                      >
                        <span
                          class="symbol-label font-size-h4 font-weight-bold"
                        >
                          {{ item.FirstName[0] }}
                        </span>
                      </div>
                      <div class="ml-4">
                        <div
                          class="text-dark-75 font-weight-bolder font-size-lg mb-0"
                        >
                          {{ item.FirstName + " " + item.LastName }}
                        </div>
                        <span style="color:#12a293">{{ item.Mail }}</span>
                      </div>
                    </div>
                  </span>
                </td>
                <td
                  class="datatable-cell-sorted datatable-cell"
                  data-field="PhoneNumber"
                >
                  <span style="width: 146px">
                    <div class="font-weight-bolder font-size-lg mb-0">
                      {{ item.Phone }}
                    </div>
                  </span>
                </td>
                <td data-field="ReservationCount" class="datatable-cell">
                  <span style="width: 146px">
                    <div class="font-weight-bolder font-size-lg mb-0">
                      {{ item.TotalAppointmentCount }}
                    </div>
                  </span>
                </td>
                <td data-field="ReservationCancelCount" class="datatable-cell">
                  <span style="width: 146px">
                    <div class="font-weight-bolder font-size-lg mb-0">
                      {{ item.CancelAppointmentCount }}
                    </div>
                  </span>
                </td>
                <td data-field="ReservationDoneCount" class="datatable-cell">
                  <span style="width: 146px">
                    <div class="font-weight-bolder font-size-lg mb-0">
                      {{ item.DoneAppointmentCount }}
                    </div>
                  </span>
                </td>
                <td data-field="BlackListStatus" class="datatable-cell">
                  <span style="width:138px">
                    <v-rating
                      length="5"
                      color="#12a293"
                      v-model="item.BlackListPoint"
                      readonly
                      size="15"
                    ></v-rating>
                  </span>
                </td>
                <td
                  data-field="Actions"
                  data-autohide-disabled="false"
                  class="datatable-cell"
                >
                  <span style="overflow:visible;position:relative;width:130px">
                    <a
                      class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                      @click="onEditCustomer(item)"
                    >
                      <span class="svg-icon svg-icon-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <rect x="0" y="0" width="24" height="24"></rect>
                            <path
                              d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,
                              18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z"
                              fill="#000000"
                              fill-rule="nonzero"
                              transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "
                            ></path>
                            <path
                              d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,
                              12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z"
                              fill="#000000"
                              fill-rule="nonzero"
                              opacity="0.3"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </a>
                    <a
                      class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"
                      @click="showModal(item)"
                    >
                      <span class="svg-icon svg-icon-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <rect x="0" y="0" width="24" height="24"></rect>
                            <path
                              d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                              fill="#000000"
                              fill-rule="nonzero"
                            ></path>
                            <path
                              d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                              fill="#000000"
                              opacity="0.3"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <b-pagination
            v-model="pageSize"
            :total-rows="totalPage"
            :per-page="perPage"
            align="right"
            @input="onChangePagination"
            style="margin-top:2%;"
            :hidden="hiddenCustomerTable"
          ></b-pagination>
          <b-modal
            v-model="isShowDetailModal"
            size="xl"
            title="Müşteri Bilgileri"
          >
            <b-container fluid>
              <b-row>
                <b-col>
                  <b-form-group label="Adı" label-for="FirstName">
                    <b-form-input
                      id="FirstName"
                      v-model="editCustomer.FirstName"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group label="Soyadı" label-for="LastName">
                    <b-form-input
                      id="LastName"
                      v-model="editCustomer.LastName"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <b-form-group label="Telefon Numarası" label-for="Phone">
                    <b-form-input
                      id="Phone"
                      v-model="editCustomer.Phone"
                      type="number"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group label="E-Posta" label-for="Mail">
                    <b-form-input
                      id="Mail"
                      v-model="editCustomer.Mail"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row v-if="!isNewCustomer">
                <b-col>
                  <label for="BirthDay">Doğum Günü</label>
                  <b-form-datepicker
                    id="BirthDay"
                    v-model="editCustomer.BirthDay"
                    class="mb-8"
                    placeholder=""
                    locale="tr"
                    :hide-header="true"
                  ></b-form-datepicker>
                </b-col>
                <b-col>
                  <label for="AnniversaryDay">Evlilik Yıl Dönümü</label>
                  <b-form-datepicker
                    id="AnniversaryDay"
                    v-model="editCustomer.AnniversaryDay"
                    class="mb-8"
                    placeholder=""
                    locale="tr"
                    :hide-header="true"
                  ></b-form-datepicker>
                </b-col>
              </b-row>

              <b-row v-if="!isNewCustomer">
                <b-col>
                  <label>Sadakat Yıldızı</label>
                  <v-rating
                    length="5"
                    color="#12a293"
                    v-model="editCustomer.BlackListPoint"
                  ></v-rating>
                </b-col>
                <b-col>
                  <b-form-group
                    label="Müşteri Notu:"
                    label-for="NoteForCustomer"
                  >
                    <b-form-textarea
                      id="NoteForCustomer"
                      v-model="editCustomer.Note"
                      type="text"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-container>

            <template v-slot:modal-footer>
              <div class="w-100">
                <button
                  class="btn font-weight-bold saveButton"
                  @click="saveCustomer"
                >
                  {{ customerButton }}
                </button>
              </div>
            </template>
          </b-modal>
          <b-modal
            v-model="isShowListTenAppointment"
            size="xl"
            title="Müşterinin Son 10 Randevu Detayı"
          >
            <b-container fluid>
              <table
                role="table"
                aria-busy="false"
                class="table b-table table-striped table-hover"
              >
                <thead role="rowgroup">
                  <tr role="row">
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="1"
                      class="text-center"
                    >
                      <div>Randevu Tarihi</div>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="2"
                      class="text-center"
                    >
                      <div>Randevu Alınma Tarihi</div>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="3"
                      class="text-center"
                    >
                      <div>Kişi Sayısı</div>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="4"
                      class="text-center"
                    >
                      <div>Randevu Durumu</div>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="5"
                      class="text-center"
                    >
                      <div>Randevu İptali Sebebi</div>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  <tr
                    role="row"
                    v-for="(item, index) in lastTenAppointment"
                    :key="index"
                  >
                    <td aria-colindex="1" role="cell" class="text-center">
                      {{ item.Day | formatDate }}
                    </td>
                    <td aria-colindex="2" role="cell" class="text-center">
                      {{ item.SystemDate | formatDate }}
                    </td>
                    <td aria-colindex="3" role="cell" class="text-center">
                      {{ item.PersonCount }}
                    </td>
                    <td aria-colindex="4" role="cell" class="text-center">
                      {{ item.Status }}
                    </td>
                    <td aria-colindex="5" role="cell" class="text-center">
                      {{ item.CancelReason }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-container>

            <template v-slot:modal-footer>
              <div class="w-100"></div>
            </template>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
const axios = require("axios").default;
import Swal from "sweetalert2";
import JwtService from "@/core/services/jwt.service";
import decode from "jwt-decode";
import moment from "moment";
import Vue from "vue";

export default {
  data() {
    return {
      customerList: [],
      searchForm: "",
      isShowDetailModal: false,
      editCustomer: {},
      pageSize: 1,
      totalPage: 0,
      perPage: 14,
      pageCustomerList: [],
      colorControl: 0,
      authToken: {},
      isShowListTenAppointment: false,
      lastTenAppointment: [],
      isNewCustomer: false,
      hiddenCustomerTable: true
    };
  },
  methods: {
    getColor() {
      const temp = Math.floor(Math.random() * 5) + 1;
      var color = "";
      switch (temp) {
        case 1:
          color = "symbol-light-primary";
          break;
        case 2:
          color = "symbol-light-success";
          break;
        case 3:
          color = "symbol-light-danger";
          break;
        case 4:
          color = "symbol-light-warning";
          break;
        case 5:
          color = "symbol-light-info";
          break;
        default:
          break;
      }
      return color;
    },
    getCustomerInfo() {
      this.searchForm = "";
      this.hiddenCustomerTable = true;
      axios({
        method: "get",
        url: "https://kandilli.herokuapp.com/GetCustomerList"
      }).then(result => {
        if (result.data.data.length > 0) {
          this.hiddenCustomerTable = false;
          this.customerList = result.data.data;
          if (this.customerList.length > this.perPage) {
            this.totalPage = this.customerList.length;
          }
          this.customerList.forEach(el => {
            el.color = this.getColor();
          });
          this.onChangePagination();
        }
      });
    },
    async showModal(item) {
      const value = await this.$bvModal.msgBoxConfirm(
        "İşlemi onaylıyor musunuz?",
        {
          title: "Müşteri bilgileri silinecektir.",
          okTitle: "Onay",
          cancelTitle: "İptal",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        }
      );
      if (value) {
        this.onDeleteCustomer(item);
      }
    },
    onDeleteCustomer(item) {
      if (this.authToken.AuthorityList.indexOf("delete_musteri") !== -1) {
        axios({
          method: "post",
          url: "https://kandilli.herokuapp.com/DeleteCustomer",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            CustomerId: item.CustomerId
          }
        }).then(result => {
          if (result.data.code === 1) {
            Swal.fire({
              title: "",
              text: "Müşteri başarıyla silinmiştir.",
              icon: "success",
              timer: 3000
            });
            this.getCustomerInfo();
          } else {
            Swal.fire({
              title: "",
              text: "Müşteri silinemedi.",
              icon: "error",
              timer: 3000
            });
          }
        });
      } else {
        this.$bvToast.toast(
          "Müşteri bilgilerini silmeye yetkiniz bulunmamaktadır.",
          {
            title: "Uyarı",
            variant: "danger",
            toaster: "b-toaster-top-center",
            solid: true
          }
        );
      }
    },
    searchUser() {
      var newUserList = [];
      this.customerList.forEach(element => {
        if (
          element.FirstName.toLowerCase().includes(
            this.searchForm.toLowerCase()
          ) ||
          element.LastName.toLowerCase().includes(
            this.searchForm.toLowerCase()
          ) ||
          element.Phone.includes(this.searchForm) ||
          element.Mail.toLowerCase().includes(this.searchForm.toLowerCase())
        ) {
          newUserList.push(element);
        }
      });
      this.pageCustomerList = newUserList;
    },
    onEditCustomer(item) {
      this.editCustomer = {};
      this.isNewCustomer = false;
      if (this.authToken.AuthorityList.indexOf("edit_musteri") !== -1) {
        this.editCustomer = item;
        this.isShowDetailModal = true;
      } else {
        this.$bvToast.toast(
          "Müşteri bilgilerini değiştirmeye yetkiniz bulunmamaktadır.",
          {
            title: "Uyarı",
            variant: "danger",
            toaster: "b-toaster-top-center",
            solid: true
          }
        );
      }
    },
    saveCustomer() {
      if (this.isNewCustomer) {
        axios({
          method: "post",
          url: "https://kandilli.herokuapp.com/AddCustomer",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            FirstName: this.editCustomer.FirstName,
            LastName: this.editCustomer.LastName,
            Phone: this.editCustomer.Phone,
            Mail: this.editCustomer.Mail
          }
        }).then(result => {
          if (result.data.code === 1) {
            Swal.fire({
              title: "",
              text: "Müşteri bilgileri başarıyla kaydedilmiştir.",
              icon: "success",
              timer: 3000
            });
            this.getCustomerInfo();
            this.isShowDetailModal = false;
          } else {
            Swal.fire({
              title: "",
              text: "Müşteri bilgileri kaydedilemedi.",
              icon: "error",
              timer: 3000
            });
          }
        });
      } else {
        axios({
          method: "post",
          url: "https://kandilli.herokuapp.com/UpdateCustomer",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            CustomerId: this.editCustomer.CustomerId,
            FirstName: this.editCustomer.FirstName,
            LastName: this.editCustomer.LastName,
            Phone: this.editCustomer.Phone,
            Mail: this.editCustomer.Mail,
            BlackListPoint: this.editCustomer.BlackListPoint,
            BirthDay: this.editCustomer.BirthDay,
            AnniversaryDay: this.editCustomer.AnniversaryDay,
            Note: this.editCustomer.Note
          }
        }).then(result => {
          if (result.data.code === 1) {
            Swal.fire({
              title: "",
              text: "Müşteri bilgileri başarıyla güncellenmiştir.",
              icon: "success",
              timer: 3000
            });
            this.getCustomerInfo();
            this.isShowDetailModal = false;
          } else {
            Swal.fire({
              title: "",
              text: "Müşteri bilgileri güncellenemedi.",
              icon: "error",
              timer: 3000
            });
          }
        });
      }
    },
    onChangePagination() {
      if (this.pageSize !== null) {
        this.pageCustomerList = this.customerList.slice(
          (this.pageSize - 1) * this.perPage,
          this.pageSize * this.perPage
        );
      }
    },
    onListLastTenAppointment(item) {
      this.lastTenAppointment = item.LastTenAppointment;
      this.isShowListTenAppointment = true;
    },
    createNewCustomer() {
      this.editCustomer = {};
      if (this.authToken.AuthorityList.indexOf("add_musteri") !== -1) {
        this.isNewCustomer = true;
        this.isShowDetailModal = true;
      } else {
        this.$bvToast.toast("Yeni müşteri eklemeye yetkiniz bulunmamaktadır.", {
          title: "Uyarı",
          variant: "danger",
          toaster: "b-toaster-top-center",
          solid: true
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Müşteri Listeleme" }]);
    this.authToken = decode(JwtService.getToken());
    this.getCustomerInfo();

    Vue.filter("formatDate", function(value) {
      return moment(value).format("DD.MM.yyyy");
    });
  },
  computed: {
    customerButton() {
      return this.isNewCustomer ? "Kaydet" : "Güncelle";
    }
  }
};
</script>

<style>
.searchInput {
  background-color: white;
}
.searchInput {
  border: 1px groove #ffffff;
  border-left: none;
}
.searchButton,
.saveButton:hover,
.addCustomerButton:hover {
  border: 1px solid #12a293;
  color: #12a293;
  background-color: rgb(255, 255, 255);
}
.searchButtonDetail {
  padding-right: 35%;
  padding-left: 35%;
}
.saveButton {
  float: right;
  margin-right: 1%;
}
.searchButton:hover,
.saveButton,
.addCustomerButton {
  background-color: #12a293;
  color: white;
}
.searchIcon {
  border: 1px groove #ffffff;
  border-right: none;
  background-color: white;
  color: #12a293;
}
.fa-search {
  cursor: default;
  color: #12a293;
}
.addCustomerIcon {
  color: white;
}
.addCustomerButton:hover .addCustomerIcon {
  color: #12a293;
}
</style>
