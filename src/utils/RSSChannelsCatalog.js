import {isEmpty} from "./index";
import '../utils/extenstions';

export default
class RSSChannelsCatalog
{

    /**
     *
     * @param {LocalStorageDB} db
     * @param key
     */
    constructor(db, key = 'ChannelsCatalog') {
        this.db = db;
        this.key = key;
    }


    /**
     *
     * @param {Object} channel
     */
    addChannel(channel) {

        let channels = this.db.fetch(this.key);
        channel.id = this.generateId(channel.url);

        if(channels && Array.isArray(channels)) {
            channels.push(channel);
            return this.db.save(this.key, channels);
        }
        else {
            return this.db.save(this.key, [channel]);
        }
    }


    /**
     * Checks if channel exists
     *
     * @param url
     * @returns {boolean}
     */
    containsChannel(url) {
        return this.findChannelById(this.generateId(url));
    }

    /**
     * Search channel by it id
     *
     * @param {number} id
     */
    findChannelById(id) {

        let channels = this.db.fetch(this.key);

        if( !Array.isArray(channels) && isEmpty(channels) )
            return false;

        return channels.find(channel => channel.id === +id);
    }


    /**
     *
     * @returns {Object} feeds
     */
    fetchAll() {
        return this.db.fetch(this.key)
    }

    /**
     * Fetched all as sorted array
     *
     * @returns {Array<object>}
     */
    fetchAllSorted() {

        const compareChannels = (a, b) => {

            let title_a = a.title.toUpperCase();
            let title_b = b.title.toUpperCase();

            let compareResult = 0

            if( title_a > title_b ) {
                compareResult = 1
            }
            else if( title_a < title_b ) {
                compareResult = -1
            }

            return compareResult;
        }

        const all = this.fetchAll();

        return  all ? all.sort(compareChannels) : [];

    }


    removeChannel(id) {

        let channels = this.db.fetch(this.key);

        if( !Array.isArray(channels) && isEmpty(channels) )
            return { res: false, msg: 'Channels is not array!' }

        let filtered = channels.filter(channel => channel.id !== +id);

        return this.db.save(this.key, filtered);
    }


    importRSS(channels) {

        if( !Array.isArray(channels) && isEmpty(channels) )
            return false;

        channels.forEach(channel => this.addChannel(channel));
    }


    /**
     * Generates hash code id for channel URL
     *
     * @returns {number}
     * @param {string} url
     */
    generateId(url) {
        return Math.abs(url.trim().hashCode());
    }


}