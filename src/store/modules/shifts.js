import * as types from '../mutation-types'
import shifts from '../../api/shifts'

const state = {
  shifts: []
}

const getters = {
  allShifts: state => state.shifts,
  allSwaps: state => state.shifts.filter(shift => shift.tradeable)
}

const actions = {
  getShifts ({ commit }, company) {
    shifts.getAllShifts(company)
    .then(body => {
      if (body.error) {
        console.log(body.error)
      } else {
        const shifts = body.data
        commit(types.GET_SHIFTS, { shifts })
      }
    })
    .catch(reason => { console.log(reason) })
  },
  createShift ({ commit }, shift) {
    shifts.createShift(shift)
    .then(body => {
      if (body.error) {
        console.log(body.error)
      } else {
        const shift = body.data
        commit(types.CREATE_SHIFT, { shift })
      }
    })
    .catch(reason => { console.log(reason) })
  },
  deleteShift ({ commit }, id) {
    shifts.deleteShift(id)
    .then(body => {
      if (body.error) {
        console.log(body.error)
      } else {
        const shift = body.data
        commit(types.DELETE_SHIFT, { shift })
      }
    })
    .catch(reason => { console.log(reason) })
  }
}

const mutations = {
  [types.GET_SHIFTS] (state, { shifts }) {
    state.shifts = shifts
  },
  [types.CREATE_SHIFT] (state, { shift }) {
    state.shifts.push(shift)
  },
  [types.DELETE_SHIFT] (state, { shift }) {
    state.shifts = state.shifts.filter(current => current.id !== shift.id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
