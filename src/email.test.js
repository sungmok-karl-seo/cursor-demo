import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractEmails, isValidEmail, getValidEmails, uniqueValidEmails } from './email.js';

const users = [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'not-an-email' },
  { name: 'Carol', email: 'carol@test.org' },
];

test('extractEmails returns all email fields', () => {
  assert.deepEqual(extractEmails(users), [
    'alice@example.com',
    'not-an-email',
    'carol@test.org',
  ]);
});

test('extractEmails returns empty array for empty input', () => {
  assert.deepEqual(extractEmails([]), []);
});

test('isValidEmail accepts valid addresses', () => {
  assert.equal(isValidEmail('alice@example.com'), true);
  assert.equal(isValidEmail('user.name+tag@domain.co.kr'), true);
});

test('isValidEmail rejects invalid addresses', () => {
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('missing-at-sign.com'), false);
  assert.equal(isValidEmail('no-domain@'), false);
  assert.equal(isValidEmail('@no-local.com'), false);
  assert.equal(isValidEmail('spaces in@email.com'), false);
});

test('getValidEmails returns only valid emails', () => {
  assert.deepEqual(getValidEmails(users), [
    'alice@example.com',
    'carol@test.org',
  ]);
});

test('getValidEmails returns empty array when no valid emails exist', () => {
  const invalidUsers = [
    { name: 'Bob', email: 'not-an-email' },
    { name: 'Dan', email: 'also-invalid' },
  ];
  assert.deepEqual(getValidEmails(invalidUsers), []);
});

test('getValidEmails returns all emails when all are valid', () => {
  const validUsers = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Carol', email: 'carol@test.org' },
  ];
  assert.deepEqual(getValidEmails(validUsers), [
    'alice@example.com',
    'carol@test.org',
  ]);
});

test('uniqueValidEmails removes duplicate valid emails', () => {
  const duplicateUsers = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Alice2', email: 'alice@example.com' },
    { name: 'Bob', email: 'not-an-email' },
    { name: 'Carol', email: 'carol@test.org' },
  ];
  assert.deepEqual(uniqueValidEmails(duplicateUsers), [
    'alice@example.com',
    'carol@test.org',
  ]);
});
