## !!DEPRECATED!!
... in favor of https://github.com/bradfordlemley/cra-monorepo-examples


#### TLDR;
This repo demonstrates a proposal ([3436](http://github.com/facebookincubator/create-react-app/issues/3436)) for a source sharing feature in create-react-app.

See [How to use in your own app](#how-to-use-in-your-own-app) section for instructions.

#### Desired monorepo structure
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
       |--file1.js: import comp1 from ‘comp1’ ← ok, shared/comp1
       |--file2.js: import comp1 from ‘../../shared/comp1’  ← naughty, fails
  |--cra-app2
     |--package.json: srcPaths: [“../shared”, "./packages"]
     |--src
       |--file1.js: import comp1 from ‘comp1’ ← ok, shared/comp1
       |--file2.js: import comp3 from ‘comp3’ ← ok, packages/comp3
     |--packages
       |--comp3
  |--shared
    |--comp1
    |--comp2
</pre>

#### Description
* srcPaths are specified in the CRA app's package.json.
* srcPaths are treated the same as /src
  * Transpiled using same config (.babelrc under srcPath is not honored)
  * **Do not have their own dependencies** (ie. do not have their own node_modules)
  * All dependencies must be included in app’s package.json / node_modules
  * All jest tests are included
* Modules under srcPaths are included in CRA app via absolute imports.
  * Including via relative import fails, same as standard CRA
* Overlapping srcPaths are not allowed, e.g. [“../shared”, “../shared/comp1”]
  * This is to avoid confusion, to keep resolution something easy to reason about.
  * This is not yet enforced, but it will be in the future, so don't do it.
* srcPaths are paths relative to app root (where package.json is) ... they can be absolute paths, too, but relative paths are the obvious choice for monorepos.
* Resolve order is same as order of srcPaths.

#### Implementation (fork of CRA)
* https://github.com/bradfordlemley/create-react-app/tree/feature-srcPaths
* https://github.com/bradfordlemley/create-react-app/commit/709dc407e2855f5dbdd982bde19dc0141e0d8e7c

#### Install react-scripts with srcPaths support
1. git clone https://github.com/bradfordlemley/create-react-app
1. cd create-react-app
1. git checkout feature-srcPaths
1. cd packages/react-scripts
1. npm install  <-- install react-scripts dependencies
1. npm link  <-- tell your npm that you might want to use this version of react-scripts somewhere

#### How to try this example
1. Install react-scripts with srcPaths support as described above
1. git clone https://github.com/bradfordlemley/cra-share
1. Run app 1
   1. cd cra-share/cra-app1
   1. npm install
   1. npm link react-scripts <-- tell npm you want to use the react-scripts that was installed above
   1. npm start  <-- run app 1
   1. npm test|build|anything else that you can normally do with a create-react-app
1. Run app 2
   1. cd cra-share/cra-app2
   1. npm install
   1. npm link react-scripts <-- tell npm you want to use the react-scripts that was installed above
   1. npm start  <-- run app 2
   1. npm start|test|build|anything else that you can normally do with a create-react-app

#### How to use in your own app
Note: your app needs to be compatible with react-scripts v1.0.17, because this react-scripts w/ srcPaths support is forked from v1.0.17.

1. Install react-scripts with srcPaths support as described above
1. Open console at your app (create new app using standard create-react-app tool or use your existing app)
1. npm link react-scripts <-- tell npm you want to use the modified react-scripts that was installed above

   If you run ```npm install``` again in your app, you need to run ```npm link react-scripts``` again as ```npm install``` will wipe out the link
1. Add srcPaths to your package.json
1. Put your shared modules in one of the srcPaths
1. Import your shared modules from your app
1. To revert to your app to use previous react-scripts version, run ```npm install``` in your app, that will wipe out the link to the react-scripts with srcPaths.

#### Todo
1. Update ModuleScopePlugin to handle srcPaths in same way it handles appSrc (fail if relative import outside srcPath)
1. Check for overlapping srcPaths
