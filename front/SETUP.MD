1. create src folder .ignore file build folder and public folder with index.html

<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Office Design</title>
  </head>
  <body>
    <div id="root"></div>
		<div id="modal-root"></div>
		<script type="text/javascript" async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmSz5YciOiq-rPQ9Pjy3ntdfB60Swex_s&libraries=places,geometry&language=he-IL"></script>
  </body>
</html>

2. git init
3. npm ini --y
4. npm install react react-dom
5. npm install --save-dev typescript @types/react @types/react-dom
   create tsconfig.json
   {
   "compilerOptions": {
   "target": "es5",
   "lib": [
   "dom",
   "dom.iterable",
   "esnext"
   ],
   "allowJs": true,
   "skipLibCheck": true,
   "esModuleInterop": true,
   "allowSyntheticDefaultImports": true,
   "strict": true,
   "forceConsistentCasingInFileNames": true,
   "noFallthroughCasesInSwitch": true,
   "module": "esnext",
   "moduleResolution": "node",
   "resolveJsonModule": true,
   "isolatedModules": true,
   "noEmit": true,
   "jsx": "react-jsx"
   },
   "include": [
   "src"
   ]
   }

6. create index.tsx
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';
   const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
   );
   root.render(<App />);

create App.tesx
import React from 'react';

function App() {
return (

<div className="App">
<header className="App-header">
<p>
and save to reload.
</p>
</header>
</div>
);
}

export default App;

7. npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
8. create .babelrc file

{
"presets": [
"@babel/preset-env",
[
"@babel/preset-react",
{
"runtime": "automatic"
}
],
"@babel/preset-typescript"
]
} 9) npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin 10) npm install --save-dev babel-loader 11) npm install --save-dev css-loader style-loader 12) npm install --save-dev webpack-merge
//==================++DONE===================

13. npm install eslint-plugin-eslint-comments@latest --save-dev
14. npm install --save-dev eslint

15. npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks
16. npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
17. npm install --save-dev eslint-plugin-import eslint-plugin-jsx-a11y
18. npm install --save-dev @pmmmwh/react-refresh-webpack-plugin react-refresh
19. npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

if there issue with eslintrc SLint couldn't determine the plugin "@typescript-eslint" uniquely.
just add
module.exports = {
root:true,

20. npm install --save-dev lint-staged --save-dev
21. npm install --save-dev husky@4

-- OPTIONAL -- 22) npm install --save-dev @babel/runtime @babel/plugin-transform-runtime 23) npm install --save-dev copy-webpack-plugin

22. npm install --save-dev sass-loader sass webpack --save-dev
23. npm i --save-dev mini-css-extract-plugin
24. npm install dotenv-webpack --save-dev
