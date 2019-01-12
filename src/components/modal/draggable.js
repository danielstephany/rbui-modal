export default class Draggable {

    constructor(modal){
        this._modal = modal;
        this._header;
        this._initialX = undefined;
        this._initialX = undefined;
        this._modalCurrentX = undefined;
        this._modalCurrentY = undefined;
        this._modalTop = undefined;
        this._modalBottom = undefined;
        this._modaloffsetHeight = undefined;
        this._modaloffsetWidth = undefined;
        this._windowInnerWidth = undefined;
        this._windowInnerHeight = undefined;
        
        this.getModalCoordinates();
        this.getWindowCoordinates();
        this.draggable();
    }        

    getModalCoordinates = function(){
        const modalCoordinates = this._modal.getBoundingClientRect();

        this._modalTop = modalCoordinates.top;
        this._modalBottom = modalCoordinates.left;
        this._modalInnerHeight = this._modal.offsetHeight;
        this._modalClientWidth = this._modal.offsetWidth;

    }

    getWindowCoordinates = function(){
        const windowObj = window;

        this._windowInnerHeight = windowObj.innerHeight;
        this._windowInnerWidth = windowObj.innerWidth;
        console.log(this._windowInnerWidth, this._windowInnerHeight);
    }

    checkbounds = function() {
        //top in frame
        this._modalCurrentY = undefined;
        //left in frame
        this._modalCurrentX = undefined;
        //right in frame
        this._modalCurrentX = undefined;
        //bottom in frame
        this._modalCurrentY = undefined;
    }

    draggable = function() {
        if(this._modal.classList.contains("draggable")){
            this._header = this._modal.getElementsByClassName("modal-interface__header")[0];

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