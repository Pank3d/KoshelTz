import { makeAutoObservable } from "mobx";


class converterStore {
    euInput = 0;
    usInput = 0;


    constructor() {
        makeAutoObservable(this);
    }


    setEuInput(value:number) {
        this.euInput = value;
    }

    setUsInput(value:number) {
        this.usInput = value;
    }

    reset(){
        this.euInput = 0
        this.usInput = 0
    }
    
    
}

const ConverterStore = new converterStore();
export default ConverterStore;