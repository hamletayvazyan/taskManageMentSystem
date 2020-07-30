<template>
    <div>
        this is tasks page
    </div>
</template>

<script>
    import {auth_token} from "../../enviroment";

    export default {
        name: "IndexComponent",
        mounted() {
            console.log('this is auth token log',auth_token);
        }
    }
</script>

<style scoped>

</style>
