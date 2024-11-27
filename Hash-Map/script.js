class HashMap {
    constructor(capacity = 8, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(capacity);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        if (this.size / this.capacity >= this.loadFactor) {
            this.resize();
        }

        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (bucket) {
            for (let [k, v] of bucket) {
                if (k === key) return v;
            }
        }
        return null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    keys() {
        return this.buckets.flatMap(bucket => (bucket || []).map(pair => pair[0]));
    }

    values() {
        return this.buckets.flatMap(bucket => (bucket || []).map(pair => pair[1]));
    }

    entries() {
        return this.buckets.flatMap(bucket => bucket || []);
    }

    clear() {
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity);
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    const index = this.hash(key) % newCapacity;
                    if (!newBuckets[index]) {
                        newBuckets[index] = [];
                    }
                    newBuckets[index].push([key, value]);
                }
            }
        }
        this.capacity = newCapacity;
        this.buckets = newBuckets;
    }
}

const testMap = new HashMap();

function addKeyValuePair() {
    const key = document.getElementById('keyInput').value.trim();
    const value = document.getElementById('valueInput').value.trim();
    if (key && value) {
        testMap.set(key, value);
        updateOutput(`Added: ${key} = ${value}`);
    } else {
        updateOutput('Please enter both key and value.');
    }
    resetInputs();
}

function removeKey() {
    const key = document.getElementById('keyInput').value.trim();
    if (testMap.remove(key)) {
        updateOutput(`Removed: ${key}`);
    } else {
        updateOutput(`Key "${key}" not found.`);
    }
    resetInputs();
}

function getKey() {
    const key = document.getElementById('keyInput').value.trim();
    const value = testMap.get(key);
    if (value !== null) {
        updateOutput(`Value for "${key}": ${value}`);
    } else {
        updateOutput(`Key "${key}" not found.`);
    }
    resetInputs();
}

function showLength() {
    updateOutput(`Length of HashMap: ${testMap.length()}`);
}

function showMapState() {
    const entries = testMap.entries()
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    updateOutput(`HashMap:\n${entries || "No data available"}`);
}

function showKeys() {
    updateOutput(`Keys:\n${testMap.keys().join('\n') || "No keys available"}`);
}

function showValues() {
    updateOutput(`Values:\n${testMap.values().join('\n') || "No values available"}`);
}

function showEntries() {
    showMapState();
}

function clearMap() {
    testMap.clear();
    updateOutput('HashMap cleared.');
}

function updateOutput(content) {
    document.getElementById('output').textContent = content;
}

function resetInputs() {
    document.getElementById('keyInput').value = '';
    document.getElementById('valueInput').value = '';
}
