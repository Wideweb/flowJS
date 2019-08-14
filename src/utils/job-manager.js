export default class JobManager {
    constructor() {
        this.queue = [];
        this.running = false;

        // chunk processing time
        this.maxtime = 20;
        // delay between processes
        this.delay = 200;
    }

    static get instance() {
        if (!JobManager._instance) {
            JobManager._instance = new JobManager();
        }

        return JobManager._instance;
    }

    addJob(data, action, cycled) {
        const job = { data: data.concat(), action, cycled, initData: data };
        this.queue.push(job);
        this.run();
    }

    run() {
        if (this.running) {
            return;
        }
        this.running = true;
        this.processJobs();
    }

    processJobs() {
        this.endtime = +new Date() + this.maxtime;

        do {
            if (this.processJob(this.queue[0])) {
                const completedJob = this.queue.shift();
                completedJob.data = completedJob.initData.concat();
                this.queue.push(completedJob);
                console.log('COMPLETED');
            }
        } while (this.queue.length > 0 && this.endtime > +new Date())

        if (this.queue.length > 0) {
            setTimeout(this.processJobs.bind(this), this.delay);
        } else {
            this.running = false;
        }
    }

    processJob(job) {
        if (job.length === 0) {
            return true;
        }

        let i = 0;
        do {
            if (job.action(job.data[i], i)) {
                return true;
            }
            i++;
        } while (i < job.data.length && this.endtime > +new Date())

        if (i < job.data.length) {
            job.data.splice(0, i);
            return false;
        }

        return true;
    }

    stop() {
        this.queue = [];
        this.running = false;
    }
}