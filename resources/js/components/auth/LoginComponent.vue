<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Password: " label-for="input-3">
                <b-form-input
                    id="input-3"
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import {api_point, isLoggedIn, auth_token} from "../../enviroment";

    export default {
        name: "LoginComponent",
        data() {
            return {
                form: {
                    email: 'qwerty@em.co',
                    password: 'asd',
                },
                show: true,
                isLoggedIn: isLoggedIn,
                auth_token: auth_token,
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                console.log(JSON.stringify(this.form));
                axios.post(`${api_point}/login`, this.form).then((r) => {
                    if (r.data.success){
                        localStorage.setItem('token', r.data.token);
                        localStorage.setItem('user', JSON.stringify(r.data.user));
                        this.isLoggedIn = true;
                        this.auth_token = localStorage.getItem('token');
                    }
                }).catch((e) => {
                    console.log(e);
                })
            },
            onReset(evt) {
                evt.preventDefault();
                // Reset our form values
                this.form.email = null;
                this.form.password = null;
                // Trick to reset/clear native browser form validation state
                // this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style scoped>

</style>
