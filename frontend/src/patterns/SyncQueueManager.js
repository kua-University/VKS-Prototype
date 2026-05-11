// Command Pattern - Encapsulates sync requests for retry/rollback
class SyncCommand {
    constructor(type, data, id) {
        this.id = id || Date.now();
        this.type = type; // 'problem', 'answer', 'upvote'
        this.data = data;
        this.timestamp = Date.now();
        this.retryCount = 0;
        this.status = 'pending'; // pending, processing, completed, failed
    }
}

class SyncQueueManager {
    constructor() {
        this.queue = [];
        this.maxRetries = 3;
        this.retryDelay = 5000; // 5 seconds
        this.loadQueue();
    }

    loadQueue() {
        const saved = localStorage.getItem('syncCommandQueue');
        if (saved) {
            this.queue = JSON.parse(saved);
        }
    }

    saveQueue() {
        localStorage.setItem('syncCommandQueue', JSON.stringify(this.queue));
    }

    addCommand(type, data) {
        const command = new SyncCommand(type, data);
        this.queue.push(command);
        this.saveQueue();
        return command;
    }

    async executeCommand(command, apiCall) {
        if (command.status === 'completed') return { success: true };
        
        command.status = 'processing';
        this.saveQueue();
        
        try {
            const result = await apiCall(command.data);
            command.status = 'completed';
            this.saveQueue();
            return { success: true, result };
        } catch (error) {
            command.retryCount++;
            if (command.retryCount >= this.maxRetries) {
                command.status = 'failed';
                this.saveQueue();
                return { success: false, error };
            } else {
                command.status = 'pending';
                this.saveQueue();
                // Schedule retry
                setTimeout(() => this.retryCommand(command, apiCall), this.retryDelay);
                return { success: false, retrying: true };
            }
        }
    }

    async retryCommand(command, apiCall) {
        return this.executeCommand(command, apiCall);
    }

    getPendingCommands() {
        return this.queue.filter(c => c.status === 'pending');
    }

    getFailedCommands() {
        return this.queue.filter(c => c.status === 'failed');
    }

    clearCompleted() {
        this.queue = this.queue.filter(c => c.status !== 'completed');
        this.saveQueue();
    }
}

export default SyncQueueManager;
