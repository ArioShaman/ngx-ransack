import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Ransack } from './models/ransack.enum';
import * as i0 from "@angular/core";
export class NgxRansackService {
    constructor() { }
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
    toRansack(filters, options) {
        let httpParams = new HttpParams();
        const keys = Object.keys(filters);
        keys.forEach((key) => {
            if (Array.isArray(options[key])) {
                /** If Options is Array of options */
                options[key].forEach((option) => {
                    httpParams = this._setParam(option, filters, key, httpParams);
                });
            }
            else if (options[key] instanceof Object) {
                /** If Options is Option object */
                const option = options[key];
                httpParams = this._setParam(option, filters, key, httpParams);
            }
            else {
                /** If Options is Ransack operation */
                const option = {
                    matcher: options[key]
                };
                httpParams = this._setParam(option, filters, key, httpParams);
            }
        });
        return httpParams;
    }
    _setParam(option, filters, key, httpParams) {
        let filter = filters[key];
        const matcher = this._kebabStr(Ransack[option.matcher]);
        const name = option.hasOwnProperty('name') ?
            this._kebabStr(option.name) : this._kebabStr(key);
        const postfix = option.hasOwnProperty('postfix') ?
            `_${option.postfix}` : '';
        if (option.hasOwnProperty('from')) {
            filter = filter[option.from];
        }
        let paramName = `q[${name}${postfix}_${matcher}]`;
        if (Array.isArray(filter)) {
            paramName = paramName + '[]';
            filter.forEach((filterEl) => {
                httpParams = httpParams.set(paramName, filterEl);
            });
        }
        else {
            httpParams = httpParams.set(paramName, filter);
        }
        return httpParams;
    }
    _kebabStr(str) {
        return str.split(/(?=[A-Z])/)
            .map((el) => el.toLowerCase())
            .join('_');
    }
}
NgxRansackService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxRansackService_Factory() { return new NgxRansackService(); }, token: NgxRansackService, providedIn: "root" });
NgxRansackService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgxRansackService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJhbnNhY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1yYW5zYWNrL3NyYy9saWIvbmd4LXJhbnNhY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBTWhELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsZ0JBQWdCLENBQUM7SUFFakI7Ozs7Ozs7Ozs7Ozs7O01BY0U7SUFFRiwwQkFBMEI7SUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXdCRTtJQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQStDRTtJQUVLLFNBQVMsQ0FBQyxPQUFZLEVBQUUsT0FBYTtRQUMxQyxJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRWxDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ25CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDL0IscUNBQXFDO2dCQUVyQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQzlCLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRSxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLE1BQU0sRUFBRTtnQkFDekMsa0NBQWtDO2dCQUVsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQy9EO2lCQUFNO2dCQUNMLHNDQUFzQztnQkFFdEMsTUFBTSxNQUFNLEdBQUc7b0JBQ2IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUM7aUJBQ3RCLENBQUM7Z0JBRUYsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDL0Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFTyxTQUFTLENBQ2YsTUFBcUIsRUFDckIsT0FBWSxFQUNaLEdBQVcsRUFDWCxVQUFzQjtRQUV0QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFeEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRTVCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNqQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtRQUVELElBQUksU0FBUyxHQUFHLEtBQUssSUFBSSxHQUFHLE9BQU8sSUFBSSxPQUFPLEdBQUcsQ0FBQztRQUVsRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsU0FBUyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMxQixVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxHQUFXO1FBQzNCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDMUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQzs7OztZQXhLRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBSYW5zYWNrIH0gZnJvbSAnLi9tb2RlbHMvcmFuc2Fjay5lbnVtJztcbmltcG9ydCB7IElSYW5zYWNrUGFyYW0gfSBmcm9tICcuL21vZGVscy9yYW5zYWNrLXBhcmFtLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFJhbnNhY2tTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICAqIEZpbHRlcnMga2V5cyBtdXN0IGJlIHNhbWUgd2l0aCBPcHRpb25zIGtleXNcbiAgICAqXG4gICAgKiBGb3IgZXhhbXBsZTpcbiAgICAqXG4gICAgKiBmaWx0ZXJzOiB7XG4gICAgKiAgIGF1dGhvcklkOiBbMSwyLDNdXG4gICAgKiB9XG4gICAgKlxuICAgICogb3B0aW9uczoge1xuICAgICogICBhdXRob3JJZDoge1xuICAgICogICAgIG1hdGNoZXI6IFJhbnNhY2suSW5cbiAgICAqICAgfVxuICAgICogfVxuICAqL1xuXG4gIC8qKiBGaWx0ZXJzIGlzIEZvcm1EYXRhICovXG5cbiAgLyoqXG4gICAgKiBGaWx0ZXJzIGNhbiB0YWtlIDMgdHlwZXMgb2YgSW5wdXQgcGFyYW1zOlxuICAgICogUmFuc2FjayBlbnVtIG9wZXJhdGlvblxuICAgICogT2JqZWN0IG9mIElSYW5zYWNrUGFyYW1cbiAgICAqIEFycmF5IG9mIG9iamVjdHMgSVJhbnNhY2tQYXJhbVxuICAgICpcbiAgICAqIEZvciBleGFtcGxlXG4gICAgKlxuICAgICoge1xuICAgICogICBhdXRob3JJZDoge1xuICAgICogICAgIG1hdGNoZXI6IFJhbnNhY2suSW4sXG4gICAgKiAgIH0sXG4gICAgKiAgIHByaWNlOiBbXG4gICAgKiAgICAge1xuICAgICogICAgICAgbWF0Y2hlcjogUmFuc2Fjay5HdCxcbiAgICAqICAgICAgIGZyb206ICdtaW4nXG4gICAgKiAgICB9LFxuICAgICogICAge1xuICAgICogICAgICAgbWF0Y2hlcjogUmFuc2Fjay5MdCxcbiAgICAqICAgICAgIGZyb206ICdtYXgnXG4gICAgKiAgICB9XG4gICAgKiAgXSxcbiAgICAqICB0aXRsZTogUmFuc2Fjay5Ob3RFcSxcbiAgICAqfVxuICAqL1xuXG4gIC8qKlxuICAgICogT3B0aW9ucyBwYXJhbXM6XG4gICAgKlxuICAgICoqKipcbiAgICAqIG1hdGNoZXIgLSBjaG9vc2UgcmFuc2FjayBvcGVyYXRpb247XG5cbiAgICAqKioqXG4gICAgKiBwb3N0Zml4IC0gYWRkIHBvc3RmaXggbmFtZSB0byBwYXJhbSwgZm9yIGV4YW1wbGU6XG4gICAgKlxuICAgICogb3B0aW9uID0ge1xuICAgICogICBhdXRob3I6IHtcbiAgICAqICAgICBwb3N0Zml4OiAnaWQnXG4gICAgKiAgIH1cbiAgICAqIH1cbiAgICAqXG4gICAgKiByZXR1cm46IHFbYXV0aG9yX2lkX3ttYXRjaGVyfV1cbiAgICAqXG4gICAgKioqKlxuICAgICogbmFtZSAtIGNoYW5nZSBuYW1pbmcgcmFuc2FjayBwYXJhbXMgZnJvbSBvYmplY3Qga2V5IHRvIGN1c3RvbSBuYW1lLCBcbiAgICAqIGZvciBleGFtcGxlOlxuICAgICpcbiAgICAqIG9wdGlvbnMgPSB7XG4gICAgKiAgIGF1dGhvcklkOiB7XG4gICAgKiAgICAgbmFtZTogJ2F1dGhvcklkcydcbiAgICAqICAgfVxuICAgICogfTtcbiAgICAqXG4gICAgKiByZXR1cm46IHFbYXV0aG9yX2lkc197bWF0Y2hlcn1dXG4gICAgKlxuICAgICoqKipcbiAgICAqIGZyb20gLSBjaG9vc2UgdmFsdWUgb2YgcGFyYW0gZnJvbSBpbnB1dCBPYmplY3QgYnkga2V5LCBmb3IgZXhhbXBsZTpcbiAgICAqXG4gICAgKiBmaWx0ZXJzID0ge1xuICAgICogICBwcmljZToge1xuICAgICogICAgIG1pbjogMSxcbiAgICAqICAgICBtYXg6IDEwXG4gICAgKiAgIH1cbiAgICAqIH07XG4gICAgKlxuICAgICogb3B0aW9ucyA9IHtcbiAgICAqICAgcHJpY2U6IHtcbiAgICAqICAgICBtYXRoY2VyOiBSYW5zYWNrLkd0LFxuICAgICogICAgIGZyb206ICdtaW4nXG4gICAgKiAgIH1cbiAgICAqIH1cbiAgICAqXG4gICAgKiByZXR1cm46ICdxW3ByaWNlX2d0XSA9IDEnXG4gICovXG5cbiAgcHVibGljIHRvUmFuc2FjayhmaWx0ZXJzOiBhbnksIG9wdGlvbnM/OiBhbnkpOiBIdHRwUGFyYW1zIHtcbiAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZmlsdGVycyk7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnNba2V5XSkpIHtcbiAgICAgICAgLyoqIElmIE9wdGlvbnMgaXMgQXJyYXkgb2Ygb3B0aW9ucyAqL1xuXG4gICAgICAgIG9wdGlvbnNba2V5XS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5fc2V0UGFyYW0ob3B0aW9uLCBmaWx0ZXJzLCBrZXksIGh0dHBQYXJhbXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9uc1trZXldIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIC8qKiBJZiBPcHRpb25zIGlzIE9wdGlvbiBvYmplY3QgKi9cblxuICAgICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW2tleV07XG4gICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLl9zZXRQYXJhbShvcHRpb24sIGZpbHRlcnMsIGtleSwgaHR0cFBhcmFtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiogSWYgT3B0aW9ucyBpcyBSYW5zYWNrIG9wZXJhdGlvbiAqL1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHtcbiAgICAgICAgICBtYXRjaGVyOiBvcHRpb25zW2tleV1cbiAgICAgICAgfTtcblxuICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5fc2V0UGFyYW0ob3B0aW9uLCBmaWx0ZXJzLCBrZXksIGh0dHBQYXJhbXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIF9zZXRQYXJhbShcbiAgICBvcHRpb246IElSYW5zYWNrUGFyYW0sXG4gICAgZmlsdGVyczogYW55LFxuICAgIGtleTogc3RyaW5nLFxuICAgIGh0dHBQYXJhbXM6IEh0dHBQYXJhbXNcbiAgKTogSHR0cFBhcmFtcyB7XG4gICAgbGV0IGZpbHRlciA9IGZpbHRlcnNba2V5XTtcblxuICAgIGNvbnN0IG1hdGNoZXIgPSB0aGlzLl9rZWJhYlN0cihSYW5zYWNrW29wdGlvbi5tYXRjaGVyXSk7XG5cbiAgICBjb25zdCBuYW1lID0gb3B0aW9uLmhhc093blByb3BlcnR5KCduYW1lJykgP1xuICAgICAgdGhpcy5fa2ViYWJTdHIob3B0aW9uLm5hbWUpIDogdGhpcy5fa2ViYWJTdHIoa2V5KTtcblxuICAgIGNvbnN0IHBvc3RmaXggPSBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3Bvc3RmaXgnKSA/XG4gICAgICBgXyR7b3B0aW9uLnBvc3RmaXh9YCA6ICcnO1xuXG4gICAgaWYgKG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnZnJvbScpKSB7XG4gICAgICBmaWx0ZXIgPSBmaWx0ZXJbb3B0aW9uLmZyb21dO1xuICAgIH1cblxuICAgIGxldCBwYXJhbU5hbWUgPSBgcVske25hbWV9JHtwb3N0Zml4fV8ke21hdGNoZXJ9XWA7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICBwYXJhbU5hbWUgPSBwYXJhbU5hbWUgKyAnW10nO1xuXG4gICAgICBmaWx0ZXIuZm9yRWFjaCgoZmlsdGVyRWwpID0+IHtcbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KHBhcmFtTmFtZSwgZmlsdGVyRWwpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChwYXJhbU5hbWUsIGZpbHRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIF9rZWJhYlN0cihzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAgIC5tYXAoKGVsKSA9PiBlbC50b0xvd2VyQ2FzZSgpKVxuICAgICAgLmpvaW4oJ18nKTtcbiAgfVxuXG59XG4iXX0=