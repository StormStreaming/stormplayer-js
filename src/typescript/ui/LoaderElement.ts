import {GraphicElement} from "./GraphicElement";
import {StormPlayerGUI} from "../StormPlayerGUI";

export class LoaderElement extends GraphicElement {



    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-loader');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = '<svg width="38" height="38" viewBox="0 0 38 38" stroke="#fff">\n' +
            '            <g fill="none" fill-rule="evenodd">\n' +
            '              <g transform="translate(1 1)" stroke-width="2">\n' +
            '                <circle stroke-opacity=".5" cx="18" cy="18" r="18" />\n' +
            '                <path d="M36 18c0-9.94-8.06-18-18-18">\n' +
            '                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s"\n' +
            '                    repeatCount="indefinite" />\n' +
            '                </path>\n' +
            '              </g>\n' +
            '            </g>\n' +
            '          </svg>';

        this.hide();
    }

}