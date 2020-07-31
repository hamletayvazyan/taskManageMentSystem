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
                        v-model="form.title"
                        type="text"
                        required
                        placeholder="Enter title"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="textarea" label="Description: " label-for="textarea">
                <b-form-textarea
                        id="textarea"
                        v-model="form.description"
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="6"
                ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import {api_point, isLoggedIn, auth_token} from "../../enviroment";

    export default {
        name: "CreateComponent",
        beforeMount() {
            axios.get(`${api_point}/users`, this.form).then((r) => {
                if (r.data) {
                    console.log(r.data);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        data() {
            return {
                form: {
                    title: 'test task ',
                    description: 'here is the description',
                },
                show: true,
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                console.log(this.form);
                axios.post(`${api_point}/tasks`, this.form).then((r) => {
                    if (r.data) {
                        console.log(r);
                    }
                }).catch((e) => {
                    console.log(e);
                });
            },
            onReset(evt) {
                evt.preventDefault();
                // Reset our form values
                this.form.title = null;
                this.form.description = null;
                // Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style scoped>

</style>
