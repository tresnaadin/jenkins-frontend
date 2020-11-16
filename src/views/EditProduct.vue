<template>
  <div class="width-box">
    <form @submit="editProduct">
      <h3 class="text-center">Edit Product</h3>
      <div class="form-group">
        <label for="exampleInputEmail1">Id</label>
        <input
          type="number"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          :value="ambilUrl"
          disabled
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Name</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          v-model="editableData[0].name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Image</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          v-model="editableData[0].image"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Price</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          v-model="editableData[0].price"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Category</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          v-model="editableData[0].category"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "editProduct",
  data: function () {
    return {
      editableData: [],
      ambilUrl: this.$route.query.id,
    };
  },
  methods: {
    getDetails() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/product/details/${this.ambilUrl}`)
        .then((res) => {
          this.editableData = res.data;
          console.log(res.data);
        });
    },
    editProduct() {
      axios
        .put(process.env.VUE_APP_BASE_URL + "/product", {
          id: this.ambilUrl,
          name: this.editableData[0].name,
          image: this.editableData[0].image,
          price: this.editableData[0].price,
          category: this.editableData[0].category,
        })
        .then((res) => {
          console.log(res);
          alert("Success edit product");
          this.$router.push({ name: "Home" });
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getDetails();
  },
};
</script>

<style scoped>
.width-box {
  width: 500px;
  margin: auto;
}
</style>