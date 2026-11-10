// Gherkin: docs/contracts/gherkin/content/daten.feature · „Event-Typ Finissage ist gültig“ (DAT-UB-7), „Event-Typ Führung ist gültig“ (DAT-UB-8), Q-DATA-1
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { run, terminEvent, validSet } from './helpers.mjs';

const mitEvent = (over) => ({ ...validSet(), events: [terminEvent(over)] });

test('Szenario: Event-Typ Finissage und Führung sind gültig (DAT-UB-7, DAT-UB-8)', () => {
  for (const eventType of ['fair_and_convention', 'talk', 'symposium', 'workshop', 'vernissage', 'finissage', 'reading', 'guided_tour']) {
    assert.deepEqual(run(mitEvent({ eventType })).errors, [], eventType);
  }
});

test('Szenario: unbekannter Event-Typ ist ungültig (DAT-UB-7)', () => {
  assert.ok(run(mitEvent({ eventType: 'unbekannt' })).errors.length > 0);
});
