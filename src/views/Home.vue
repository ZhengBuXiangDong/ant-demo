<template>
    <section class="home">
        <h1 class="main-title">是首页啊</h1>
        <nav class="nav">
            <router-link to="/ant" class="nav-item">1. ant的使用</router-link>
            <router-link to="/cases" class="nav-item">2. 实用案例</router-link>
        </nav>
    </section>
</template>
<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    .main-title {
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .nav {
        width: 100%;
        .nav-item {
            padding: 10px;
        }

    }
}
</style>