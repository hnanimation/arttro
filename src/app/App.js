import { DocumentState } from '../core/DocumentState.js';

export class App {
  constructor() {
    this.name = 'Artto';
    this.state = {
      activeLayer: 0,
      isReady: false,
      document: new DocumentState()
    };
  }

  init() {
    this.state.document.seedDefaultLayer();
    this.state.activeLayer = this.state.document.activeLayer;
    this.state.isReady = true;
    console.log('Artto app initialized');
  }
}
