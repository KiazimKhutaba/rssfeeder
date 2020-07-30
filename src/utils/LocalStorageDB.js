export default
class LocalStorageDB
{

    constructor(dbPrefix) {

        //console.warn('LocalStorageDb object created');
        this.dbPrefix = dbPrefix + '@';
    }

    /**
     * Insert data to localStorage
     *
     *
     * @param {string} key
     * @param {any} value
     */
    save(key, value) {

        let _value = JSON.stringify(value);

        localStorage.setItem(this.dbPrefix + key, _value);

        return true;
    }


    /**
     * Select data from localStorage
     *
     *
     * @param {string} key object key id
     *
     * @returns {object|null}
     */
    fetch(key) {
        let data = localStorage.getItem(this.dbPrefix + key);

        if(data === null)
            return false;

        let _data = false;

        try {

            _data = JSON.parse(data);

        } catch (e) {
            console.error(e);
        }

        return _data;
    }


    delete(key) {
        localStorage.removeItem(this.dbPrefix + key);
    }


    rowsCount() {
        return localStorage.length;
    }


    drop() {

        for( let i=0; i < this.rowsCount(); i++ ) {

            let key = localStorage.key(i);

            if( key.startsWith(this.dbPrefix) )
                this.delete(key);
        }
    }


    dropAll() {
        localStorage.clear();
    }

}