1、vue的子组件传递给父组件是通过事件传递

首先在子组件中写上this.$emit('increase', {name: 'dfvbv'})表示子组件主动触发父组件的increase事件并传递{name: 'dfvbv'}给父组件
然后在父组件中监听子组件的事件<child @increase="increase"></child>即可


