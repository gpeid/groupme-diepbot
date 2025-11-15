import { createClient } from './../../node_modules/@supabase/supabase-js/src/index';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey)



const fetchDimSumData = async () => {
    try {
        const { data, error } = await supabase
            .from('dishes')
            .select();
        return data;

    } catch (error) {
        console.error(error)
    }
}

export { fetchDimSumData }