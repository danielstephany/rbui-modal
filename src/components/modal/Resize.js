export default class throttledResize {
    constructor(){
        this.onStart = undefined;
        this.cb = undefined;
        this.time = undefined;
        this.timeout = undefined;
        this._firstCalled = false;
    }

    _throttledResize = () => {
        const currentTime = Date.now();

        if(!this._firstCalled){
            this.onStart();
            this._firstCalled = true;
            this.timeout = setTimeout(this.resizeEndCallBack, 250);
        }

        if(typeof this.time === "undefined"){
            this.time = currentTime;
        }

        if ((currentTime - this.time) > 200){
            this.time = currentTime;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.resizeEndCallBack, 250);
            this.cb();
        }
    }

    resizeEndCallBack = () => {
        this.cb();
        this.time = undefined;
        this.timeout = undefined;
        this._firstCalled = false;
    }

    setEvent = (onStart, fn) => {
        this.cb = fn;
        this.onStart = onStart;
        window.addEventListener("resize", this._throttledResize);
    }

    removeEvent = () => {
        window.removeEventListener("resize", this._throttledResize);
    }
}