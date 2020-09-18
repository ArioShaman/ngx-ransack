import { HttpParams } from '@angular/common/http';
export declare class NgxRansackService {
    constructor();
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
    toRansack(filters: any, options?: any): HttpParams;
    private _setParam;
    private _kebabStr;
}
