'use strict';

global.beforeEach(async () => {
  await Promise.all([
    global.vPrismaDelegate.handleTestEvent({ name: "test_start" }),
    global.vPrismaDelegate.handleTestEvent({ name: "test_fn_start" })
  ]);
});
global.afterEach(async () => {
  await Promise.all([
    global.vPrismaDelegate.handleTestEvent({ name: "test_done" }),
    global.vPrismaDelegate.handleTestEvent({
      name: "test_fn_success",
      test: { parent: null }
    })
  ]);
});
