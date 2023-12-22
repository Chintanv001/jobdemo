export const addTodoOffline = (content) => ({
    type: "ADD_TODO",
    payload: {
      content,
    },
    meta: {
      offline: {
        effect: {
          url: "http://192.168.0.202:8000/add",
          method: "POST",
          body: { todo: content },
          // headers: { "content-type": "application/json" },
        },
  
        commit: { type: "ADD_TODO", meta: { content } },
        rollback: { type: "ADD_TODO_ROLLBACK", meta: { content } },
      },
    },
  });