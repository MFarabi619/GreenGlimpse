import 'server-only';
import {Generated, Insertable, Kysely, Selectable} from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export async function findUsersPartialMatch(name:string): Promise<User[]>{
    const users = await DB
        .selectFrom('users')
        .select(['id', 'name', 'username', 'email'])
        .where('name', 'like', `%${name}%`)
        .execute();
    return users;
}



interface YTDEmissions {
    id: string;
    CompanyID: number; // FK
    Name: string;
    Year: number;
    Scope: number;
    Category: "Transportation" | "Electricity" | "Manufacturing" | "Storage" | "Waste" | "Other";
    CO2e: number;
    CH4: number;
    N2O: number;
    HFC: number;
    Total: number;
    LastUpdated: Date | string;
}



interface Database {
    users: User;
  ytdEmissions: YTDEmissions;
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export type SelectYTDEmissions = Selectable<YTDEmissions>;
export type NewYTDEmissions = Insertable<YTDEmissions>;
export async function findMatchingEmissions(criteria: Partial<SelectYTDEmissions>) {
    let query = DB.selectFrom('ytdEmissions')
    if(criteria.CompanyID) {
        query = query.where('CompanyID','=', criteria.CompanyID)
    }
    if(criteria.Year) {
        query = query.where('Year','=', criteria.Year)
    }
    if(criteria.Scope) {
        query = query.where('Scope','=', criteria.Scope)
    }
    if(criteria.Category) {
        query = query.where('Category','=', criteria.Category)
    }
    if(criteria.Name){
        query = query.where('Name', 'like', `%${criteria.Name}%`)
    }
    return await query.selectAll().execute();

}

export async function insertYtdEmmissions(emissions: NewYTDEmissions) {
    return await DB.insertInto('ytdEmissions').values(emissions).execute();
}


export const DB = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
