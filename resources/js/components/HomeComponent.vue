<template>
    <div>
        <h2>all tasks</h2>

        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Created By</th>
                <th>Assigned to</th>
                <th>Status</th>
                <th v-if="$store.state.isLoggedIn">action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(task, index) in tasks" v-bind:key="task.id">
                <td>
                    {{index+1}}
                </td>
                <td>
                    <router-link  v-if="$store.state.isLoggedIn && task.created_by.id === $store.state.userDetails.id"
                            :to="{name: 'tasks.edit', params: { id: task.id }}">{{task.title}}</router-link>

                    <router-link  v-else
                            :to="{name: 'tasks.show', params: { id: task.id }}">{{task.title}}</router-link>
                </td>
                <td>{{task.created_by.name}}</td>
                <td>{{task.assigned.name}}</td>
                <td>
                    <b-form-select v-if="$store.state.isLoggedIn"
                                   class="w-auto"
                                   @change="changeStatus(task.id, task.status)"
                                   v-model="task.status" :options="statuses">

                    </b-form-select>
                    <span v-else>
                            {{task.status}}
                        </span>
                </td>
                <td v-if="$store.state.isLoggedIn">
                    <b-button v-if="task.created_by.id === $store.state.userDetails.id"
                              :to="{name: 'tasks.edit', params: { id: task.id }}">Edit
                    </b-button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {taskService} from '../services/task.service'

    export default {
        name: "HomeComponent",
        data() {
            return {
                tasks: [],
                show: false,
                statuses: ['new', 'pending', 'completed']
            }
        },
        async mounted() {
            if (this.$store.state.isLoggedIn) {
                this.$store.commit('userDetails')
            }
            await taskService.allTasks(this.$store).then((resp) => {
                this.tasks = resp;
            })
        },
        methods: {
            changeStatus(id, value) {
                taskService.changeStatus(id, {status: value}, this.$store).then()
            }
        }
    }
</script>
