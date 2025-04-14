import {
  type JestPrismaEnvironmentOptions,
  PrismaEnvironmentDelegate,
} from '@quramy/jest-prisma-core';
import { builtinEnvironments } from 'vitest/dist/environments.js';
import type { Environment } from 'vitest/environments';

type Options = {
  vprisma?: JestPrismaEnvironmentOptions & {
    baseEnv?: keyof typeof builtinEnvironments;
  };
};

export default <Environment>{
  name: 'vprisma',
  transformMode: 'ssr',
  async setup(global, options: Options) {
    const { baseEnv, ...vprisma } = options.vprisma ?? {};
    const env = builtinEnvironments[baseEnv ?? 'node'];
    const envReturn = await env.setup(global, {});

    const delegate = new PrismaEnvironmentDelegate(
      {
        projectConfig: {
          testEnvironmentOptions: vprisma ?? {},
          automock: false,
          cache: false,
          cacheDirectory: '',
          clearMocks: false,
          collectCoverageFrom: [],
          coverageDirectory: '',
          coveragePathIgnorePatterns: [],
          cwd: '',
          detectLeaks: false,
          detectOpenHandles: false,
          errorOnDeprecated: false,
          extensionsToTreatAsEsm: [],
          fakeTimers: {
            enableGlobally: false,
            now: undefined,
            timerLimit: 10000,
          },
          forceCoverageMatch: [],
          globals: {},
          haste: {
            computeSha1: undefined,
            defaultPlatform: undefined,
            forceNodeFilesystemAPI: undefined,
            enableSymlinks: undefined,
            hasteImplModulePath: undefined,
            platforms: undefined,
            throwOnModuleCollision: undefined,
            hasteMapModulePath: undefined,
            retainAllFiles: undefined,
          },
          id: '',
          injectGlobals: false,
          moduleDirectories: [],
          moduleFileExtensions: [],
          moduleNameMapper: [],
          modulePathIgnorePatterns: [],
          openHandlesTimeout: 0,
          prettierPath: '',
          resetMocks: false,
          resetModules: false,
          restoreMocks: false,
          rootDir: '',
          roots: [],
          runner: '',
          sandboxInjectedGlobals: [],
          setupFiles: [],
          setupFilesAfterEnv: [],
          skipFilter: false,
          slowTestThreshold: 0,
          snapshotSerializers: [],
          snapshotFormat: {},
          testEnvironment: '',
          testMatch: [],
          testLocationInResults: false,
          testPathIgnorePatterns: [],
          testRegex: [],
          testRunner: '',
          transform: [],
          transformIgnorePatterns: [],
          watchPathIgnorePatterns: [],
        },
        globalConfig: {
          bail: 0,
          changedFilesWithAncestor: false,
          ci: false,
          collectCoverage: false,
          collectCoverageFrom: [],
          coverageDirectory: '',
          coverageProvider: 'babel',
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
          notifyMode: 'always',
          onlyChanged: false,
          onlyFailures: false,
          openHandlesTimeout: 0,
          passWithNoTests: false,
          projects: [],
          runInBand: false,
          runTestsByPath: false,
          rootDir: '',
          seed: 0,
          skipFilter: false,
          snapshotFormat: {},
          errorOnDeprecated: false,
          testFailureExitCode: 0,
          testPathPattern: '',
          testSequencer: '',
          updateSnapshot: 'all',
          useStderr: false,
          watch: false,
          watchAll: false,
          watchman: false,
        },
      },
      {
        testPath: '',
        console: console,
        docblockPragmas: {},
      }
    );

    global.vPrismaDelegate = delegate;
    global.vPrisma = await delegate.preSetup();

    return {
      async teardown(global) {
        await delegate.teardown();
        delete global.vPrismaDelegate;
        delete global.vPrisma;
        await envReturn.teardown(global);
      },
    };
  },
};
