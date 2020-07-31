<template>
    <div class="container">
        <b-alert
                class="position-absolute custom-position"
                :show="$store.state.alertDismissCountDown"
                dismissible
                :variant="$store.state.alertVariant"
                @dismissed="$store.state.alertDismissCountDown=0"
        >
            <p>{{$store.state.message}}</p>
            <b-progress
                    :variant="$store.state.alertVariant"
                    :max="$store.state.alertDismissSecs"
                    :value="$store.state.alertDismissCountDown"
                    height="4px"
            ></b-progress>
        </b-alert>
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
    }
</script>

<style scoped>

</style>
