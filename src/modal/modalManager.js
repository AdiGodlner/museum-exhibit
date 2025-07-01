




export class ModalManager{


    constructor(){
        this.modal = document.getElementById("modal");

    }

    onOpen(){
        
        this.modal.style.display = 'flex'

    }

    onClose(){

        this.modal.style.display = "none";
    
    }


    onControlChange(){
        //TODO change avilable modal options based on selected 
        // controllers

    }

}