<template>
    <div>


            <form @submit.prevent="search" class="input-group my-md-5 my-3">
                <input type="text" class="form-control" v-model="searchKey" autocomplete="off"  placeholder="Search...">
                <div class="input-group-append">
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </div>
            </form>
        <table class="table" v-if="show">
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
                <td>{{task.assigned_special.name}}</td>
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
        <div v-else class="text-center mt-2">
            empty
        </div>
    </div>
</template>

<script>
    import {taskService} from '../../services/task.service'
    export default {
        name: "SearchComponent",
        async mounted() {
            await taskService.search({key: this.$route.query.key},this.$store).then((resp) => {
                this.tasks = resp;
                this.show =true;
            })
        },
        methods: {
            search: function() {
                this.$route.query.key = this.searchKey;
                taskService.search({key: this.searchKey}, this.$store).then((resp) => {
                    this.tasks = resp;
                    this.show =true;
                })
            },
            changeStatus(id, value) {
                taskService.changeStatus(id, {status: value}, this.$store).then()
            }
        },
        data() {
            return {
                searchKey: null,
                tasks: [],
                show: false,
                statuses: ['new', 'pending', 'completed']
            }
        },
    }
</script>

<style scoped>

</style>
