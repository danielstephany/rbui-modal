export default class Draggable {

    constructor(modal){
        this._modal = modal;
        this._header = undefined;
        this._initialX = undefined;
        this._initialY = undefined;
        this._offsetX = undefined;
        this._offsetY = undefined;
        this._previousTranslateX = 0;
        this._previousTranslateY = 0;
        // this._modalCurrentX = undefined;
        // this._modalCurrentY = undefined;
        this._currentModalLeft = undefined;
        this._currentModalTop = undefined;
        this._modalInitialTop = undefined;
        this._modalInitialBottom = undefined;
        this._modalInitialLeft = undefined;
        this._modalInitialRight = undefined;
        this._modalOffsetHeight = undefined;
        this._modalOffsetWidth = undefined;
        this._windowInnerWidth = undefined;
        this._windowInnerHeight = undefined;
        
        this._setModalCoordinates();
        this._setWindowCoordinates();
        this.draggable();
    }    

    /******
    setters
    *******/

    _setWindowCoordinates = function () {
        const windowObj = window;

        this._windowInnerHeight = windowObj.innerHeight;
        this._windowInnerWidth = windowObj.innerWidth;
    }

    _setModalCoordinates = function(){
        const modalCoordinates = this._modal.getBoundingClientRect();
        this._modalOffsetHeight = this._modal.offsetHeight;
        this._modalOffsetWidth = this._modal.offsetWidth;
        this._modalInitialTop = modalCoordinates.top;
        this._currentModalTop = this._modalInitialTop;
        this._modalInitialBottom = this._modalInitialTop + this._modalOffsetHeight;
        this._modalInitialLeft = modalCoordinates.left;
        this._currentModalLeft = this._modalInitialLeft;
        this._modalInitialRight = this._modalInitialLeft + this._modalOffsetWidth;
    }

    /*****************
    positioning checks
    ******************/

    // _yAxisInBounds = function () {
    //     //check that modal is within the window on the y-axis
    //     console.log(this._currentModalTop);
    //     if (this._currentModalTop > 0 && this._modalInitialBottom < this._windowInnerHeight ) {
    //         // console.log(this._currentModalTop);
    //         return true;
    //     } 
    //     return false;
    // }

    // _xAxisInBounds = function() {
    //     //check that modal is within the window on the x-axis
    //     console.log(this._currentModalLeft);
    //     if (this._currentModalLeft > 0 && this._modalInitialRight < this._windowInnerWidth ) {
    //         // console.log(this._currentModalLeft);
    //         return true;
    //     }
    //     return false;
    // }

    _getModalXCoordinates = function (x) {
        this._currentModalLeft = this._modalInitialLeft + this._previousTranslateX + x;
        if (this._currentModalLeft <= 0){
            this._currentModalLeft = -this._modalInitialLeft;
            return this._currentModalLeft;
        } else if ( (this._currentModalLeft + this._modalOffsetWidth) >= this._windowInnerWidth){
            this._currentModalLeft = this._windowInnerWidth - (this._modalInitialLeft + this._modalOffsetWidth);
            return this._currentModalLeft;
        }
        return this._previousTranslateX + x;
    }

    _getModalYCoordinates = function (y) {
        this._currentModalTop = this._modalInitialTop + this._previousTranslateY + y;
        if (this._currentModalTop <= 0){
            this._currentModalTop = this._modalInitialTop;
            console.log(this._currentModalTop);
            return -this._currentModalTop;
        } else if(this._currentModalTop + this._modalOffsetHeight >= this._windowInnerHeight){
            this._currentModalTop = this._windowInnerHeight - (this._modalInitialTop + this._modalOffsetHeight);
            return this._currentModalTop;
        }
        return this._previousTranslateY + y;
    }

    /*************
    andimate modal
    **************/

    _animateModal = function () {
        window.requestAnimationFrame(() => {
            this._modal.style.transform = `translate(calc(-50% + ${this._getModalXCoordinates(this._offsetX)}px), ${this._getModalYCoordinates(this._offsetY)}px)`;
        })
    }

    /***********
     drag events
    ************/

    _initiatDrag = function(e) {
        this._initialX = e.clientX;
        this._initialY = e.clientY;
        console.log(this._initialX);
    }

    _handleDrag = function(e) {
        if (!this._initialX) return;
        this._offsetX = (this._initialX - e.clientX) * -1;
        this._offsetY = (this._initialY - e.clientY) * -1;

        this._animateModal(this._offsetX, this._offsetY);

        console.log('drag:', `x: ${this._offsetX} y: ${this._offsetY}`);
    }

    _endDrag = function(e) {
        console.log(e, "click up");
        this._initialX = undefined;
        this._initialY = undefined;

        this._previousTranslateX = this._getModalXCoordinates(this._offsetX);
        this._previousTranslateY = this._getModalYCoordinates(this._offsetY);
    }

    draggable = function() {
        if(this._modal.classList.contains("draggable")){
            this._header = this._modal.getElementsByClassName("modal-interface__header")[0];

            this._header.addEventListener("mousedown", this._initiatDrag.bind(this));
            document.addEventListener("mousemove", this._handleDrag.bind(this));
            document.addEventListener("mouseup", this._endDrag.bind(this));
        }
    } 
       
}