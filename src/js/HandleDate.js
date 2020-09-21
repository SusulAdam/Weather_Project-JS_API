class HandleDate {
    constructor(time, date) {
        this.dataTime = document.querySelector(time);
        this.dataDate = document.querySelector(date);
        this.date = new Date();
        this.init()
    }

    leadingZero(i) {
        return (i < 9) ? "0" + (i + 1) : i;
    }

    loadingNameDay(numberOfDay) {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[numberOfDay]
    }

    loadingNameOfMounth(numberOfMounth) {
        const mountNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        return mountNames[numberOfMounth]
    }

    init() {
        this.dataTime.innerText = this.leadingZero(this.date.getHours()) + '.' + this.leadingZero(this.date.getMinutes())
        this.dataDate.innerText = this.leadingZero(this.date.getHours()) + '.' + this.leadingZero(this.date.getMinutes())
        this.dataDate.innerText = this.loadingNameDay(this.date.getDay()) + ' ' + this.date.getDate() + ' ' + this.loadingNameOfMounth(this.date.getMonth()) + ' '
    }
}

let date = new HandleDate('.main-info__time', '.main-info__data')

export default date;