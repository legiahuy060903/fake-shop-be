
import { Like, Not, Between, Equal, LessThanOrEqual, In, MoreThanOrEqual, MoreThan, LessThan } from "typeorm"
export interface ApiQueryRestParams {
    _offset?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'ASC' | 'DESC';
    q?: string;
    name?: string;
    _noQuery?: number;
    [key: string]: any; // Allow additional properties
}
export interface IQuery {
    skip?: number;
    take?: number;
    sort?: string;
    order?: { [key: string]: string }
    q?: string;
    name?: string;
    [key: string]: any;
}

export const apiQueryRest = (params: ApiQueryRestParams): IQuery => {
    const { _offset, _limit, _sort, _order, q, name, _noQuery, ...rest } = params;
    let query: IQuery = {};

    if (_noQuery === 1) return null;
    if (_limit) query.take = +_limit;
    if (_offset) query.skip = +_offset;
    if (q) query.where = { [name || "name"]: Like(`%${q}%`) };
    if (_sort) query.order = { [_sort]: _order || "DESC" };

    if (Object.keys(rest).length > 0) {
        const whereConditions = {};
        for (const [index, value] of Object.entries(rest)) {
            const key = index.substring(1);
            const [op, ...opValue] = value.split("_");

            if (!whereConditions[key]) {
                whereConditions[key] = {};
            }
            if (op === 'between') {
                whereConditions[key] = Between(opValue[0], opValue[1]);
            } else if (op == "gte") {
                whereConditions[key] = MoreThanOrEqual(opValue.join('_'));
            } else if (op == "gt") {
                whereConditions[key] = MoreThan(opValue.join('_'));
            } else if (op == "lte") {
                whereConditions[key] = LessThanOrEqual(opValue.join('_'));
            } else if (op == "lt") {
                whereConditions[key] = LessThan(opValue.join('_'))
            } else if (op == "in") {
                whereConditions[key] = In(opValue.map((item: any) => item))
            } else if (op == "not") {
                whereConditions[key] = Not(opValue.map((item: any) => item))
            } else {
                whereConditions[key] = op
            }
        }
        query.where = { ...query.where, ...whereConditions };
    }
    return query;
};