class ExampleApp {

    constructor(private DOMContainer: HTMLElement) {}

    public start(): void {
        this.append('App start');
        this.asyncStuff().then((success) => this.append(success));
        this.append('After async stuff method');

        // Blog example
        const resolver = (msg, timeout) => new Promise((resolve) => {
            console.log(msg);
            setTimeout(resolve, timeout);
        });
        async function run() {
            await resolver('First', 1000);
            await resolver('Second', 500);
            await resolver('Third', 1000);
            await resolver('Fourth', 500);
        }
        run();
    }

    private async asyncStuff(): Promise<string> {
        this.append('First await');
        await this.justPromise(1500);

        this.append('Second await');
        await this.justPromise(1500);

        this.append('Third await');
        await this.justPromise(500);

        return new Promise<string>((resolve, reject) => {
            resolve('Async stuff finished');
        });
    }

    private justPromise(delay: number): Promise<string> {
        return new Promise((resolve, reject) => {
           setTimeout(() => resolve(), delay);
        });
    }

    private append(content: string): void {
        this.DOMContainer.appendChild(this.elementFactory(content));
    }

    private elementFactory(content: string): HTMLElement {
        const DOMElement = document.createElement('p');
        DOMElement.className = 'collection-item';
        DOMElement.textContent = content;
        return DOMElement;
    }

}
window.onload = () => {
    const app = new ExampleApp(document.getElementById('container'));
    app.start();
};