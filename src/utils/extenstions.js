
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
Object.defineProperty(String.prototype, 'hashCode', {
    value: function() {
        let hash = 0, i, chr, len = this.length;

        for (i = 0; i < len; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
});