<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs6 offset-sm3>
        <form class="white">
          <v-layout row wrap>
            <v-flex xs4 offset-sm1>
              <v-dialog persistent v-model="modal1" lazy>
                <v-text-field light slot="activator" label="Start" v-model="start" prepend-icon="access_time" readonly v-validate="'required'"></v-text-field>
                <v-time-picker v-model="start" actions>
                  <template scope="{ save, cancel }">
                    <v-card-actions>
                      <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                      <v-btn flat primary @click.native="save()">Save</v-btn>
                    </v-card-actions>
                  </template>
                </v-time-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs4 offset-sm1>
              <v-dialog persistent v-model="modal2" lazy>
                <v-text-field light slot="activator" label="End" v-model="end" prepend-icon="access_time" readonly v-validate="'required'"></v-text-field>
                <v-time-picker light v-model="end" actions>
                  <template scope="{ save, cancel }">
                    <v-card-actions>
                      <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                      <v-btn flat primary @click.native="save()">Save</v-btn>
                    </v-card-actions>
                  </template>
                </v-time-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs10 offset-sm1>
              <v-text-field light label="Employee" v-model="employee" v-validate="'required'"></v-text-field>
            </v-flex>
            <v-flex xs10 offset-sm1>
              <v-text-field light label="Role" v-model="role" v-validate="'required'"></v-text-field>
            </v-flex>
            <v-flex xs10 offset-sm1>
              <v-select light label="Day" v-model="day" :items="days" v-validate="'required'"></v-select>
            </v-flex>
            <v-btn class="primary" @click="submit">submit</v-btn>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { mapGetters } from 'vuex'

Vue.use(VeeValidate)

export default {
  data () {
    return {
      start: '',
      end: '',
      employee: '',
      role: '',
      day: '',
      modal1: false,
      modal2: false,
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
    }
  },
  computed: mapGetters({
    user: 'loggedInUser'
  }),
  methods: {
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            const shift = {
              start_time: this.$data.start,
              end_time: this.$data.end,
              employee: this.$data.employee,
              role: this.$data.role,
              day: this.$data.day,
              company: this.user.company
            }
            console.log(shift)
            this.$store.dispatch('createShift', shift)
          }
        })
    }
  }
}
</script>

