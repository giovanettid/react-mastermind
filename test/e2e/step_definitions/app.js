import { When, Then } from 'cucumber';

When(/^Go js starter$/, () => {
  browser.url('/');
});

Then(/^Says "(.*)"$/, (starter) => {
  expect($('.starter').getText()).to.equal(starter);
});
