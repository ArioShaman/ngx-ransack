## Transformer Angular FormData in Ransack params

# Usage

install with npm:

```npm i ngx-ransack --save```

# Usage

In Your Module

```ts
 ...  
 import { NgxRansackService } from 'ngx-ransack';
 ...
 
 @NgModule({
    providers: [
      ...
      NgxRansackService,
      ...
    ]
 })
```

In place where you want to use RansackService:

```ts
import { NgxRansackService } from 'ngx-ransack';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  constructor(
    ...
    private readonly ransackService: NgxRansackService,
    ...
  ){}
  
  public getPets(filters: IFormData, options: any): void {
    const params = {
      //return HttpParams
      params: this.ransackService.toRansack(filters, options);
    };
    console.log(params);

    this.http.get('/pets', params)
      .subscribe((res) => doSomething(res));
  }
}

```


## Notes


### 1) Filters keys must be same with Options keys.
For example:


```ts
  filters = {
    petsId: [1,2,3]
  }
  
  options = {
    petsId: {
      matcher: Ransack.In
    }
  }
```

### 2) Options can take 3 types of Input params:

* Ransack enum operation
* Object of IRansackParam
* Array of objects IRansackParam

For example:
    
```ts
{
  petsId: {
    matcher: Ransack.In,
  },
  price: [
    {
      matcher: Ransack.Gt,
      from: 'min'
    },
    {
       matcher: Ransack.Lt,
       from: 'max'
    }
  ],
  title: Ransack.NotEq,
}
```

 ### 3) Options params:
 
 **matcher** - choose ransack operation;
 
**postfix** - add postfix name to param, for example:

```ts
    const option = {
      author: {
        postfix: 'id'
        matcher:  Ransack.In
      }
    }
    
    // returns: q[author_id_in]
```

**name** - change naming ransack params from object key to custom name, for example:

```ts
    const options = {
      petId: {
        name: 'petIds'
        matcher:  Ransack.In
      }
    };
    
    // return: q[pet  _ids_in}]
```

**from** - choose value of param from input Object by key, for example:

```ts
    const filters = {
      price: {
        min: 1,
        max: 10
      }
    };
   
    const options = {
      price: {
        matcher: Ransack.Gt,
        from: 'min'
      }
    }
   
    // return: 'q[price_gt] = 1'
```
