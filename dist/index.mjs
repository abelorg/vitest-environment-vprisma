import { PrismaEnvironmentDelegate } from '@quramy/jest-prisma-core';
import { builtinEnvironments } from 'vitest/dist/environments.js';

const index = {
  name: "vprisma",
  transformMode: "ssr",
  async setup(global, options) {
    const { baseEnv, ...vprisma } = options.vprisma ?? {};
    const env = builtinEnvironments[baseEnv ?? "node"];
    const envReturn = await env.setup(global, {});
    const delegate = new PrismaEnvironmentDelegate(
      {
        projectConfig: {
          testEnvironmentOptions: vprisma ?? {},
          automock: false,
          cache: false,
          cacheDirectory: "",
          clearMocks: false,
          collectCoverageFrom: [],
          coverageDirectory: "",
          coveragePathIgnorePatterns: [],
          cwd: "",
          detectLeaks: false,
          detectOpenHandles: false,
          errorOnDeprecated: false,
          extensionsToTreatAsEsm: [],
          fakeTimers: {
            enableGlobally: false,
            now: void 0,
            timerLimit: 1e4
          },
          forceCoverageMatch: [],
          globals: {},
          haste: {
            computeSha1: void 0,
            defaultPlatform: void 0,
            forceNodeFilesystemAPI: void 0,
            enableSymlinks: void 0,
            hasteImplModulePath: void 0,
            platforms: void 0,
            throwOnModuleCollision: void 0,
            hasteMapModulePath: void 0,
            retainAllFiles: void 0
          },
          id: "",
          injectGlobals: false,
          moduleDirectories: [],
          moduleFileExtensions: [],
          moduleNameMapper: [],
          modulePathIgnorePatterns: [],
          openHandlesTimeout: 0,
          prettierPath: "",
          resetMocks: false,
          resetModules: false,
          restoreMocks: false,
          rootDir: "",
          roots: [],
          runner: "",
          sandboxInjectedGlobals: [],
          setupFiles: [],
          setupFilesAfterEnv: [],
          skipFilter: false,
          slowTestThreshold: 0,
          snapshotSerializers: [],
          snapshotFormat: {},
          testEnvironment: "",
          testMatch: [],
          testLocationInResults: false,
          testPathIgnorePatterns: [],
          testRegex: [],
          testRunner: "",
          transform: [],
          transformIgnorePatterns: [],
          watchPathIgnorePatterns: []
        },
        globalConfig: {
          bail: 0,
          changedFilesWithAncestor: false,
          ci: false,
          collectCoverage: false,
          collectCoverageFrom: [],
          coverageDirectory: "",
          coverageProvider: "babel",
          coverageReporters: [],
          detectLeaks: false,
          detectOpenHandles: false,
          expand: false,
          findRelatedTests: false,
          forceExit: false,
          json: false,
          lastCommit: false,
          logHeapUsage: false,
          listTests: false,
          maxConcurrency: 0,
          maxWorkers: 0,
          noStackTrace: false,
          nonFlagArgs: [],
          notify: false,
          notifyMode: "always",
          onlyChanged: false,
          onlyFailures: false,
          openHandlesTimeout: 0,
          passWithNoTests: false,
          projects: [],
          runInBand: false,
          runTestsByPath: false,
          rootDir: "",
          seed: 0,
          skipFilter: false,
          snapshotFormat: {},
          errorOnDeprecated: false,
          testFailureExitCode: 0,
          testPathPattern: "",
          testSequencer: "",
          updateSnapshot: "all",
          useStderr: false,
          watch: false,
          watchAll: false,
          watchman: false
        }
      },
      {
        testPath: "",
        console,
        docblockPragmas: {}
      }
    );
    global.vPrismaDelegate = delegate;
    global.vPrisma = await delegate.preSetup();
    return {
      async teardown(global2) {
        await delegate.teardown();
        delete global2.vPrismaDelegate;
        delete global2.vPrisma;
        await envReturn.teardown(global2);
      }
    };
  }
};

export { index as default };
