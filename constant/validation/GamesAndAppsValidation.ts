import {z} from "zod";

export const GamesAndAppsValidation = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    slug: z.string().min(2, {
        message: "[slug] must be at least 2 characters.",
    }),
    explanation: z.any().optional(),
    download_link: z.string().min(2, {
        message: "please provide donwload link for the game or app.",
    }),
    apps_game_version: z.string().min(2 , {
        message: "please provide version of the game or app."
    }),
    app_game_size: z.string().min(2 , {
        message: "please provide size of the game or app."
    }),
    description: z.string().min(2 , {
        message: "please provide description of the game or app."
    }),
    sub_category: z.string().min(2 , {
        message: "please provide genre of the game or app."
    }),
    category: z.string().min(1 , {
        message: "please provide category of the game or app."
    }),
})