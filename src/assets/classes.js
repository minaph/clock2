export class BookRecord {
    constructor() {
        // console.log("bookrecord")
        this.recordlist = new recordlist()
        this.bookinfo = new bookinfo()
    }
    start() {
        // this.recordlist.start()
        // console.log("called")
        // this.recordlist = 
        this.recordlist.start()
    }
    rap() {
        this.recordlist.rap(this.bookinfo.getNextName())
    }
    // reset() {
    //     this.recordlist = []
    // }
    getStats() {
        // console.log(this.recordlist)
        return new RecordStats(...this.recordlist.getStats(), this.bookinfo.getLeft())
    }
}

class recordlist extends Array {
    constructor() {
        super();
    }
    getStats() {
        const mean = this.reduce((acc, record) => {
            return acc + record.diff
        }, 0) / this.length


        const variance = this.reduce((acc, record) => {
            return acc + record.diff ** 2
        }, 0) / this.length - mean ** 2

        const std = Math.sqrt(variance)

        return [mean, std]
    }
    rap(name) {
        const previous = this[0] || this.startTime;

        this.splice(0, 0, new record(name, previous))
    }
    start() {
        this.startTime = new Date()

    }

}

class bookinfo {
    constructor() {
        this.title = ""
        this.start = 0
        this.end = 0
        this.step = 1
        this.index = 0
    }

    setStart(index) {
        this.start = index
        if (this.index < index) {
            this.index = index
        }
    }

    title
    start
    end
    step
    getNextName() {
        this.index += this.step
        return this.index
    }

    getLeft() {
        return (this.end - this.index) / this.step
    }
}

class record extends Date {
    constructor(name, previous) {
        super();
        this.name = name;
        this.diff = this.getTime() - previous.getTime();
    }
}

export class RecordStats {
    constructor(mean, std, left) {
        this.mean = mean;
        this.std = std;
        const now = new Date();
        now.setMilliseconds(now.getMilliseconds() + this.mean * left)
        this.expectedEnd = now

    }
    mean
    std
    expectedEnd
}