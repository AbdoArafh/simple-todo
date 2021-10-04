const app = Vue.createApp({
  data() {
    return {
      tasks: {},
      doneList: [],
      field: "",
      index: 0,
    };
  },
  methods: {
    add(event) {
      event.preventDefault();
      if (this.field === "") return;
      this.tasks[this.index++] = this.field;
      this.field = "";
      saveTasks(this.tasks, this.index);
    },
    done(event) {
      const index = event.target.dataset.index;
      this.doneList.push(this.tasks[Number(index)]);
      delete this.tasks[Number(index)];
      saveTasks(this.tasks);
    },
    restore(event) {
      const task = event.target.dataset.task;
      const index = this.doneList.indexOf(task);
      this.doneList.splice(index, 1);
      this.tasks[this.index++] = task;
    },
  },
  beforeMount() {
    this.tasks = JSON.parse(localStorage.getItem("tasks") ?? "{}");
    let indecies = Object.keys(this.tasks);
    if (indecies.length === 0) indecies = ["0"];
    indecies = indecies.map(i => Number(i));
    this.index = Math.max(...indecies);
    this.index = this.index === 0 ? 0 : this.index + 1;
  },
});

const saveTasks = (tasks, index) => {
  save(tasks, "tasks");
  //   if (!isNaN(index)) localStorage.setItem("index", index);
};

const save = (obj, name) => {
  localStorage.setItem(name, JSON.stringify(obj));
};

app.mount("#app");
