<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Task Title"
                    label-for="input-1"
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

            <b-form-group id="input-group-3" label="Assigned to:" label-for="input-3">
                <b-form-select
                        id="input-3"
                        v-model="form.users"
                        >
                    <b-form-select-option :value="null">Please select an option</b-form-select-option>
                    <b-form-select-option v-for="item in users" v-bind:key="item.id" v-bind:value="item.id">{{item.name}}</b-form-select-option>
                </b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import {taskService} from '../../services/task.service'

    export default {
        name: "CreateComponent",
        async beforeMount() {
            await taskService.getUsers(this.$store).then((response) => {
                this.users = response;
                this.show = true;
            })
        },
        data() {
            return {
                form: {
                    title: '',
                    description: '',
                    users: [],
                },
                show: false,
            }
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault();
                await taskService.createTask(this.form, this.$store).then((r) => {
                    this.$router.replace('/tasks')
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
