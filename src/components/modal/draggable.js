import throttledResize from './Resize';

export default class Draggable {

    constructor(modal, options){
        this._modal = modal;
        this._header = undefined;
        this._initialX = undefined;
        this._initialY = undefined;
        this._offsetX = undefined;
        this._offsetY = undefined;
        this._previousTranslateX = 0;
        this._previousTranslateY = 0;
        this._currentModalLeft = undefined;
        this._currentModalTop = undefined;
        this._modalInitialTop = undefined;
        this._modalInitialLeft = undefined;
        this._modalOffsetHeight = undefined;
        this._modalOffsetWidth = undefined;
        this._windowInnerWidth = undefined;
        this._windowInnerHeight = undefined;

        this._concontainedInWindow = true;
        
        this._setOptions(options);
        this._setWindowCoordinates();
        this._setModalCoordinates();
        this.draggable();
        this.throttledResize = new throttledResize();
        this.throttledResize.setEvent(this._resetValues.bind(this));
    }    

    /******
    setters
    *******/

    _setOptions(options){
        if(typeof options !== "undefined"){
            if(typeof options.containedInWindow !== 'undefined'){
                this._concontainedInWindow = options.containedInWindow;
            }
        }
    }

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
        this._modalInitialLeft = modalCoordinates.left;
        this._currentModalLeft = this._modalInitialLeft;
    }

    _resetValues = function() {
        this._setWindowCoordinates();
        this._setModalCoordinates();
    }

    _getModalXCoordinates = function () {
        if(typeof this._offsetX === 'undefined') return this._previousTranslateX;

        let modifier = this._concontainedInWindow? 0 : (this._modalOffsetWidth - 40);

        this._currentModalLeft = this._modalInitialLeft + this._previousTranslateX + this._offsetX;
        if (this._currentModalLeft <= (0 - modifier)){
            this._currentModalLeft = -this._modalInitialLeft - modifier;
            return this._currentModalLeft;
        } else if ( (this._currentModalLeft + this._modalOffsetWidth) >= (this._windowInnerWidth + modifier)){
            this._currentModalLeft = this._windowInnerWidth - (this._modalInitialLeft + this._modalOffsetWidth) + modifier;
            return this._currentModalLeft;
        }
        return this._previousTranslateX + this._offsetX;
    }

    _getModalYCoordinates = function () {
        if(typeof this._offsetY === 'undefined') return this._previousTranslateY;

        let modifier = this._concontainedInWindow? 0 : (this._modalOffsetHeight - 40);

        this._currentModalTop = this._modalInitialTop + this._previousTranslateY + this._offsetY;
        if (this._currentModalTop <= 0){
            this._currentModalTop = this._modalInitialTop;
            return -this._currentModalTop;
        } else if(this._currentModalTop + this._modalOffsetHeight >= (this._windowInnerHeight + modifier)){
            this._currentModalTop = this._windowInnerHeight - (this._modalInitialTop + this._modalOffsetHeight) + modifier;
            return this._currentModalTop;
        }
        return this._previousTranslateY + this._offsetY; 
    }

    /*************
    andimate modal
    **************/

    _animateModal = function () {
        window.requestAnimationFrame(() => {
            if (this._initialX) {
                this._modal.style.transform = `translate(calc(-50% + ${this._getModalXCoordinates()}px), ${this._getModalYCoordinates()}px)`;
            }
        })
    }

    /***********
     drag events
    ************/

    _initiatDrag = function(e) {
        this._modal.classList.add("dragging");
        this._initialX = e.clientX;
        this._initialY = e.clientY;
    }

    _handleDrag = function(e) {
        if (this._initialX) {
            this._offsetX = (this._initialX - e.clientX) * -1;
            this._offsetY = (this._initialY - e.clientY) * -1;

            this._animateModal(this._offsetX, this._offsetY);
        }
    }

    _endDrag = function(e) {
        // console.log(e, "click up");
        this._modal.classList.remove("dragging");
        this._initialX = undefined;
        this._initialY = undefined;
        this._previousTranslateX = this._getModalXCoordinates();
        this._previousTranslateY = this._getModalYCoordinates();
    }

    draggable = function() {
        if(this._modal.classList.contains("draggable")){
            this._header = this._modal.getElementsByClassName("modal-interface__header")[0];
            this._header.addEventListener("mousedown", this._initiatDrag.bind(this));

            document.addEventListener("mousemove", this._handleDrag.bind(this));
            document.addEventListener("mouseup", this._endDrag.bind(this));
        }
    } 

    destroy = function() {
        this.throttledResize.removeEvent();
    }
       
}