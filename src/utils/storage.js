export class Storage {
    async init() {
        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            // 浏览器环境
            this.storage = window.localStorage;
        } else {
            // Node.js 环境
            const { LocalStorage } = await import('node-localstorage');
            this.storage = new LocalStorage('./.cache'); // 存储位置
        }
    }

    /**
     * 设置存储项
     * @param {string} key 键
     * @param {string} value 值
     */
    setItem(key, value) {
        this.storage.setItem(key, value);
    }

    /**
     * 获取存储项
     * @param {string} key 键
     * @returns {string|null} 值
     */
    getItem(key) {
        return this.storage.getItem(key);
    }

    /**
     * 移除存储项
     * @param {string} key 键
     */
    removeItem(key) {
        this.storage.removeItem(key);
    }

    /**
     * 清空存储
     */
    clear() {
        this.storage.clear();
    }
}