"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_tab-artist_tab-artist_module_ts"],{

/***/ 5545:
/*!*********************************************************!*\
  !*** ./src/app/tab-artist/tab-artist-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabArtistPageRoutingModule": () => (/* binding */ TabArtistPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _tab_artist_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab-artist.page */ 9978);




const routes = [
    {
        path: '',
        component: _tab_artist_page__WEBPACK_IMPORTED_MODULE_0__.TabArtistPage
    }
];
let TabArtistPageRoutingModule = class TabArtistPageRoutingModule {
};
TabArtistPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], TabArtistPageRoutingModule);



/***/ }),

/***/ 8006:
/*!*************************************************!*\
  !*** ./src/app/tab-artist/tab-artist.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabArtistPageModule": () => (/* binding */ TabArtistPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _tab_artist_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab-artist-routing.module */ 5545);
/* harmony import */ var _tab_artist_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab-artist.page */ 9978);







let TabArtistPageModule = class TabArtistPageModule {
};
TabArtistPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _tab_artist_routing_module__WEBPACK_IMPORTED_MODULE_0__.TabArtistPageRoutingModule
        ],
        declarations: [_tab_artist_page__WEBPACK_IMPORTED_MODULE_1__.TabArtistPage]
    })
], TabArtistPageModule);



/***/ }),

/***/ 9978:
/*!***********************************************!*\
  !*** ./src/app/tab-artist/tab-artist.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabArtistPage": () => (/* binding */ TabArtistPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _tab_artist_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab-artist.page.html?ngResource */ 3495);
/* harmony import */ var _tab_artist_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab-artist.page.scss?ngResource */ 2592);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_supabase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/supabase.service */ 1829);





let TabArtistPage = class TabArtistPage {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    ngOnInit() {
        this.artists$ = this.supabaseService.artists$;
    }
};
TabArtistPage.ctorParameters = () => [
    { type: _services_supabase_service__WEBPACK_IMPORTED_MODULE_2__.SupabaseService }
];
TabArtistPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-tab-artist',
        template: _tab_artist_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_tab_artist_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], TabArtistPage);



/***/ }),

/***/ 2592:
/*!************************************************************!*\
  !*** ./src/app/tab-artist/tab-artist.page.scss?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWItYXJ0aXN0LnBhZ2Uuc2NzcyJ9 */";

/***/ }),

/***/ 3495:
/*!************************************************************!*\
  !*** ./src/app/tab-artist/tab-artist.page.html?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Artists</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ng-container *ngIf=\"artists$ | async as artists\">\n    <ion-list>\n      <ion-item *ngFor=\"let artist of artists\">\n        <ion-avatar slot=\"start\">\n          <img src=\"assets/map-icons/stage.png\" />\n        </ion-avatar>\n        <ion-label>\n          <h2>\n            {{artist.name}}\n          </h2>\n          <p>{{artist.description}}</p>\n        </ion-label>\n        <div slot=\"end\" class=\"actions\">\n          <ion-icon name=\"information\"></ion-icon>\n          <ion-icon name=\"location\"></ion-icon>\n          <ion-icon name=\"heart\"></ion-icon>\n        </div>\n      </ion-item>\n    </ion-list>\n  </ng-container>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_tab-artist_tab-artist_module_ts.js.map