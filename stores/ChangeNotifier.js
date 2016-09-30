import {EventEmitter} from 'events';

const CHANGE_EVENT = 'CHANGE_EVENT';


export default class ChangeNotifier extends EventEmitter {
     register(callback) {
         this.on(CHANGE_EVENT, callback);
     }
     unregister(callback) {
         this.removeListener(CHANGE_EVENT, callback);
     }
     notify() {
         this.emit(CHANGE_EVENT);
     }
}
