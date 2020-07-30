<template>
    <div >
        <div v-if=""></div>
        <b-navbar toggleable="lg" type="dark" variant="dark">

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav >
                    <b-nav-item :to="{name: 'home'}">Home</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="auth_token" >
                    <b-nav-item :to="{name: 'tasks'}">tasks</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-navbar-nav v-if="!auth_token">
                        <b-nav-item :to="{name: 'login'}">Login</b-nav-item>
                        <b-nav-item :to="{name: 'register'}">Register</b-nav-item>
                    </b-navbar-nav>
                    <b-nav-item-dropdown right v-if="auth_token">
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item v-on:click="logOut">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

</template>

<script>
    import {auth_token, api_point, isLoggedIn} from "../../enviroment";

    export default {
        name: "HeaderComponent",
        data() {
            return {
                auth_token: auth_token,
                isLoggedIn: isLoggedIn,
            }
        },
        methods: {
            logOut: function () {
                axios.post(`${api_point}/logout`, auth_token)
                    .then((r) => {
                        if (r.data.success) {
                            console.log(r.data);
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            this.isLoggedIn = false;
                            this.auth_token = null;
                            // this.$router.push('/login');
                        }
                    }).catch((e) => {
                    console.log(e);
                })
            }
        }
    }
</script>

<style scoped>

</style>
