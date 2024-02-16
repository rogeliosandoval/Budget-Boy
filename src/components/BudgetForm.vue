<template>
  <form v-on:submit.prevent>
    <label>Expense</label>
    <input type="expense" required v-model="tempExpense" @keyup="addExpense">
  </form>

  <div v-for="expense in expenses" :key="expense">
    <span @click="deleteExpense(expense)" class="expense">
      {{ expense }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempExpense: '',
      expenses: []
    }
  },
  methods: {
    addExpense(e) {
      if (e.key === 'Enter' && this.tempExpense) {
        this.expenses.push(this.tempExpense)
        this.tempExpense = ''
      }
    },
    deleteExpense(expense) {
      const index = this.expenses.indexOf(expense)
      if (index !== -1) {
        this.expenses.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss">
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
  width: 300px;
  height: 100%;
  background-color: whitesmoke;
  padding: 25px;
  border-radius: 10px;

  & label:first-child {
    margin: 0;
  }
}

label {
  color: #fff;
  display: inline-block;
  font-size: 0,6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  margin-top: 15px;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 3px;
  border-bottom: 1px solid #ddd;
  border: 1.5px solid transparent;
  color: #555;
  font-weight: bold;
  font-size: 18px;
  text-align: center;

  &:focus {
    outline: transparent;
    border: 1.5px solid #000;
  }
}

.expense {
  &:hover {
    cursor: pointer;
  }
}
</style>