(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('ngx-ransack', ['exports', '@angular/core', '@angular/common/http'], factory) :
    (global = global || self, factory(global['ngx-ransack'] = {}, global.ng.core, global.ng.common.http));
}(this, (function (exports, i0, http) { 'use strict';

    (function (Ransack) {
        Ransack[Ransack["Eq"] = 0] = "Eq";
        Ransack[Ransack["NotEq"] = 1] = "NotEq";
        Ransack[Ransack["Gt"] = 2] = "Gt";
        Ransack[Ransack["Gteq"] = 3] = "Gteq";
        Ransack[Ransack["GtAny"] = 4] = "GtAny";
        Ransack[Ransack["Lt"] = 5] = "Lt";
        Ransack[Ransack["Lteq"] = 6] = "Lteq";
        Ransack[Ransack["LtAny"] = 7] = "LtAny";
        Ransack[Ransack["In"] = 8] = "In";
        Ransack[Ransack["NotIn"] = 9] = "NotIn";
        Ransack[Ransack["Present"] = 10] = "Present";
        Ransack[Ransack["Blank"] = 11] = "Blank";
        Ransack[Ransack["Cont"] = 12] = "Cont";
        Ransack[Ransack["NotCont"] = 13] = "NotCont";
    })(exports.Ransack || (exports.Ransack = {}));

    var NgxRansackService = /** @class */ (function () {
        function NgxRansackService() {
        }
        /**
          * Filters keys must be same with Options keys
          *
          * For example:
          *
          * filters: {
          *   authorId: [1,2,3]
          * }
          *
          * options: {
          *   authorId: {
          *     matcher: Ransack.In
          *   }
          * }
        */
        /** Filters is FormData */
        /**
          * Filters can take 3 types of Input params:
          * Ransack enum operation
          * Object of IRansackParam
          * Array of objects IRansackParam
          *
          * For example
          *
          * {
          *   authorId: {
          *     matcher: Ransack.In,
          *   },
          *   price: [
          *     {
          *       matcher: Ransack.Gt,
          *       from: 'min'
          *    },
          *    {
          *       matcher: Ransack.Lt,
          *       from: 'max'
          *    }
          *  ],
          *  title: Ransack.NotEq,
          *}
        */
        /**
          * Options params:
          *
          ****
          * matcher - choose ransack operation;
      
          ****
          * postfix - add postfix name to param, for example:
          *
          * option = {
          *   author: {
          *     postfix: 'id'
          *   }
          * }
          *
          * return: q[author_id_{matcher}]
          *
          ****
          * name - change naming ransack params from object key to custom name,
          * for example:
          *
          * options = {
          *   authorId: {
          *     name: 'authorIds'
          *   }
          * };
          *
          * return: q[author_ids_{matcher}]
          *
          ****
          * from - choose value of param from input Object by key, for example:
          *
          * filters = {
          *   price: {
          *     min: 1,
          *     max: 10
          *   }
          * };
          *
          * options = {
          *   price: {
          *     mathcer: Ransack.Gt,
          *     from: 'min'
          *   }
          * }
          *
          * return: 'q[price_gt] = 1'
        */
        NgxRansackService.prototype.toRansack = function (filters, options) {
            var _this = this;
            var httpParams = new http.HttpParams();
            var keys = Object.keys(filters);
            keys.forEach(function (key) {
                if (Array.isArray(options[key])) {
                    /** If Options is Array of options */
                    options[key].forEach(function (option) {
                        httpParams = _this._setParam(option, filters, key, httpParams);
                    });
                }
                else if (options[key] instanceof Object) {
                    /** If Options is Option object */
                    var option = options[key];
                    httpParams = _this._setParam(option, filters, key, httpParams);
                }
                else {
                    /** If Options is Ransack operation */
                    var option = {
                        matcher: options[key]
                    };
                    httpParams = _this._setParam(option, filters, key, httpParams);
                }
            });
            return httpParams;
        };
        NgxRansackService.prototype._setParam = function (option, filters, key, httpParams) {
            var filter = filters[key];
            var matcher = this._kebabStr(exports.Ransack[option.matcher]);
            var name = option.hasOwnProperty('name') ?
                this._kebabStr(option.name) : this._kebabStr(key);
            var postfix = option.hasOwnProperty('postfix') ?
                "_" + option.postfix : '';
            if (option.hasOwnProperty('from')) {
                filter = filter[option.from];
            }
            var paramName = "q[" + name + postfix + "_" + matcher + "]";
            if (Array.isArray(filter)) {
                paramName = paramName + '[]';
                filter.forEach(function (filterEl) {
                    httpParams = httpParams.set(paramName, filterEl);
                });
            }
            else {
                httpParams = httpParams.set(paramName, filter);
            }
            return httpParams;
        };
        NgxRansackService.prototype._kebabStr = function (str) {
            return str.split(/(?=[A-Z])/)
                .map(function (el) { return el.toLowerCase(); })
                .join('_');
        };
        return NgxRansackService;
    }());
    NgxRansackService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxRansackService_Factory() { return new NgxRansackService(); }, token: NgxRansackService, providedIn: "root" });
    NgxRansackService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgxRansackService.ctorParameters = function () { return []; };

    /*
     * Public API Surface of ngx-ransack
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxRansackService = NgxRansackService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-ransack.umd.js.map
