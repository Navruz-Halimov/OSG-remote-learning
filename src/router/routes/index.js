import camelCase from "lodash/camelCase";

const requireModule = require.context("@/views/", true, /\.(vue|js)$/i);
const routes = {};

const routeFiles = requireModule.keys();

// handle vue files
routeFiles.forEach((fileName) => {
  const isVueFile = /\.vue$/.test(fileName);

  // ignore not vue files
  if (!isVueFile) return;

  // ignore _component.vue or mixin.js files
  if (/\\_(component|mixin)/.test(fileName)) return;

  const filePath = fileName.slice().replace(/^\.\//g, "");

  let moduleName = camelCase(
    fileName.slice().replace(/(\.\/|\.(vue|js))/g, "")
  );

  moduleName = moduleName
    ? moduleName.slice().replace(/(index|meta)/gi, "")
    : moduleName;

  let path = fileName
    .slice()
    .replace(/(\.\/|\.(vue|js))/g, "")
    .replace(/index/gi, "")
    .replace(/\/_/g, "/:")
    .replace(/(\/)$/, "");

  // Пропустить index.vue
  if (fileName === "./index.vue") {
    routes["index"] = {
      name: "index",
      path: "",
      componentFilePath: filePath,
    };
    return;
  }

  routes[moduleName] = {
    name: moduleName,
    path,
    componentFilePath: filePath,
  };
});

// handle js (meta) files
const metaFiles = routeFiles.filter(
  (fileName) => /meta.js$/.test(fileName) && fileName
);

metaFiles.forEach((fileName) => {
  let moduleName = camelCase(fileName.slice().replace(/(\.\/|\.js)/g, ""));

  moduleName = moduleName
    ? moduleName.slice().replace(/(index|meta)/gi, "")
    : moduleName;

  const reqModule = requireModule(fileName);
  moduleName = moduleName.slice().replace(/meta/gi, "") || "index";

  // return if module name is index and add global meta to index page
  if (moduleName == "index") {
    // console.log(moduleName, routes[moduleName]);
    // routes[moduleName] = {
    //   ...(routes[moduleName] || {}),
    //   ...(reqModule || {}),
    // };
    return;
  }

  // find children routes with meta parent folder name
  const metaChildrenRoutes = Object.keys(routes).filter(
    (route) => route && route.indexOf(moduleName) != -1
  );

  // append meta props into child elements
  metaChildrenRoutes.forEach((metaModuleName) => {
    if (metaModuleName in routes) {
      routes[metaModuleName] = {
        ...(routes[metaModuleName] || {}),
        ...(reqModule || {}),
      };
    }
  });
});

if (process.env.NODE_ENV === "development") {
  console.log("routes", routes);
}

const r = Object.keys(routes)
  .map((item) => routes[item])
  .slice()
  .sort(
    (a, b) =>
      a && b && a.path && b.path && b.path.localeCompare(a.path, "en-US")
  );

// console.log("r", r);

export default r;
