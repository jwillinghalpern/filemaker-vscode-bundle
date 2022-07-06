import * as path from 'path';
import * as os from 'os';

import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // The path to test runner
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      // use tmpdir to avoid the 103 char limit for the path
      // https://stackoverflow.com/questions/71664226/cannot-run-vscode-extension-starter-project-tests-twice-in-a-row-on-macos
      launchArgs: ['--user-data-dir', `${os.tmpdir()}`],
    });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
