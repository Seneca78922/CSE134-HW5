class ButtonCount extends HTMLElement {
    constructor() {
        super();
        this.count = 0;
        const shadow  = this.attachShadow({mode: "open"});
        let timesBtn = document.createElement("button");
        timesBtn.innerText = `Times Clicked: ${this.count}`;
        this.addEventListener('click', ()=> { //change the counter
            this.count++;
            timesBtn.innerText=`Times Clicked: ${this.count}`;
        });

        shadow.appendChild(timesBtn);
       
    }
    
}
customElements.define('button-count', ButtonCount);