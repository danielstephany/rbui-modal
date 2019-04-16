import throttledResize from './Resize';

export default class Draggable {

    constructor(modal, options){
        this._window = window;
        this._modal = modal;
        this._header = undefined;
        this._dragging = false;
        this._initialX = undefined;
        this._initialY = undefined;
        this._offsetX = undefined;
        this._offsetY = undefined;
        this._preResizeTranslateX = 0;
        this._preResizeTranslateY = 0;
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
        this.throttledResize.setEvent(this._onResizeStrart.bind(this), this._onResize.bind(this));
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
        this._preResizeWindowInnerHeight = 
        this._preResizeWindowInnerWidth = 
        this._windowInnerHeight = this._window.innerHeight;
        this._windowInnerWidth = this._window.innerWidth;
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

    _onResizeStrart = function() {
        this._preResizeTranslateX += this._previousTranslateX;
        this._preResizeTranslateY += this._previousTranslateY;
        this._previousTranslateX = 0;
        this._previousTranslateY = 0;
    }


    //TODO: RESIZE LOGIC WORKS FINE WHEN I RESIZE THE PAGE SLOWLY BUT IF I RESIZE IT FAST THE VALUES ARE OFF
    _onResize = function() {
        this._setWindowCoordinates();
        this._setModalCoordinates();
    }

    _keepModalInWindow = function() {
        const modifier = this._concontainedInWindow ? 0 : (this._modalOffsetWidth - 40);

        this._currentModalLeft = this._modalInitialLeft + this._previousTranslateX + this._offsetX;
        console.log(this._currentModalLeft);
        console.log(this._modalInitialLeft, this._previousTranslateX, this._offsetX);
        if (this._currentModalLeft <= (0 - modifier)) { //modal is left of the left of the screen
            this._currentModalLeft = -this._modalInitialLeft - modifier;
            return this._currentModalLeft;
        } else if ((this._currentModalLeft + this._modalOffsetWidth) >= (this._windowInnerWidth + modifier)) { //modal is right of the left of the screen
            this._currentModalLeft = this._windowInnerWidth - (this._modalInitialLeft + this._modalOffsetWidth) + modifier;
            return this._currentModalLeft;
        }
        return this._previousTranslateX + this._offsetX;
    }

    _getModalXCoordinates = function () {
        const modifier = this._concontainedInWindow ? 0 : (this._modalOffsetWidth - 40);        

        this._currentModalLeft = this._modalInitialLeft + this._previousTranslateX + this._offsetX;
        console.log(this._currentModalLeft);
        console.log(this._modalInitialLeft, this._previousTranslateX, this._offsetX);
        if (this._currentModalLeft <= (0 - modifier)){ //modal is left of the left of the screen
            this._currentModalLeft = -this._modalInitialLeft - modifier;
            return this._currentModalLeft;
        } else if ((this._currentModalLeft + this._modalOffsetWidth) >= (this._windowInnerWidth + modifier)) { //modal is right of the left of the screen
            this._currentModalLeft = this._windowInnerWidth - (this._modalInitialLeft + this._modalOffsetWidth) + modifier;
            return this._currentModalLeft;
        }
        return this._previousTranslateX + this._offsetX;
    }

    _getModalYCoordinates = function () {
        const modifier = this._concontainedInWindow? 0 : (this._modalOffsetHeight - 40);
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

    _getModalXCoordinatesOnResize = function () {
        const modifier = this._concontainedInWindow ? 0 : (this._modalOffsetWidth - 40);

        this._currentModalLeft = this._modalInitialLeft + this._previousTranslateX + this._offsetX;
        console.log(this._currentModalLeft);
        console.log(this._modalInitialLeft, this._previousTranslateX, this._offsetX);
        if (this._currentModalLeft <= (0 - modifier)) { //modal is left of the left of the screen
            this._currentModalLeft = -this._modalInitialLeft - modifier;
            return this._currentModalLeft;
        } else if ((this._currentModalLeft + this._modalOffsetWidth) >= (this._windowInnerWidth + modifier)) { //modal is right of the left of the screen
            this._currentModalLeft = this._windowInnerWidth - (this._modalInitialLeft + this._modalOffsetWidth) + modifier;
            return this._currentModalLeft;
        }
        return this._previousTranslateX + this._offsetX;
    }

    /*************
    andimate modal
    **************/

    _animateModal = function () {
        window.requestAnimationFrame(() => {
            if (this._initialX) {
                this._modal.style.transform = `translate(calc(-50% + ${this._preResizeTranslateX + this._getModalXCoordinates()}px), ${this._preResizeTranslateY + this._getModalYCoordinates()}px)`;
            }
        })
    }


    /***********
     drag events
    ************/

    _initiatDrag = function(e) {
        this._modal.classList.add("dragging");
        if(e.touches){
            this._initialX = e.touches[0].clientX;
            this._initialY = e.touches[0].clientY;
        }else {
            this._initialX = e.clientX;
            this._initialY = e.clientY;
        }
    }

    _handleDrag = function(e) {
        e.preventDefault();
        if(this._initialX){
            this.dragging = true;
            if(e.touches){
                this._offsetX = (this._initialX - e.touches[0].clientX) * -1;
                this._offsetY = (this._initialY - e.touches[0].clientY) * -1;
            }else {
                this._offsetX = (this._initialX - e.clientX) * -1;
                this._offsetY = (this._initialY - e.clientY) * -1;
            }
            this._animateModal(this._offsetX, this._offsetY);
        }
    }

    _endDrag = function(e) {
        if(this._initialX){
            this._modal.classList.remove("dragging");
            this._initialX = undefined;
            this._initialY = undefined;
        }
        if (this.dragging) {
            this.dragging = false;
            this._previousTranslateX = this._getModalXCoordinates();
            this._previousTranslateY = this._getModalYCoordinates();
        }
    }

    /***************
    bind drag events
    ***************/

    draggable = function() {
        if(this._modal.classList.contains("draggable")){
            this._header = this._modal.getElementsByClassName("modal-interface__header")[0];
            this._header.addEventListener("mousedown", this._initiatDrag.bind(this));
            this._header.addEventListener("touchstart", this._initiatDrag.bind(this));
            document.addEventListener("mousemove", this._handleDrag.bind(this), {passive: false});
            document.addEventListener("touchmove", this._handleDrag.bind(this), {passive: false});
            document.addEventListener("mouseup", this._endDrag.bind(this));
            document.addEventListener("touchend", this._endDrag.bind(this));
        }
    } 

    destroy = function() {
        this.throttledResize.removeEvent();
    }
       
}