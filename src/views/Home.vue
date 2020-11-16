<template>
  <div id="app">
    <div class="header">
      <div class="nav-left">
        <div class="container">
          <div class="mt-4"></div>
          <div class="row">
            <div class="col-1">
              <img src="@/icons/burger-menu.png" alt="burger-menu" />
            </div>
            <div class="col-10 text-center">
              <h1 class="title">Food Items</h1>
            </div>
            <div class="col-1">
              <img
                @click="searchFormsToggle"
                class="search-menu"
                src="@/icons/magnifying-glass.png"
                alt
              />
            </div>
          </div>
        </div>
      </div>
      <div class="nav-right">
        <div class="header-right">
          <h1 class="cart-text">Cart</h1>
          <div class="box-cart">{{ cart.data.length }}</div>
        </div>
      </div>
    </div>
    <article>
      <aside class="container-fluid">
        <div class="row">
          <div class="col-1 main-navigation">
            <router-link to="/">
              <img
                class="fork-icon"
                click
                src="@/icons/fork.png"
                alt="Clipboard Menu"
              />
            </router-link>
            <router-link to="/history">
              <img
                class="fork-icon"
                click
                src="@/icons/clipboard.png"
                alt="Clipboard Menu"
              />
            </router-link>
            <button class="btn mt-4" v-b-modal.modal-add>
              <img class="fork-icon-2" src="@/icons/add.png" alt />
            </button>
            <button class="btn mt-3" v-b-modal.modal-delete-product>
              <img class="fork-icon-2" src="@/icons/delete.png" alt />
            </button>
          </div>
          <div class="col-fluid-7">
            <div v-if="searchForms == true">
              <div class="container">
                <div class="row">
                  <div class="col-3">
                    <b-dropdown
                      id="dropdown-1"
                      text="Filter Product"
                      class="m-md-2"
                    >
                      <b-dropdown-item @click="filterProduct('alphabetical')"
                        >Alphabetical</b-dropdown-item
                      >
                      <b-dropdown-item @click="filterProduct('price')"
                        >Price</b-dropdown-item
                      >
                      <b-dropdown-item @click="filterProduct('food')"
                        >Food Menu</b-dropdown-item
                      >
                      <b-dropdown-item @click="filterProduct('drink')"
                        >Drink Menu</b-dropdown-item
                      >
                      <b-dropdown-item @click="filterProduct('latest')"
                        >Latest Menu</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                  <div class="col mt-2">
                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <form @submit="searchProduct">
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Search"
                              aria-label="Search"
                              v-model="search"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="listProduct.length > 0">
              <div class="food-menu">
                <!-- <div v-for="item in listProduct" :key="item.id"> -->
                <div
                  class="menu"
                  :value="item.id"
                  v-for="item in listProduct"
                  :key="item.id"
                >
                  <img
                    @click="updateCart(item.id)"
                    :src="item.image"
                    v-bind:alt="item.name"
                  />
                  <router-link :to="{ path: 'edit', query: { id: item.id } }">
                    <h3 class="font-menu">{{ item.name }}</h3>
                  </router-link>
                  <p>
                    {{
                      new Intl.NumberFormat("id-ID", {
                        maximumSignificantDigits: 3,
                      }).format(item.price)
                    }}
                  </p>
                </div>
                <!-- </div> -->
              </div>
            </div>
            <div v-else>
              <div class="food-menu">
                <h1>Product not found.</h1>
              </div>
            </div>
          </div>
          <div class="col-fluid-4">
            <aside class="cart">
              <div v-if="cart.data.length == 0">
                <img
                  class="no-order"
                  src="@/icons/food-and-restaurant.png"
                  alt
                />
                <h1 class="text-empty">Your cart is empty</h1>
                <h1 class="text-add-order">
                  Please add some items from the menu
                </h1>
              </div>
              <div v-else>
                <div class="row" v-for="shop in cart.data" :key="shop.id">
                  <div class="col-2 mt-2 ml-2">
                    <img class="checkout-img" :src="shop.image" alt />
                  </div>
                  <div class="col ml-3 mt-2">
                    <h3 class="title-menu">{{ shop.name }}</h3>
                    <div class="flex-checkout ml-3">
                      <div class="del-items-order">-</div>
                      <div class="box-count">1</div>
                      <div class="del-items-order">+</div>
                      <h4 class="price">
                        Rp
                        {{
                          new Intl.NumberFormat("id-ID", {
                            maximumSignificantDigits: 3,
                          }).format(shop.price)
                        }}
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="space"></div>
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <h4 class="total-price-text">Total:</h4>
                      <h6>*Belum termasuk ppn</h6>
                    </div>
                    <div class="col">
                      <h4 class="total-price-text ml-5">
                        Rp
                        {{
                          new Intl.NumberFormat("id-ID", {
                            maximumSignificantDigits: 3,
                          }).format(cart.price)
                        }}
                      </h4>
                    </div>
                  </div>
                </div>
                <button
                  class="btn btn-checkout"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Checkout
                </button>
                <button class="btn btn-cancel">Cancel</button>
              </div>
            </aside>
          </div>
        </div>
      </aside>
    </article>
    <addProductModal />
    <addCategoryModal />
    <deleteProductModal />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import Product from "@/components/Product/Product";
import addProductModal from "@/components/Modal/addProduct";
import addCategoryModal from "@/components/Modal/addCategory";
import deleteProductModal from "@/components/Modal/deleteProduct";
import axios from "axios";
export default {
  name: "App",
  data: function () {
    return {
      listProduct: [],
      cart: {
        data: [],
        price: 0,
      },
      search: "",
      searchForms: false,
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
        })
        .catch((err) => {
          console.log(err);
          this.listProduct = [];
        });
    },
    filterProduct(category) {
      let url;
      if (category == "alphabetical") {
        url = "/product/filter?type=alphabetical&order=asc";
      } else if (category == "price") {
        url = "/product/filter?type=price&order=asc";
      } else if (category == "food") {
        url = "/product/filter?type=category&order=food";
      } else if (category == "drink") {
        url = "/product/filter?type=category&order=drink";
      } else if (category == "latest") {
        url = "/product/filter?type=latest";
      }
      axios
        .get(process.env.VUE_APP_BASE_URL + url, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("from filter ");
          console.log(res);
          this.listProduct = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.listProduct = [];
        });
    },
    searchProduct() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/product/search?name=${this.search}&sensitive=true`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log("from search ");
          console.log(res);
          this.listProduct = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.listProduct = [];
        });
    },
    searchFormsToggle() {
      if (this.searchForms == true) {
        this.searchForms = false;
      } else {
        this.searchForms = true;
      }
    },
    updateCart(id) {
      let data = this.listProduct.find((product) => product.id == id);
      console.log(data);
      this.cart.data.push(data);
      this.cart.price = this.cart.price + Number(data.price);
    },
  },
  watch: {
    listProduct: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler() {
        console.log("The list of product has changed!");
      },
    },
  },
  mounted() {
    this.getProduct();
  },
  components: {
    // Product,
    addProductModal,
    addCategoryModal,
    deleteProductModal,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@300&display=swap");
h1 {
  font-size: 2rem;
}
.header {
  display: flex;
}
.nav-left {
  width: 1002px;
  height: 100px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  background-color: #ffff;
}
.nav-right {
  width: 491px;
  height: 100px;
  background-color: #ffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
}
.title {
  font-family: "Barlow", sans-serif;
}
.header-right {
  display: flex;
}
.cart-text {
  margin-top: 30px;
  margin-left: 240px;
  font-family: "Barlow", sans-serif;
}
.box-cart {
  margin-top: 40px;
  margin-left: 5px;
  padding-top: 2px;
  width: 25px;
  height: 25px;
  font-family: "Barlow", sans-serif;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  background: #57cad5;
  color: white;
}
.main-navigation {
  width: 109px;
  height: 938px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.fork-icon {
  margin-top: 32.48px;
  margin-left: 17px;
}
.menu p {
  margin: 0;
  font-weight: bold;
  font-family: "Barlow", sans-serif;
  color: #000000;
  font-size: 25px;
  line-height: 33px;
}
.cart {
  width: 443px;
}
.no-order {
  margin-top: 173px;
  margin-left: 143px;
}
.text-empty {
  position: absolute;
  top: 430px;
  font-family: "Barlow", sans-serif;
  font-size: 30px;
  line-height: 39px;
  margin-left: 130px;
}
.text-add-order {
  font-family: "Barlow", sans-serif;
  font-size: 20px;
  line-height: 26px;
  color: #cecece;
  margin-left: 80px;
}
.checkout-img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}
.box-items {
  width: 45px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #82de3a;
  box-sizing: border-box;
}
.checkout-item {
  display: flex;
  margin-top: 50px;
  margin-left: 30px;
}
.price {
  font-family: "Barlow", sans-serif;
  font-size: 20px;
  line-height: 26px;
  color: #000000;
  margin-top: 15px;
  margin-left: 90px;
  font-weight: bold;
}
.title-menu {
  margin-left: 10px;
  font-family: "Barlow", sans-serif;
  font-size: 25px;
  line-height: 33px;
  color: #000000;
}
.flex-checkout {
  display: flex;
}
.add-items-order {
  background: rgba(130, 222, 58, 0.2);
  border: 1px solid #82de3a;
  box-sizing: border-box;
  width: 40px;
  text-align: center;
  font-size: 30px;
  height: 40px;
  color: #82de3a;
}
.del-items-order {
  background: rgba(130, 222, 58, 0.2);
  border: 1px solid #82de3a;
  box-sizing: border-box;
  width: 40px;
  text-align: center;
  font-size: 30px;
  height: 40px;
  color: #82de3a;
}
.box-count {
  background: #ffffff;
  border: 1px solid #82de3a;
  box-sizing: border-box;
  width: 45px;
  height: 40px;
  padding-top: 6px;
  text-align: center;
  color: #82de3a;
}

.space {
  top: 400px;
}
.total-price-text {
  margin-top: 100px;
  font-family: "Barlow", sans-serif;
  font-size: 24px;
  line-height: 31px;
  color: #000000;
  font-weight: bold;
}
.btn-checkout {
  font-size: 25px;
  line-height: 33px;
  margin-left: 20px;
  width: 401px;
  height: 61px;
  color: #ffffff;
  background: #57cad5;
}
.btn-cancel {
  margin-top: 10px;
  font-size: 25px;
  line-height: 33px;
  margin-left: 20px;
  width: 401px;
  height: 61px;
  color: #ffffff;
  background: #f24f8a;
}
.food-menu {
  display: flex;
  width: 793px;
  height: 940px;
  flex-wrap: wrap;
  background: rgba(190, 195, 202, 0.3);
}
.menu {
  margin-top: 5px;
  margin-left: 8px;
  width: 251px;
  height: 267px;
}
.font-menu {
  margin: 0;
  font-family: "Barlow", sans-serif;
  color: #000000;
  font-size: 25px;
  line-height: 33px;
}
</style>
