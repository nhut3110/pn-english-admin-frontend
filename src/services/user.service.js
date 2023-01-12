import api from "./api";


// Todo List function
const getList = (id) => {
    return api.get(`/todolist/findByUserID/${id}`);
};

const createList = (data) => {
    return api.post(`/todolist`, data);
};

const updateList = (id, data) => {
    return api.patch(`/todolist/${id}`, data);
};

const deleteList = (id) => {
    return api.delete(`/todolist/${id}`);
};


// Todo Function
const getTodo = (id) => {
    return api.get(`/todo/${id}`);
};

const getTodoByListID = (id) => {
    return api.get(`/todo/findByListID/${id}`);
};

const getTodoByUserID = (id) => {
    return api.get(`/todo/findByUserID/${id}`);
};

const createTodo = (data) => {
    return api.post(`/todo`, data);
};

const updateTodo = (id, data) => {
    return api.patch(`/todo/${id}`, data);
};

const deleteTodo = (id) => {
    return api.delete(`/todo/${id}`);
};

const pinTodo = (id, data) => {
    return api.patch(`/todo/pin/${id}`, data)
}

const unpinTodo = (id) => {
    return api.patch(`/todo/unpin/${id}`)
}

// User function
const getUserInfo = (id) => {
    return api.get(`/auth/info/${id}`)
}


const updateUserName = (id, data) => {
    return api.patch(`/auth/info/${id}`, data)
}

const UserService = {
    getList,
    createList,
    updateList,
    deleteList,
    getTodo,
    getTodoByListID,
    getTodoByUserID,
    createTodo,
    updateTodo,
    deleteTodo,
    pinTodo,
    unpinTodo,
    getUserInfo,
    updateUserName,
};

export default UserService;
