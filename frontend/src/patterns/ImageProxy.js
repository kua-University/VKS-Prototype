// Proxy Pattern - Lazy loads images from disk only when viewed
class RealImage {
    constructor(src) {
        this.src = src;
        this.loaded = false;
    }

    async load() {
        if (!this.loaded) {
            // Simulate loading from disk
            await new Promise(resolve => setTimeout(resolve, 100));
            this.loaded = true;
        }
        return this.src;
    }
}

class ImageProxy {
    constructor(src) {
        this.realImage = null;
        this.src = src;
        this.cachedUrl = null;
    }

    async getImage() {
        if (!this.realImage) {
            this.realImage = new RealImage(this.src);
        }
        if (!this.cachedUrl) {
            this.cachedUrl = await this.realImage.load();
        }
        return this.cachedUrl;
    }

    // For React component - returns placeholder while loading
    getPlaceholder() {
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3E📷%3C/text%3E%3C/svg%3E';
    }
}

export default ImageProxy;
