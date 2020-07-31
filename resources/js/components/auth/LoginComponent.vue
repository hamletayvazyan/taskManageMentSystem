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
    import {authService} from '../../services/auth.service'

    export default {
        name: "LoginComponent",
        mounted() {
            this.$store.commit('checkFortToken')
        },
        data() {
            return {
                form: {
                    email: 'qwerty@em.co',
                    password: 'asd',
                },
                show: true
            }
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault();
                await authService.login(this.form, this.$store).then(() => {
                    this.$router.replace('/')
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
