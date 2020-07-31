<template>
    <div >
        <div v-if=""></div>
        <b-navbar toggleable="lg" type="dark" variant="dark">

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav >
                    <b-nav-item :to="{name: 'home'}">Home</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="$store.state.isLoggedIn" >
                    <b-nav-item :to="{name: 'tasks'}">tasks</b-nav-item>
                    <b-nav-item :to="{name: 'tasks.create'}">create</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form @submit.prevent="search" v-if="$route.path !== '/search-result'">
                        <b-form-input size="sm" v-model="searchKey" autocomplete="off" class="mr-sm-2"
                                      placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-navbar-nav v-if="!$store.state.isLoggedIn">
                        <b-nav-item :to="{name: 'login'}">Login</b-nav-item>
                        <b-nav-item :to="{name: 'register'}">Register</b-nav-item>
                    </b-navbar-nav>
                    <b-nav-item-dropdown right v-if="$store.state.isLoggedIn">
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>{{$store.state.userDetails.name}}</em>
                        </template>
                        <b-dropdown-item v-on:click="logOut">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

</template>

<script>
    import {authService} from '../../services/auth.service'

    export default {
        name: "HeaderComponent",
        data () {
            return {
                searchKey: null,
            }
        },
        methods: {
            logOut: function () {
                this.$router.replace('/');
                authService.logOut(this.$store)
            },
            search: function() {
                this.$router.replace(`/search-result?key=${this.searchKey}`)
            }
        }
    }
</script>

<style scoped>

</style>
