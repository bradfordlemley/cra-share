### create-react-app Proposal: Source Sharing

Why:
There are many reasons for sharing code between different apps, but it is currently difficult to achieve with Create-React-App.

### Desired monorepo with shared source
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

### Proposal
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

### Notes
* srcPaths are specified in package.json.
* Modules under srcPaths can be included via absolute imports.
  * Attempting to include via relative import will fail.
* Modules included via srcPaths are treated the same as files under /src
  * Transpiled using same config (.babelrc under srcPath is not honored)
  * Do not have their own dependencies (ie. do not have their own node_modules)
  * All dependencies must be included in app’s package.json / node_modules
* Overlapping srcPaths are not allowed, e.g. [“../shared”, “../shared/comp1”]
  * This is to avoid confusion, to keep resolution something easy to reason about.
* srcPaths *should* be relative ... but they don't really need to be.
* Resolve order is same as order of srcPaths.

### create-react-app with srcPaths support is available
https://github.com/bradfordlemley/create-react-app/tree/feature-srcPaths

#### Install create-react-app with srcPaths support
1. git clone https://github.com/bradfordlemley/create-react-app
1. cd create-react-app
1. git checkout feature-srcPaths
1. cd packages/react-scripts
1. npm install  <-- install react-scripts dependencies
1. npm link  <-- tell your npm that you might want to use this version of react-scripts somewhere

#### Try this example monorepo
1. Install create-react-app with srcPaths support as described above
1. git clone https://github.com/bradfordlemley/cra-share
1. Run app 1
   1. cd cra-share/cra-app1
   1. npm install
   1. npm link react-scripts <-- tell npm you want to use the modified react-scripts that was installed above
   1. npm start  <-- run app 1
   1. npm test|build|anything else that you can normally do with a create-react-app
1. Run app 2
   1. cd cra-share/cra-app2
   1. npm install
   1. npm link react-scripts <-- tell npm you want to use the modified react-scripts that was installed above
   1. npm start  <-- run app 2
   1. npm start|test|build|anything else that you can normally do with a create-react-app

#### Or, try out srcPaths in your own app
1. Install create-react-app with srcPaths support as described above
1. Open console at your app (create new app using standard create-react-app tool or use your existing app)
1. npm link react-scripts <-- tell npm you want to use the modified react-scripts that was installed above
1. Add srcPaths to your package.json
1. Put your shared modules in one of the srcPaths
1. Import your shared modules from your app

### Todo
1. Update ModuleScopePlugin to handle srcPaths in same way it handles appSrc (fail if relative import outside srcPath)
1. Check for overlapping srcPaths




