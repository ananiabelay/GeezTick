

import { createClient } from './utils/supabase/server';


export default  async function authe(){
const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user != null){
    return true
  }

}
