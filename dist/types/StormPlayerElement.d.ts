export default class StormPlayerElement extends HTMLElement {
    private wrapper;
    private player;
    private streamConfig;
    private playerConfig;
    private containerID;
    private width;
    private height;
    static get observedAttributes(): string[];
    constructor();
    private prepare;
    private setupContainer;
    private initialize;
    private setStreamConfig;
    private setPlayerConfig;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void;
    private containsOnlyNumbers;
}
