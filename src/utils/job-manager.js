export default class JobManager {
    constructor() {
        this.queue = [];
        this.running = false;

        // chunk processing time
        this.maxtime = 10;
        // delay between processes
        this.delay = 100;
    }

    static get instance() {
        if (!JobManager._instance) {
            JobManager._instance = new JobManager();
        }

        return JobManager._instance;
    }

    addJob(data, action, cycled) {
        const job = { data: data, action, cycled, index: 0 };
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
                if (completedJob.cycled()) {
                    completedJob.index = 0;
                    this.queue.push(completedJob);
                }
            }
        } while (this.queue.length > 0 && this.endtime > +new Date())

        if (this.queue.length > 0) {
            setTimeout(this.processJobs.bind(this), this.delay);
        } else {
            this.running = false;
        }
    }

    processJob(job) {
        if (job.length === 0 || job.index >= job.data.length) {
            return true;
        }

        do {
            if (job.action(job.data[job.index], job.index)) {
                return true;
            }
            job.index++;
        } while (job.index < job.data.length && this.endtime > +new Date())

        if (job.index < job.data.length) {
            return false;
        }

        return true;
    }

    stop() {
        this.queue = [];
        this.running = false;
    }
}