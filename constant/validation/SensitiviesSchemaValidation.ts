import {z} from "zod";

export const formSchema = z.object({
   // this is for the form validation of the device sensitivity table
    device_name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    ram: z.string().min(2, {
        message: "ads must be at least 2 characters.",
    }),
    rom: z.string().min(2, {
        message: "camera must be at least 2 characters.",
    }),
    slug: z.string().min(2, {
        message: "slug must be at least 2 characters.",
    }),
    screen_resolution: z.string().min(2, {
        message: "screen_resolution must be at least 2 characters.",
    }),
    intro: z.boolean(),
    camera: z.boolean(),
    ads: z.boolean(),
    gyroScope: z.boolean(),
    explanation: z.any().optional(),
    claws: z.boolean(),
    intro_text: z.string().min(20, {
        message: "intro_text must be at least 20 characters."
    }),
    proccessor: z.string().min(2, {
        message: "proccessor must be at least 2 characters."
    }),
    //this schema of sensitivities is for the form validation
    tpp_no_scope: z.string().min(1, {
        message: "tpp_no_scope value must assign",
    }),
    fpp_no_scope: z.string().min(1, {
        message: "fpp_no_scope value must assign",
    }),
    red_dot: z.string().min(1, {
        message: "red_dot value must assign",
    }),
    "2x_scope": z.string().min(1, {
        message: "2x_scope value must assign",
    }),
    '3x_scope': z.string().min(1, {
        message: "3x_scope value must assign",
    }),
    '4x_scope': z.string().min(1, {
        message: "4x_scope value must assign",
    }),
    '6x_scope': z.string().min(1, {
        message: "6x_scope value must assign",
    }),
    '8x_scope': z.string().min(1, {
        message: "8x_scope value must assign",
    }),
    ads_tpp_no_scope: z.string().min(1, {
        message: "ads_tpp_no_scope value must assign",
    }),
    ads_fpp_no_scope: z.string().min(1, {
        message: "ads_fpp_no_scope value must assign",
    }),
    ads_red_dot: z.string().min(1, {
        message: "ads_red_dot value must assign",
    }),
    ads_2x: z.string().min(1, {
        message: "ads_2x_scope value must assign",
    }),
    ads_3x: z.string().min(1, {
        message: "ads_3x_scope value must assign",
    }),
    ads_4x: z.string().min(1, {
        message: "ads_4x_scope value must assign",
    }),
    ads_6x: z.string().min(1, {
        message: "ads_6x_scope value must assign",
    }),
    ads_8x: z.string().min(1, {
        message: "ads_8x_scope value must assign",
    }),
    gyro_tpp_no_scope: z.string().min(1, {
        message: "ads_tpp_no_scope value must assign",
    }),
    gyro_fpp_no_scope: z.string().min(1, {
        message: "ads_fpp_no_scope value must assign",
    }),
    gyro_red_dot: z.string().min(1, {
        message: "ads_red_dot value must assign",
    }),
    gyro_2x: z.string().min(1, {
        message: "ads_2x_scope value must assign",
    }),
    gyro_3x: z.string().min(1, {
        message: "ads_3x_scope value must assign",
    }),
    gyro_4x: z.string().min(1, {
        message: "ads_4x_scope value must assign",
    }),
    gyro_6x: z.string().min(1, {
        message: "ads_6x_scope value must assign",
    }),
    gyro_8x: z.string().min(1, {
        message: "ads_8x_scope value must assign",
    }),
    freelook_camera_tpp: z.string().min(1, {
        message: "freelook_camera_tpp value must assign",
    }),
    freelook_camera_parachuting: z.string().min(1, {
        message: "freelook_camera_parachuting value must assign",
    }),
    freelook_camera_fpp_character: z.string().min(1, {
        message: "freelook_camera_fpp_character value must assign",
    }),
})