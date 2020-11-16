<template>
  <b-modal id="modal-delete-product" hide-footer="true" hide-header="true">
    <form @submit="deleteProduct">
      <div class="box-modal">
        <div class="container mt-3">
          <h3>Delete Product</h3>
          <div class="mt-5"></div>
          <div class="form-group">
            <div class="row">
              <div class="col">
                <h5 for="exampleFormControlSelect1">Name</h5>
              </div>
              <div class="col">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="productId"
                >
                  <option
                    v-for="list in listProduct"
                    v-bind:value="list.id"
                    v-bind:key="list.id"
                  >
                    {{ list.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-5"></div>
          <div class="row justify-content-end">
            <div class="col-2">
              <button type="button" class="btn button-cancel-item">
                Cancel
              </button>
            </div>
            <div class="col-2">
              <button type="submit" class="btn button-add-item">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script>
import axios from "axios";
export default {
  name: "deleteProduct",
  data: function () {
    return {
      listProduct: [],
      productId: "",
    };
  },
  methods: {
    getProduct() {
      axios
        .get(process.env.VUE_APP_BASE_URL + "/product", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.listProduct = res.data;
        });
    },
    deleteProduct() {
      axios
        .delete(
          process.env.VUE_APP_BASE_URL + "/product/delete/" + this.productId,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.status);
          alert("Success delete product");
        })
        .catch((err) => {
          console.log(err.message);
          alert("You got error!");
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
.button-cancel-item {
  color: #ffffff;
  background: #f24f8a;
}
.button-add-item {
  color: #ffffff;
  background: #57cad5;
}
.box-modal h5,
.box-modal h3 {
  font-family: "Barlow", sans-serif;
  font-weight: bold;
}
</style>