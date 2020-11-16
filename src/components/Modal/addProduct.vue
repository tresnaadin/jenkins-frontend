<template>
  <b-modal id="modal-add" hide-footer="true" hide-header="true">
    <form @submit="addProduct">
      <div class="box-modal-2">
        <div class="container mt-3">
          <h3>Add Item</h3>
          <div class="mt-5"></div>
          <div class="row">
            <div class="col-3">
              <h5>Name</h5>
            </div>
            <div class="col">
              <input v-model="name" class="form-control" />
            </div>
          </div>
          <div class="mt-3"></div>
          <div class="row">
            <div class="col-3">
              <h5>Image</h5>
            </div>
            <div class="col">
              <input class="form-control" v-model="image" />
            </div>
          </div>
          <div class="mt-3"></div>
          <div class="row">
            <div class="col-3">
              <h5>Price</h5>
            </div>
            <div class="col">
              <input class="form-control" v-model="price" type="number" />
            </div>
          </div>
          <div class="mt-3"></div>
          <div class="row"></div>
          <div class="form-group">
            <div class="row">
              <div class="col">
                <h5 for="exampleFormControlSelect1">Category</h5>
              </div>
              <div class="col">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="categoryId"
                >
                  <option
                    v-for="list in category"
                    v-bind:value="list.id"
                    v-bind:key="list.id"
                  >
                    {{ list.category }}
                  </option>
                </select>
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
                <button type="submit" class="btn button-add-item">Add</button>
              </div>
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
  name: "addModal",
  data: function () {
    return {
      category: [],
      name: "",
      image: "",
      price: "",
      categoryId: "",
    };
  },
  methods: {
    getCategory() {
      axios.get("http://localhost:4321/category").then((res) => {
        this.category = res.data;
        console.log(res.data);
      });
    },
    addProduct() {
      console.log(this.categoryId);
      axios
        .post(
          process.env.VUE_APP_BASE_URL + "/product",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          },
          {
            name: this.name,
            image: this.image,
            price: this.price,
            category: this.categoryId,
          }
        )
        .then((res) => {
          console.log(res.status);
          alert("Success add product");
        })
        .catch((err) => {
          console.log(err.message);
          alert("You got error!");
        });
    },
  },
  mounted() {
    this.getCategory();
  },
};
</script>

<style scoped>
.box-modal-2 h5,
.box-modal-2 h3 {
  font-family: "Barlow", sans-serif;
  font-weight: bold;
}
.button-cancel-item {
  color: #ffffff;
  background: #f24f8a;
}
.button-add-item {
  color: #ffffff;
  background: #57cad5;
}
</style>