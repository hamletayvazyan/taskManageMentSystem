<template>
    <div>
        <h2>my tasks</h2>
        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Assigned to</th>
                <th>Status</th>
                <th>action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(task, index) in tasks" v-bind:key="task.id">
                <td>
                    {{index+1}}
                </td>
                <td>
                    <router-link  :to="{name: 'tasks.show', params: { id: task.id }}">{{task.title}}</router-link>
                </td>
                <td>{{task.assigned.name}}</td>
                <td>
                    <b-form-select
                                   class="w-auto"
                                   @change="changeStatus(task.id, task.status)"
                                   v-model="task.status" :options="statuses">

                    </b-form-select>
                </td>
                <td>
                    <b-button v-if="task.created_by.id === $store.state.userDetails.id"
                              :to="{name: 'tasks.edit', params: { id: task.id }}">Edit
                    </b-button>
                </td>
            </tr>
            </tbody>
        </table>

        <h2>assigned to me tasks</h2>
        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Created By</th>
                <th>Assigned to</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(assignTask, index) in assigned" v-bind:key="assignTask.id">
                <td>
                    {{index+1}}
                </td>
                <td>
                    <router-link  :to="{name: 'tasks.show', params: { id: assignTask.id }}">{{assignTask.title}}</router-link>
                </td>
                <td>{{assignTask.created_by.name}}</td>
                <td>{{assignTask.assigned.name}}</td>
                <td>
                    <b-form-select
                            class="w-auto"
                            @change="changeStatus(assignTask.id, assignTask.status)"
                            v-model="assignTask.status" :options="statuses">
                    </b-form-select>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {taskService} from '../../services/task.service'

    export default {
        name: "IndexComponent",
        data() {
            return {
                tasks: [],
                assigned: [],
                show: false,
                statuses: ['new', 'pending', 'completed']
            }
        },
        async mounted() {
            await taskService.userTasks(this.$store).then((resp) => {
                this.tasks = resp.tasks;
                this.assigned = resp.assigned;
            })
        },
        methods: {
            changeStatus(id, value) {
                taskService.changeStatus(id, {status: value}, this.$store).then()
            }
        }
    }
</script>

<style scoped>

</style>
