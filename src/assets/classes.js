export class BookRecord {
  constructor() {
    // console.log("bookrecord")
    this.recordlist = new recordlist();
    this.bookinfo = new bookinfo();

    Object.assign(this.recordlist, DataStore);
    Object.assign(this.bookinfo, DataStore);
  }
  start() {
    // this.recordlist.start()
    // console.log("called")
    // this.recordlist =
    this.recordlist.start();
  }
  rap() {
    this.recordlist.rap(this.bookinfo.getNextName());
  }
  // reset() {
  //     this.recordlist = []
  // }
  getStats() {
    // console.log(this.recordlist)
    return new RecordStats(
      ...this.recordlist.getStats(),
      this.bookinfo.getLeft()
    );
  }
  save() {
    this.recordlist.save();
    this.bookinfo.save();

    // 密です
    if (this.recordlist.startTime) {
      localStorage.setItem("startTime", this.recordlist.startTime);
    }
  }
  load() {
    this.recordlist.load();
    this.bookinfo.load();

    // ここから全部recordlistに移すべき
    let gotTime = localStorage.getItem("startTime");
    if (gotTime) {
      console.log({ gotTime });
      this.recordlist.startTime = new Date(gotTime);
    }

    this.recordlist.reduceRight((prev, v, i, arr) => {
      const newRecord = new record(v)
        .setName(
          this.bookinfo.start + (arr.length - i - 1) * this.bookinfo.step
        )
        .setDiff(prev);
      this.recordlist.splice(i, 1, newRecord);
      return newRecord;
    }, this.recordlist.startTime);
  }
  remove() {
    this.recordlist.remove();
    this.bookinfo.remove();
    localStorage.removeItem("startTime");
  }
}

class recordlist extends Array {
  constructor() {
    super();
    this.startTime = null;
  }
  getStats() {
    const mean =
      this.reduce((acc, record) => {
        return acc + record.diff;
      }, 0) / this.length;

    const variance =
      this.reduce((acc, record) => {
        return acc + record.diff ** 2;
      }, 0) /
        this.length -
      mean ** 2;

    const std = Math.sqrt((variance * this.length) / (this.length - 1));

    return [mean, std];
  }
  rap(name) {
    const previous = this[0] || this.startTime;

    this.splice(0, 0, new record().setName(name).setDiff(previous));
  }
  start() {
    this.startTime = new Date();
  }
}

class bookinfo {
  constructor() {
    this.title = "";
    this.start = 1;
    this.end = 1;
    this.step = 1;
    this.index = 1;
  }

  setStart(index) {
    this.start = index;
    if (this.index < index) {
      this.index = index;
    }
  }

  title;
  start;
  end;
  step;
  getNextName() {
    this.index += this.step;
    return this.index - this.step;
  }

  getLeft() {
    return (this.end - this.index) / this.step;
  }
}

class record extends Date {
  constructor(...args) {
    super(...args);
    // this.name = name;
    // this.previous = previous;
    // this.diff = this.getTime() - previous.getTime();
  }
  setName(name) {
    this.name = name;
    return this;
  }
  setDiff(previous) {
    try {
      this.diff = this.getTime() - previous.getTime();
    } catch (err) {
      console.error(err, { previous });
    }
    return this;
  }
  // toJSON() {
  //   return JSON.stringify({ name: this.name, diff: this.diff });
  // }
}

export class RecordStats {
  constructor(mean, std, left) {
    this.mean = mean;
    this.std = std;
    const now = new Date();
    now.setMilliseconds(now.getMilliseconds() + this.mean * left);
    this.expectedEnd = now;
    this.expectedRange = std * left;
  }
  mean;
  std;
  expectedEnd;
}

let DataStore = {
  save() {
    localStorage.setItem(this.__proto__.constructor.name, JSON.stringify(this));
  },
  load() {
    let data = localStorage.getItem(this.__proto__.constructor.name);
    if (data?.length > 0) {
      data = JSON.parse(data);
      [...Object.keys(data)].forEach((key) => (this[key] = data[key]));
    }
  },
  remove() {
    localStorage.removeItem(this.__proto__.constructor.name);
  },
};
