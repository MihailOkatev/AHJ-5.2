import { ListWidget } from './ListWidget';

const widget = new ListWidget(document.querySelector('#container'));
widget.bindToDOM();
widget.listeners();
