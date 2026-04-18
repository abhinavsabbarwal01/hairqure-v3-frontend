/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/bff/proxy/[...path]/route";
exports.ids = ["app/bff/proxy/[...path]/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fbff%2Fproxy%2F%5B...path%5D%2Froute&page=%2Fbff%2Fproxy%2F%5B...path%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fbff%2Fproxy%2F%5B...path%5D%2Froute.ts&appDir=%2Fapp%2Ffrontend%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fbff%2Fproxy%2F%5B...path%5D%2Froute&page=%2Fbff%2Fproxy%2F%5B...path%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fbff%2Fproxy%2F%5B...path%5D%2Froute.ts&appDir=%2Fapp%2Ffrontend%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_frontend_src_app_bff_proxy_path_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/bff/proxy/[...path]/route.ts */ \"(rsc)/./src/app/bff/proxy/[...path]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/bff/proxy/[...path]/route\",\n        pathname: \"/bff/proxy/[...path]\",\n        filename: \"route\",\n        bundlePath: \"app/bff/proxy/[...path]/route\"\n    },\n    resolvedPagePath: \"/app/frontend/src/app/bff/proxy/[...path]/route.ts\",\n    nextConfigOutput,\n    userland: _app_frontend_src_app_bff_proxy_path_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZiZmYlMkZwcm94eSUyRiU1Qi4uLnBhdGglNUQlMkZyb3V0ZSZwYWdlPSUyRmJmZiUyRnByb3h5JTJGJTVCLi4ucGF0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmJmZiUyRnByb3h5JTJGJTVCLi4ucGF0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZhcHAlMkZmcm9udGVuZCUyRnNyYyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGYXBwJTJGZnJvbnRlbmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ0U7QUFDL0U7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9hcHAvZnJvbnRlbmQvc3JjL2FwcC9iZmYvcHJveHkvWy4uLnBhdGhdL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2JmZi9wcm94eS9bLi4ucGF0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2JmZi9wcm94eS9bLi4ucGF0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYmZmL3Byb3h5L1suLi5wYXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9hcHAvZnJvbnRlbmQvc3JjL2FwcC9iZmYvcHJveHkvWy4uLnBhdGhdL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fbff%2Fproxy%2F%5B...path%5D%2Froute&page=%2Fbff%2Fproxy%2F%5B...path%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fbff%2Fproxy%2F%5B...path%5D%2Froute.ts&appDir=%2Fapp%2Ffrontend%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/bff/proxy/[...path]/route.ts":
/*!**********************************************!*\
  !*** ./src/app/bff/proxy/[...path]/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   PUT: () => (/* binding */ PUT),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nconst UPSTREAM = process.env.BACKEND_URL || \"http://65.0.107.90:8080\";\nasync function forward(req, path) {\n    const url = `${UPSTREAM}/${path.join(\"/\")}${req.nextUrl.search}`;\n    const headers = new Headers(req.headers);\n    headers.delete(\"host\");\n    headers.delete(\"connection\");\n    headers.delete(\"content-length\");\n    const body = [\n        \"GET\",\n        \"HEAD\"\n    ].includes(req.method) ? undefined : await req.text();\n    try {\n        const r = await fetch(url, {\n            method: req.method,\n            headers,\n            body,\n            cache: \"no-store\"\n        });\n        const buf = await r.arrayBuffer();\n        const res = new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(buf, {\n            status: r.status\n        });\n        r.headers.forEach((v, k)=>{\n            if (!/^(content-encoding|transfer-encoding|connection)$/i.test(k)) res.headers.set(k, v);\n        });\n        return res;\n    } catch (e) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"proxy_error\",\n            message: String(e)\n        }, {\n            status: 502\n        });\n    }\n}\nasync function GET(req, { params }) {\n    return forward(req, (await params).path);\n}\nasync function POST(req, { params }) {\n    return forward(req, (await params).path);\n}\nasync function PUT(req, { params }) {\n    return forward(req, (await params).path);\n}\nasync function PATCH(req, { params }) {\n    return forward(req, (await params).path);\n}\nasync function DELETE(req, { params }) {\n    return forward(req, (await params).path);\n}\nconst dynamic = \"force-dynamic\";\nconst runtime = \"nodejs\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2JmZi9wcm94eS9bLi4ucGF0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBd0Q7QUFFeEQsTUFBTUMsV0FBV0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLElBQUk7QUFFNUMsZUFBZUMsUUFBUUMsR0FBZ0IsRUFBRUMsSUFBYztJQUNyRCxNQUFNQyxNQUFNLEdBQUdQLFNBQVMsQ0FBQyxFQUFFTSxLQUFLRSxJQUFJLENBQUMsT0FBT0gsSUFBSUksT0FBTyxDQUFDQyxNQUFNLEVBQUU7SUFDaEUsTUFBTUMsVUFBVSxJQUFJQyxRQUFRUCxJQUFJTSxPQUFPO0lBQ3ZDQSxRQUFRRSxNQUFNLENBQUM7SUFBU0YsUUFBUUUsTUFBTSxDQUFDO0lBQWVGLFFBQVFFLE1BQU0sQ0FBQztJQUNyRSxNQUFNQyxPQUFPO1FBQUM7UUFBTztLQUFPLENBQUNDLFFBQVEsQ0FBQ1YsSUFBSVcsTUFBTSxJQUFJQyxZQUFZLE1BQU1aLElBQUlhLElBQUk7SUFDOUUsSUFBSTtRQUNGLE1BQU1DLElBQUksTUFBTUMsTUFBTWIsS0FBSztZQUFFUyxRQUFRWCxJQUFJVyxNQUFNO1lBQUVMO1lBQVNHO1lBQU1PLE9BQU87UUFBVztRQUNsRixNQUFNQyxNQUFNLE1BQU1ILEVBQUVJLFdBQVc7UUFDL0IsTUFBTUMsTUFBTSxJQUFJekIscURBQVlBLENBQUN1QixLQUFLO1lBQUVHLFFBQVFOLEVBQUVNLE1BQU07UUFBQztRQUNyRE4sRUFBRVIsT0FBTyxDQUFDZSxPQUFPLENBQUMsQ0FBQ0MsR0FBR0M7WUFDcEIsSUFBSSxDQUFDLHFEQUFxREMsSUFBSSxDQUFDRCxJQUFJSixJQUFJYixPQUFPLENBQUNtQixHQUFHLENBQUNGLEdBQUdEO1FBQ3hGO1FBQ0EsT0FBT0g7SUFDVCxFQUFFLE9BQU9PLEdBQUc7UUFDVixPQUFPaEMscURBQVlBLENBQUNpQyxJQUFJLENBQUM7WUFBRUMsT0FBTztZQUFlQyxTQUFTQyxPQUFPSjtRQUFHLEdBQUc7WUFBRU4sUUFBUTtRQUFJO0lBQ3ZGO0FBQ0Y7QUFFTyxlQUFlVyxJQUFJL0IsR0FBZ0IsRUFBRSxFQUFFZ0MsTUFBTSxFQUEyQztJQUFJLE9BQU9qQyxRQUFRQyxLQUFLLENBQUMsTUFBTWdDLE1BQUssRUFBRy9CLElBQUk7QUFBRztBQUN0SSxlQUFlZ0MsS0FBS2pDLEdBQWdCLEVBQUUsRUFBRWdDLE1BQU0sRUFBMkM7SUFBSSxPQUFPakMsUUFBUUMsS0FBSyxDQUFDLE1BQU1nQyxNQUFLLEVBQUcvQixJQUFJO0FBQUc7QUFDdkksZUFBZWlDLElBQUlsQyxHQUFnQixFQUFFLEVBQUVnQyxNQUFNLEVBQTJDO0lBQUksT0FBT2pDLFFBQVFDLEtBQUssQ0FBQyxNQUFNZ0MsTUFBSyxFQUFHL0IsSUFBSTtBQUFHO0FBQ3RJLGVBQWVrQyxNQUFNbkMsR0FBZ0IsRUFBRSxFQUFFZ0MsTUFBTSxFQUEyQztJQUFJLE9BQU9qQyxRQUFRQyxLQUFLLENBQUMsTUFBTWdDLE1BQUssRUFBRy9CLElBQUk7QUFBRztBQUN4SSxlQUFlbUMsT0FBT3BDLEdBQWdCLEVBQUUsRUFBRWdDLE1BQU0sRUFBMkM7SUFBSSxPQUFPakMsUUFBUUMsS0FBSyxDQUFDLE1BQU1nQyxNQUFLLEVBQUcvQixJQUFJO0FBQUc7QUFDekksTUFBTW9DLFVBQVUsZ0JBQWdCO0FBQ2hDLE1BQU1DLFVBQVUsU0FBUyIsInNvdXJjZXMiOlsiL2FwcC9mcm9udGVuZC9zcmMvYXBwL2JmZi9wcm94eS9bLi4ucGF0aF0vcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5jb25zdCBVUFNUUkVBTSA9IHByb2Nlc3MuZW52LkJBQ0tFTkRfVVJMIHx8IFwiaHR0cDovLzY1LjAuMTA3LjkwOjgwODBcIjtcblxuYXN5bmMgZnVuY3Rpb24gZm9yd2FyZChyZXE6IE5leHRSZXF1ZXN0LCBwYXRoOiBzdHJpbmdbXSkge1xuICBjb25zdCB1cmwgPSBgJHtVUFNUUkVBTX0vJHtwYXRoLmpvaW4oXCIvXCIpfSR7cmVxLm5leHRVcmwuc2VhcmNofWA7XG4gIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXEuaGVhZGVycyk7XG4gIGhlYWRlcnMuZGVsZXRlKFwiaG9zdFwiKTsgaGVhZGVycy5kZWxldGUoXCJjb25uZWN0aW9uXCIpOyBoZWFkZXJzLmRlbGV0ZShcImNvbnRlbnQtbGVuZ3RoXCIpO1xuICBjb25zdCBib2R5ID0gW1wiR0VUXCIsIFwiSEVBRFwiXS5pbmNsdWRlcyhyZXEubWV0aG9kKSA/IHVuZGVmaW5lZCA6IGF3YWl0IHJlcS50ZXh0KCk7XG4gIHRyeSB7XG4gICAgY29uc3QgciA9IGF3YWl0IGZldGNoKHVybCwgeyBtZXRob2Q6IHJlcS5tZXRob2QsIGhlYWRlcnMsIGJvZHksIGNhY2hlOiBcIm5vLXN0b3JlXCIgfSk7XG4gICAgY29uc3QgYnVmID0gYXdhaXQgci5hcnJheUJ1ZmZlcigpO1xuICAgIGNvbnN0IHJlcyA9IG5ldyBOZXh0UmVzcG9uc2UoYnVmLCB7IHN0YXR1czogci5zdGF0dXMgfSk7XG4gICAgci5oZWFkZXJzLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgIGlmICghL14oY29udGVudC1lbmNvZGluZ3x0cmFuc2Zlci1lbmNvZGluZ3xjb25uZWN0aW9uKSQvaS50ZXN0KGspKSByZXMuaGVhZGVycy5zZXQoaywgdik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcInByb3h5X2Vycm9yXCIsIG1lc3NhZ2U6IFN0cmluZyhlKSB9LCB7IHN0YXR1czogNTAyIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBOZXh0UmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyBwYXRoOiBzdHJpbmdbXSB9PiB9KSB7IHJldHVybiBmb3J3YXJkKHJlcSwgKGF3YWl0IHBhcmFtcykucGF0aCk7IH1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QsIHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgcGF0aDogc3RyaW5nW10gfT4gfSkgeyByZXR1cm4gZm9yd2FyZChyZXEsIChhd2FpdCBwYXJhbXMpLnBhdGgpOyB9XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKHJlcTogTmV4dFJlcXVlc3QsIHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgcGF0aDogc3RyaW5nW10gfT4gfSkgeyByZXR1cm4gZm9yd2FyZChyZXEsIChhd2FpdCBwYXJhbXMpLnBhdGgpOyB9XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0gocmVxOiBOZXh0UmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyBwYXRoOiBzdHJpbmdbXSB9PiB9KSB7IHJldHVybiBmb3J3YXJkKHJlcSwgKGF3YWl0IHBhcmFtcykucGF0aCk7IH1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxOiBOZXh0UmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyBwYXRoOiBzdHJpbmdbXSB9PiB9KSB7IHJldHVybiBmb3J3YXJkKHJlcSwgKGF3YWl0IHBhcmFtcykucGF0aCk7IH1cbmV4cG9ydCBjb25zdCBkeW5hbWljID0gXCJmb3JjZS1keW5hbWljXCI7XG5leHBvcnQgY29uc3QgcnVudGltZSA9IFwibm9kZWpzXCI7XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiVVBTVFJFQU0iLCJwcm9jZXNzIiwiZW52IiwiQkFDS0VORF9VUkwiLCJmb3J3YXJkIiwicmVxIiwicGF0aCIsInVybCIsImpvaW4iLCJuZXh0VXJsIiwic2VhcmNoIiwiaGVhZGVycyIsIkhlYWRlcnMiLCJkZWxldGUiLCJib2R5IiwiaW5jbHVkZXMiLCJtZXRob2QiLCJ1bmRlZmluZWQiLCJ0ZXh0IiwiciIsImZldGNoIiwiY2FjaGUiLCJidWYiLCJhcnJheUJ1ZmZlciIsInJlcyIsInN0YXR1cyIsImZvckVhY2giLCJ2IiwiayIsInRlc3QiLCJzZXQiLCJlIiwianNvbiIsImVycm9yIiwibWVzc2FnZSIsIlN0cmluZyIsIkdFVCIsInBhcmFtcyIsIlBPU1QiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsImR5bmFtaWMiLCJydW50aW1lIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/bff/proxy/[...path]/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fbff%2Fproxy%2F%5B...path%5D%2Froute&page=%2Fbff%2Fproxy%2F%5B...path%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fbff%2Fproxy%2F%5B...path%5D%2Froute.ts&appDir=%2Fapp%2Ffrontend%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();