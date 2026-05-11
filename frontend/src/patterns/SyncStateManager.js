// State Pattern - Manages sync states
class SyncState {
    constructor(manager) {
        this.manager = manager;
    }
    
    enter() {}
    exit() {}
    async sync() {}
}

class IdleState extends SyncState {
    async sync() {
        this.manager.setState(this.manager.syncingState);
        await this.manager.performSync();
    }
}

class SyncingState extends SyncState {
    enter() {
        this.manager.notifyObservers('syncing');
    }
    
    async sync() {
        // Already syncing
        return;
    }
    
    complete() {
        this.manager.setState(this.manager.completedState);
        setTimeout(() => {
            if (this.manager.currentState === this.manager.completedState) {
                this.manager.setState(this.manager.idleState);
            }
        }, 2000);
    }
    
    fail() {
        this.manager.setState(this.manager.failedState);
        setTimeout(() => {
            if (this.manager.currentState === this.manager.failedState) {
                this.manager.setState(this.manager.idleState);
            }
        }, 3000);
    }
}

class CompletedState extends SyncState {
    enter() {
        this.manager.notifyObservers('completed');
    }
}

class FailedState extends SyncState {
    enter() {
        this.manager.notifyObservers('failed');
    }
}

class SyncStateManager {
    constructor() {
        this.idleState = new IdleState(this);
        this.syncingState = new SyncingState(this);
        this.completedState = new CompletedState(this);
        this.failedState = new FailedState(this);
        
        this.currentState = this.idleState;
        this.observers = [];
    }
    
    setState(newState) {
        if (this.currentState) {
            this.currentState.exit();
        }
        this.currentState = newState;
        this.currentState.enter();
    }
    
    async startSync() {
        await this.currentState.sync();
    }
    
    async performSync() {
        // This will be called by SyncingState
        return { success: true };
    }
    
    completeSync() {
        if (this.currentState === this.syncingState) {
            this.currentState.complete();
        }
    }
    
    failSync() {
        if (this.currentState === this.syncingState) {
            this.currentState.fail();
        }
    }
    
    addObserver(callback) {
        this.observers.push(callback);
    }
    
    notifyObservers(state) {
        this.observers.forEach(callback => callback(state));
    }
    
    getState() {
        if (this.currentState === this.idleState) return 'IDLE';
        if (this.currentState === this.syncingState) return 'SYNCING';
        if (this.currentState === this.completedState) return 'COMPLETED';
        if (this.currentState === this.failedState) return 'FAILED';
        return 'UNKNOWN';
    }
}

export default SyncStateManager;
