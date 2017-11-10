#### Create-React-App Proposal: Source Sharing

Why:
There are many reasons for sharing code between different apps, but it is currently difficult to achieve with Create-React-App.

#### Typical monorepo with shared source
<pre>
monorepo
  |--cra-app1
     |--package.json
     |--src
  |--cra-app2
     |--package.json
     |--src
  |--shared
    |--comp1
    |--comp2
</pre>

#### Proposal
<pre>
monorepo
 |--cra-app1
     |--package.json: srcPaths: [“../shared”]
     |--src
       |--file1.js: import comp1 from ‘comp1’ ← ok!
       |--file2.js: import comp1 from ‘../../shared/comp1’  ← naughty, fail!
  |--cra-app2
     |--package.json: srcPaths: [“../shared”]
     |--src
       |--file1.js: import comp1 from ‘comp1’ ← ok!
       |--file2.js: import comp1 from ‘../../shared/comp1’  ← naughty, fail!
  |--shared
    |--comp1
    |--comp2
</pre>

#### Notes
* srcPaths are specified in package.json.
* Modules under srcPaths can be included via absolute imports.
  * Attempting to include via relative import will fail.
* Modules included via srcPaths are treated the same as files under /src
  * Transpiled using same config (.babelrc under srcPath is not honored)
  * Do not have their own dependencies (ie. do not have their own node_modules)
  * All dependencies must be included in app’s package.json / node_modules
* Overlapping srcPaths are not allowed, e.g. [“../shared”, “../shared/comp1”]
 * This is to avoid confusion, keep resolution something you can easily reason about.
* srcPaths *should* be relative ... but they don't really need to be.
* Resolve order is same as order of srcPaths.
