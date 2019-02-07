export default class throttledResize {
    constructor(){
        this.cb = undefined;
        this.time = undefined;
        this.timeout = undefined;
    }

    _throttledResize = () => {
        if(typeof this.time === "undefined"){
            this.time = Date.now();
        }

        if((Date.now() - this.time) > 200){
            this.time = Date.now();
            clearTimeout(this.timeout)
            this.timeout = setTimeout(()=> {
                this.cb();
                this.time = undefined;
                console.log("end");
            }, 300);
            this.cb();
        }
    }

    setEvent = (fn) => {
        this.cb = fn;
        window.addEventListener("resize", this._throttledResize);
    }

    removeEvent = () => {
        window.removeEventListener("resize", this._throttledResize);
    }
}