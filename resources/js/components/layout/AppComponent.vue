<template>
    <div class="container">
        <header-component/>
        <router-view/>
        <footer-component/>
    </div>
</template>

<script>
    import FooterComponent from "./FooterComponent";
    import HeaderComponent from "./HeaderComponent";
    export default {
        name: "AppComponent",
        components: {FooterComponent, HeaderComponent},
        mounted() {
            console.log('asd');
        }
    }
</script>

<style scoped>

</style>
