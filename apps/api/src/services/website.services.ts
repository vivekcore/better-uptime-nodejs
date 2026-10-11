import { db, NotFoundError, ValidationError } from "@repo/db";
import { z } from "zod";


class WebsiteServices {
    async addSite(_url:string, user_id: string) {
        const zodSchema = z.object({
            url: z.string().max(500).min(8)
        })
        const parse = zodSchema.safeParse({url:_url})
        if(!parse.success){
            throw new ValidationError(undefined, 
                parse.error.issues.map((issue) => ({
                    path: issue.path,
                    message: issue.message
                }))
             )
        }

        const {url} = parse.data;
        const response = await db.orm.public.Website.create({url,userId:user_id});

        return {
            id: response.id,
            user_id: response.userId,
            url: response.url,
            time_added: response.timeAdded,
            isActive: response.isActive
        }

    }
    async fetchAllSites(user_id: string) {
        const response = await db.orm.public.Website.where({userId:user_id}).all();

        return response.map((v) => ({
            id: v.id,
            url: v.url,
            time_added: v.timeAdded,
            isActive: v.isActive    
        }))
    }
    async fetchOneSite(site_id: string, user_id: string) {
        const response = await db.orm.public.Website.first({userId:user_id, id: site_id});
        if(!response){
            throw new NotFoundError()
        }
        return {
            id: response.id,
            user_id: response.userId,
            url: response.url,
            time_added: response.timeAdded,
            isActive: response.isActive
        }
    }
}

export const websiteServices = new WebsiteServices()