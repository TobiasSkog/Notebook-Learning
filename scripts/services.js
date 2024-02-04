import DB from './db.js';
import Modals from './modals.js';
import Render from './render.js';
import Search from './search.js';

export const dbInstance = new DB();
export const modalsInstance = new Modals();
export const searchInstance = new Search();
export const renderInstance = new Render();