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
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return bucket[i][1];
                }
            }
        }
        return null;
    }

    has(key) {
        return this.get(key) !== null;
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

    clear() {
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }

    keys() {
        const keys = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    keys.push(pair[0]);
                }
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    values.push(pair[1]);
                }
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    entries.push(pair);
                }
            }
        }
        return entries;
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newMap = new HashMap(newCapacity, this.loadFactor);

        for (let bucket of this.buckets) {
            if (bucket) {
                for (let pair of bucket) {
                    newMap.set(pair[0], pair[1]);
                }
            }
        }

        this.capacity = newCapacity;
        this.buckets = newMap.buckets;
    }
}

const testMap = new HashMap();

function addKeyValuePair() {
    const key = document.getElementById('keyInput').value;
    const value = document.getElementById('valueInput').value;

    if (key && value) {
        testMap.set(key, value);
        document.getElementById('keyInput').value = '';
        document.getElementById('valueInput').value = '';
        alert(`Added: ${key} = ${value}`);
    } else {
        alert('Please enter both key and value');
    }
}

function showMapState() {
    const output = {
        size: testMap.length(),
        capacity: testMap.capacity,
        keys: testMap.keys(),
        values: testMap.values(),
        entries: testMap.entries()
    };

    document.getElementById('output').textContent = JSON.stringify(output, null, 2);
}

function showKeys() {
    document.getElementById('output').textContent = JSON.stringify(testMap.keys(), null, 2);
}

function showValues() {
    document.getElementById('output').textContent = JSON.stringify(testMap.values(), null, 2);
}

function showEntries() {
    document.getElementById('output').textContent = JSON.stringify(testMap.entries(), null, 2);
}
