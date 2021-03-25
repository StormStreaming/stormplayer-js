import {GraphicElement} from "../GraphicElement";
import {StormPlayerGUI} from "../../StormPlayerGUI";

export class CinematicElement extends GraphicElement {

    constructor(stormPlayerGUI: StormPlayerGUI) {

        super(stormPlayerGUI, 'sp-controls__cinematic', 'button');

    }

    protected draw() : void{
        super.draw();

        this.htmlElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="37" height="28" viewBox="0 0 37 28">
                  <g fill="none" fill-rule="evenodd">
                    <g fill="#FFF" fill-rule="nonzero">
                      <g>
                        <path
                          d="M18 0c.085 0 .17.007.25.02.082-.013.165-.02.25-.02H35c.828 0 1.5.672 1.5 1.5V8c0 .085-.007.168-.02.25.013.08.02.165.02.25V25c0 .828-.672 1.5-1.5 1.5H18.5c-.085 0-.168-.007-.25-.02-.08.013-.165.02-.25.02H1.5C.672 26.5 0 25.828 0 25V8.5c0-.085.007-.168.02-.25C.008 8.17 0 8.085 0 8V1.5C0 .672.672 0 1.5 0zm.25 2.98l-.106.013L18 3H3v5c0 .085-.007.17-.02.25.013.082.02.165.02.25v15h15c.085 0 .17.007.25.02l.106-.013.144-.007h15v-15c0-.085.007-.17.02-.25-.013-.082-.02-.165-.02-.25V3h-15c-.085 0-.168-.007-.25-.02z"
                          transform="translate(-1297 -956) translate(1297 956)" />
                      </g>
                    </g>
                  </g>
                </svg>`;


    }

}