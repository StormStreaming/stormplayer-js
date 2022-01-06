export default class StormPlayerElement extends HTMLElement {
    private wrapper;
    private storm;
    private libraryConfig;
    private guiConfig;
    static get observedAttributes(): string[];
    constructor();
    private prepare;
    private initialize;
    private setupContainer;
    private setGuiConfig;
    private setLibraryConfig;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void;
}
