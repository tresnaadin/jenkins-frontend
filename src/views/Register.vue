<template>
  <div class="login text-center">
    <form class="form-signin" @submit="loginUser">
      <img
        class="mb-4"
        src="@/icons/food-and-restaurant.png"
        alt=""
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <label for="inputEmail" class="sr-only">Username</label>
      <input
        type="text"
        v-model="username"
        class="form-control"
        placeholder="Username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        v-model="password"
        class="form-control"
        placeholder="Password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign up
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      axios
        .post(process.env.VUE_APP_BASE_URL + "/users", {
          username: this.username,
          password: this.password,
          role: "2",
        })
        .then((res) => {
          if (res.data.status == true) {
            alert("Register successfully.");
            this.$router.push({ name: "Login" });
          } else {
            alert("Failed to register.");
          }
        });
    },
  },
};
</script>

<style scoped>
.login {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>