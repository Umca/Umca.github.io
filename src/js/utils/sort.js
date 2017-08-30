import moment from 'moment';



const sorting = {

    sort(arr, proper, type, order) {
        let sorted;
        switch (order) {
            case 'asc':
                sorted = this.sortAsc(arr, proper, type);
                break;
            default:
                sorted = this.sortDesc(arr, proper, type);
                break;
        }

        return sorted;
    },

    sortAsc(arr, proper, type) {
        if (type == 'number') {
            return arr.sort((a, b) => {
                return a[proper] - b[proper]
            })
        } else if (type == 'string') {
            return arr.sort(function (a, b) {
                return a[proper].localeCompare(b[proper]);
            })
        } else {
            return arr.sort((a, b) => {
                return moment(a[proper]) - moment(b[proper])
            })
        }
    },

    sortDesc(arr, proper, type) {
        if (type == 'number') {
            return arr.sort((a, b) => {
                return b[proper] - a[proper]
            })
        } else if (type == 'string') {
            return arr.sort(function (a, b) {
                return b[proper].localeCompare(a[proper]);
            })
        } else {
            return arr.sort((a, b) => {
                return moment(b[proper]) - moment(a[proper])
            })
        }
    }
}

export default sorting;