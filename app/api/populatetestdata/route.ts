import {DB, insertYtdEmmissions, NewYTDEmissions} from "@/lib/planetscale";
import {NextRequest, NextResponse} from "next/server";


export async function GET(req: NextRequest){
    //Populate test data
    const data = await req.json();

    const categories = ["Transportation", "Electricity", "Manufacturing", "Storage", "Waste", "Other"];

    let values = [];
    const insertPromises: any[] = [];
    for (let i = 0; i < 100; i++) {
        const company_id = Math.floor(Math.random() * 10) + 1;
        const year = [2020, 2021, 2022, 2023][Math.floor(Math.random() * 4)];
        const scope = Math.floor(Math.random() * 3) + 1;
        const category = "Transportation";
        const co2e = +(Math.random() * (10000 - 1000) + 1000).toFixed(2);
        const ch4 = +(Math.random() * (100 - 10) + 10).toFixed(2);
        const n2o = +(Math.random() * (50 - 5) + 5).toFixed(2);
        const hfc = +(Math.random() * (10 - 1) + 1).toFixed(2);
        const total = co2e + ch4 + n2o + hfc;
        const last_updated = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const emissions: NewYTDEmissions = {
            CompanyID: company_id,
            Year: year,
            Scope: scope,
            Category: category,
            CO2e: co2e,
            CH4: ch4,
            N2O: n2o,
            HFC: hfc,
            Total: total,
            LastUpdated: last_updated
        }
        const insertPromise = insertYtdEmmissions(emissions);
    }
    let res = new NextResponse()
    try {
        await Promise.all(insertPromises);
        return NextResponse.json({message: "Success"}, {status: 200})
    }catch (e) {
        console.error(e);
        return NextResponse.json({message: "Failed"}, {status: 500})
    }


}