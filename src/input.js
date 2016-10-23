const { Observable } = require('rxjs');

function gamepadAsObservable(gamepad) {
  return Observable.create((o) => {
    function pollGamepad() {
      if (gamepad.connected) {
        poll = setImmediate(pollGamepad);
      } else {
        o.complete();
      }
    }

    let poll = setImmediate(pollGamepad);
    return () => clearImmediate(poll);
  });
}

const click$ = Observable.fromEvent(self, 'click')
    , key$ = Observable.fromEvent(self, 'keydown', e => e.key)
    , gamepad$ = Observable.fromEvent(self, 'gamepadconnected', e => gamepadAsObservable(e.gamepad))
    , input$ = Observable.combineLatest(click$, key$, gamepad$);

module.exports = { click$, key$, gamepad$, input$ };
