// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkDelivery,
  checkQuantity,
  MIN_DELIVERY_ORDER,
  FREE_DELIVERY_FROM,
  DELIVERY_FEE,
} from '../src/rules/orderRules.js';

// ---- Rule 3: delivery minimum order and fee (the rule the assignment asks us to test) ----
test('delivery: ordinary valid subtotal is allowed and pays the fee', () => {
  const result = checkDelivery(1000, 'delivery');
  assert.equal(result.allowed, true);
  assert.equal(result.fee, DELIVERY_FEE);
});

test('delivery: subtotal exactly at the minimum (Rs 800) is allowed', () => {
  const result = checkDelivery(MIN_DELIVERY_ORDER, 'delivery');
  assert.equal(result.allowed, true);
});

test('delivery: subtotal one rupee below the minimum is rejected with a message', () => {
  const result = checkDelivery(MIN_DELIVERY_ORDER - 1, 'delivery');
  assert.equal(result.allowed, false);
  assert.match(result.message, /minimum order of Rs 800/);
});

test('delivery: subtotal exactly at Rs 2000 gets free delivery', () => {
  const result = checkDelivery(FREE_DELIVERY_FROM, 'delivery');
  assert.equal(result.allowed, true);
  assert.equal(result.fee, 0);
});

test('pickup: no minimum and no fee', () => {
  const result = checkDelivery(100, 'pickup');
  assert.equal(result.allowed, true);
  assert.equal(result.fee, 0);
});

// ---- Rule 1: quantity limit (extra) ----
test('quantity: 3 is valid, exactly 5 is valid, 6 is rejected', () => {
  assert.equal(checkQuantity(3, 20).valid, true);
  assert.equal(checkQuantity(5, 20).valid, true);
  assert.equal(checkQuantity(6, 20).valid, false);
});

test('quantity: cannot exceed the stock left', () => {
  assert.equal(checkQuantity(3, 3).valid, true);
  assert.equal(checkQuantity(4, 3).valid, false);
  assert.equal(checkQuantity(1, 0).valid, false);
});
