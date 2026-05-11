// Factory Pattern - Creates voice vs image compressors dynamically
class VoiceCompressor {
    constructor() {
        this.targetBitrate = 16000; // 16kbps
        this.format = 'audio/webm';
    }

    async compress(blob) {
        // Simulate compression (120KB per minute target)
        const duration = blob.size / 16000; // Approximate duration
        const targetSize = Math.min(blob.size, duration * 120); // 120KB per minute
        return {
            originalSize: blob.size,
            compressedSize: targetSize,
            ratio: ((targetSize / blob.size) * 100).toFixed(1),
            blob: blob
        };
    }
}

class ImageCompressor {
    constructor() {
        this.targetSizeKB = 50;
        this.maxWidth = 640;
        this.maxHeight = 480;
    }

    async compress(blob) {
        // Simulate compression (50KB target)
        const targetSize = Math.min(blob.size, this.targetSizeKB * 1024);
        return {
            originalSize: blob.size,
            compressedSize: targetSize,
            ratio: ((targetSize / blob.size) * 100).toFixed(1),
            blob: blob
        };
    }
}

class MediaCompressorFactory {
    static getCompressor(type) {
        switch(type) {
            case 'voice':
                return new VoiceCompressor();
            case 'image':
                return new ImageCompressor();
            default:
                throw new Error(`Unknown media type: ${type}`);
        }
    }
}

export default MediaCompressorFactory;
