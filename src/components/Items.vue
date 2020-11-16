<template>
    <div class="container">
        <div class="pic">
            <img :src="images" :alt="names" />
        </div>
        <div class="desc">
            <h2 class="name" @click="goTo(names)">{{ names }}</h2>
            <p class="detail">{{ description }}</p>
            <router-link :to="{ name: 'profile' }">
                <h3 class="price">{{ price }}</h3>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "items",
    props: {
        names: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        images: {
            type: String,
            required: true,
        },
    },
    methods: {
        goTo(data) {
            this.$router.push({ path: `/profile/${data}` })
        },
    },
}
</script>

<style scoped>
img {
    max-width: 100%;
}

.pic {
    width: 400px;
}

.inp {
    width: 100%;
    display: flex;
    padding: 20px 0;
    justify-content: center;
}

.detail {
    line-height: 20px;
    font-size: 14pt;
    margin-bottom: 20px;
}

.name {
    margin-bottom: 20px;
    color: rgb(0, 153, 255);
}

.price {
    text-align: right;
    margin-right: 20px;
    color: rgb(124, 123, 123);
}

.desc {
    width: 40%;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
