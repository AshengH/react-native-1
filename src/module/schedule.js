
export default {
    _listener: {},
    _tickers: {},
    addTicker({type, ticker, target, interval, delay}) {
        if (this._tickers === undefined)
            this._tickers = {};

        let tickers = this._tickers;
        if (tickers[type] === undefined)
            tickers[type] = [];

        if (!this.hasTicker({type: type, ticker: ticker, target: target})) {
            let value;
            if (delay !== undefined) {
                let tempKey = setTimeout(function () {
                    ticker.call(target);
                    tickers[type].push({callback: ticker, eventTarget: target});
                    value = tickers[type].length - 1;
                    tickers[type][value]['index'] = setInterval(function () {
                        ticker.call(target);
                    }, interval);
                }, delay);
                tickers[type].push({timeout: tempKey});
            } else {
                tickers[type].push({callback: ticker, eventTarget: target});
                value = tickers[type].length - 1;
                tickers[type][value]['index'] = setInterval(function () {
                    ticker.call(target);
                }, interval);
            }
        }
    },
    hasTicker({type, ticker, target}) {
        if (this._tickers === undefined)
            return false;

        let tickers = this._tickers;
        if (tickers[type] !== undefined) {
            for (let i = 0, len = tickers[type].length; i < len; i++) {
                let selListener = tickers[type][i];
                if (selListener.callback === ticker && selListener.eventTarget === target) {
                    return true;
                }
            }
        }
        return false;
    },
    addEventListener(type, listener, target) {

        if (this._listeners === undefined)
            this._listeners = {};

        let listeners = this._listeners;
        if (listeners[type] === undefined)
            listeners[type] = [];

        if (!this.hasEventListener(type,listener,target))
            listeners[type].push({callback: listener, eventTarget: target});
    },
    hasEventListener(type, listener, target) {
        if (this._listeners === undefined)
            return false;

        let listeners = this._listeners;
        if (listeners[type] !== undefined) {
            for (let i = 0, len = listeners[type].length; i < len; i++) {
                let {callback, eventTarget} = listeners[type][i];
                if (callback === listener && eventTarget === target)
                    return true;
            }
        }
        return false;
    },
    removeEventListeners(target){
        if (this._listeners === undefined)
            return;

        let listeners = this._listeners;
        for(let [,listener] of Object.entries(listeners)){
            if (listener !== undefined) {
                for (let i = 0; i < listener.length;) {
                    let selListener = listener[i];
                    if (selListener.eventTarget === target){
                        listener.splice(i, 1);
                    }else{
                        i++
                    }
                }
            }
        }
    },
    removeEventListener(type, target) {
        if (this._listeners === undefined)
            return;

        let listeners = this._listeners;
        let listenerArray = listeners[type];

        if (listenerArray !== undefined) {
            for (let i = 0; i < listenerArray.length;) {
                let selListener = listenerArray[i];
                if (selListener.eventTarget === target)
                    listenerArray.splice(i, 1);
                else
                    i++
            }
        }
    },
    clearEventListeners(){
        if(this._listeners)
            this._listener = {}
    },
    dispatchEvent({event, clearAfterDispatch, eventData}) {
        if (this._listeners === undefined)
            return;

        let listeners = this._listeners;
        let listenerArray = listeners[event];

        if (listenerArray !== undefined) {

            for(let {callback,eventTarget} of listenerArray){
                callback.call(eventTarget,eventData)
            }

            if (clearAfterDispatch)
                delete this._listeners[event]
        }
    }

}