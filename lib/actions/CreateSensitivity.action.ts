import {supabaseServerClient} from "@/lib/supabase/server";
import {revalidatePath} from "next/cache";

export async function createSensitivityAction({sensitivity_device_description, sensitivities}: {
    sensitivity_device_description: any,
    sensitivities: any
}) {


    const supabase = supabaseServerClient();
    await supabase
        .from('sensitivity_device')
        .insert(sensitivity_device_description)

    await supabase
        .from('sensitivities')
        .insert(sensitivities)

    revalidatePath('/dashboard');

}
