import ToDo from "./ToDo";

export default {
  component: ToDo,
  title: "ToDo",
};

export const Default = {};

export const WithPreviousItems = {
  args: {
    previousToDos: [
      { id: 1, text: "First Item", completed: false },
      { id: 2, text: "Second Item", completed: true },
      { id: 3, text: "Third Item", completed: false },
    ],
  },
};
