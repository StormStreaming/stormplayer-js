import {StormPlayer} from "../StormPlayer";

export class GraphicElement {

        protected stormPlayer: StormPlayer;

        protected htmlElement: HTMLElement;
        protected tagName: string;
        protected className: string;

        constructor(stormPlayer: StormPlayer, className : string = "", tagName: string = 'div') {
                this.className = className;
                this.tagName = tagName;
                this.stormPlayer = stormPlayer;
                this.draw();
                this.attachListeners();
        }

        public getHtmlElement() : HTMLElement{
                return this.htmlElement;
        }

        public remove() : void{
                this.htmlElement.remove();
        }

        public hide() : void{
                this.htmlElement.classList.add("sp-hidden");
        }

        public show() : void{
                this.htmlElement.classList.remove("sp-hidden");
        }

        protected draw() : void{
                this.htmlElement = document.createElement(this.tagName);
                if(this.className != '')
                        this.htmlElement.className = this.className;
                this.htmlElement.innerHTML = ``;
        }

        protected attachListeners() : void{

        }

}