<template>
  <div class="row">
    <h2>Müşteri Listeleme</h2>
    <div class="col-md-12">
      <div class="card">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="customerSelected"
            :headers="headers"
            :items="customerList"
            item-key="phoneNumber"
            :loading="loading"
            :search="search"
            single-select
            show-select
          >
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  data() {
    return {
      forms: [],
      searchForm: "",
      search: "",
      customerSelected: "",
      loading: true,
      headers: [
        { text: "İsim Soyisim", value: "fullName" },
        { text: "Telefon Numarası", value: "phoneNumber" },
        { text: "Email", value: "email" },
        { text: "Rezervasyon Sayısı", value: "reservationCount" },
        { text: "Kara Liste Durumu", value: "blackListStatus" },
        { text: "İşlemler", value: "actions", sortable: false }
      ],
      customerList: [
        {
          fullName: "Enes ARSLAN",
          phoneNumber: "05062254580",
          email: "enes.arslan@test.com",
          blackListStatus: 100,
          reservationCount: "5"
        },
        {
          fullName: "Test testoğlu",
          phoneNumber: "05555555555",
          email: "test.testoğlu@test.com",
          blackListStatus: 50,
          reservationCount: "1"
        },
        {
          fullName: "Furkan ARSLAN",
          phoneNumber: "05557105045",
          email: "furkanarslan@deneme.com",
          blackListStatus: 0,
          reservationCount: "27"
        },
        {
          fullName: "Burak ÖZDEMİR",
          phoneNumber: "08888888888",
          email: "fburakozdemir34@gmail.com",
          blackListStatus: 87,
          reservationCount: ""
        }
      ]
    };
  },
  methods: {
    handleClick(item) {
      axios({
        method: "get",
        url: this.getTasksUrl
      }).then(() => {
        this.$router.push({
          name: item["task-proc-def-id"],
          params: {
            url:
              "http://insecure-ahmet-dev-rhpam-kieserver-ahmet-rhpam.efes-roks-cls01-8d096ac4a14f7747edefd138d2db7a24-0000.eu-de.containers.appdomain.cloud/services/rest/server/containers/" +
              item["task-container-id"] +
              "/tasks/" +
              item["task-id"] +
              "/states/completed?auto-progress=true",
            isUpdate: false,
            processInstanceId: item["task-proc-inst-id"],
            deleteURL:
              this.url +
              item.containeralias +
              "/processes/instances/" +
              item["task-proc-inst-id"],
            isCreatedByMe: false,
            body: this.body,
            menuName: "MENU.REVISED_PENDING"
          }
        });
      });
    }
  }
};
</script>

<style scoped>
h2 {
  margin-left: 2%;
  margin-bottom: 2%;
}
</style>
