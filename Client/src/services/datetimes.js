import moment from 'moment';

class DateTimesService {

    formatDate(string){
    

        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return moment(new Date(string)).format("DD/MM/YYYY HH:mm")


    }
}

export default new DateTimesService();