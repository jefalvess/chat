import moment from 'moment'
export default (value) => {
    if (value) {
        return moment(value).format('MMM Do YYYY HH:mm')
    }
} 