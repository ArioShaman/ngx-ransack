import { Ransack } from './ransack.enum';
export interface IRansackParam {
    matcher: Ransack;
    name?: string;
    postfix?: string;
    from?: string;
}
