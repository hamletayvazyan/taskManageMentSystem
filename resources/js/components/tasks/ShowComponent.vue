<template>
    <div>
        <b-card v-bind:title="title">
            <hr>
            <b-card-text>
               {{description}}
            </b-card-text>
            <hr>
            <b-card-text>{{users}}</b-card-text>

        </b-card>
    </div>
</template>

<script>
    import {taskService} from '../../services/task.service'
    export default {
        name: "ShowComponent",
        data() {
            return {
                id: null,
                title: '',
                description: '',
                users: '',
            }
        },
        async beforeMount() {
            await taskService.getTask(this.$route.params.id, this.$store).then((resp) => {
                this.id = resp.id;
                this.title = resp.title;
                this.description = resp.description;
                this.users = resp.assigned_special[0] ? resp.assigned_special[0].name : null;
            })
        },
        methods: {
            changeStatus(evt) {
                evt.preventDefault();
                taskService.updateTask(this.id, this.form, this.$store).then((r) => {
                    this.$router.replace('/tasks')
                });
            },
        }
    }
</script>

<style scoped>

</style>
