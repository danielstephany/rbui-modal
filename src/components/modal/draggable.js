export default class Draggable {

    constructor(modal){
        this._modal = modal;
        this._header;
        this._initialX = undefined;
        this._initialX = undefined;
        return this.draggable();
    }        

    draggable = function() {
        if(this._modal.classList.contains("draggable")){
            this._header = this._modal.getElementsByClassName("modal-interface__header")[0];
            console.log(this._modal);
            this._header.addEventListener("mousedown", function(e){
                console.log(e, "click down");
                this._initialX = e.clientX;
                this._initialY = e.clientY;
            });
            this._modal.addEventListener("mousemove", function(e){
                // console.log(e);
                if(!this._initialX) return;
    
                console.log();
            });
            this._header.addEventListener("mouseup", function(e){
                console.log(e, "click up");
                this._initialX = undefined;
                this._initialY = undefined;
            });
        }
    } 
       
}