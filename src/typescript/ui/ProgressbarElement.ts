import {GraphicElement} from "./GraphicElement";
import {StormPlayer} from "../StormPlayer";
import {CuepointsElement} from "./CuepointsElement";
import {SeektooltipElement} from "./SeektooltipElement";

export class ProgressbarElement extends GraphicElement {

    private cuepointsElement : CuepointsElement;
    private progressElement : HTMLProgressElement;
    private progressEndElement : GraphicElement;
    private seekElement : HTMLInputElement;
    private seektooltipElement : SeektooltipElement;
    private thumbElement : GraphicElement;

    constructor(stormPlayer: StormPlayer) {

        super(stormPlayer, "sp-progress");

    }

    protected draw() : void{
        super.draw();

        this.cuepointsElement = new CuepointsElement(this.stormPlayer);
        this.htmlElement.appendChild(this.cuepointsElement.getHtmlElement());

        this.thumbElement = new GraphicElement(this.stormPlayer, "sp-progress-thumb");
        this.thumbElement.getHtmlElement().style.transform = "translateX(255.576px)";
        this.htmlElement.appendChild(this.thumbElement.getHtmlElement());

        this.progressElement = document.createElement('progress');
        this.progressElement.className = 'sp-progress-bar';
        this.progressElement.setAttribute("value", "24");
        this.progressElement.setAttribute("min", "0");
        this.progressElement.setAttribute("max", "270");
        this.htmlElement.appendChild(this.progressElement);

        this.progressEndElement = new GraphicElement(this.stormPlayer, "sp-progress-bar__end", "span");
        this.htmlElement.appendChild(this.progressEndElement.getHtmlElement());

        this.seekElement = document.createElement('input');
        this.seekElement.className = 'sp-seek';
        this.seekElement.setAttribute("value", "0");
        this.seekElement.setAttribute("min", "0");
        this.seekElement.setAttribute("type", "range");
        this.seekElement.setAttribute("step", "1");
        this.seekElement.setAttribute("max", "270");
        this.seekElement.setAttribute("data-seek", "83");
        this.htmlElement.appendChild(this.seekElement);

        this.seektooltipElement = new SeektooltipElement(this.stormPlayer);
        this.htmlElement.appendChild(this.seektooltipElement.getHtmlElement());


    }

}