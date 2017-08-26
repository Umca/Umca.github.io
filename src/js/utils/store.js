const store = {
    data:{},
    add(value, field){
        if(!this.data.field){
            this.data[field] = value;
        } else {
            this.data[field] = value;
        }
    },
    remove(field){
        if(!this.data[field]){
            console.warn('There is no such piece if data!')
        } else {
            delete this.data[field];
            console.log(`${this.data[field]} is deleted successfully!`)
        }
    }
};

export default store;