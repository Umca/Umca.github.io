const store = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    extract(key) {
        return JSON.parse(localStorage.getItem(key))
    }
};

window.store = store;

export default store;