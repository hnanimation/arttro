export class App {
  constructor() {
    this.name = 'Artto';
    this.state = {
      activeLayer: 0,
      isReady: false
    };
  }

  init() {
    this.state.isReady = true;
    console.log('Artto app initialized');
  }
}
