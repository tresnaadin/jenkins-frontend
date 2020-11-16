import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import home from "@/views/Home"
import history from "@/views/History"
import editProduct from "@/views/EditProduct"
import login from "@/views/Login"
import register from "@/views/Register"

const mainRouter = new VueRouter({
    routes: [
        {
            path: "/Home",
            name: "Home",
            component: home,
        },
        {
            path: "/History",
            name: "History",
            component: history,
        },
        {
            path: "/",
            name: "Login",
            component: login,
        },
        {
            path: "/Register",
            name: "Register",
            component: register,
        },
        {
            path: "/edit",
            name: "EditProduct",
            component: editProduct,
            props: route => ({ query: route.query.q })
        },
    ],
})

export default mainRouter